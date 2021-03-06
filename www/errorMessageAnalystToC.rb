# encoding : utf-8

#エラーメッセージ内のキーワード抽出
#未定義の関数 'sayHello' を呼び出した(関数 main() ) →　sayHello
def getKeyWord(mes)
   mes.match(/'.+'/)[0]
end

#パラメーラ不足エラーの関数名を抽出する
#呼び出し時のパラメータが足りない：sayHello(int)(関数 main() ) →　sayHello(int)
def getFunctionName1(mes)
   mes.match(/.+：(.+)/)
   $1
end

#パラメータ溢れエラーの関数名を抽出する
#sayHello() の呼び出しに余分なパラメータがある(関数 main() ) →　sayHello()
def getFunctionName2(mes)
   mes.slice(0,mes.index(")") + 1)
end

#変数未宣言エラーの変数名を抽出する
#未定義のシンボル result(関数 main() ) →　result
def getNotDefindVariableName(mes)
   mes.match(/未定義のシンボル ([^\(]+)/)
   $1
end

 #パラメータの型違いエラーの型名を抽出する
 #'int' 型は 'int *' 型に変換できない(関数 main() )　→　["int" , "int *"]
def getTypeError(mes)
   mes.match(/('.+').+('.+')+./)
   [$1 , $2]
end

#BCCコンパイラのエラーコードに合わせてエラーメッセージを改編する
def changeErrorMessage(code , mes)
   code = code.to_i
   case code
      when 2268
         return "関数" + getKeyWord(mes) + "が見つかりません。定義できていないかスペルミスを犯している、includeし忘れているなどの可能性があります。";
      when 2379 , 2134 , 2190 , 2141 , 2139
         return  "セミコロン(;)が不足している、{}が合致しないなどの文法上のミスが含まれています。コードをよく確認して下さい。";
      when 2193
         return  "関数「" + getFunctionName1(mes) + "」を呼び出す際の引数が不足しております。引数の個数を確認して下さい。";
      when 2227
         return "関数「" + getFunctionName2(mes) + "」を呼び出す際の引数が多すぎます。引数の個数を確認して下さい。";
      when 2451
         return  "変数「" + getNotDefindVariableName(mes) + "」が宣言されておりません。基本的に変数は関数の先頭で宣言する必要があります。";
      when 2342 , 2034
         type = getTypeError(mes)
         return type[0] + "型を" + type[1] + "型に変換することはできません。変数の型によく注意してください。";
      when 2209
         return "インクルードを希望している" + getKeyWord(mes) + "が開けません。スペルミス、ファイルが存在しないなどの可能性があります。";
      when 2171
         return "関数" + getKeyWord(mes) + "の宣言が重複されている可能性があります。関数宣言部分を確認して下さい";
      when 2314
         return "変数を関数のように()で呼び出すことはできません。名前などを確認して下さい。"
      when 2344
         return false
      else
         return mes
   end
end

#BCCコンパイラのエラー文を簡略化して行番号と共に出力する
def getErrorDataToC(input)
	matcheFlag = false
	input.scan(/エラー E(....) sltp.cpp ([0-9]+): ([^<]*)/) do |matche|
		matcheFlag = true
		errCode = $1
		errLine = $2
		errMes = $3
		errMes = changeErrorMessage(errCode , errMes)
		puts errLine
		puts errMes
		if errMes === false
		next
		end
	end
	puts input if matcheFlag === false
end

inputData = File.read("./result.txt")
getErrorDataToC(inputData)

