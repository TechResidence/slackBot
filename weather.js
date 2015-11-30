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

var getForecast = function(obj) {
    var tokyoArea = obj.weatherforecast.pref[0].area[3];
    assert (tokyoArea.$.id === "東京地方");
    return tokyoArea.info;
};

var onSuccess = function(value) {
    console.log("onSuccess");
    console.log(value);
};

var onFailure = function(value) {
    console.log("onFailure");
    console.log(value);
};

var getTodaysRainFallChance = function(forecasts) {
    var today = new Date();
    today.setHours(today.getHours() + 9);
    var todayStr = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
    //var ss = _.filter(forecasts, function(v){
    //    return todayStr == todayStr;
    //});
    return forecasts[3].rainfallchance[0].period;
};

var isTodayWillFallRain = function(periods) {
    var ss = _.filter(periods, function(v){
       return Number(v._) >= 50;
    });
    return ss.length > 0;
};

var format = function(periods) {
    var ss = _.map(periods, function(v){
        return v.$.hour + "時は" + v._ + "％";
    });
    return _.reduce(ss, function(acc, v){
        return acc + "\n" + v;
    });
};

var weatherUrl = 'http://www.drk7.jp/weather/xml/13.xml';

var func = async (function () {
    var res = await(axios.get(weatherUrl, {}));
    var obj = await(xmlToJson(res.data));
    var forecasts = getForecast(obj);
    var rainFallChances = getTodaysRainFallChance(forecasts);
    if(isTodayWillFallRain(rainFallChances)){
        var text = format(rainFallChances);
        console.log("今日は雨が降りそうです。降水確率は、\n" + text);
    }else{
        console.log("no rain");
    }
});

func();