'use strict';
require('es6-promise').polyfill();

var assert = require('assert');
var _ = require('lodash');
var axios = require('axios');
var parseString = require('xml2js').parseString;
var async = require('asyncawait/async');
var await = require('asyncawait/await');


var xmlToJson = function(xml) {
    return new Promise(function(resolve, reject) {
        parseString(xml, function (err, result) {
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
};
exports.xmlToJson = xmlToJson;

var getForecast = function(obj) {
    var tokyoArea = obj.weatherforecast.pref[0].area[3];
    assert (tokyoArea.$.id === "東京地方");
    return tokyoArea.info;
};
exports.getForecast = getForecast;

var getWeatherAPI = function() {
    var weatherUrl = 'http://www.drk7.jp/weather/xml/13.xml';
    return axios({
        method: 'get',
        url: weatherUrl
    });
};
exports.getWeatherAPI = getWeatherAPI;

var sendToSlack = function(text) {
    var slackUrl = 'https://hooks.slack.com/services/XXX';//set your slack API
    return axios({
        method: 'post',
        url: slackUrl,
        data: {
            text: text,
            "username": "slackbot",
            "icon_emoji": ":slackbot:",
            "channel": "#bot"
        },
        headers: {'Content-Type': 'application/json'}
    });
};
exports.sendToSlack = sendToSlack;


var func = async (function () {
    var res = await(getWeatherAPI());
    console.log("res");
    console.log(res);
    var obj = await(xmlToJson(res.data));
    console.log("obj");
    console.log(obj);
    var forecasts = getForecast(obj);
    console.log("forecasts");
    console.log(forecasts);

    var yesterdayMaxTemp = forecasts[0].temperature[0].range[0]._;
    console.log(yesterdayMaxTemp);
    var todayMaxTemp = forecasts[1].temperature[0].range[0]._;
    console.log(todayMaxTemp);
    var diff = todayMaxTemp - yesterdayMaxTemp;
    console.log(diff);
    if(diff > 5){
        return sendToSlack("今日は、昨日より " + diff + "度 高いので暑いです");
    }else if(diff < -5){
        return sendToSlack("今日は、昨日より " + Math.abs(diff) + "度 低いので寒いです");
    }else{
        return Promise.resolve("no diff");
    }
});

exports.handler = function(event, context) {
    var onSuccess = function(value) {
        console.log("onSuccess");
        context.done(null, value);
    };

    var onFailure = function(value) {
        console.log("fail");
        console.log(value);
        context.fail(value);
    };
    func().then(onSuccess).catch(onFailure);
};