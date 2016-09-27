/***
  【オブジェクト】実行結果文字列を解析し、エラーの場合は原因を探る
***/
var MessageAnalyst = (function () {

    //【関数】各言語のエラーメッセージ解析用情報の初期化
    var analysisInfo = [];
    (function () {

        function setAnalysisInfo(lang, reg, sliceAt) {
            analysisInfo[lang] = {
                reg: new RegExp(reg),
                sliceAt: sliceAt
            };
        }
        setAnalysisInfo("py", /line&nbsp;[0-9]+/g, 10);
        setAnalysisInfo("rb", /sltp.rb:[0-9]+/g, 8);
        setAnalysisInfo("php", /on line <b>[0-9]+/g, 11);

    })();

    //【関数】BCC32のエラーコードに合わせてメッセージの内容を書き換える
    //@code エラーコード(整数値)
    //@mes  エラーメッセージ
    function transrationErrorMessage(code, mes) {

        //エラーメッセージ内のキーワードを抽出する
        //未定義の関数 'sayHello' を呼び出した(関数 main() ) →　sayHello
        function getKeyWord() {
            return mes.match(/'.+'/)[0];
        }

        //パラメーラ不足エラーの関数名を抽出する
        // 呼び出し時のパラメータが足りない：sayHello(int)(関数 main() ) →　sayHello(int)
        function getParameterErrorFunctionName1() {
            return mes.substr(mes.indexOf("：") + 1);
        }

        //パラメータ溢れエラーの関数名を抽出する
        // sayHello() の呼び出しに余分なパラメータがある(関数 main() ) →　sayHello()
        function getParameterErrorFunctionName2() {
            return mes.slice(0, mes.indexOf(')') + 1);
        }

        //変数未宣言エラーの変数名を抽出する
        //未定義のシンボル result(関数 main() ) →　result
        function getNotDefindeVariableName() {
            return mes.match(/未定義のシンボル .+/)[0].slice(9);
        }

        //パラメータの型違いエラーの型名を抽出する
        // 'int' 型は 'int *' 型に変換できない(関数 main() )　→　["int" , "int *"]
        function getTypeError() {
            var result = [];
            var type = mes.match(/\'[^\']+\'/g);
            result.push(type[0]);
            result.push(type[1]);
            return result;
        }

        switch (code) {
            case 2268: //関数宣言が見当たらない
                return "関数" + getKeyWord() + "が見つかりません。定義できていないかスペルミスを犯している、includeし忘れているなどの可能性があります。";
                break;
            case 2379:  //セミコロンや{}がないなど基本構文エラー
            case 2134:
            case 2190:
            case 2141:
            case 2139:
                return "直前にセミコロン(;)が不足している、{}が合致しないなどの文法上のミスが含まれています。コードをよく確認して下さい。";
                break;
            case 2193:  //引数が合わない
                return "関数「" + getParameterErrorFunctionName1() + "」を実行する際の引数が不足しております。引数の個数を確認して下さい。";
                break;
            case 2227:  //引数が多い
                return "関数「" + getParameterErrorFunctionName2() + "」を実行する際の引数が多すぎます。引数の個数を確認して下さい。";
                break;
            case 2451:  //宣言されてない変数などが利用された
                return "変数「" + getNotDefindeVariableName() + "」が宣言されておりません。基本的に変数は関数の先頭で宣言する必要があります。";
                break;
            case 2342:  //パラメータの型が違う
            case 2034:
                var type = getTypeError();
                return "変数の型が一致していない部分があります。それぞれの変数の型をよく確認してみましょう。";
                break;
            case 2209:  //インクルードできない
                return "インクルードを希望している" + getKeyWord() + "が開けません。スペルミス、ファイルが存在しないなどの可能性があります。";
                break;
            case 2238:  //変数重複
                return "変数「" + getKeyWord() + "」の宣言が重複されている可能性があります。変数宣言部分を確認して下さい。";
                break;
            case 2171:  //関数重複
                return "関数" + getKeyWord() + "の宣言が重複されている可能性があります。関数宣言部分を確認して下さい";
            case 2314:  //関数でないものを呼び出している
                return "変数を関数のように()で呼び出すことはできません。名前などを確認して下さい。"
                break;
            case 2344:  //紛らわしいエラー（出力しない）
                return false;
            default:
                return mes;
        }
    }

    //【関数】C,C++言語のエラーメッセージから、行番号とエラー文を抽出
    //@text メッセージ全て
    function getErrorDataToC(text) {

        //メイン関数が宣言されてないエラーが存在するか確認
        if (text.indexOf("'_main' が未解決") >= 0) {
            return {
                text: "main関数が定義されておりません。C言語プログラムではmain関数が必ず必要です。",
                info: []
            }
        }

        //その他のエラーメッセージの取得
        var errMeses = text.match(/エラー E.... sltp.cpp [0-9]+: [^<]*/gm);

        //エラーがない場合正常オブジェクトを戻す
        if (errMeses == null) return {
            text: text,
            info: true
        };

        //検出されたエラーを解析、簡略化して通知
        var result = [];    //各種エラーメッセージを格納する
        for (var i = 0; i < errMeses.length; i++) {

            //各エラーメッセージの取得
            var matched = errMeses[i];

            //エラーコードの抽出
            var errCode = matched.match(/エラー E..../)[0];
            errCode = Number(errCode.slice(5));

            //該当行番号の抽出
            var errMes = matched.slice(19);
            var line = Number(errMes.match(/[0-9]+/));

            //メッセージ本体の抽出
            var mes = errMes.match(/: .+/);             //行番号以降を抽出
            mes = mes[0].slice(2);                      //先頭をカット
            var pos = mes.indexOf("(関数 ");            //末尾をカット
            if (pos != -1) {
                mes = mes.slice(0, pos);
            }

            //メッセージ本体を優しい文章に変更する
            //複雑で表示させたい場合戻り値がfalseになる
            mes = transrationErrorMessage(errCode, mes);
            if (!!mes) {
                //元のメッセージも書き換える
                var newMessage = "【" + line + "行目周辺】" + mes;
                text = text.replace(matched, newMessage);

                //オブジェクトにまとめて返却
                result.push({
                    code: errCode,
                    line: line,
                    mes: mes
                });
            }
            else {
                text = text.replace(matched, "");
            }

        }

        //余計なメッセージを削除する
        text = text.replace("Borland C++ 5.5.1 for Win32 Copyright (c) 1993, 2000 Borland<br>sltp.cpp:<br>", "");
        text = text.replace(/\*\*\* [0-9]+ errors in Compile \*\*\*/, "");
        text = text.replace(/警告 W[^>]+<br>/g, "");

        return {
            text: text,
            info: result
        };

    }

    //【関数】エラーメッセージから行番号を抽出し戻す
    //@lang   言語
    //@text   エラーメッセージ
    //@return {text:元のエラーメッセージ全て , info: {line: 行番号 , mes: エラーメッセージ}[]}
    function getErrorLine(lang, text) {

        //C,C++の解析
        if (lang == "c" || lang == "cpp") {
            return getErrorDataToC(text);
        }

        //他の言語の解析
        else {

            //出力の解析。エラーが見つからなければ出力とTrueを戻す
            var reg = analysisInfo[lang].reg;
            var sliceAt = analysisInfo[lang].sliceAt;
            var texts = text.match(reg);
            if (texts == null) {
                return {
                    text: text,
                    info: true
                };
            }

            //エラーが含まれている場合は行番号を取得し、戻す
            var errLine = [];
            for (var i = 0; i < texts.length; i++) {
                errLine.push({
                    line: Number(texts[i].slice(sliceAt)),
                    mes: "error"
                });
            }
            return {
                text: text,
                info: errLine
            };
        }
    }

    //提供メソッド
    return {
        getError: getErrorLine
    };

})();