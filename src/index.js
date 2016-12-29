'use strict';

const Alexa = require("alexa-sdk");
const gw2 = require('./gw2');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('TellCoins');
    },
    'CoinIntent': function () {
        this.emit('TellCoins')
    },
    'TellCoins': function () {
        gw2.fetchCoins()
            .then(coins => `Du besitzt ${coins.gold} Gold, ${coins.silver} Silber und ${coins.copper} Bronze.`)
            .then(message => this.emit(':tell', message));
    },
    'AccountIntent': function () {
        gw2.fetchAccount()
            .then(account => `Hallo ${account.shortName}! Du spielst in der Welt ${account.worldName} und hast den WVW-Rang ${account.wvw_rank}.`)
            .then(message => this.emit(':tell', message));
    }
};