'use strict'

const assert = require('assert');
const gw2 = require('../gw2');

describe('my wallet', function () {
    it('should have a reasonable amount of gold', function () {
        return gw2.fetchCoins()
            .then(item => item.gold)
            .then(gold => assert(gold > 100 && gold < 1000));
    });
});

describe('my account', function () {
    it('should return some information about me', function () {
        function check(account) {
            assert.equal(account.shortName, 'Bollin');
            assert.equal(account.world, "2201");
            assert.equal(account.worldName, "Kodasch");
            assert(account.wvw_rank > 740);
            return account;
        }

        return gw2.fetchAccount()
            .then(check);
    })
});
