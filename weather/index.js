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

var getTodaysRainFallChance = function(forecasts) {
    var today = new Date();
    today.setHours(today.getHours() + 9);
    var todayStr = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
    //var ss = _.filter(forecasts, function(v){
    //    return todayStr == todayStr;
    //});
    return forecasts[0].rainfallchance[0].period;
};
exports.getTodaysRainFallChance = getTodaysRainFallChance;

var willFallRain = function(periods) {
    var ss = _.filter(periods, function(v){
        return Number(v._) >= 50;
    });
    return ss.length > 0;
};
exports.willFallRain = willFallRain;

var format = function(periods, obj) {
    var ss = _.map(periods, function(v){
        return v.$.hour + "時は" + v._ + "％";
    });
    var s = _.reduce(ss, function(acc, v){
        return acc + "\n" + v;
    });

    var tokyoArea = obj.weatherforecast.pref[0].area[3];
    var todayStr = tokyoArea.info[0].$.date;
    return "今日(" + todayStr + ")は「" + tokyoArea.$.id　+ "」で雨が降りそうです。降水確率は、\n" + s;
};
exports.format = format;

var getWeatherAPI = function() {
    var weatherUrl = 'http://www.drk7.jp/weather/xml/13.xml';
    return axios({
        method: 'get',
        url: weatherUrl
    });
};
exports.getWeatherAPI = getWeatherAPI;

var sendToSlack = function(text) {
    var slackUrl = 'https://hooks.slack.com/services/XXX/XXX/XXX';//set your slack API
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
    var rainFallChances = getTodaysRainFallChance(forecasts);
    console.log("rainFallChances");
    console.log(rainFallChances);
    if(willFallRain(rainFallChances)){
        var text = format(rainFallChances, obj);
        console.log("text");
        console.log(text);
        return sendToSlack(text);
    }else{
        return Promise.resolve("no rain");
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