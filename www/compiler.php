<?php

/*
各種コンパイラ、インタプリタ本体の情報
【C/C++】
Borland C++ 5.5.1 for Win32
C:\borland\bcc55\Bin;
http://www.mlab.im.dendai.ac.jp/ic2/webdesign/web/tool/bcc/

【Python】
Python 3.4.1
C:\Python34
http://www.pythonweb.jp/install/

【Ruby】
ruby 2.1 (2010-08-18 revision 29036) [x64-mswin64_80]
C:\Ruby-2.1\bin
http://www.rubylife.jp/install/install/index1.html

*/

//各種コマンドのパス(サーバーを動かすマシンによって確認すること)
$cppPath = "C:\\borland\\bcc55\\Bin;";
$pythonPath = "C:\\Python34;";
$rubyPath = "C:\Ruby-2.1\bin;";
$taskkillPath = "C:\Windows\System32\;";
$pathString = "path=".$pythonPath.$rubyPath.$cppPath.$taskkillPath;


header("Access-Control-Allow-Origin: *");
header("Header set Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
putenv($pathString);


/*【関数】文字列データをエンコードしてファイルとして保存する*/
function saveFile($str , $fileName , $charset){

	$str = mb_convert_encoding($str , $charset , "UTF-8");
	file_put_contents($fileName , $str);
	
}

/*【関数】利用ログを生成する*/
function makeLogFile(){

	$path = "./log/" . time() . ".txt";
	$txt = date("Y/m/d H:i:s") . "\n" . $_SERVER["REMOTE_ADDR"] . "\n" . $_POST["lang"] . "\n" . $_POST["code"];
	file_put_contents($path , $txt);

}


/*【関数】プログラムを実行し、実行結果を整形して出力する*/
function runTheProgram($lang , $command){
	
	//HTMLエンコードはクライアントでやる 2014/11/04
	//echo "<font color='blue'>プログラムを実行します</font><br/>";
	$run = shell_exec($command);
	
	if(file_exists("input.txt")){
		//$run = htmlspecialchars($run);
		$run = mb_convert_encoding($run , "UTF-8" , "SJIS");
		//$run = str_replace("\n", "<br/>", $run);
		//$run = str_replace(" " , "&nbsp;" , $run);
		echo $run;
	}

}

/*【関数】コンパイルエラーを整形して出力する*/
/*【参考】http://blog.livedoor.jp/techrebornpublic/archives/52020099.html*/
function echoTheCompileErrorText($compileResult){

	echo "<font id = 'compileError' color = 'red'>エラー：コンパイル失敗</font><br/>";
	$compileResult = mb_convert_encoding($compileResult , "UTF-8" , "SJIS");
	$compileResult = str_replace("\n", "<br/>", $compileResult);
	echo $compileResult;

}

/*【関数】プログラムを停止する*/
/*【参考】http://blog.livedoor.jp/techrebornpublic/archives/52020099.html*/
function stopProgram() {

	$log = shell_exec("Taskkill /IM sltp.* /F 2>&1");
	shell_exec("Taskkill /IM python* /F");
	shell_exec("Taskkill /IM ruby* /F");
	removeFile();
	makeLogFile($log);
	
}

/*【関数】生成したファイルを全て削除する*/
function removeFile(){

	shell_exec("del sltp.*");
	shell_exec("del input.txt");

}

/*【関数】C/C++コードをコンパイル及び実行し結果を出力する*/
function compileToCpp($code , $input){
	
	saveFile($code , "sltp.cpp" , "SJIS");
	saveFile($input , "input.txt" , "SJIS");
	
	$compileResult = shell_exec("bcc32 sltp.cpp 2>&1");
	
	if(file_exists("sltp.exe")){
		runTheProgram("c" , "sltp.exe  < input.txt 2>&1");
	} 

	else {
		echoTheCompileErrorText($compileResult);
	}
	
	removeFile();
}

/*【関数】Pythonコードを実行し、結果を出力する*/
function compileToPython($code , $input){

	saveFile($code  , "sltp.py" , "SJIS");
	saveFile($input , "input.txt" , "SJIS");
	runTheProgram("py" , "python sltp.py < input.txt 2>&1");
	removeFile();
	
}

/*【関数】Rubyコードを実行し、結果を出力する*/
function compileToRuby($code , $input){

	saveFile($code  , "sltp.rb" , "SJIS");
	saveFile($input , "input.txt" , "SJIS");
	runTheProgram("rb" , "ruby -Ks sltp.rb < input.txt 2>&1");
	removeFile();

}


/*【関数】PHPコードを実行し、結果を出力する*/
/* 多言語と異なり、先頭にヘッダー要素を追加して保存する */
function compileToPHP($code){
	
	removeFile();
	$time = time();
	$fileName = "sltp_" . $time . ".php";
	
	//$code = mb_convert_encoding($code , "SJIS" , "UTF-8");	
	saveFile('<?php header("Access-Control-Allow-Origin: *"); ?>' , $fileName , "UTF-8");
	$fp = fopen($fileName , "a");
	fwrite($fp , $code);
	fclose($fp);
	
	echo $_POST["path"] . $fileName;
	
}


//POSTデータを読み込む
if(isset($_POST["lang"])){
	
	//取得した言語に応じて関数を呼び出す
	$lang = $_POST["lang"];
	switch(true){
		case $lang == "c" || $lang == "cpp":
			compileToCpp($_POST["code"] , $_POST["input"]);
			break;
		case $lang == "py":
			compileToPython($_POST["code"] , $_POST["input"]);
			break;
		case $lang == "rb":
			compileToRuby($_POST["code"] , $_POST["input"]);
			break;
		case $lang == "php":
			compileToPHP($_POST["code"]);
			break;
		case $lang == "STOP":
			stopProgram();
			break;
		default:
			echo "対応していない言語が選択されています";
	}
	makeLogFile();
} else {
	echo "POSTデータが見つかりません";
}
?>
