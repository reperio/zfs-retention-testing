var assert = require('assert');
var uuid = require('uuid/v4');
var moment = require('moment');


describe('Retention', function() {
    const retention_policy = {
        retentions: [
            {
                interval: 15,
                offset: 5,
                retention: 1
            },
            {
                interval: 60,
                offset: 30,
                retention: 1
            },
            {
                interval: 'daily',
                offset: 0,
                retention: 1
            },
            {
                interval: 'weekly',
                offset: 0,
                retention: 1
            },
            {
                interval: 'monthly',
                offset: 0,
                retention: 1
            }
        ]
    };

    const snapshots = get_snapshots();
});


/*
describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1,2,3].indexOf(4));
        });
    });
});
*/