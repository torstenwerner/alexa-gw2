'use strict'

const should = require('chai').should();
const gw2 = require('../gw2');

describe('GW2TOKEN', function () {
    it('must be configured', function () {
        gw2.isTokenConfigured().should.be.true;
    });
});

describe('my wallet', function () {
    it('should have a reasonable amount of gold', function () {
        return gw2.fetchCoins()
            .then(item => item.gold)
            .then(gold => gold.should.be.above(100).and.below(1000));
    });
});

describe('my account', function () {
    it('should return some information about me', function () {
        function check(account) {
            account.shortName.should.be.equal('Bollin');
            account.world.should.be.equal(2201);
            account.worldName.should.be.equal("Kodasch");
            account.wvw_rank.should.be.above(740);
            return account;
        }

        return gw2.fetchAccount()
            .then(check);
    })
});
