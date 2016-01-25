'use strict';

var https = require('https');

var postJson = function(obj, succCB, failCB) {
    var options = {
        hostname: 'hooks.slack.com',
        port: 443,
        path: '/services/XXX/XXX/XXX', //set your webhook url.
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    var data = JSON.stringify(obj);
    var req = https.request(options, function(res) {

        var body = '';
        res.setEncoding('utf8');

        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
            succCB(body);
        });

    }).on('error', function(e) {
        failCB(e);
    });

    req.write(data);
    req.end();
};

var calcText = function(date){
    console.log(date);
    var weekNum = date.getDay();
    if(weekNum === 1){//Mon
        return "明日 ハ 「可燃ゴミ」 ノ 日デス"
    }else if(weekNum === 3){//Wed
        return "明日 ハ 「資源ゴミ」 ノ 日デス"
    }else if(weekNum === 4){//Thu
        return "明日 ハ 「可燃ゴミ」 ノ 日デス"
    }
    if(weekNum === 2){//Tue
        date.setDate( date.getDate() + 1 );
        var dateNum = date.getDate();
        if(1 <= dateNum && dateNum <= 7) {//Tue
            return "明日 ハ 月ニ 一度 ノ 「不燃ゴミ」 ノ 日デス\n▒▒▓█▇▅▂∩( ✧Д✧)∩ファイアー▂▅▇█▓▒▒"
        }
    }
    return null;
};

exports.calcText = calcText;

exports.handler = function(event, context) {
    var onSuccess = function(value) {
        console.log(value);
        context.done(null, 'onSuccess');
    };

    var onFailure = function(value) {
        console.log(value);
        context.error(null, 'onSuccess');
    };

    console.log('start');
    var date = new Date();

    var text = calcText(date);
    if(text){
        postJson({'text': text}, onSuccess, onFailure);
    }else{
        context.done(null, 'a very merry unbirthday to you');
    }
};