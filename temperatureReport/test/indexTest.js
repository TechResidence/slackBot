'use strict';
require('es6-promise').polyfill();

var index = require('../index');
var assert = require('power-assert');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

var onFailure = function(value) {
    console.log(value);
};

describe('index', function() {
    describe('sendToSlack()', function () {
        it('simple', function () {
            var promise = index.sendToSlack("test");
            return promise.then(function (value) {
                assert(value.status === 200);
            }).catch(onFailure);
        });
    });

    describe('getWeatherAPI()', function () {
        it('simple', function () {
            var promise = index.getWeatherAPI();
            return promise.then(function (value) {
                assert(value.status === 200);
            }).catch(onFailure);
        });
    });

    describe('integrationTest', function () {
        it('simple', function () {
            var func = async (function () {
                var res = await(index.getWeatherAPI());
                var obj = await(index.xmlToJson(res.data));
                var forecasts = index.getForecast(obj);
                var rainFallChances = index.getTodaysRainFallChance(forecasts);
                if(index.willFallRain(rainFallChances)){
                    var text = index.format(rainFallChances, obj);
                    return index.sendToSlack(text);
                }else{
                    return Promise.resolve("no rain");
                }
            });
            return func().then(function (value) {
                assert(value === "no rain");
            }).catch(onFailure);
        });
    });

});