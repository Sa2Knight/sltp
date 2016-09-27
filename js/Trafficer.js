/*
トラフィッカーオブジェクトは通信トラフィックを測定、管理するために
サーバー、クライアント量アプリケーションから利用される
*/
var traficcer = (function () {

    var DEBUG ;             //3ならトラフィックの計測を行う
    var sendTrafic = 0;     //送信データ量
    var recvTrafic = 0;     //受信データ量

    //オブジェクトから総バイト数を取得
    var getAllStringLength = function (obj) {

        var type = typeof (obj);
        var count = 0;

        if (type == "object") {
            for (var data in obj) {
                count += getAllStringLength(obj[data]);
            }
        } else if (type == "string") {
            count += obj.length;
        } else {
            count++;
        }

        return count;
    }

    return {

        //受信量の更新
        setRecvTrafic : function(obj){
            if (DEBUG < 3) return;
            var byte = getAllStringLength(obj);
            recvTrafic += byte;
            console.log("受信バイト数　：　" + byte + "　累計　：　" + recvTrafic);
        } ,

        //送信量の更新
        setSendTrafic : function(obj) {
            if (DEBUG < 3) return;
            var byte = getAllStringLength(obj);
            sendTrafic += byte;
            console.log("送信バイト数　：　" + byte + "　累計　：　" + sendTrafic);
        } ,

        //通信量の初期化
        resetTrafic: function () {
            sendTrafic = 0;
            recvTrafic = 0;
        } ,

        //設定値の変更
        setEnable: function (num) {
            DEBUG = num;
        },

        //設定値の取得
        getEnable: function () {
            return DEBUG;
        }

    }

})();