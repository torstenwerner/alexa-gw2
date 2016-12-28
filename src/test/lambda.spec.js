'use strict'

const AWS = require('aws-sdk');
const assert = require('assert');

function getBasePayload() {
    return {
        session: {
            new: false,
            sessionId: "amzn1.echo-api.session.[unique-value-here]",
            attributes: {
            },
            user: {
                userId: "amzn1.ask.account.[unique-value-here]"
            },
            application: {
                applicationId: "amzn1.ask.skill.[unique-value-here]"
            }
        },
        version: "1.0",
        request: {
            locale: "en-US",
            timestamp: "2016-10-27T21:06:28Z",
            type: "IntentRequest",
            intent: {
                name: "CoinIntent"
            },
            requestId: "amzn1.echo-api.request.[unique-value-here]"
        },
        context: {
            AudioPlayer: {
                playerActivity: "IDLE"
            },
            System: {
                device: {
                    supportedInterfaces: {
                        AudioPlayer: {}
                    }
                },
                application: {
                    applicationId: "amzn1.ask.skill.[unique-value-here]"
                },
                user: {
                    userId: "amzn1.ask.account.[unique-value-here]"
                }
            }
        }
    }
}

const lambda = new AWS.Lambda({
    region: 'eu-west-1'
});

function launchCheck(err, data, regex) {
    assert.ifError(err);
    assert.equal(data.StatusCode, 200);
    const payload = JSON.parse(data.Payload);
    assert.equal(payload.response.outputSpeech.type, 'SSML');
    const outputSsml = payload.response.outputSpeech.ssml;
    assert(outputSsml.search(regex) >= 0);
    assert.equal(payload.response.shouldEndSession, true);
};

describe('the CoinIntent', function () {
    this.timeout(5000);

    it('should tell the amount of gold', function (done) {
        const params = {
            FunctionName: 'GuildWars',
            Payload: JSON.stringify(getBasePayload())
        };
        lambda.invoke(params, function (err, data) {
            const regex = /Du besitzt \d+ Gold, \d+ Silber und \d+ Bronze\./;
            launchCheck(err, data, regex);
            done();
        });
    });
});

describe('the AccountIntent', function () {
    this.timeout(5000);

    it('should present some account data', function (done) {
        const payload = getBasePayload();
        payload.request.intent.name = 'AccountIntent';
        const params = {
            FunctionName: 'GuildWars',
            Payload: JSON.stringify(payload)
        };
        lambda.invoke(params, function (err, data) {
            const regex = /Hallo \w+! Du spielst in der Welt \w+ und hast den WVW-Rang \d+\./;
            launchCheck(err, data, regex);
            done();
        });
    });
});
