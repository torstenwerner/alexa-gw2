const fetch = require('node-fetch');
const _ = require('lodash');

const headers = {
    Authorization: "Bearer " + process.env.GW2TOKEN
};

export function isTokenConfigured() {
    return !!process.env.GW2TOKEN;
}

function findCoins(allItems) {
    return _.find(allItems, item => item.id == 1).value;
}

function asObject(coins) {
    return {
        gold: Math.trunc(coins / 10000),
        silver: Math.trunc(coins / 100) % 100,
        copper: coins % 100
    }
}

export function fetchCoins() {
    return fetch('https://api.guildwars2.com/v2/account/wallet', { headers })
        .then(result => result.json())
        .then(findCoins)
        .then(asObject);
};

function moreInfo(account) {
    account.shortName = _.split(account.name, '.')[0];
    const url = 'https://api.guildwars2.com/v2/worlds/' + account.world + '?lang=de';
    return fetch(url)
        .then(result => result.json())
        .then(world => world.name)
        .then(name => {
            account.worldName = name.replace(/ \[\w\w\]$/, '');
            return account;
        })
}

export function fetchAccount() {
    return fetch('https://api.guildwars2.com/v2/account', { headers })
        .then(result => result.json())
        .then(moreInfo);
};