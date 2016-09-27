/*

【バグリスト】(WEB:Webサーバ　CLI:CLIENT　SEV:SERVER)
・(CLI) 言語変更時に互いに送信しあってる。（何故か無限ループではない）
・（CLI) サーバーに接続しないという選択肢をつける
・（CLI）接続時に発生する実害のないエラー
・（CLI）横スクロールの同期が取れない。
・（CLI）自動再接続機能を削除したからもしかしたら弊害出るかも
・（CLI，SEV)　接続の衝突(互いに相手に接続しようとする）とバグ
【connectionsの属性メモ】
connections[PeerID] =
{
	userName	:	接続先ユーザーの名前
	conn		:	データコネクション
	num			:	ビデオを表示している領域番号
	stream		:	ビデオストリームURL
}

【データ通信用Objectの属性メモ】
obj = 
{
	//全てのデータで必須とする属性
	type						:	データの種類
	data						:	主となるデータ

	//テキスト共有のための属性
	cursor					    :	カーソル位置のオブジェクト

	//ファイル送受信に使用する属性
	fileName    				: ファイルの名前

	//ユーザー名交換に使用する属性
	isConnection		: 接続した側ならTrue(ユーザー名のみ必須)
}

var 1.40(卒論要旨提出まで)
12/25	設定情報の格納をCookieからWebStorageに変更(簡単だから)
12/23	設定情報が保存されていなかったバグを修正(URL変更時にCookieが重複登録されてた？)
var 1.30(利用実験終了まで)
12/20   C言語にてmain関数が存在しない時のエラーメッセージの挙動を修正(簡略化されてなかった)
12/20   実行結果領域のサイズをエディタのフォントサイズに統一(フォント変更時に動的に変更)
12/19   WebRTCプラットフォームをPeerJSに変更。（下記の問題が治った上SKYWAYが動かなくなったため)
12/18   WebRTCプラットフォームをSKYWAYに変更。(PeerJSが動かなくなったため。日本語問題はJSONにすることで解消)
12/18   JavaScript,HTML実行時に自動保存されないバグを修正(コンパイラ使う時だけ保存してました)
12/17   UI微調整(コマンドライン引数が未対応なことの明示、研究室PCのコンパイラパスを初期値に追加)
12/10   実行の停止後にプログラムが実行できなくなるバグを修正(TaskKillのパスが通ってなかった)
12/08   画面のデフォルト比を微調整(4:3モニタでの都合上)
12/08   エラーメッセージ簡略化の内容を一部修正。(警告バグ、多重表示バグ)
12/07   クッキーにコードを保存する機能を追加(データ損失を防止)
12/07   Rubyが実行できていなかったバグを修正(Rubyのパスが間違っていた)
12/06   サーバーに二重接続するバグを修正(ユーザー情報入力フォームでのOKボタンの連打が原因)
12/06   BCC32が吐く警告は表示しないことに(ユーザーを迷わせるため。要件等)
12/06   半角スペースが出力できなかったバグを修正(HTMLで半角スペースが無視される仕様から)
12/06   デフォルトの設定値を調整(フォントサイズ：１６、テーマ：xcode)

var 1.20(あいちゃれファイナルまで)
11/13   エディタ共有に関する大型バグを修正(エディタ共有時の荒れ挙動。ace.js本体を弄って修正)
11/12   デフォルトコードが共有されないバグを修正
11/12   ハートビートパケットによってサーバーとの接続状態を監視
11/12   サーバーへの自動再接続機能を削除
11/05   サーバーに接続する前に実行ボタンが押せるバグ修正
11/05   改行の出力に関するバグを修正
11/05   PHPの実行仕様を変更
11/04   C言語のエラーメッセージ簡略化を改良
11/03   HTMLタグを含む文字列が出力できないバグを修正
11/01   C言語のエラーメッセージを簡略化
10/29   最大接続を超えたユーザーに対して接続申請した際のバグを修正
10/28   トーストの待ち行列による連続表示内のバグ修正
10/28   自動接続のオンオフ切り替え
10/28   相手のメディアデータを受信しない機能の撤廃(なんか無駄？)
10/28   最大接続数を５人に変更
10/27   URLリライティングによるクライアントの自動設定機能
10/15   トラフィッカーのバグ修正
10/15   URLリライティングによるサーバーの自動設定機能

var 1.10(あいちゃれ応募まで)
10/11   更新通知アイコンの位置、overflowに関するバグ修正
10/10   サーバー名を自由につけられるように
10/09   共有設定を一つに統一
10/09   実行エラー時に該当行にアノテーションを表示する
10/07   更新通知アイコン表示機能の追加
10/03   サブメニューのテキストを微修正
09/22   設定ダイアログにリセットボタンを追加
09/22   Cookieによる設定情報、ユーザー情報の読み書きを実装
09/21   メモ機能を実装
09/21   設定をサブメニューからメインメニューに移植
09/21   トーストの仕様を変更(クリックで消せる)
09/21   PHPの標準入力の同期機能追加
09/20   PHPの標準入力を別途作成。同期はまだ未実装
09/13   コンパイルサーバを複数から選択できるよう変更

var 1.00(U-22応募まで)
08/15   利用するピアIDを一新。何故か常に使用中だった不具合を修正。原因は不明のまま
08/15   サーバーサイドにてコンパイルプログラムのパスを画面から設定できるように
08/14   サーバー・クライアント共に通信トラフィックを計測。そのぶん通信ログを撤廃
08/13   回線が弱い場合？に発生するSTUNサーバエラーを修正。NAT下でもぎりぎり使えるかな
07/31   サーバーの実行排他制御のバグを修正。グローバル変数を隠蔽。
07/18   サーバーの起動に失敗した場合に警告を出力
07/08	ピアリストにアイコンつけた。糞デザイン
07/08	不具合の温床だったHaskellを除外
07/06	実行の排他制御を導入。ただし停止だけは最優先で出来る
07/06   一度に一つのピアとしか接続できないように仕様変更
07/06	ビデオに対する右クリックメニュー実装	
07/05	読み込む際の文字コードを指定できるように。なお保存はできてない
07/03	エディタ上での右クリックメニューを導入。マウスムーブイベント拾うようにしたから有効活l用して
07/03	ウィンドウのサイズが小さくなるとメインメニューがフェードアウトする仕様に
07/02	サーバー側からも切断できるように。あわせてFireFoxがCloseに対応してない問題も解決
07/02	サーバーの負荷テスト実施。それに合わせてサーバーごとに異なるAPIキーを利用することに
07/02	相手のメディアデータを受信しないを選択可能に
07/01	ユーザー名の重複対策を実装。ここもリッチな入力フォームにしたほうがいい？
07/01	サーバーを複数のピアIDから選択可能に。
07/01	接続成功、失敗時にToastを表示
07/01	マイクやカメラどちらかのみを利用した通信も可能に。
06/30	全ての言語において「停止」を実装し、無限ループを防止
06/28	接続もサーバーを中継するようにし、パスワード制限も実装
06/27	ユーザー情報入力ダイアログの実装
06/26	シンメトリックNATを突破する術を見つけられず非対応に
06/24	最大接続数を５から３に変更。有線環境でのテスト次第で戻す
06/23	ピアリストから接続先を選択して接続の形式にした。
06/22	サーバーサイドのUI一新
06/22	ユーザーがエディタのテーマを選べ用にした
06/22	実行環境をサーバーかローカルか選択できるようにした
06/21	Webカメラがなくても利用できるようなりました。多分バグの温床
06/20	関数、変数をonloadイベント内で隠蔽。リファクタリング

var 0.10(プロトタイプ)
06/19	コードの見直し
06/15	ドラッグによる可変幅を実装。
06/08	UI一新。JQueryUIを乱用
06/03	複数言語対応の実行機能を実装
06/01	Linuxが扱えなすぎてサーバーサイドをWindowsに
05/28	可変長レイアウトに一新。現在のレイアウトのベースに
05/19	サーバーサイドに手を付ける。Ubuntuで
05/13	Aceとかいう素晴らしいエディタを使ってみる
05/11	ファイルの送受信実装したけど１MBまでに制限
05/06	多対多によるビデオチャットができるように
05/04	Webカメラの情報を取り込めました
04/27	開発開始。WebRTCの実践的利用を始める

*/
$(function () {

    /*【通信用の情報】**********************************************/
    var SERVER;						//サーバーノードのPeerID
    var SERVER_CONNECTION;		    //サーバーノードとのデータコネクション
    /****************************************************************/

    /*【ユーザーの情報】*********************************************/
    var userName;					//ユーザー名
    var password = "";				//接続パスワード
    var peer;						//WebRTCピア
    var peerID;						//自身のpeerID
    var myStream;					//自身のWebカメラ
    var connections = [];			//接続済みのコネクションリスト
    var sendConfig = true;          //更新情報を送信の可否
    var recvConfig = true;          //共有情報の受信の可否
    /****************************************************************/


    /*【送受信するデータの種類】*************************************/
    var USERNAME	= 0;			//ユーザー情報
    var TEXT    	= 1;			//テキストチャットの発言
    var EDITOR		= 2;			//エディタの更新情報
    var BINARY		= 3;			//ファイル送受信用バイナリデータ
    var RUNRESULT   = 4;			//実行結果
    var STDIN		= 5;	    	//標準入力文字列
    var STDINPHP    = 6;            //PHP専用標準入力
    var MEMO        = 7;            //メモフォーム
    var LANG		= 8;	    	//選択中の言語
    var CAMERA		= 9;			//Webカメラ情報
    var RUN			= 10;		    //実行要求、応答
    var STOP		= 11;	    	//実行中のプログラムの停止要求
    var PEERS		= 12;   		//接続可能ピア情報
    var CONNECT		= 13;			//ピアへの接続要求
    var REMOVE      = 14;			//コネクションの切断情報
    var PERMIT      = 15;           //コネクションからの接続を拒否するか
    var HEART       = 16;           //ハートビートパケット
    var DATANAME =
        [
            "ユーザー名", "テキストチャットの発言", "エディタの更新", "ファイル",
            "実行結果", "標準入力の更新", "PHP送信データの更新", "メモの更新",
            "言語の変更", "Webカメラ情報"
        ];
    /****************************************************************/


    /*【その他】*****************************************************/
    var APIKEY = {                  //PeerJSのAPIキー
        "sltpservernode001": "dka7elfexlk81tt9",
        "sltpservernode002": "xuuda3vnw5ewmi",
        "sltpservernode003": "tpytks79v96hia4i",
        "sltpservernode004": "secf28iz7inyu8fr",
        "sltpservernode005": "a1wyr7cg1cibpgb9",
    };
    var editor;						//Aceエディタ
    var makingFileType = "c";	    //編集中の言語
    var MAXCONNECTIONS = 5;		    //最大接続可能人数
    var pointerX;					//マウス座標X
    var pointerY;					//マウス座標Y
    /****************************************************************/    

    //【通信】WebRTCピアサーバー接続を行う
    function ConnectionToPeerServer() {

        // フリーサーバー用APIキー
        var key = APIKEY[SERVER];
        if (typeof (key) === "undefined") key = "j5z154z9afcu9pb9";
	    
        // ピアサーバーへ接続後、自動的にサーバーノードに接続する
        $("#serverConnectionMessage")
		.text("システムの準備中(1)...");
        peer = new Peer({ key: key, debug: traficcer.getEnable() });
        peer.on("open", StartToWebRTC);

    }

    //【通信】通信プログラム(WebRTC)の利用が開始された際のイベント
    //@id Peerサーバーから提供されたPeerID
    function StartToWebRTC(id) {

        peerID = id;
        peer.on("connection", function (conn) { SetTheConnection(conn); });
        peer.on("call", AnswerToCall);
        peer.on("error", onPeerError);

        WriteMediaStream(myStream, id, true);	//メディアの描画
        ConnectionToServerNode();		    	//サーバーノードへ接続

        //この変数はpeer.js内で宣言され、peer.jsにてエラーが発見された場合に呼び出す
        iceErrorEventforClient = function (peerId) {
            if (peerId == SERVER) {

            } else {
                Toast("接続に失敗しました。時間を置いてから再度接続してください", false);
                TogglePeerList(true);
            }
        };
    }

    //【通信】サーバーノードに接続する
    function ConnectionToServerNode() {

        //サーバーノードに接続する
        $("#serverConnectionMessage")
		.text("システム準備中(2)...");
        var c = peer.connect(SERVER);
        c.on("open", function () {

            $("#serverConnectionMessage").html("");
            $("#connectionInformation").css("display", "block");
            Toast("Welcome to the SLTP!!" , false);
            WriteMessage("サーバー(" + SERVER + ")に接続しました。", "Div_InformationText");
            SERVER_CONNECTION = c;

            //UIのイベントを登録し、利用開始できるようにする
            SetUserInterfaceEvent();

            //サーバーからデータ（実行結果）を受信したイベント
            c.on("data", ReceiveToServerNode);

            //ハートビート制御の開始
            heartBeatControler.start(10000);

            //ユーザー名とパスワードをサーバーに伝えておく
            var data = {
                userName: userName,
                password: password,
            };
            SendToServerNode(USERNAME, data);
        });
        c.on("error", function (err) {
            console.error(err);
            $("#runAreaMain").text("");
            resetClient();
        });

    }

    //【通信】指定したPeerIDにコネクションの接続を行う
    //@peerID	接続先のID
    //@return	既に接続済み、もしくは最大接続数を超えた場合のみfalse
    function TryConnection(PeerID) {

        //既に接続済みのPeerIDなら接続しない
        if (SearchPeerID(PeerID)) return false;

        //最大人数を超えている場合接続しない
        if (Object.keys(connections).length >= MAXCONNECTIONS) {
            TogglePeerList(true);
            alert("最大接続人数を超えています");
            return false;
        }

        //接続する
        TogglePeerList(false);
        var c = peer.connect(PeerID);
        c.on("open", function () {

            SetTheConnection(c);
            SendInitInformation(c, true);
            TogglePeerList(true);
        });
        c.on("error", OccursError);

        return true;
    }

    //【通信】指定したコネクションを切断する
    //@id			切断するコネクションのID
    //@useMessage	ユーザーに確認を取るか
    function CloseConnection(id, useMessage) {

        //ユーザーに確認後切断する
        var userName = PeerToName(id);
        var message = userName + "とのコネクションを切断します。よろしいですか？";
        if (typeof(connections[id]) != "undefined" && (useMessage == false || confirm(message))) {
            connections[id].conn.close();
        }

    }

    //【通信】クライアントからの通信を受け付けるかを切り替える
    //@permit   受付を許可する場合True
    function SetTheConnectionParmittion(permit) {
        SendToServerNode(PERMIT, permit);
    }

    //【通信】クライアントの接続を受け付けた
    //@conn			接続が確立したコネクション
    //@isOneSelf	接続した側：true 接続されたがわ:false
    function SetTheConnection(conn) {

        if (SearchPeerID(conn.peer)) return;

        connections[conn.peer] = {
            conn: conn ,
            num: 0
        };
        conn.on("data", ReceptionData);
        conn.on("close", ConnectionCutOut);

        if (Object.keys(connections).length >= MAXCONNECTIONS) {
            SendToServerNode(PERMIT, false);
        }
    }

    //【通信】接続が完了したコネクションに対して初期情報を送信する
    //@conn			送信先のコネクション
    //@isOneSelf	接続した側ならTrue , された側ならFalse
    function SendInitInformation(conn, isOneSelf) {

        /**全接続共通の交換情報***/
        var userNameObj = { //ユーザー名
            type: USERNAME,
            data: userName,
            isConnection: isOneSelf
        };

        SendDataToPeer(userNameObj, conn.peer);


        /**接続された側のみ送信する情報**/
        if (isOneSelf == false) {

            //エディタ
            var textAreaObj = {
                type: EDITOR,
                data: editor.getValue(),
                cursor: editor.selection.getCursor()
            };
            SendDataToPeer(textAreaObj, conn.peer);

            //標準入力
            var stdinAreaObj = {
                type: STDIN,
                data: $("#stdinArea").val()
            };
            if (stdinAreaObj.data != "") {
                SendDataToPeer(stdinAreaObj, conn.peer);
            }

            //メモ
            var memoAreaObj = {
                type: MEMO,
                data : $("#memoArea").val()
            };
            if (memoAreaObj.data != "") {
                SendDataToPeer(memoAreaObj, conn.peer);
            }

            //選択中の言語
            var langObj = {
                type: LANG,
                data: makingFileType
            };
            SendDataToPeer(langObj, conn.peer);
			
            //PHP用標準入力
            $(".PHPInputer").change();
        }

            /**接続した側のみ送信する情報**/
        else {

            var CameraObj = {
                type: CAMERA,
                data: (myStream != null)
            };

            SendDataToPeer(CameraObj, conn.peer);

        }

    }

    //【通信】サーバーノードからデータを受信した
    //@obj	受信したデータオブジェクト
    function ReceiveToServerNode(obj) {

        //ハートビート
        if (obj.type == HEART) {
            heartBeatControler.update();
        }

        //実行結果
        else if (obj.type == RUN) {
            if (obj.data.result === true) {
                if (makingFileType != "php") {
                    obj.data.text = htmlEncode(obj.data.text); //実行成功時特殊文字も表示できるようエンコード
                }
            }
            AssistRunResult(obj.data.result);
            WriteRunResult(obj.data);
        }

        //サーバーからのテキストメッセージ
        else if (obj.type == TEXT) {
            Toast(obj.data , true);
        }

            //接続要求結果
        else if (obj.type == CONNECT) {
            checkConnectionResponse(obj.data.result, obj.data.message);
        }

            //ユーザー名のエラー
        else if (obj.type == USERNAME) {
            RetrySetUserName(obj.data);
        }

            //接続可能ピアリスト
        else if (obj.type == PEERS) {
            WritePeerList(obj.data);
        }

            //切断情報
        else if (obj.type == REMOVE) {
            CloseConnection(obj.data, false);
        }

            //例外
        else {
            alert("予期せぬデータをサーバーから受け取りました");
            console.log(obj);
        }

        traficcer.setRecvTrafic(obj);

    }

    //【通信】サーバーノードにデータを送信する
    //@data_type	送信するデータの種類
    //@data_main	送信するデータ本体
    function SendToServerNode(data_type, data_main) {

        var send_obj = {
            type: data_type,
            data: data_main
        };

        SERVER_CONNECTION.send(send_obj);
        traficcer.setSendTrafic(send_obj);

    }

    //【通信】指定したデータを指定したピアにのみ送信する
    //@obj	送信するデータ
    //@id	送信先PeerID
    function SendDataToPeer(obj, id) {

        connections[id].conn.send(obj);
        traficcer.setSendTrafic(obj);

    }

    //【通信】指定したデータを接続している全てのピアに送信する
    //@obj	送信するオブジェクトデータ
    function SendDataToAllPeer(obj) {

        for (var client in connections) {
            SendDataToPeer(obj, client);
        }
    }

    //【通信】全てのコネクションにファイルを送信する。容量制限有り
    //@file	送信するファイルオブジェクト
    function SendFile(file) {

        //送信できるファイルは１MBまでとする
        var fr = new FileReader();

        if (file.size >= 1000 * 1000) {
            WriteMessage("1MB以上のファイルは送信できません", "Div_InformationText");
            return;
        }

        fr.onload = function () {
            var sendObject = {
                type: BINARY,
                data: fr.result,
                fileName: file.name
            };
            SendDataToAllPeer(sendObject);
            WriteMessage("ファイル送信：" + file.name, "Div_MyResponseText");
        };

        fr.readAsDataURL(file, "utf-8");

    }

    //【通信】ピアからデータを受信した
    //@data	受信したデータ文字列。先頭が@の場合メタデータを表す
    var ReceptionData = (function () {

        //受信したデータの種類(type)に応じて処理する関数を呼び出す
        var process = [];
        process[TEXT] = ProcessChatText;
        process[USERNAME] = ProcessUserName;
        process[EDITOR] = ProcessEditor;
        process[BINARY] = ProcessBinaryData;
        process[RUNRESULT] = ProcessRunProgramm;
        process[STDIN] = ProcessStdinText;
        process[STDINPHP] = ProcessStdinPHPData;
        process[MEMO] = ProcessMemo;
        process[LANG] = ProcessLangage;
        process[CAMERA] = ProcessCamera;

        return function (obj) {
            process[obj.type](this.peer, obj);
            uploderSign.show(connections[this.peer].num, obj.type);
            traficcer.setRecvTrafic(obj);
        };

    })();

    //【通信】ユーザー名情報を受信した
    //@id	データ送信元ID
    //@data	対応するユーザー名
    function ProcessUserName(id, obj) {

        connections[id].userName = obj.data;
        var txt = obj.data + "との接続が完了しました";
        Toast(txt , false);
        WriteMessage(txt, "Div_InformationText");
        SendToServerNode(PEERS, "");

        // 初めてやりとりをする相手だった場合こちらの情報も送信する
        if (obj.isConnection) {
            SendInitInformation(connections[id].conn, false);
        }
    }

    //【通信】エディタの更新情報を受信した
    //@id	データ送信元ID
    //@data	更新用データ
    function ProcessEditor(id, obj) {

        if (recvConfig) {

            editor.removeListener("change", onTextChangeEditor);
            editor.setValue(obj.data , obj.cursor.row , obj.cursor.column);
            //editor.gotoLine(obj.cursor.row + 1, obj.cursor.column + 1);
            editor.on("change", onTextChangeEditor);
         
        }

    }

    //【通信】テキストチャットの発言情報を受信した
    //@id	データ送信元ID
    //@data	更新用データ
    function ProcessChatText(id, obj) {

        var text = PeerToName(id) + " : " + obj.data;
        WriteMessage(text, "Div_anotherResponseText");
        Toast(text, true);

    }

    //【通信】バイナリファイルを受信した
    //@id	送信元PeerID
    //@data	受信したバイナリデータ
    function ProcessBinaryData(id, obj) {

        //復元し、ダウンロードする
        var message = PeerToName(id) + "さんから『" + obj.fileName + "』を受信しました。";
        WriteMessage(message, "Div_AnotherResponseText");
        var result = confirm(message + "\nダウンロードしますか？");

        if (result) {
            saveBlob(Base64toBlob(obj.data), obj.fileName);
        }


    }

    //【通信】実行結果を受信した
    //@id	送信元PeerID
    //@data	受信した実行結果
    function ProcessRunProgramm(id, obj) {

        if (recvConfig) {
            $("#runAreaMain").html(obj.data.text);
            AssistRunResult(obj.data.result);
        }

    }

    //【通信】標準入力エリアの更新情報を受信した
    function ProcessStdinText(id, obj) {

        if (recvConfig) {
            var stdArea = $("#stdinArea");
            stdArea.unbind("change keyup", onChangeStdinArea);
            $(stdArea).val(obj.data);
            stdArea.bind("change keyup", onChangeStdinArea);
        }

    }

    //【通信】PHP用標準入力エリアの更新情報を受信した
    function ProcessStdinPHPData(id, obj) {

        if (recvConfig) {
	        
	        
            //削除情報
            if (obj.data == "@remove") {
                var $e = $("#" + obj.elementID).parent();

                //その行のデータを全て削除する
                removePHPInputer($e);

            }

                //更新情報
            else {
                var id = "#" + obj.elementID;
                var data = obj.data;
                $(id).unbind("change", onChangeStdinPHPArea);
                $(id).val(data);
                $(id).bind("change", onChangeStdinPHPArea);
            }
        }

    }

    //【通信】メモ用テキストエリアの更新情報を受信した
    function ProcessMemo(id, obj) {

        if (recvConfig) {
            var memoArea = $("#memoArea");
            memoArea.unbind("change keyup", onChangeMemoArea);
            $(memoArea).val(obj.data);
            memoArea.bind("change keyup", onChangeMemoArea);
        }

    }

    //【通信】言語の変更情報を受信した
    function ProcessLangage(id, obj) {

        if (recvConfig) {
            if (obj.data != makingFileType) {	//言語が変更された場合のみ更新
                changeLangage(obj.data , false , true);
            }
        }

    }

    //【通信】Webカメラの所有情報を受信した
    function ProcessCamera(id, obj) {

        //お互いのWebカメラの所有状態に応じてビデオチャットをリクエストする。
        //当関数は、WebRTCのビデオチャットリクエストが、応答側のみmediaStreamを
        //省略できることから、mediaStreamを持っている方がリクエストを送信するよう
        //意図的に調整させるものである。
        var mine = (myStream != null);
        var your = obj.data;
        var sendObj = {
            type: CAMERA,
            data: mine
        };

        //自分も相手もカメラ持ってる : ビデオチャットリクエスト送信
        if (mine && your) {
            CallTo(id);
        }

            //自分だけがカメラ持ってる　：　ビデオチャットリクエストを送信し、ダミーを描画する
        else if (mine && !your) {
            CallTo(id);
            WriteMediaStream(null, id, false);
        }

            //相手だけがカメラ持ってる　：　ビデオチャットリクエストの送信してもらう
        else if (!mine && your) {
            SendDataToPeer(sendObj, id);
        }

            //どちらも持っていない　：　その事実を伝え、ダミーを描画する
        else {
            if (typeof (connections[id].stream) != "undefined") return;
            SendDataToPeer(sendObj, id);
            WriteMediaStream(null, id, false);
        }

    }

    //【通信】指定したPeerIDに対して、ビデオチャットを要求する
    //@peerID 接続先のID
    function CallTo(peerID) {

        //ビデオチャットの要求を送信し、応答を受け取った際の処理を登録する
        var mediaConnection = peer.call(peerID, myStream);

        mediaConnection.on("stream", function (stream) {
            WriteMediaStream(stream, mediaConnection.peer, false);
        });
    }

    //【通信】ピアからビデオチャットの要求を受け取った
    //@call 要求の送信元メディアコネクション
    function AnswerToCall(call) {

        //ビデオチャットの要求を受け入れる。ビデオチャット成立後、ビデオ画面を描画する
        call.answer(myStream);
        call.on("stream", function (stream) {
            WriteMediaStream(stream, call.peer, false);
        }, call.peer);

    };

    //【通信】すべてのコネクションに現在選択中の言語情報を送信する
    function SendToSelectedLangage() {
        if (sendConfig) {
            var obj = {
                type: LANG,
                data: makingFileType
            };
            SendDataToAllPeer(obj);
        }
    }

    //【通信】ピアとのコネクションが途切れた
    function ConnectionCutOut() {

        //接続済み情報から削除し、ビデオ画面も空にする
        var txt = PeerToName(this.peer) + "と切断しました";
        var videoID = "#video" + connections[this.peer].num;
        Toast(txt , false);
        WriteMessage(txt, "Div_InformationText");

        $.contextMenu('destroy', videoID);
        $(videoID)
			.prop("src", "")
			.removeAttr("autoplay")
			.prop("poster", "./image/bg_video.png")
			.removeAttr("title")
			.tooltip("destroy")
			.unbind("dblclick");


        delete connections[this.peer];
        SendToServerNode(PERMIT, true);

        //接続可能リストを更新する
        setTimeout(function () {
            SendToServerNode(PEERS, "");
        }, 6000);

    }

    //【通信】コネクションへの接続に失敗した
    function onPeerError(err) {

        //サーバーノードの場合とクライアントノードの場合に応じて警告を出す
        if (err.message == "Could not connect to peer " + SERVER) {
            $("#serverConnectionMessage").text("サーバーノードへの接続に失敗しました。");
            resetClient();
        }

        else {
            SendToServerNode(PEERS, "");
            TogglePeerList(true);
            Toast("接続に失敗しました", false);
        }

        console.error("コネクションへの接続失敗")
        console.error(err);

    }

    //【通信】通信エラーが発生した
    //@err エラー制御情報
    function OccursError(err) {

        Toast(this.peer + "との通信中にエラーが発生しました" , false);
        TogglePeerList(true);
        console.error(err);

    }

    //【通信】指定したPeerIDが接続中及び自分であるかを戻す
    //@peerID	重複を探索するID
    //@return	重複ならTrue
    function SearchPeerID(peerID) {

        for (var id in connections) {
            if (peerID == id) {
                return true;
            }
        }

        if (peerID == peer.id) return true;

        return false;

    }

    //【UIイベント】ウィンドウのサイズが変わった
    function onResizeWindow() {

        //メインメニューの表示非表示切り替え
        if (window.innerWidth <= 650) {
            $(".mainMenuButton").fadeOut(500);
        } else {
            $(".mainMenuButton").fadeIn(600);
        }

        //更新通知アイコンの座標修正
        uploderSign.move();

    }

    //【UIイベント】エディタにキー入力が行われた
    function onTextChangeEditor(e) {

        //入力済みのテキストを全て共有する
        if (sendConfig) {

            var obj = {
                type: EDITOR,
                data: editor.getValue(),
                cursor: editor.selection.getCursor()
            };
            SendDataToAllPeer(obj);

        }
    }

    //【UIイベント】エディタ上でクリックされたされた
    function onMouseupEditor(e) {

        //右クリックでかつ選択範囲がない場合、メインメニューを表示する
        if (e.which == 3 && editor.getSelectedText() == "") {
            $("#fakeContextMenu").contextMenu({ x: pointerX, y: pointerY });
        }

    }

    //【UIイベント】エディタ上でマウスカーソルが動いた
    function onMoveMouseCursor(e) {

        pointerX = e.clientX;
        pointerY = e.clientY;

    }

    //【UIイベント】エディタにファイルがドロップされた
    function onDropTextAreaEditor(event) {

        //ファイルの拡張子が対応しているものであれば、ファイルを開く
        event.stopPropagation();
        event.preventDefault();

        var file = event.dataTransfer.files[0];
        var fr = new FileReader();

        WriteReadFile(file);
    }

    //【UIイベント】標準入力用のテキストエリアが書き換えられた
    function onChangeStdinArea() {

        //変更後の内容を全て共有する
        if (sendConfig) {

            var obj = {
                type: STDIN,
                data: $(this).val()
            };

            SendDataToAllPeer(obj);

        }
    }

    //【UIイベント】メモ用テキストエリアが書き換えられた
    function onChangeMemoArea() {

        //変更後の内容を全て共有する
        if (sendConfig) {

            var obj = {
                type: MEMO,
                data: $(this).val()
            };

            SendDataToAllPeer(obj);

        }

    }

    //【UIイベント】PHP用標準入力エリアが書き換えられた
    function onChangeStdinPHPArea() {

        //変更後の内容を全て共有する
        if (sendConfig) {

            var obj = {
                type: STDINPHP,
                elementID : $(this).prop("id") ,
                data: $(this).val()
            };

            SendDataToAllPeer(obj);

        }
    }

    //【UIイベント】PHP用標準入力エリアの「削除」ボタンがクリックされた
    function onClickPHPRemoveButton() {

        //その行のデータを削除
        var $e = $(this).parent();
        removePHPInputer($e);

        //変更後の内容を全て共有する
        var obj = {
            type: STDINPHP,
            elementID: $(this).prop("id"),
            data: "@remove"
        };
        SendDataToAllPeer(obj);

    }

    //【UIイベント】テキストチャットウィンドウにファイルがドロップされた
    //【参考】http://www.html5rocks.com/ja/tutorials/file/dndfiles/
    function onDropDivMessage(event) {

        //ドロップされたファイルを全てのピアに送信する
        event.stopPropagation();
        event.preventDefault();

        var file = event.dataTransfer.files[0];
        SendFile(file);

    }

    //【UIイベント】「開く」ボタンよりファイルが選択された
    //@e 選択されたファイルオブジェクト
    function onChangeFileSelecter(e) {

        //ファイルの拡張子が対応したものであれば、ファイルを開く
        var fileName = $("#fakeFileOpen").val();
        if (fileName == "") return;
        var file = e.target.files[0];


        WriteReadFile(file);
        $("#fakeFileOpen").val("");
    }

    //【UIイベント】「新規」ボタンがクリックされた
    function onClickNewFileButton() {

        //確認をとった上、デフォルトコードを開く
        var message = "現在のソースコードが削除されますがよろしいですか？";
        if (editor.getValue() != "") {
            if (confirm(message) == false) return;
        }
        WriteDefaultCode();

    }

    //【UIイベント】「ローカルに保存」ボタンがクリックされた
    function downLoadFile() {

        //保存するテキストを取得し、ファイル名を付けさせる。
        var content = editor.getValue();
        var message = "【保存】ファイル名を入力してください"
        var defaultName = "NewFile" + "." + makingFileType;
        var fileName = prompt(message, defaultName);
        if (fileName == null) return;

        //無名の場合デフォルト名を与え、拡張子がなければ自動で付ける
        if (fileName == "") {
            fileName = defaultName;
        } else if (fileName.indexOf(".") == -1) {
            fileName = fileName + "." + makingFileType;
        }

        //ダウンロードする
        DownloadStringData(content, fileName);

    }

    //【UIイベント】「Webブラウザに保存」ボタンがクリックされた
    //@useMessage   Trueなら保存が完了したことをトーストで通知する
    function saveToWeb(useMessage) {
        
        if (editor.getValue().length <= 2500 * 1000) {
            webStorage.set('code' , editor.getValue());
            webStorage.set('lang' , makingFileType);
            if (useMessage) {
                var mes = "Webブラウザ(クッキー)に保存しました。次回起動時に自動で読み込まれます。";
                Toast(mes, true, "black", 4000);
            }
            return;
        } else {
            if (useMessage) {
                var mes = "容量が大きすぎてWebブラウザに保存できません。ローカルにダウンロードして下さい。";
                Toast(mes , true, "black", 4000);
            }
        }
    }

    //【UIイベント】「実行」ボタンがクリックされた
    function onClickRunButton(e) {

        //実行前にコードを自動保存
        saveToWeb(false);

        //選択中の言語に応じて実行用関数を呼び出す
        var mf = makingFileType;
        switch (true) {
            case mf == "js":
                RunTheJavaScript(editor.getValue());
                break;
            case mf == "html":
                RunTheHTML(editor.getValue());
                break;
            default:
                RunTheProgram();
                break;
        }

    }

    //【UIイベント】「送信」ボタンがクリックされた
    function onClickSendButton() {

        //入力文字列を元に発言テキストを作成し、全コネクションに送信する
        var msg = $("#Text-Message").val();
        if (msg == "") return;

        var txt = userName + ":" + msg;
        WriteMessage(txt, "Div_MyResponseText");
        $("#Text-Message").val("");

        var obj = {
            type: TEXT,
            data: msg
        };

        SendDataToAllPeer(obj);
    }

    //【UIイベント】「ファイル」ボタンよりファイルが選択された
    //e 選択されたファイルオブジェクト
    function onChangeSendFileButton(e) {

        //選択されたファイルを全コネクションに送信する
        var fileName = $("#fakeSendFile").val();
        if (fileName == "") return;
        var file = e.target.files[0];

        SendFile(file);
        $("#fakeSendFile").val("");

    }

    //【UIイベント】「設定」ボタンがクリックされた
    function onClickConfigButton() {
        MakeConfigDialog();
    }

    //【UIイベント】メッセージ入力フィールドでキー入力された
    function onKeyPressTextMessage(e) {

        //エンターキーなら自動的に「送信」ボタンを押させる
        if (e.which == 13) {
            onClickSendButton();
        }

    }

    //【UIイベント】「実行結果」がクリックされた
    //【参考】http://7ujm.net/asp/javascript5.html
    function onClickRunAreaMain() {

        //実行結果画面を新しいウィンドウで表示する
        var html = $("#runAreaMain").html();
        OpenNewPage(html);

    }

    //【UIイベント】ピアリストがクリックされた
    function onClickPeers() {

        //接続にパスワードが必要なら要求する
        var pass = "";
        if ($(this).hasClass("pass")) {
            var mes = "'" + $(this).text() + "'に接続するにはパスワードが必要です";
            pass = prompt(mes);
            if (pass == null) return;
        }

        //サーバーに送信するオブジェクトの作成
        var data = {
            num: $(this).prop("id"),
            password: pass
        }

        SendToServerNode(CONNECT, data);

    }

    //【UIイベント】共有設定が書き換わった
    function onChangeSendRecvConfig() {
        sendConfig = $("#checkbox-send").prop("checked");
        recvConfig = $("#checkbox-recv").prop("checked");
    }

    //【UIイベント】フォントサイズ用スライダの値が書き換わった
    function onChangeFontSizeSlider() {

        //変更後に値に合わせてエディタのフォントサイズを変更する
        var newSize = $("#fontsizeSlider").val() + "px";
        document.getElementById('editorArea').style.fontSize = newSize;

        //実行結果エリアのサイズもあわせて変更する
        $("#runAreaMain").css("font-size", newSize);

    }

    //【UIイベント】タブ数用スライダの値が書き換わった
    function onChangeTabIndexSlider() {

        //変更後の値に合わせてエディタのタブ数を変更する
        var newSize = $("#tabindexSlider").val();
        editor.session.setTabSize(newSize);

    }

    //【UIイベント】エディタのテーマセレクタが書き換わった
    function onChangeThemeSelecter() {
        editor.setTheme("ace/theme/" + $("#themeSelecter").val());
    }

    //【UIイベント】言語選択のラジオボタンが書き換わった
    //@lang				変更後の言語の拡張子
    //@changeFlag		変更後デフォルトのコードを表示するか
    function onChangeLangage(lang, changeFlag) {

        //選択言語を変更
        makingFileType = lang;

        //エディタのモードを切り替える
        var mode;
        var lang;
        switch (true) {
            case makingFileType == "c":
                mode = "c_cpp";
                lang = "C言語";
                break;
            case makingFileType == "cpp":
                mode = "c_cpp";
                lang = "C++"
                break;
            case makingFileType == "py":
                mode = "python";
                lang = "Python";
                break;
            case makingFileType == "rb":
                mode = "ruby";
                lang = "Ruby";
                break;
            case makingFileType == "js":
                mode = "javascript";
                lang = "JavaScript"
                break;
            case makingFileType == "html":
                mode = "html";
                lang = "HTML";
                break;
            case makingFileType == "php":
                mode = "php";
                lang = "PHP";
                break;
        }

        //エディタのリセット
        editor.getSession().setMode("ace/mode/" + mode);

        //デフォルトコードを読み込み
        if (changeFlag) {
            WriteDefaultCode();
        }
        //言語による標準入力切り替え
        ToggleStdinForm();

        //アノテーションのリセット
        ClearAnnotationsToEditor();

        WriteMessage(lang + "に変更されました。", "Div_InformationText");
    }

    //【関数】ユーザー情報入力フォームを生成する
    //@callback	ユーザーの入力完了後に呼び出される関数
    function MakeInputDialog(callback) {

        //入力ダイアログのイベント設定
        var $hint = $("#dialogHintArea");
        $("#nameArea").bind("mouseenter", function () {
            $hint.text("ヒント：あなたを識別するためのユーザー名です。ご自由に入力してください。ユーザー名を指定しない場合、ランダムな識別用文字列で登録されます。");
        })
        $("#passArea").bind("mouseenter", function () {
            $hint.text("ヒント：あなたに接続できるユーザーを制限する場合、接続時に必要となるパスワードを入力してください。パスワードを指定しない場合、誰でも接続可能な状態になります。");
        });
        $("#mediaCheckArea").bind("mouseenter", function () {
            $hint.text("ヒント：Webカメラ及びマイクの利用を有効にすると、他のユーザーに接続した際にカメラの映像及びマイクの音声が通信相手に送信されます。");
        });
        $("#autoConnectionCheck").bind("mouseenter", function () {
            $hint.text("ヒント：この項目を有効にすると、URLに含まれているユーザーに対して自動的に接続を行います。");
        });
        $("#serverSelectArea").bind("mouseenter", function () {
            $hint.text("ヒント：他のユーザーに接続するための中継や、プログラムのコンパイル、実行を行うサーバーを指定します。他のユーザーと接続する場合、そのユーザーと同一のサーバーを選択する必要があります。");
        });

        //サーバー名自由記述欄の表示非表示切り替え
        $("#serverSelecter").change(function () {
            if ($(this).val() == "another") {
                $("#anotherServerArea").css("display", "table-row");
            } else {
                $("#anotherServerArea").css("display", "none");
            }
        });

        //URLリライティングがある場合接続先サーバーの初期値を変更する
        var defaultServer = getServerParameterAtURL();
        if (!!defaultServer) {
            if (APIKEY[defaultServer] == undefined) {
                $("#serverSelecter").val("another");
                $("#inputFreeServerName").val(defaultServer);
            } else {
                $("#serverSelecter").val(defaultServer);
            }
            $("#serverSelecter").change();
        }

        //入力ダイアログの表示
        var okFlag = true;  //二重OKを防止
        $('#InputDialog').dialog({
            autoOpen: true,
            width: 420,
            show: "fade",
            hide: "fade",
            resizable: false,

            //OKボタンが押された場合、入力情報をコールバック関数に引き継ぐ
            buttons: {
                "OK": function () {
                    if (okFlag == false) return;
                    SERVER = $("#serverSelecter").val();
                    if (SERVER == "another") {
                        SERVER = $("#inputFreeServerName").val();
                    }
                    userName = $("#userName").val();
                    password = $("#pass").val();
                    var isCamera = $("#useCameraCheck").prop("checked");
                    var isMike = $("#useMikeCheck").prop("checked");
                    setUserName();
                    callback(isCamera, isMike);
                    saveUserInformation();
                    okFlag = false;
                    $(this).dialog("close");
                }
            }
        });

    }

    //【関数】設定ダイアログを生成する
    function MakeConfigDialog() {
        $('#ConfigDialog').dialog({
            autoOpen: true,
            width: 315,
            show: "fade",
            hide: "fade",
            resizable: false,

            //OKボタンが押された場合、入力情報をコールバック関数に引き継ぐ
            //リセットボタンが押された場合初期設定に戻す
            buttons: {
                "OK": function () {
                    saveConfigData();
                    onChangeSendRecvConfig();
                    $(this).dialog("close");
                } ,
                "リセット": function () {
                    $("#checkbox-recv").prop("checked", true);
                    $("#checkbox-send").prop("checked", true);
                    $("#fontsizeSlider").val(16);
                    $("#tabindexSlider").val(4);
                    $("#themeSelecter").val("xcode");
                    $("#charSetSelecter").val("utf-8");
                    onChangeSendRecvConfig();
                    onChangeFontSizeSlider();
                    onChangeTabIndexSlider();
                    onChangeThemeSelecter();
                }
            }
        });
    }

    //【関数】ユーザー情報をWebStorageに格納する
    function saveUserInformation() {

        var userInformation = {
            "userName": $("#userName").val(),
            "pass": $("#pass").val(),
            "useCameraCheck": $("#useCameraCheck").prop("checked"),
            "useMikeCheck": $("#useMikeCheck").prop("checked"),
            "autoConnectionCheck": $("#autoConnectionCheck").prop("checked"),
            "serverSelecter": $("#serverSelecter").val(),
            "inputFreeServerName": $("#inputFreeServerName").val()
        };
        for(var key in userInformation) {
        	webStorage.set(key , userInformation[key]);
        }

    }

    //【関数】設定情報をWebStorageに格納する
    function saveConfigData() {

        var configData = {};
        configData = {
            "checkbox-recv": $("#checkbox-recv").prop("checked"),
            "checkbox-send": $("#checkbox-send").prop("checked"),
            "fontsizeSlider": $("#fontsizeSlider").val(),
            "tabindexSlider": $("#tabindexSlider").val(),
            "themeSelecter": $("#themeSelecter").val(),
            "charSetSelecter": $("#charSetSelecter").val()
        };
        for(var key in configData) {
        	webStorage.set(key , configData[key]);
        }
    }

    //【関数】前回利用時の情報ををWebStorageから読み込み反映する
    function getConfigToWebStorage() {

        //読み込み
        var configs = webStorage.getAll();
        for (key in configs) {

            //前回のコードと言語を読み込む
            if (key == "lang") {
                changeLangage(configs[key], false , false);
            } else if (key == "code") {
                editor.setValue(configs[key]);
            }

            //ユーザー情報、設定情報を読み込む
            if($("#"+key)[0]) {

                //(チェックボックス系)
                if (configs[key] === true || configs[key] === false) {
                    $("#" + key).prop("checked", configs[key]);
                }
                //(テキストボックス系)
                else {
                    $("#"+key).val(configs[key]);
                }
            }
        }
        //設定反映
        if ($("#serverSelecter").val() == "another") {
            $("#anotherServerArea").css("display", "table-row");
        } else {
            $("#anotherServerArea").css("display", "none");
        }
        onChangeFontSizeSlider();
        onChangeTabIndexSlider();
        onChangeThemeSelecter();
        onChangeSendRecvConfig();
        
    }
	

    //【関数】指定したPeerIDに対応するユーザー名を戻す
    //@PeerID   変換したいID
    //return    対応する名前。失敗時Peer
    function PeerToName(PeerID) {

        if (!connections[PeerID]) {
            return PeerID;
        } else if (!!connections[PeerID].userName) {
            return connections[PeerID].userName;
        } else {
            return PeerID;
        }

    }

    //【関数】指定したユーザー名に対応するPeerIDを戻す
    //@name		変換したいユーザー名
    //return	対応するピアID。失敗時false
    function NameToPeer(name) {

        //自分のことである可能性も
        if (name == userName) return peerID;

        //コネクションリストから走査
        for (var client in connections) {
            if (connections[client].userName == name) {
                return client;
            }
        }
        return false;

    }

    //【関数】UIを動的に生成する
    function makeUserInterface() {

        //メインメニューボタン
        //【参考】http://alphasis.info/2013/04/jquery-ui-button-all-icons/
        $("#Button-NewFile").button({ icons: { primary: 'ui-icon-document' } });
        $("#Button-OpenFile").button({ icons: { primary: 'ui-icon-folder-open' } });
        $("#Button-SaveFile").button({ icons: { primary: 'ui-icon-folder-collapsed' } });
        $("#Button-SelectLangage").button({ icons: { primary: 'ui-icon-comment' } });
        $("#Button-Run").button({ icons: { primary: 'ui-icon-play' } });
        $("#Button-Config").button({ icons: { primary: 'ui-icon-gear' } }); 
        $("#subMenu").tabs();
        $(window).resize(onResizeWindow);	//ウィンドウが一定サイズ以下になるとフェードアウト

        //Aceエディタ
        editor = ace.edit("editorArea");
        editor.getSession().setMode("ace/mode/c_cpp");
        editor.setTheme("ace/theme/eclipse");
        document.getElementById('editorArea').style.fontSize = '12px';
        editor.session.setTabSize(4);
        WriteDefaultCode();
        editor.setReadOnly(true);


        WriteMessage("SLTP(仮)へようこそ！", "Div_InformationText");

        //Aceエディタの右クリックメニュー
        //【参考】http://medialize.github.io/jQuery-contextMenu/docs.html#enable-trigger
        $.contextMenu({
            selector: '#fakeContextMenu',
            zIndex: 40,
            callback: function (key, options) {
                doAceContextMenu(key);
            },
            items: {
                "run": { name: "実行/停止", icon: "run" },
                "fold1": {
                    name: "言語",
                    icon: "lang",
                    items: {
                        "c": { name: "C言語" },
                        "cpp": { name: "C++" },
                        "py": { name: "Python" },
                        "rb": { name: "Ruby" },
                        "php": { name: "PHP" },
                        "js": { name: "JavaScript" },
                        "html": { name: "HTML" },
                    }
                },
                "new": { name: "新規", icon: "new" },
                "open": { name: "開く", icon: "open" },
                "save": {
                    name: "保存",
                    icon: "save",
                    items: {
                        "web": { name: "Webブラウザに保存" },
                        "local": {name : "ローカルにダウンロード"}
                     }
                },
                "config":{ name : "設定" , icon: "config" },
                "sep1": "---------",
                "quit": { name: "閉じる", icon: "quit" }
            },
        });



        //標準入力フォームとメモフォームのプレースホルダ
        $("#stdinArea").prop("placeholder", "C,C++,Ruby,Pythonで標準入力を行う場合、ここに一行ずつ入力してください。内容は他のユーザーと共有されます。なお、コマンドライン引数には対応しておりません。");
        $("#memoArea").prop("placeholder", "メモ用フォームです。内容は他のユーザーと共有されます。");

        //PHPによるデータ送信フォームの作成
        (function () {

            //【関数】入力フォームを一つ生成する
            function addInputer(num) {
                var fieldHtml = $("#FirstPHPField").html();
                var $e = $("<div>").html(fieldHtml);
                $e.find(".PHPInputer-mode").prop("id", "PHPInputer-mode" + num);
                $e.find(".PHPInputer-name").prop("id", "PHPInputer-name" + num);
                $e.find(".PHPInputer-value").prop("id", "PHPInputer-value" + num);
                $e.find(".PHPInputer-remove").prop("id", "PHPInputer-remove" + num);
                $("#PHPInputer_container").append($e);
            }

            for (var i = 1; i <= 10; i++) {
                addInputer(i);
            }

            //内容変更イベント
            $(".PHPInputer").change(onChangeStdinPHPArea);
            $(".PHPInputer-remove").click(onClickPHPRemoveButton);

            //１０個目の下にマージンを入れる
            $("#PHPInputer_container").children(":last").css("margin-bottom", "20px");

        })();

        //ドラッグによるリサイズ
        (function () {

            var $content = $("#content");
            var $main = $("#nicoscreen");
            var $footer = $("#footer");
            var $editor = $("#editorArea");
            var $comm = $("#rightColumn");
            var $runArea = $("#runArea");
            var $chatArea = $("#chatArea");
            var $submenu = $("#subMenu");
            var $videoArea = $("#videoArea");

            //左カラム：右カラムを横にリサイズ可能に
            $editor.resizable({
                handles: "e",
                resize: function () {
                    var lp = changeSize($editor, $comm, "width", 10, 85, $(window).width());
                    $runArea.css("width", lp + "%");
                    $chatArea.css("width", (100 - lp) + "%");
                }

            });
            $runArea.resizable({
                handles: "e",
                resize: function () {
                    var lp = changeSize($runArea, $chatArea, "width", 10, 85, $(window).width());
                    $editor.css("width", lp + "%");
                    $comm.css("width", (100 - lp) + "%");
                }
            });

            //メイン領域：フッターを縦にリサイズ可能に
            $main.resizable({
                handles: "s",
                resize: function () {
                    changeSize($main, $footer, "height", 20, 90, $content.height());
                }
            });

            //サブメニュー：ビデオアエリアを縦にリサイズ可能に
            $submenu.resizable({
                handles: "s",
                resize: function () {
                    changeSize($submenu, $videoArea, "height", 20, 80, $comm.height());
                }
            })


            //【関数】DivAのサイズを基準に、DivBのサイズを変更する
            //@$divA		基準となる領域のjQueryオブジェクト
            //@$divB		変更する領域のjQueryオブジェクト
            //@css			変更する属性("width" or "height")
            //@min			DivAの最小幅(%)
            //@max			DivAの最大幅(%)
            //@winSize	    ウィンドウのWidthもしくはHeight
            //@return		変更後のDivAの幅（%)
            function changeSize($divA, $divB, css, min, max, winSize) {

                var sizeA = (css == "width") ? $divA.width() : $divA.height();
                var parcentA = sizeA / winSize * 100;
                if (parcentA > max) parcentA = max;
                else if (parcentA < min) parcentA = min;
                var parcentB = 100.0 - parcentA;

                $divA.css(css, parcentA + "%");
                $divB.css(css, parcentB + "%");

                editor.resize(false);
                uploderSign.move();     //更新通知アイコンの座標修正
                return parcentA;
            }

        })();
    }

    //【関数】UIのイベントを登録する
    function SetUserInterfaceEvent() {

        //Aceエディタのイベントを登録
        editor.on("change", onTextChangeEditor);
        $("#editorArea")
		.bind("mousemove", onMoveMouseCursor)
		.bind("mouseup", onMouseupEditor)
		.bind("drop", onDropTextAreaEditor)
		.bind("dragenter dragover", false);
        editor.setReadOnly(false);
        editor.gotoLine(1, 1);

        //UIのイベントを登録
        jQuery.event.props.push("dataTransfer");	//jQueryデータドロップ操作できるようにする
        $("#Button-NewFile").click(onClickNewFileButton);
        $("#Button-Run").click(onClickRunButton);
        $("#Button-Config").click(onClickConfigButton);
        $("#stdinArea").bind("change keyup", onChangeStdinArea);
        $("#memoArea").bind("change keyup", onChangeMemoArea);
        $("#fontsizeSlider").change(onChangeFontSizeSlider);
        $("#tabindexSlider").change(onChangeTabIndexSlider);
        $("#runAreaTitle").click(onClickRunAreaMain);
        $("#Text-Message").keypress(onKeyPressTextMessage);
        $("#Button-Send").click(onClickSendButton);
        $("#themeSelecter").on("change", onChangeThemeSelecter);
        $("#fakeFileOpen").on("change", function (e) {
            onChangeFileSelecter(e);
        });
        $("#Button-OpenFile").click(function () {
            $("#fakeFileOpen").click()
        });
        $("#fakeSendFile").on("change", function (e) {
            onChangeSendFileButton(e);
        });
        $("#Button-FileSend").click(function () {
            $("#fakeSendFile").click();
        });
        $("#chatArea")
			.bind("drop", onDropDivMessage)
			.bind("dragenter dragover", false);


        //言語選択のプルダウンメニュー
        $("#Button-SelectLangage").click(function () {
            $("#dropmenu_lang").slideToggle(250);
        });
        $("#dropmenu_lang").hover(function () { }, function () {
            $(this).slideUp(250);
        });
        $("#dropmenu_lang > p > input[type='radio']").change(function () {
            $("#dropmenu_lang").slideUp(250);
            onChangeLangage($(this).val(), true);
            SendToSelectedLangage();
        });
        $("#dropmenu_lang > p").hover(function () {
            $(this).css("background", "rgb(244,227,180)");
        }, function () {
            $(this).css("background", "none");
        })

        //保存のプルダウンメニュー
        $("#Button-SaveFile").click(function () {
            $("#dropmenu_save").slideToggle(250);
        });
        $("#dropmenu_save").hover(function () { }, function () {
            $(this).slideUp(250);
        });
        $("#dropmenu_save > p").click(function () {
            $("#dropmenu_save").slideUp(250);
        });
        $("#dropmenu_save > p").hover(function () {
            $(this).css("background", "rgb(244,227,180)");
        }, function () {
            $(this).css("background", "none");
        })
        $("#dropmenu_save").css("left", $("#Button-SaveFile").position().left + "px");
        $("#saveToWeb").click(function () { saveToWeb(true); });
        $("#saveToLocal").click(downLoadFile);

        //ショートカットキー
        shortcut.add("Ctrl+R", onClickRunButton);
        shortcut.add("Ctrl+Alt+R", onClickRunButton);
        shortcut.add("Ctrl+Alt+S", downLoadFile)
        shortcut.add("Ctrl+Alt+O", function () { $("#fakeFileOpen").click() });
        shortcut.add("Ctrl+Alt+N", onClickNewFileButton);

        //ページ移動の防止
        $(window).on('beforeunload', function () {
            return "このページを離れると、全ての通信が切断されます。よろしいですか？";
        });

		
    }

    //【関数】Ace上での右クリックメニューを実行する
    //@key	選択されたメニューのキー値
    function doAceContextMenu(key) {

        //選択されたメニューに応じて、メニューを実行する
        switch (true) {
            case key == "run":
                onClickRunButton();
                return;
            case key == "new":
                onClickNewFileButton();
                return;
            case key == "open":
                $("#fakeFileOpen").click();
                return;
            case key == "web":
                saveToWeb(true);
                return;
            case key == "local":
                downLoadFile();
                return;
            case key == "config":
                onClickConfigButton();
                return;
            case key == "cut":
                return;
            case key == "copy":
                return;
            case key == "paste":
                return;
            case key == "delete":
                return;
            case key == "quit":
                return;
        }

        //上記のものに当てはまらない場合は消去法で言語選択なので、言語を切り替える
        changeLangage(key , true , true);
    }

    //【関数】メニューボタンの「実行」「停止」を切り替える
    //@isRunButton	「実行」に切り替える場合はTrue
    function ToggleRunButton(isRunButton) {

        if (isRunButton) {
            $("#Button-Run").button({
                icons: { primary: 'ui-icon-document' },
                label: "実行"
            });
        } else {
            $("#Button-Run").button({
                icons: { primary: 'ui-icon-stop' },
                label: "停止"
            });
        }

    }

    //【関数】「ピアリスト」と「接続中メッセージ」を切り替える
    //ただしピアリストを表示にする場合、１秒後に非同期で行う
    //@isPeerList	ピアリストを表示する場合はTrue
    function TogglePeerList(isPeerList) {

        if (isPeerList) {
            setTimeout(function () {
                SendToServerNode(PEERS, "");
                $("#peerlist").css("display", "block");
                $("#connectionMessage").css("display", "none");
            }, 1000);
        } else {
            $("#peerlist").css("display", "none");
            $("#connectionMessage").css("display", "block");
        }

    }

    //【関数】「標準入力欄」と「PHPデータ送信フォーム」を切り替える
    function ToggleStdinForm() {

        if (makingFileType == "php") {
            $("#PHPInputer_container").css("display", "block");
            $("#stdinArea").css("display", "none");
            $("#subMenu_stdInput").text("送信データ");
        } else {
            $("#PHPInputer_container").css("display", "none");
            $("#stdinArea").css("display", "block");
            $("#subMenu_stdInput").text("標準入力");
        }

    }

    //【関数】PHP用標準入力フォームを一行分削除する
    //@$e   削除対象行の削除ボタンエレメント
    function removePHPInputer($e) {

        $(".PHPInputer").unbind("change", onChangeStdinPHPArea);
        $e.find(".PHPInputer-mode").val("メソッドを選択してください");
        $e.find(".PHPInputer-name").val("");
        $e.find(".PHPInputer-value").val("");
        $(".PHPInputer").bind("change", onChangeStdinPHPArea);

    }

    //【関数】自身のWebカメラの内容を描画する
    //【参考】http://kray.jp/blog/peer-js/
    //@isCamera	カメラを使用する場合True
    //@isMike	マイクを使用する場合True
    //@callback	Webカメラの描画成功後に実行する関数
    function setMediaStream(isCamera, isMike, callback) {

        $("#serverConnectionMessage").text("システムの準備中です...");

        //カメラもマイクも使わない場合はWebカメラを取得する必要がないので省略
        if (isCamera == false && isMike == false) {
            finallyMethod(null);
        }

            //ユーザーがダイアログで入力した情報を元にカメラ及びマイクを取得する
        else {
            navigator.getUserMedia =
				navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            navigator.getUserMedia(
				{ audio: isMike, video: isCamera },

				//カメラの取得に成功
				function (stream) {
				    finallyMethod(stream);
				},

				//カメラの取得に失敗
				function () {
				    alert("カメラもしくはマイクの取得に失敗しました。");
				    finallyMethod(null);
				}

			);

        }

        //カメラ取得後に成功失敗に関係なく呼び出す
        //@stream 取得したビデオストリームもしくはNull
        function finallyMethod(stream) {
            myStream = stream;
            callback();
        }

    }

    //【関数】PHP用標準入力フォームからサーバーに送信するテキストを取得する
    function getPHPInputerText() {

        //【関数】GETメソッドの指定データを取得する
        function setGetMethod($e) {
            var name = $e.find(".PHPInputer-name").val();
            var value = $e.find(".PHPInputer-value").val();
            return "GET : " + name + "=" + value + "\n";
        }

        //【関数】POSTメソッドの指定データを取得する
        function setPostMethod($e) {
            var name = $e.find(".PHPInputer-name").val();
            var value = $e.find(".PHPInputer-value").val();
            return "POST : " + name + "=" + value + "\n";
        }

        var inputers = $("#PHPInputer_container").children();
        var sendText = "";
        for (var i = 0; i < inputers.length; i++) {

            if ($(inputers[i]).find(".PHPInputer-mode").val() == "GET") {
                sendText += setGetMethod($(inputers[i]));
            } else if ($(inputers[i]).find(".PHPInputer-mode").val() == "POST") {
                sendText += setPostMethod($(inputers[i]));
            }

        }

        return sendText;
    }

    //【関数】プログラム実行時に送信する標準入力データを取得する
    function getStdIn() {
        if (makingFileType == "php") return getPHPInputerText();
        else return $("#stdinArea").val();
    }

    //【関数】プログラムをコンパイル（インタプリタ)し、実行結果を描画する
    function RunTheProgram() {

        //※既に実行中の場合停止要求を送信する
        if ($("#runAreaMain").text() == "実行中...") {
            SendToServerNode(STOP, "");
            return;
        }

        //サーバーに送信するオブジェクトの準備(言語、コード、標準入力)
        var post_data = {
            lang: makingFileType,
            code: editor.getValue(),
            input: getStdIn()
        };

        //サーバーノードへコードを送信する
        if (!!SERVER_CONNECTION) {
            $("#runAreaMain").text("実行中...");
            SendToServerNode(RUN, post_data);
            ToggleRunButton(false);
        } else {
            Toast("サーバーノードに接続しておりません", false);
        }

    }

    //【関数】HTMLコードを描画する
    //@code		HTMLコード
    function RunTheHTML(code) {

        OpenNewPage(code);

    }

    //【関数】JavaScriptのコードを実行し、実行結果を戻す
    //@return 実行結果HTML
    function RunTheJavaScript(code) {

        //スクリプトタグを追加したHTMLコードとして実行する
        code = "<script type='text/javascript'>" + code + "</script>";
        RunTheHTML(code);

    }

    //【関数】テキストをチャットログに描画する
    //@text			表示する文字列
    //@className	要素に与えるクラス名
    function WriteMessage(text, className) {

        //情報表示なら時刻も乗せる
        if (className == "Div_InformationText") {
            text = "【" + getTimeString() + "】" + text;
        }

        //チャットログに表示する
        var $divMessage = $("#chatLog");
        var $textElement = $("<div>")
								.addClass("Div_TextChatClass")
								.addClass(className)
								.text(text);
        $($divMessage).append($textElement);
        var scrollHeight = $divMessage.get(0).scrollHeight;
        $divMessage.get(0).scrollTop = scrollHeight;

    }

    //【関数】実行結果を実行結果領域に描画する
    //@data   実行結果HTML
    function WriteRunResult(data) {

        //実行停止要求と行き違いだった場合描画しない
        var runAreaMain = $("#runAreaMain");
        if ($(runAreaMain).text() == "停止しました") return;

        //結果を描画する。PHPはリンクを描画、その他は結果を描画
        if (makingFileType == "php" && data.result !== false) {
            $div = $("<div>").addClass("phpLink").text("PHPプログラムを実行").click(function () {
                OpenNewPage(data.text);
            });
            $(runAreaMain).html("").append($div);
        } else {
            $(runAreaMain).html(data.text);
        }
        ToggleRunButton(true);

        //結果を共有
        if (sendConfig) {
            var obj = {
                type: RUNRESULT,
                data: data
            };
            SendDataToAllPeer(obj);
        }

    }

    //【関数】受け取った接続要求レスポンスに応じてピアに接続する
    //@result	接続許可ならTrue ,　接続拒否ならFalse
    //@data		接続許可ならPeerID , 接続拒否ならエラーメッセージ
    function checkConnectionResponse(result, data) {

        //許可が降りたら接続する
        if (result) {
            TryConnection(data);
        }

            //おりなかったらエラーメッセージを出力
        else {
            alert(data);
            SendToServerNode(PEERS, "");
            TogglePeerList(true);
        }

    }

    //【関数】ユーザー名の入力をやり直しさせる
    //@message	警告するメッセージ
    function RetrySetUserName(message) {

        userName = prompt(message);
        setUserName();
        var data_obj = {
            userName: userName,
            password: password
        };
        SendToServerNode(USERNAME, data_obj);

    }

    //【関数】実行結果を元に、エラー通知や補助を行う
    //@result   サーバーから受け取った実行結果オブジェクト
    function AssistRunResult(result) {

        //実行成功ならエラーアノテーションを全て破棄
        if (result === true) {
            ClearAnnotationsToEditor();
        }

        //実行失敗時にアシストする
        else if (result !== false) {
            SetAnnotationToEditor(result);  
            var lines = "";
            var mes = "実行に失敗しました。プログラムをよく確認しましょう";
            Toast(mes, true, undefined, 6000);
        }

    }

    //【関数】エディタの特定行にアノテーションを付与する
    //@errorInfo  row(行番号),text(メッセージ)からなる配列
    function SetAnnotationToEditor(errorInfo) {

        var annotations = [];
        //var comments = [];
        for (var i = 0; i < errorInfo.length; i++) {
            annotations.push({
                row: errorInfo[i].line - 1,
                type: "error",
                text : errorInfo[i].mes
            });
            //comments.push(errorInfo[i].mes);
        }
        editor.getSession().setAnnotations(annotations);
       // FlowComments(comments);

    }

    //【関数】エディタのアノテーションを全て削除する
    function ClearAnnotationsToEditor() {
        SetAnnotationToEditor([]);
    }

    //【関数】接続可能なピアリストを描画する
    //@peerList	接続可能なピアのオブジェクト群
    function WritePeerList(peerList) {

        var $ul = $("#peerlist").html("");
        var $tbl = $("<table border = '1'>").appendTo($ul);
        var autoConnectionClient = getClientParameterAtURL();

        for (var i = 0; i < peerList.length; i++) {

            //各種情報の取り出し
            var number = peerList[i].number;
            var name = peerList[i].name;
            var _class = peerList[i]._class;

            //自分自身は除外
            if (name == userName) continue;
            
            //パスワードがかかっている場合とかかっていない場合でアイコン画像をかえる
            var iconPath = (_class == "pass" || _class == "full") ? "./image/lock.png" : "./image/unlock.png";

            //既に接続済み
            var $li = $("<span/>").prop("id" , number).text(name).addClass(_class);
            if (!!NameToPeer(name)) {   //接続済み
                var information = "接続済み"
                $li.addClass("ConnectPeers")
                   .click(function () {
                       CloseConnection(NameToPeer($(this).text()), true);
                   });
            }
                //満員により接続不可
            else if (_class == "full") {
                var information = "満員"
                $li.addClass("ConnectPeers");
            }
                //接続可能
            else {
                var information = "接続可能";
                $li.addClass("nonConnectPeers")
                    .click(onClickPeers);
            }
            //アイコンを表示するためのHTML
            var imgTag = "<img src = '" + iconPath + "' width = '20' height = '20'>";

            //生成した要素をテーブルタグに入れる
            var $tr = $("<tr>");
            var $td1 = $("<td>").append($li);
            var $td2 = $("<td>").html(imgTag);
            var $td3 = $("<td>").html(information);
            $tr.append($td1).append($td2).append($td3);

            //テーブルに追加
            $tbl.append($tr);

            //自動接続の対象であるなら自動接続する
            if (!!$("#autoConnectionCheck").prop("checked") && autoConnectionClient == name && information == "接続可能") {
                $li.click();
            }

        }

        //自動接続URLの生成
        displayConnectionURL();
    }

    //【関数】指定したmediaStreamを再生する要素をDiv-media内に生成する
    //@mediaStream	再生するストリーム
    //@id		ビデオに写っているユーザーのID
    //@isMine	自分自身のビデオである場合true
    function WriteMediaStream(mediaStream, id, isMine) {

        var element = null;
        var userName_ = (isMine) ? userName + "(あなた)" : connections[id].userName;

        //既にビデオが表示されている場合終了
        if (isMine == false && connections[id].stream != null) return;

        //メディアデバイスが存在しない場合、「カメラもマイクもないメディアデバイス」として扱う
        if (mediaStream == null) {
            mediaStream = { isCamera: false, isMike: false };
        }
            //メディアデバイスが存在するなら、それがカメラ/マイクそれぞれ持っているかを解析する
        else {
            mediaStream.isCamera = (mediaStream.getVideoTracks().length >= 1);
            mediaStream.isMike = (mediaStream.getAudioTracks().length >= 1);
        }

        //autoplay属性のない要素は空き要素と捉え、開いているスペースを探す
        for (var i = 1; i <= 6; i++) {
            var autoplay = $("#video" + i).attr("autoplay");
            if (typeof autoplay == 'undefined' || autoplay == false) {
                element = $("#video" + i);
                break;
            }
        }
        if (element == null) {
            alert("これ以上追加することができません");
            return;
        }

        //メディアがあれば描画
        if (mediaStream.isCamera || mediaStream.isMike) {
            $(element).prop("src", URL.createObjectURL(mediaStream));
        }
        //カメラがない場合代替画像を表示
        if (mediaStream == null || mediaStream.isCamera == false) {
            var dummyImagePath = "./image/video_dummy" + (getUnicodeSum(id) % 9 + 1) + ".jpg";
            $(element).prop("poster", dummyImagePath);
        }

        //ビデオ属性を付与
        $(element)
			.prop("autoplay", true)
			.prop("muted", isMine)
			.prop("title", userName_)
			.tooltip({
			    position: {
			        my: "center bottom",
			        at: "center top"
			    }
			});

        ////自分以外のみの設定
        if (isMine == false) {

            //コネクションリストに追加
            connections[id].num = i;
            connections[id].stream = mediaStream;

            //右クリックメニュー設定
            $.contextMenu({
                selector: "#" + $(element).prop("id"),
                zIndex: 40,
                callback: function (key, options) {
                    if (key == "close") {
                        CloseConnection(id, false);
                    }
                },
                items: {
                    "close": { name: "切断する" },
                    "quit": { name: "キャンセル" }
                },
            });

        }

        //更新通知アイコンの設定
        uploderSign.move();
    }

    //【関数】読み込んだローカルファイルの内容をエディタに描画し、共有する
    //【参考】http://programming-10000.hatenadiary.jp/entry/20130627/1372355192
    function WriteReadFile(file) {

        var reader = new FileReader();
        var extension = isCodeExtension(file.name);

        if (extension == false) {
            alert("選択されたファイルは対応しておりません");
            return;
        }

        reader.addEventListener("load", function (event) {

            //描画するとイベントが連続で発生するので防止するために一度アンバインド
            editor.removeListener("change", onTextChangeEditor);

            //読み込んだファイルの文字コードをUTF-8に変換する
            var str = event.target.result;

            //エディタに描画
            editor.setValue(str , 0 , 0);
            editor.clearSelection();

            //拡張子に合わせて言語を変更する
            onChangeLangage(extension, false);
            $("#" + makingFileType).prop("checked", true);
            SendToSelectedLangage()

            //イベントを再定義して共有
            editor.on("change", onTextChangeEditor);
            onTextChangeEditor();

        });
        reader.readAsText(file, getSelectedCharSet());

    }

    //【関数】接続用URLを表示させる
    function displayConnectionURL() {

        var connectionURL = getParameterizedURL(true);
        var $link = $("<a>").prop("href", connectionURL).prop("target" , "_blank").text(connectionURL);
        $("#connectionURLArea").html($link)

    }

    //【関数】言語を切り替える
    //@lang_	    変更後の言語(拡張子)
    //@sendFlag     言語の変更を相手に送信する場合はTrue
    //@defaultFlag  変更後にデフォルトのコードを描画する場合はTrue
    function changeLangage(lang_ , sendFlag , defaultFlag) {
        if (lang_ != makingFileType) {
            $("#" + lang_).prop("checked", true);
            onChangeLangage(lang_, defaultFlag);
            if(sendFlag) SendToSelectedLangage();
        }
    }

    //【関数】現在選択中の文字コード取得する
    //@return 文字コード文字列
    function getSelectedCharSet() {

        return $("#charSetSelecter").val();

    }

    //【関数】選択されている言語に合わせたデフォルトのコードをエディタに描画する
    //@return	デフォルトコード
    function WriteDefaultCode() {

        //そのままだとコードの更新イベントが多発するため、デフォルトコード描画前に
        //イベントをアンバインドし、描画終了後に戻す
        editor.removeListener("change", onTextChangeEditor);
        editor.setValue(getDefaultCode());
        editor.clearSelection();
        editor.on("change", onTextChangeEditor);
        onTextChangeEditor();

    }

    //【関数】選択中の言語のデフォルトコード文字列を戻す
    //@return	デフォルトコード文字列
    function getDefaultCode() {

        var code = "";

        if (makingFileType == "c") {
            code += "/*C : Borland C++ 5.5.1 for Win32*/\n";
            code += "#include<stdio.h>\n\n";
            code += "void sayHello(){\n";
            code += '\tprintf("Hello C!!\\n");\n';
            code += "}\n";
            code += "\n";
            code += "int main(){\n";
            code += "\tsayHello();\n";
            code += "\treturn 0;\n";
            code += "}\n";
        }

        else if (makingFileType == "cpp") {
            code += "/*C++ : Borland C++ 5.5.1 for Win32*/\n";
            code += "#include<iostream>\n";
            code += "using namespace std;\n";
            code += "\n";
            code += "void sayHello(){\n";
            code += '\tcout << "Hello C++!!";\n';
            code += "}\n";
            code += "\n";
            code += "int main(){\n";
            code += "\tsayHello();\n";
            code += "\treturn 0;\n";
            code += "}\n";
        }

        else if (makingFileType == "py") {
            code += "#Python : Python 3.4.1\n";
            code += "# coding: Shift_JIS\n";
            code += "import sys\n";
            code += "\n";
            code += "def sayHello() :\n";
            code += "\tprint('Hello Python!!\\n')\n";
            code += "\n";
            code += "sayHello()\n";
        }

        else if (makingFileType == "rb") {
            code += "#Ruby : ruby 2.1\n";
            code += "def sayHello\n";
            code += '\t puts "Hello Ruby!!"\n';
            code += "end\n";
            code += "\n";
            code += "sayHello\n";
        }

        else if (makingFileType == "php") {
            code += "<!--PHP-->\n";
            code += "<!DOCTYPE html>\n";
            code += '<html lang="ja"\n';
            code += "\t<head>\n";
            code += '\t\t<meta charset="utf-8">\n';
            code += "\t\t<title>sayHello</title>\n";
            code += "\t</head>\n";
            code += "\t<body>\n";
            code += "\t\t<?php\n";
            code += "\t\t\tfunction sayHello(){\n";
            code += "\t\t\t\techo 'Hello PHP!!';\n";
            code += "\t\t\t}\n";
            code += "\t\t\tsayHello();\n";
            code += "\t\t?>\n";
            code += "\t</body>\n";
            code += "</html>\n";
        }

        else if (makingFileType == "js") {
            code += "/*JavaScript*/\n";
            code += "function sayHello(){\n";
            code += "\talert('Hello JavaScript!!');\n";
            code += "}\n";
            code += "\n";
            code += "sayHello();\n";
        }

        else if (makingFileType == "html") {
            code += "<!--HTML-->\n";
            code += "<!DOCTYPE html>\n";
            code += '<html lang="ja">\n';
            code += "\t<head>\n";
            code += '\t\t<meta charset="utf-8">\n';
            code += "\t\t<title>sayHello</title>\n";
            code += "\t</head>\n";
            code += "\t<body>\n";
            code += "\t\t<h1>\n";
            code += "\t\t\tHello HTML!!\n";
            code += "\t\t</h1>\n";
            code += "\t</body>\n";
            code += "</html>\n";
        }

        return code;
    }

    //【関数】指定したHTMLを含んだページを新しく開く
    //@html	新しいページに含むHTML
    function OpenNewPage(html) {

        var obj = window.open();
        obj.document.open();
        obj.document.write(html);
        obj.document.close();

    }

    //【関数】ニコニコ動画風のコメントを流す
    //@comments 流すコメントの配列
    function FlowComments(comments) {

        //コメントに草を生やす
        for (var i = 0; i < comments.length; i++) {
            comments[i] = comments[i].replace(",", "wwwwww");
            comments[i] = comments[i].replace(".", "wwwwwwwwwwww");
            comments[i] = comments[i].replace("、", "ｗｗｗｗｗｗｗ");
            comments[i] = comments[i].replace("。", "ｗｗｗｗｗｗｗｗｗｗｗｗ");
        }

        //コメントオブジェクトの生成
        var obj = {
            "base": {
                color: "black", //文字の色を指定します
                speed: "normal", //文字が流れるスピードを指定します。slow/fast/normal 
                interval: "normal",//文字が流れる間隔を指定します。slow/fast/normal
                font_size: "29px", //フォントのサイズを指定します。
                loop: false //文字が最後まで流れた後に、繰り返すかどうか　true/false
            },
            "comments": comments
        };

        //コメントを流す
        nicoscreen.set(obj);
        nicoscreen.start();
    }

    //【関数】ファイル名を元に、対応した拡張子であるかを戻す
    //@fileName	拡張子を含んだファイル名文字列
    //@retun	該当する場合その拡張子、しない場合false
    function isCodeExtension(fileName) {

        var extension = fileName.substring(fileName.lastIndexOf(".") + 1);

        switch (true) {
            case extension == "c":
            case extension == "cpp":
            case extension == "py":
            case extension == "rb":
            case extension == "js":
            case extension == "php":
            case extension == "html":
            case extension == "htm":
                return extension;
                break;

            default: return false;
        }
    }

    //【関数】ブラウザの対応状況を確認し、対応していな場合警告メッセージを出す
    //@return 対応時True
    function checkBrowser() {

        if (util.browser === "Unsupported") {
            alert(
				"当サービスはGoogleChrome 23以上(推奨) , Firefox 22以上 , " +
				"Opera 12以上 のいずれかのブラウザーでしかご利用できません。" +
                "お使いの端末、ブラウザでは正常に動作しない可能性があります。");
            return false;
        }

        return true;
    }

    //【関数】再読み込みを推奨させる
    function resetClient() {
        if (confirm("サーバーとの接続に失敗しました。再読み込みを行い、再接続することを推奨します。")) {
            location.reload();
        } else {
            heartBeatControler.stop();
        }
    }

    //【関数】与えられた文字列が一定の文字数を超えていた場合、(省略されました)を付与する
    //@str      省略する文字列
    //@num      省略しない文字数
    //@return   生成した文字列
    function omissionToString(str, num) {

        if (str.length <= num) return str;
        return str.substring(0, num) + "(省略されました)";

    }

    //【関数】現在時刻を"hh:mm:ss"形式で戻す
    //【参考】http://stabucky.com/wp/archives/4655
    function getTimeString() {

        //【関数】5→05のように二桁でゼロ詰めする
        var grantZero = function (num) {
            return (("0" + num).slice(-2));
        }

        //現在時刻の取得
        var nowTime = new Date();
        var hour = nowTime.getHours();
        var minute = nowTime.getMinutes();
        var second = nowTime.getSeconds();

        //二桁のゼロ詰めをし、：で結合して戻す
        var returnString =
			grantZero(hour) + ":" + grantZero(minute) + ":" + grantZero(second);

        return returnString;
    }
    
    //【関数】文字列の各文字をUnicodeに変換し、その総和を戻す
    //@str		変換前文字列
    //@return	変換後数値の和
    function getUnicodeSum(str) {

        var sum = 0;
        for (var i = 0; i < str.length; i++) {
            sum += str.charCodeAt(i);
        }
        return sum;
    }

    //【関数】入力されたユーザー名が不正の場合ランダム文字列にする
    function setUserName() {

        if (userName == null || userName == "") {
            var rnd = Math.floor(Math.random() * 10000000000);
            userName = ("0000000000" + rnd).slice(-10);
        }

        $("#video1").prop("title", userName + "(あなた)");

    }

    //【関数】パラメータが含まれたURLから本来のURLのみ戻す
    //@return パラメータを覗いたURL
    function getURL() {

        return location.href.split("?")[0];

    }

    //【関数】URLに含まれるサーバパラメータを戻す
    //@url    パラメータを含むURL
    function getServerParameterAtURL() {

        var parameter = location.href.split("?");
        if (parameter.length == 1) return false;
        var serverName = parameter[1].split("&")[0];
        return serverName;

    }

    //【関数】URLに含まれるクライアント名を一つ戻して削除する
    //@return クライアント名。無ければfalse
    var getClientParameterAtURL = (function () {

        var url = location.href;        //URLを取得
        var clients = url.split("&");   //URL文字列を「＆」で分割

        clients.shift();                //先頭要素はサーバー名なので破棄
        return function () {            //呼び出すたびにクライアントユーザ名を一つ取得
            return clients.shift();
        }
    })();

    //【関数】URLにパラメータを付与して戻す
    //@connFlag 自身の他に接続中の他のユーザの名前も付与する
    function getParameterizedURL(connFlag) {

        var baseURL = getURL();
        var parameterizedURL = baseURL + "?" + SERVER;
        parameterizedURL += "&" + userName;
        if (connFlag) {
            for (var id in connections) {
                parameterizedURL += "&" + connections[id].userName;
            }
        }
        return parameterizedURL;

    }

    //【関数】HTMLタグ付き文字列をエンコードする
    //@value    タグ付き文字列
    //@return   タグをエンコードした文字列
    //【参考】http://webapp-works.com/archives/75
    function htmlEncode(value) {
        var enc = $('<div/>').text(value).html();
        return enc.replace(/\n/gm, "<br/>").replace(/ /gm, "&ensp;");

    }

    //【関数】min <= X < max の範囲での整数Xをランダムに戻す
    //@min      最低値
    //@max      最大値
    //@return   乱数
    function getRandom(min, max) {
        var randnum = min + Math.floor(Math.random() * max);
        return randnum;
    }

    //【関数】与えられた文字列をblob型に変換し、ダウンロードさせる
    //@content	ダウンロードするデータ
    //@fileName	ファイル名
    //テキストファイルにしかできない？
    //【参考】http://s104bntmp.blogspot.jp/2013/10/javascript_8953.html
    function DownloadStringData(content, fileName) {

        var blob = new Blob([content]);
        saveBlob(blob, fileName);

    }

    //【関数】base64データをBlob型に変換する
    //@base64	:	変換元
    //@return		:	変換後
    //【参考】　http://jsdo.it/Yukisuke/y9Jv
    function Base64toBlob(base64) {
        var i;
        var tmp = base64.split(',');
        var data = atob(tmp[1]);
        var mime = tmp[0].split(':')[1].split(';')[0];

        //var buff = new ArrayBuffer(data.length);
        //var arr = new Uint8Array(buff);
        var arr = new Uint8Array(data.length);
        for (i = 0; i < data.length; i++) { arr[i] = data.charCodeAt(i); }
        var blob = new Blob([arr], { type: mime });
        return blob;
    }

    //【関数】Blobファイルをローカルにダウンロードする(IE不可)
    //@bolb			:	保存するデータ
    //@fileName	:	保存する際のファイル名
    //【参考】　http://jsdo.it/Yukisuke/c1VD
    function saveBlob(blob, fileName) {
        //var url = (window.URL || window.webkitURL);
        var data = URL.createObjectURL(blob);
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
        a.href = data;
        a.download = fileName;
        a.dispatchEvent(e);
    }

   	/***
   	 【オブジェクト】
   	 　localStorageへのデータの格納、取得を行う
   	***/
    var webStorage =(function() {

    	var ls = localStorage;

	   	//【メソッド】localStorageのオブジェクトデータを取得する
	    //@name 	取得するオブジェクトのkey
	    //@return   オブジェクト
	    function _getWebStorage(name) {
	    	var obj = JSON.parse(ls.getItem(name));
	    	return obj;
	    }

	    //【メソッド】localStorageに保存されている全てのオブジェクトを取得する
	    //@return 全てのオブジェクトを含んだオブジェクト
	    function _getAllWebStorage() {
	    	var obj = {};
	    	var itemLength = ls.length;
	    	for(var i = 0; i < itemLength; i++) {
	    		var key = ls.key(i);
	    		obj[key] = _getWebStorage(key);
	    	}
	    	return obj;
	    }

	    //【メソッド】localStorageにオブジェクトデータを格納する
	    //@name 格納するデータのkey
	    //@obj  格納するオブジェクト
	    function _setWebStorage(name , obj) { 
	        var jsonObj = JSON.stringify(obj);
	        ls.setItem(name , jsonObj);
	    }

	    //【インタフェース】
	    return {
	    	set : _setWebStorage ,
	    	get : _getWebStorage ,
	    	getAll : _getAllWebStorage
	    };

    })();

    /***
     【オブジェクト】
      　ハートビートパケットを制御する
        一定時間受信できなかった場合リセット処理を行う
    ***/
    var heartBeatControler = (function () {

        var timer;          //監視用タイマー
        var heart = true;   //接続状態

        //ハートビートの状態を確認し、止まっていたらリセット処理を行う
        function _check() {
            if (heart === false) {
                console.log("Server Time Out");
                resetClient();
            } else {
                heart = false;
            }
        }

        //ハートビートの状態を更新する
        function _update() {
            heart = true;
        }

        //監視制御を停止する
        function _stop() {
            clearInterval(heart);
        }

        //監視制御を開始する
        //@interval 監視間隔
        function _start(interval) {
            _stop();
            setInterval(_check, interval);
        }

        return {
            start: _start,
            stop: _stop,
            update: _update,
        };
    })();
    
    /***
    【オブジェクト】
    　更新通知アイコンを表示、制御する
    　ユーザーは戻り値の関数を用いてアイコンの表示を行う
    ***/
	var uploderSign = (function () {

	    //更新通知エリアをビデオエリアに合わせて移動する
	    //@number   対象の番号
	    function Move(number) {
	        var tag = "#video" + number;
	        var videoLocation = $(tag).position();
	        var videoSize = { width: $(tag).width(), height: $(tag).height() };
	        $("#uploder-sign" + number)
                .css("left", videoLocation.left)
                .css("top", videoLocation.top)
                .css("width", videoSize.width)
                .css("height", videoSize.height);
	    }

	    //全ての更新通知エリアをビデオエリアに合わせて移動する
	    function MoveAll() {
	        for (var i = 1; i <= MAXCONNECTIONS + 1; i++) {
	            Move(i);
	        }
	    }

	    //特定の更新通知アイコンを表示する
	    //@number   表示する番号
        //@category    更新内容のカテゴリ番号
	    function Show(number , category) {
	        var $target = $("#uploder-sign" + number);
	        if ($target.css("display") != "none") return;
	        $target.prop("title", DATANAME[category])
			        .tooltip({
			            position: {
			                my: "center bottom",
			                at: "center top"
			            }
			        });
	        $target.fadeIn(1500, function () {
	            $target.fadeOut(1500);
	        });
	    }

	    //提供メソッド
	    MoveAll();
	    return {
	        move: MoveAll,
	        show: Show
	    };

	})();

    /***
     【オブジェクト】
 　    Toastを表示・制御・停止などを行う
 　    ユーザーは戻り値の関数を用いてトーストを表示する
    ***/
	var Toast = (function () {

	    var $cont;      //本体エレメント
	    var $div;

	    var timer;      //制御用タイマ
	    var queue = []; //実行待ち行列

	    //表示する
	    //@msg      表示する文字列
	    //[@color]  背景色
	    //[@time]   表示時間
	    function show(msg, color, time) {

	        //トースト用のエレメントの生成
	        $cont = $("<div class='toast-cont'>").click(stop);
	        $div = $('<div class="toast">' + msg + '</div>').css("background", color).click(stop);

	        //エレメントを描画
	        $cont.prependTo("body");
	        $div.prependTo($cont);

	        //フェードインで出力
	        $cont.hide().fadeIn(800);

	        //一定時間表示語、フェードアウト
	        timer = setTimeout(function () {
	            $div.fadeOut(800, function () {
	                stop();
	            });
	        }, time);
	    }

	    //停止する
	    function stop() {
	        //実行中のトーストを停止する
	        if (typeof ($cont) != "undefined") {
	            $cont.stop();
	            $div.stop();
	            $cont.remove();
	            $div.remove();
	        }
	        clearTimeout(timer);
	        $cont = undefined;
	        timer = undefined;

	        //待ち行列にデータが存在すればそれを実行する
	        if (isQueueData()) {
	            var toastData = queue.shift();
	            show(toastData.msg, toastData.color, toastData.time);
	        }

	    };

	    //キューにセットする
	    function setQueue(msg, color, time) {
	        var toastData = {
	            msg: msg,
	            color: color,
	            time: time
	        };
	        queue.push(toastData);
	    }

	    //キューから取り出す
	    function getQueue() {
	        var toastData = queue.shift();
	        if (typeof (toastData) == "object") {
	            return toastData;
	        } else {
	            return false;
	        }
	    }

	    //キューにデータがあるか確認する
	    function isQueueData() {
	        if (queue.length != 0) {
	            return true;
	        } else {
	            return false;
	        }
	    }

	    //提供メソッド
	    //@msg      表示するメッセージ
	    //@priority 優先表示するか
	    //[@color]  トーストの色(デフォルトは黒)
	    //[@time]   表示する時間(デフォルトは2000ms)
	    //【参考】http://qiita.com/negi3d/items/4d4531af66774f503659
	    return function (msg, priority, color, time) {

	        //デフォルト引数
	        if (typeof (time) == "undefined") time = 2000;
	        if (typeof (color) == "undefined") color = "rgba(0, 0, 0, 0.7)";

	        //待ち行列がなければ即表示
	        if (typeof ($cont) == "undefined") {
	            show(msg, color, time);
	        }

	        //待ち行列
	        else {
	            //優先表示
	            if (priority) {
	                queue.unshift({ msg: msg, color: color, time: time });
	                stop();
	            }
	                //待ち行列に並ばせる
	            else {
	                setQueue(msg, color, time);
	            }
	        }
	    }


	})();

	//【初期化】起動時の初期設定をすべて行う
    (function Init() {

        checkBrowser()                      		//ブラウザの対応チェック
        makeUserInterface();						//UIの動的生成
        getConfigToWebStorage();                    //WebStorageの設定情報を反映
        traficcer.setEnable(1);                     //通信トラフィックの測定を行うか否か(1-3)

        /*
        以下をコールバックを用いて順に実行する
            ・ユーザー情報入力フォームよりデータ入力
            ・Webカメラ情報の取得
            ・ピアサーバへの接続
		*/
        MakeInputDialog(function (isCamera, isMike) {
            setMediaStream(isCamera, isMike, ConnectionToPeerServer);
        });

    })();

});