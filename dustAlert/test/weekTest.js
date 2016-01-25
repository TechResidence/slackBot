'use strict';

var week = require('../src/week');
var assert = require('power-assert');

describe('week', function(){
    describe('calcText()', function(){
        it('Tue', function(){
            var date = new Date('Mon, 30 Nov 2015 22:00:00');
            var str = week.calcText(date);
            assert(str === "明日 ハ 「可燃ゴミ」 ノ 日デス");
        });

        it('1st Wed', function(){
            var date = new Date('Tue, 1 Dec 2015 22:00:00');
            var str = week.calcText(date);
            assert(str === "明日 ハ 「不燃ゴミ」 ノ 日デス");
        });

        it('2nd Wed', function(){
            var date = new Date('Tue, 8 Dec 2015 22:00:00');
            var str = week.calcText(date);
            assert(str === null);
        });

        it('Thu', function(){
            var date = new Date('Thu, 2 Dec 2015 22:00:00');
            var str = week.calcText(date);
            assert(str === "明日 ハ 「資源ゴミ」 ノ 日デス");
        });

        it('Fri', function(){
            var date = new Date('Fri, 3 Dec 2015 22:00:00');
            var str = week.calcText(date);
            assert(str === "明日 ハ 「可燃ゴミ」 ノ 日デス");
        });
    });
});