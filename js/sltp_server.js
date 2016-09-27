$(function () {
/*

クライアント → サーバー
RUN.data = {
	lang 	: 言語(拡張子)
	code 	: プログラムソース
	input	:	入力値
}

connections = [id]{
	num,        //番号(接続順)
	conn,       //データコネクション
	userName,   //名前
	password,   //パスワード
    permit      //他クライアントの接続許可(最大接続数を超えたとき拒否状態に)
}

送信ピアリスト
id 番号
class pass or nopass
val	name or "No name"

*/

	/*【通信用の情報】*************************************************/	
	var peer = null;			//このサーバーノードのピアオブジェクト
	var connections = [];		//接続しているクライアントのリスト
	var connectionsNum = 0;	    //クライアント番号
	/*******************************************************************/

	/*【送受信データの種類 クライアントと整合性取ること】***************/
	var USERNAME = 0;			//ユーザー情報の送信
	var TEXT = 1;               //テキストメッセージ
	var RUN = 10;				//プログラムの実行要求
	var STOP = 11;				//プログラムの停止要求
	var PEERS = 12;				//クライアントリストの要求
	var CONNECT = 13;			//クライアントへの接続要求
	var REMOVE = 14;			//クライアントの切断情報
	var PERMIT = 15;            //クライアントの接続許可
	var HEART = 16;             //ハートビートパケット
	/********************************************************************/

    /*【プログラム実行用オブジェクト】************************************/
	var ProgrammRunner;
	/********************************************************************/


	//【通信】初期設定
    (function Init() {

        //通信トラフィックの測定を行うか否か
        traficcer.setEnable(0);

        //compilerプログラムURLの設定
        $("#compilerList").change(function () {
            if ($(this).val() == "その他") {
                $("#freecompiler").fadeIn(500);
            } else {
                $("#freecompiler").fadeOut(500);
            }
        });

		//【サーバー開始(デフォルトネーム)】
        $(".startdefault").click(function () {
            var APIKEY = {
                "sltpservernode001": "dka7elfexlk81tt9",
                "sltpservernode002": "xuuda3vnw5ewmi",
                "sltpservernode003": "tpytks79v96hia4i",
                "sltpservernode004": "secf28iz7inyu8fr",
                "sltpservernode005": "a1wyr7cg1cibpgb9",
            };
			serverID = $(this).prop("id");
			StartTheServer(serverID , APIKEY[serverID]);
        });

        //【サーバー開始(フリーネーム)】
        $("#freeNameStart").click(function () {
            var serverID = prompt("サーバー名を入力してください");
            if (serverID == null || serverID == "") return;
            StartTheServer(serverID, "j5z154z9afcu9pb9");
        });

        //【サーバー開始(ランダムネーム)】
        $("#randomNameStart").click(function () {
            StartTheServer(undefined, "j5z154z9afcu9pb9");
        });

		//【サーバー停止】
		$(".stop").click(function () {
			StopTheServer();
		});

        //【コンパイルサーバリセット】
		$("#resetCompier").click(function () {
		    $writeObj = $("<div>"); //ダミー
		    $writeObj.load(getCompilerServer() , { lang: "STOP" }, function (data, status) {
		        WriteLog("コンパイルサーバーのリセット完了");
		    });
		});

	})();

    //【通信】サーバーを開始する
    //@serverID   起動するサーバーの名前
    //@key        使用するAPIキー
	function StartTheServer(serverID , key) {

	    //UIをサーバー起動待ち状態に切り替える
	    console.log("サーバを開始します");
	    $("#start").unbind("click", StartTheServer);
	    $(".start").css("display", "none");
	    $(".stop").css("display", "block");
	    ClearLog();
	    WriteLog("サーバー準備中");

	    //PeerJSへの接続
	    peer = new Peer(serverID, { key: key, debug: traficcer.getEnable() });

		//【イベント】PeerJSへの接続成功/失敗	
		peer.on("error", onErrorOfPeer);
		peer.on("open", function (id) {

			//UIをサーバー起動中状態に切り替える
			var clientURL = location.href.replace("Server" , "Client");
			clientURL += "?" + id;
			WriteLog(id + "サーバー稼働開始");
			$("#clientURL").text(clientURL).prop("href" , clientURL);
			$("#status").text(id + " サーバ起動中");
            //クライアント用のダミー
			iceErrorEventforClient = function (peerId) {
			    console.log(peerId);
			};

			//クライアント受付イベントとサーバー停止イベントを定義
			peer.on("connection", connectionToClient);
			$("#stop").click(StopTheServer);
		    
			console.log("サーバーを開始しました");
		});
		
	}

	//【通信】サーバーを停止する
	function StopTheServer() {

	    console.log("サーバーを停止します");
	    //既存のコネクションを全て切断しWebRTCを終了する
	    if (!!peer) {
            console.log("停止処理");
	        for (var conn in connections) {
	            connections[conn].conn.close();
	        }
	        peer.disconnect();
	        peer.destroy();
	        peer = null;
	    }

	    //システムを初期状態に戻す
	    connections = [];
	    connectionsNum = 0;
	    clearConnectionList();
	    ClearPeerInformation();
	    HeartBeatPacket.stop();
	    WriteLog("サーバー停止");
	    $("#status").text("サーバーリストから起動するサーバーを選択してください。");
	    $(".start").css("display", "block");
	    $(".stop").css("display", "none");
	    $("#clientURL").text("");

	}

	//【通信】サーバーにエラーが発生した
    //@err	        エラーオブジェクト
	function onErrorOfPeer(err) {

	    //サーバーが起動していない際のエラーは重複通知のためスルーする
	    if (peer == null) return;

        //サーバーを停止する
	    StopTheServer();
	    ClearLog();
	    console.log(err);
	    WriteLog("サーバーの起動に失敗しました。他のサーバー選択して再起動してください", "red");
	    
	}

	//【通信】クライアントとの接続が確立した
	//@conn	確立したデータコネクション
	function connectionToClient(conn) {

		WriteLog(conn.peer + "が接続を要求してきました");
		connections[conn.peer] = {
		    num: connectionsNum++,
		    conn: conn,
		    userName: "",
		    password: "",
            permit: true
		};
		HeartBeatPacket.set(1000);
		conn.on("data", function (data) { receiveData(this.peer, data); });
		conn.on("close", function () { removeConnection(this.peer); });


	}

	//【通信】クライアントを切断する
	//@id	切断するクライアントのID
	function closeConnection(id) {
		
		connections[id].conn.close();

	}

	//【通信】クライアントが切断された
	//@id	切断されたピアのID
	function removeConnection(id) {

		delete connections[id];					//コネクション情報の削除
		ClearPeerInformation();					//ピア詳細情報を非表示に
		MakeConnectionList();					//ピアリストを更新
		sendToConnectionList();					//更新したピアリストをクライアントへ送信
		sendRemoveInformation(id);			    //切断情報をクライアントへ送信
		WriteLog(id + "が切断しました");

	}

	//【通信】クライアントにデータを送信する
	//@id			送信するピアのID
	//@data_type	送信するデータの種類
	//@data_main	送信するデータの本体
	function sendData(id, data_type, data_main) {

		var obj = {
			type: data_type,
			data: data_main
		};
		connections[id].conn.send(obj);
		traficcer.setSendTrafic(obj);

	}

	//【通信】全てのクライアントにデータを送信する
	//@data_type	送信するデータの種類
	//@data_main	送信するデータの本体
	function sendDataToAll(data_type, data_main) {

	    for (var client in connections) {
			sendData(client , data_type , data_main);
		}
	}

	//【通信】クライアントからデータを受信する
	//@id		送信元ピアID
	//@obj	受信したオブジェクト
	function receiveData(id, obj) {

		var type = obj.type;

		//実行要求
		if (type == RUN) {
			ProgrammRunner.setRunQueue(id, obj.data);
		}

		//停止要求
		else if (type == STOP) {
			ProgrammRunner.StopTheProgram(id);
		}

		//ユーザー名指定
		else if (type == USERNAME) {
			setUserName(id, obj.data);
		}

		//接続要求
		else if (type == CONNECT) {
			sendToPeerID(id , obj.data);
		}

		//ピアリスト要求
		else if (type == PEERS) {
			sendToConnectionList(id);
		}

		//接続許可設定
		else if (type == PERMIT) {
		    connections[id].permit = obj.data;
		    sendToConnectionList();
		}

		//例外
		else {
			WriteLog(id + "より、サポート対象外のデータタイプを受け取りました。要検証。" , "red");
			console.log(obj);
		}

		traficcer.setRecvTrafic(obj);
	}

    //【関数】コネクションリストをクライアントに送信する
    //[@id]送信するID　引数がない場合は全体に送信する
	function sendToConnectionList(id) {

	    var peers = [];
	    var i = 0;
	    for (var client in connections) {

	        //ユーザー名が指定していない場合NoNameで送信する。ピアIDが漏れたら不正接続されるため
	        //パスワードが設定されているユーザーにはpassクラスを付与する
	        var con = connections[client];
	        var number = con.num;
	        var name = con.userName;
	        var _class;
	        if (connections[client].permit == false) {
	            _class = "full";
	        } else {
	            _class = (con.password == "") ? "nopass" : "pass";
	        }
      
	        //オブジェクト化する
	        peers[i++] = {
	            number: number,
	            name: name,
	            _class: _class
	        };

	    }

	    if (typeof (id) == "undefined") {
	        sendDataToAll(PEERS, peers);
	    } else {
	        sendData(id, PEERS, peers);
	    }
	}

    //【関数】コネクションの切断情報をユーザーに送信する
    //当関数はFireFoxのみ、Closeイベントに対応していないため利用する
    //@id	切断されたユーザーのID
	function sendRemoveInformation(id) {

	    sendDataToAll(REMOVE, id);

	}

	//【関数】標準入力欄より、POSTデータを抜き出してオブジェクト化する
	//@text		全てのリクエスト及び改行を含めた文字列
	//@return	object = { dataName : data }
	//【参考】http://www.nishishi.com/javascript/2013/trim-space-chars.html
	function SplitToStdio(text) {

		//戻すオブジェクト
		var PostObject = {};
		var GetObjetc = {};
		var splitObject = {
			POST: PostObject,
			GET: GetObjetc
		};

		//行ごとに分割
		var lines = text.split("\n");

		for (var i = 0; i < lines.length; i++) {

			//入力不正なら終了
			if (lines[i].indexOf("GET") != 0 && lines[i].indexOf("POST") != 0) {
				break;
			}

			//正規表現で空白を取り除く
			lines[i] = lines[i].replace(/\s+/g, "");

			//リクエストメソッドとデータ名、データに分割する
			var splitTemp = lines[i].split(":");
			var MethodType = splitTemp[0]
			var DataText = splitTemp[1].split("=");

			//POSTメソッド
			if (MethodType == "POST") {
				PostObject[DataText[0]] = DataText[1];
			} else if (MethodType == "GET") {
				GetObjetc[DataText[0]] = DataText[1];
			}
		}

		return splitObject;

	}

	//【関数】URLにGETパラメータをクエリストリングの形で付与した文字列を戻す
	//@url	付与する前のURL
	//@obj	付与するためのGETパラメータオブジェクト {name : data}
	//【参考】http://qiita.com/nantekkotai/items/6c603b40ac2264e9f6f6
	function setQueryString(url, obj) {

		//各要素についてキーと名前よりクエリストリングを生成する
		url += "?";
		Object.keys(obj).forEach(function (key) {
			url += key + "=" + obj[key] + "&";
		});

		//結合したURLを戻す
		return url;

	}

	//【関数】コネクションリストのIDに対するユーザー名を更新する
	//@id		対象のピアID
	//@data	ユーザー名などユーザー情報を含んだオブジェクト
	function setUserName(id, data) {

		var name = data.userName;
		var pw = data.password;

		//他のユーザーとユーザ名が被っていないかを確認する
		var hitFlag = false;
		for (var client in connections) {
			if (connections[client].userName == name) {
				hitFlag = true;
				break;
			}
		}

		//かぶっていた場合は再送要求
		if (hitFlag) {
			sendData(id, USERNAME, "そのユーザー名は既に利用されています。新しいユーザー名を入力してください");
			return;
		}

		//１０文字を超えてた名前は無効
		if (name.length > 10) {
			sendData(id, USERNAME, "ユーザー名は１０文字以下にしてください");
			return;
		}

	    //受信したユーザー情報を書き込む

		connections[id].userName = name;
		connections[id].password = pw;

		//コネクションリストをユーザーを追加する
		WriteLog(id + "(" + name + ")との接続完了");
		MakeConnectionList();
		sendToConnectionList();
		OutputPeerInformation(id);

	}

	//【関数】クライアントのPeerIDを他のクライアントに送信する
	//@id		要求元クライアントのPeerID
	//@data	    要求内容(接続したいピア番号 + パスワード)
	function sendToPeerID(id, data) {

		var client = NumberToConnection(data.num);

		//クライアントに送信するオブジェクト
		var sendObj = {
			result : true ,
			message : client
		};

		//Numに対応するコネクションが存在しない
		if (client == false) {
			sendObj.result = false;
			sendObj.message = "該当するピアが存在しません";
		} 
		//パスワードが必要だが一致しない
		else if (data.password != connections[client].password) {
			sendObj.result = false;
			sendObj.message = "パスワードが正しくないため接続できません"
		}
		sendData(id, CONNECT, sendObj);

	}

    //【関数】コンパイルサーバーのURLを取得する
    //@return URL
	function getCompilerServer() {
	    if ($("#compilerList").val() == "その他") {
	        var server = $("#freecompiler").val();
	    }
	    else {
	        var server = $("#compilerList").val();
	    }
	    return server;
	}

    //【関数】コンパイルサーバーのディレクトリパスを取得する
    //@return
	function getCompilerServerDir() {

	    var server = getCompilerServer();
	    server = server.substring(0, server.lastIndexOf("/") + 1);
	    return server;

	}

    //【関数】コネクション番号に対応するコネクションを戻す
    //@num		番号
    //@return	対応するPeerID 失敗時false
	function NumberToConnection(num) {

	    for (var client in connections) {
	        if (connections[client].num == num) {
	            return client;
	        }
	    }
	    return false;

	}

    //【関数】通信のログをリスト形式で描画する
    //[@color]  通信ログの文字色。デフォルトは黒
	function WriteLog(log, color) {

	    if (typeof (color) == "undefined") color = "black";
	    $li = $("<li/>").html(getTimeString() + log).css("color", color);
	    $("#log").prepend($li);

	}

    //【関数】現在時刻を"【hh:mm:ss】"形式で戻す
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
			"【" + grantZero(hour) + ":" + grantZero(minute) + ":" + grantZero(second) + "】";

	    return returnString;
	}

    //【UI制御】コネクションリストを再生成する
    //@id		追加するピアのID
    //@name	    追加するピアのユーザー名
	function MakeConnectionList() {

	    var $cl = $("#connectionList").empty();
	    for (var client in connections) {
	        if (connections[client].userName == "") continue;
	        var id = client;
	        var name = connections[client].userName;
	        $li = $("<li/>")
				.text(id)
				.css("text-decoration", "underline")
				.css("cursor", "pointer")
				.prop("id", name)
				.addClass(id)
				.click(function () { OutputPeerInformation($(this).text()); });

	        $cl.prepend($li);
	    }

	}

    //【UI制御】コネクションリストを全て削除する
	function clearConnectionList() {

	    $("#connection").empty();

	}

    //【UI制御】コネクションの詳細情報を描画する
    //@id	描画するピアのID
	function OutputPeerInformation(id) {

	    //詳細情報
	    var num = connections[id].num;
	    var name = connections[id].userName;
	    var pass = connections[id].password;
	    var permit = (connections[id].permit) ? "接続受付中" : "満席";
	    var kai = "<br>";
	    var mes = "Number\t:\t" + num + kai;
	    mes += "PeerID\t:\t" + id + kai;
	    mes += "Name\t:\t" + name + kai;
	    mes += "Pass\t:\t" + pass + kai + kai;
	    mes += "Connect\t:\t" + permit + kai + kai;

	    //切断ボタン
	    var $closeBtn = $("<button>切断</button>").click(function () {
	        if (confirm("切断してもよろしいですか？")) {
	            closeConnection(id);
	        }
	    });

	    //メッセージ送信ボタン
	    var $mesBtn = $("<button>メッセージ送信</button>").click(function () {
	        var mes;
	        if ((mes = prompt("クライアントに送信するメッセージを入力してください"))) {
	            sendData(id, TEXT, mes);
	        }
	    })

	    //要素生成
	    $("#info").html(mes).append($closeBtn).append($mesBtn);

	}

	//【UI制御】コネクションの詳細情報を非表示にする
	function ClearPeerInformation() {

		$("#info").html("");

	}

    //【UI制御】通信ログを削除する
	function ClearLog() {

	    $("#log").empty();

	}

    //【オブジェクト】ハートビートをクライアントに送信する
    //HeartBeatPacket.set   自動送信開始(送信間隔)
    //HeartBeatPacket.stop  自動送信停止
	var HeartBeatPacket = (function () {

	    var timer;
     
	    function setHeartBeatPacket(interval) {
	        stop();
	        timer = setInterval(function () {
	            sendDataToAll(HEART, "");
	        }, interval);
	    }
	    function stopHeartBeatPacket() {
	        clearInterval(timer);
	    }

	    return {
	        set: setHeartBeatPacket,
	        stop: stopHeartBeatPacket
	    };

	})();

    /***
    【オブジェクト】プログラムの実行及び実行待ち行列の管理を行う
    ***/
	var ProgrammRunner = (function () {

	    var runningID = false;	//現在プログラム実行中なら要求元ID
	    var runQueue = [];		//実行待ちの要求キュー


	    return {

	        //【関数】プログラムを実行する
	        //@id	     :   送信元ピアID
	        //@post_data : {lang : 言語の拡張子 , code : プログラムコード , input : 入力値}
	        RunTheProgram: function (id, post_data) {

	            //コンパイルサーバーのURL
	            var server = getCompilerServer();
	            var lang = post_data.lang;

	            //実行状態にする
	            runningID = id;

	            //PHPに限りWebサーバーのパスをポストデータに追加する
	            if (lang == "php") {
	                post_data.path = getCompilerServerDir();
	            }

                //ログの表示
	            var $writeObj = $("<div>");
	            if (lang == "STOP") {
	                WriteLog(id + "から停止要求を受信");
	            }
	            else {
	                WriteLog(id + "から" + lang + "コードを受信");
	            }

	            //Webサーバーと非同期通信し、結果を得る
	            $writeObj.load(server, post_data, function (data, status) {

	                //通信失敗
	                if (status == "error") {
	                    var errMessage =
                            "<span class = 'Div_InformationText'>サーバーにコンパイルプログラムが設定されていないため実行できません</span>";
	                    $writeObj.html(errMessage);
	                    ProgrammRunner.sendRunResult(id, false , $writeObj.html());
	                    return;
	                }

	                //クライアントへ送信
	                else {

	                    //停止要求成功 実行中に強制停止した場合はそのことをクライアントに伝える
	                    if (post_data.lang == "STOP") {
	                        ProgrammRunner.sendRunResult(id,  false , "<span class = 'Div_InformationText'>停止しました</span>");
	                    }

	                        //PHP成功　クライアントから受け取ったGET/POSTデータを利用して実行する
	                    else if (post_data.lang == "php") {
	                        ProgrammRunner.RunThePHP(post_data, $writeObj.html(), id);
	                    }

	                        //その他の言語成功 実行結果をクライアントに戻す
	                    else {
	                        var errorCheckResult = MessageAnalyst.getError(lang, $writeObj.html());
	                        ProgrammRunner.sendRunResult(id, errorCheckResult.info  , errorCheckResult.text);
	                        WriteLog(id + "へ" + post_data.lang + "プログラムの実行結果送信完了");
	                    }

	                }

	            });
	        },

	        //【関数】生成されたPHPファイルにアクセスし、結果のHTMLをクライアントに戻す
	        //@post_data	クライアントからのPOSTデータ
	        //@url			生成されたPHPファイルのURL
	        //@id		    クライアントのPeerID
	        //【参考】http://nanoappli.com/blog/archives/1226
	        RunThePHP: function (post_data, url, id) {

	            //GETオブジェクト、POSTオブジェクトを標準入力欄より取得
	            try{
	                var splitObject = SplitToStdio(post_data.input);
	                var postObject = splitObject.POST;
	                var getObject = splitObject.GET;
	                url = setQueryString(url, getObject);
	            } catch (e) {
	                sendData(id, RUN, "入力値が不正です。フォーマットなどを確認して下さい");
	                console.log(e);
	                return;
	            }

	            //JQueryを用いて非同期にPHPを実行する
	            var result = false;
	            var req = $.ajax({
	                type: "POST",
	                url: url,
	                data: postObject,
	                success: function (data) {
	                    result = true;
	                    var errorCheckResult = MessageAnalyst.getError("php",data);
	                    ProgrammRunner.sendRunResult(id, errorCheckResult.info, errorCheckResult.text);
	                    WriteLog(id + "へPHPプログラムの実行結果送信完了");
	                },
	                error: function (e) {
	                    console.log("PHP非同期通信に失敗");
	                    console.log(e);
	                    ProgrammRunner.sendRunResult(id, false, "プログラムの実行に失敗しました。エラーが含まれている可能性があります。");
	                    result = true;
	                }
	            });

	            //無限ループや構文エラーに備えて５秒後には非同期通信を強制終了する
	            setTimeout(function () {
	                if (result == false) {
	                    req.abort();
	                    ProgrammRunner.sendRunResult(id, false, "プログラムの実行が一定時間に終了しませんでした。無限ループが含まれている可能性があります。");
	                    WriteLog(id + "へPHPプログラムの実行結果送信完了");
	                }
	            }, 5000);

	        },

	        //【関数】プログラムを停止する
	        //@id	停止するプログラムの要求元ID
	        StopTheProgram: function (id) {

	            //現在実行中のプログラムが要求元のプログラムならWebサーバーに停止要求をする
	            if (runningID == id) {
	                ProgrammRunner.RunTheProgram(id, { lang: "STOP" });
	            }

	            //実況キューにたまっている実行要求の中に要求元に該当する要求があれば削除する
	            else {
	                var newRunQueue = [];
	                for (var i = 0; i < runQueue.length; i++) {
	                    if (runQueue[i].id != id) {
	                        newRunQueue.push(runQueue[i]);
	                    }
	                }
	                runQueue = newRunQueue;

	                //停止完了をクライアントに通知
	                sendData(id, RUN, "<span class = 'Div_InformationText'>停止しました</span>");
	            }

	        },


	        //【関数】プログラムを実行キューに追加する。キューが空なら即実行する
	        //@id	        送信元ID
	        //@post_data : {lang : 言語の拡張子 , code : プログラムコード , input : 入力値}
	        setRunQueue: function (id, post_data) {

	            if (!!runningID) {
	                var queue = { id: id, post_data: post_data };
	                runQueue.push(queue);
	            }

	            else {
	                ProgrammRunner.RunTheProgram(id, post_data);
	            }

	        },

	        //【関数】プログラムの実行結果をクライアントに送信する
	        //@id		送信するクライアントのID
	        //@result	実行に成功した場合True
            //@text     実行結果本文
	        sendRunResult: function (id, result , text) {

	            var sendObj =  {
	                result : result ,
	                text : text
	            };
	            sendData(id, RUN, sendObj);

	            if (runQueue.length > 0) {
	                setTimeout(function () {
	                    var queue = runQueue.shift();
	                    ProgrammRunner.RunTheProgram(queue.id, queue.post_data);
	                }, 1000);
	            } else {
	                runningID = false;
	            }

	        },

	    }

	})();

});
