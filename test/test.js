const assert = require('assert');
const fs = require('fs');
const RetentionTesting = require('../index.js');
const moment = require('moment');



describe('Retention Tests', async function() {
    //load the test data
    this.test_data = JSON.parse(fs.readFileSync('./testing_data/test_data_no_errors.json', 'utf8'));
    this.retention_policy = JSON.parse(fs.readFileSync('./testing_data/retention_policy.json', 'utf8'));

    const retentionTestClass = new RetentionTesting();

    describe('Search Start Date Tests', () => {
        describe('15 Minute Intervals', () => {
            describe('Retention level: 1', () => {
                let minuteTests = [
                    {
                        givenDate: "2017-11-09 14:54",
                        expectedDate: "2017-11-09 14:45"
                    }, {
                        givenDate: "2017-11-09 14:45",
                        expectedDate: "2017-11-09 14:45"
                    }, {
                        givenDate: "2017-11-09 14:44",
                        expectedDate: "2017-11-09 14:30"
                    }, {
                        givenDate: "2017-11-09 14:34",
                        expectedDate: "2017-11-09 14:30"
                    }, {
                        givenDate: "2017-11-09 00:13",
                        expectedDate: "2017-11-09 00:00"
                    }
                ];

                for (let i = 0; i < minuteTests.length; i++) {
                    it(`(${minuteTests[i].givenDate}) should start searching for first snapshot at (${minuteTests[i].expectedDate})`, () => {
                        assert.equal(moment(minuteTests[i].expectedDate).valueOf(), retentionTestClass.getStartOf15Minutes(moment(minuteTests[i].givenDate), 1).valueOf());
                    });
                }
            });

            describe('Retention level: 2', () => {
                let minuteTests = [
                    {
                        givenDate: "2017-11-09 14:54",
                        expectedDate: "2017-11-09 14:30"
                    }, {
                        givenDate: "2017-11-09 14:45",
                        expectedDate: "2017-11-09 14:30"
                    }, {
                        givenDate: "2017-11-09 14:44",
                        expectedDate: "2017-11-09 14:15"
                    }, {
                        givenDate: "2017-11-09 14:12",
                        expectedDate: "2017-11-09 13:45"
                    }, {
                        givenDate: "2017-11-09 00:13",
                        expectedDate: "2017-11-08 23:45"
                    }
                ];

                for (let i = 0; i < minuteTests.length; i++) {
                    it(`(${minuteTests[i].givenDate}) should start searching for second snapshot at (${minuteTests[i].expectedDate})`, () => {
                        assert.equal(moment(minuteTests[i].expectedDate).valueOf(), retentionTestClass.getStartOf15Minutes(moment(minuteTests[i].givenDate), 2).valueOf());
                    });
                }
            });

            describe('Retention level: 3', () => {
                let minuteTests = [
                    {
                        givenDate: "2017-11-09 14:54",
                        expectedDate: "2017-11-09 14:15"
                    }, {
                        givenDate: "2017-11-09 14:45",
                        expectedDate: "2017-11-09 14:15"
                    }, {
                        givenDate: "2017-11-09 14:44",
                        expectedDate: "2017-11-09 14:00"
                    }, {
                        givenDate: "2017-11-09 14:34",
                        expectedDate: "2017-11-09 14:00"
                    }, {
                        givenDate: "2017-11-09 00:13",
                        expectedDate: "2017-11-08 23:30"
                    }
                    ];

                for (let i = 0; i < minuteTests.length; i++) {
                    it(`(${minuteTests[i].givenDate}) should start searching for third snapshot at (${minuteTests[i].expectedDate})`, () => {
                        assert.equal(moment(minuteTests[i].expectedDate).valueOf(), retentionTestClass.getStartOf15Minutes(moment(minuteTests[i].givenDate), 3).valueOf());
                    });
                }
            });
        });

        describe('Hourly Intervals', () => {
            describe('Retention level: 1', () => {
                let hourTests = [
                    {
                        givenDate: "2017-11-09 14:54",
                        expectedDate: "2017-11-09 14:00"
                    }, {
                        givenDate: "2017-11-09 14:47",
                        expectedDate: "2017-11-09 14:00"
                    }, {
                        givenDate: "2017-11-09 14:34",
                        expectedDate: "2017-11-09 14:00"
                    }, {
                        givenDate: "2017-11-09 14:23",
                        expectedDate: "2017-11-09 14:00"
                    }, {
                        givenDate: "2017-11-09 14:15",
                        expectedDate: "2017-11-09 14:00"
                    }
                ];

                for (let i = 0; i < hourTests.length; i++) {
                    it(`(${hourTests[i].givenDate}) should start searching for first snapshot at (${hourTests[i].expectedDate})`, () => {
                        assert.equal(moment(hourTests[i].expectedDate).valueOf(), retentionTestClass.getStartOfHour(moment(hourTests[i].givenDate), 1).valueOf());
                    });
                }
            });

            describe('Retention level: 2', () => {
                let hourTests = [
                    {
                        givenDate: "2017-11-09 14:54",
                        expectedDate: "2017-11-09 13:00"
                    }, {
                        givenDate: "2017-11-09 14:47",
                        expectedDate: "2017-11-09 13:00"
                    }, {
                        givenDate: "2017-11-09 14:34",
                        expectedDate: "2017-11-09 13:00"
                    }, {
                        givenDate: "2017-11-09 14:23",
                        expectedDate: "2017-11-09 13:00"
                    }, {
                        givenDate: "2017-11-09 00:15",
                        expectedDate: "2017-11-08 23:00"
                    }
                ];

                for (let i = 0; i < hourTests.length; i++) {
                    it(`(${hourTests[i].givenDate}) should start searching for second snapshot at (${hourTests[i].expectedDate})`, () => {
                        assert.equal(moment(hourTests[i].expectedDate).valueOf(), retentionTestClass.getStartOfHour(moment(hourTests[i].givenDate), 2).valueOf());
                    });
                }
            });

            describe('Retention level: 3', () => {
                let hourTests = [
                    {
                        givenDate: "2017-11-09 14:54",
                        expectedDate: "2017-11-09 12:00"
                    }, {
                        givenDate: "2017-11-09 14:47",
                        expectedDate: "2017-11-09 12:00"
                    }, {
                        givenDate: "2017-11-09 14:34",
                        expectedDate: "2017-11-09 12:00"
                    }, {
                        givenDate: "2017-11-09 14:23",
                        expectedDate: "2017-11-09 12:00"
                    }, {
                        givenDate: "2017-11-09 00:15",
                        expectedDate: "2017-11-08 22:00"
                    }
                ];

                for (let i = 0; i < hourTests.length; i++) {
                    it(`(${hourTests[i].givenDate}) should start searching for second snapshot at (${hourTests[i].expectedDate})`, () => {
                        assert.equal(moment(hourTests[i].expectedDate).valueOf(), retentionTestClass.getStartOfHour(moment(hourTests[i].givenDate), 3).valueOf());
                    });
                }
            });
        });

        describe('Daily Intervals', () => {
            describe('Retention level: 1', () => {
                let dayTests = [
                    {
                        givenDate: "2017-11-09 14:54",
                        expectedDate: "2017-11-09 00:00"
                    }, {
                        givenDate: "2017-11-09 14:47",
                        expectedDate: "2017-11-09 00:00"
                    }, {
                        givenDate: "2017-11-09 14:34",
                        expectedDate: "2017-11-09 00:00"
                    }, {
                        givenDate: "2017-11-09 14:23",
                        expectedDate: "2017-11-09 00:00"
                    }, {
                        givenDate: "2017-11-01 14:15",
                        expectedDate: "2017-11-01 00:00"
                    }
                ];

                for (let i = 0; i < dayTests.length; i++) {
                    it(`(${dayTests[i].givenDate}) should start searching for first snapshot at (${dayTests[i].expectedDate})`, () => {
                        assert.equal(moment(dayTests[i].expectedDate).valueOf(), retentionTestClass.getStartOfDay(moment(dayTests[i].givenDate), 1).valueOf());
                    });
                }
            });

            describe('Retention level: 2', () => {
                let dayTests = [
                    {
                        givenDate: "2017-11-09 14:54",
                        expectedDate: "2017-11-08 00:00"
                    }, {
                        givenDate: "2017-11-09 14:47",
                        expectedDate: "2017-11-08 00:00"
                    }, {
                        givenDate: "2017-11-09 14:34",
                        expectedDate: "2017-11-08 00:00"
                    }, {
                        givenDate: "2017-11-08 00:00",
                        expectedDate: "2017-11-07 00:00"
                    }, {
                        givenDate: "2017-11-01 00:15",
                        expectedDate: "2017-10-31 00:00"
                    }
                ];

                for (let i = 0; i < dayTests.length; i++) {
                    it(`(${dayTests[i].givenDate}) should start searching for second snapshot at (${dayTests[i].expectedDate})`, () => {
                        assert.equal(moment(dayTests[i].expectedDate).valueOf(), retentionTestClass.getStartOfDay(moment(dayTests[i].givenDate), 2).valueOf());
                    });
                }
            });

            describe('Retention level: 3', () => {
                let dayTests = [
                    {
                        givenDate: "2017-11-09 14:54",
                        expectedDate: "2017-11-07 00:00"
                    }, {
                        givenDate: "2017-11-09 14:47",
                        expectedDate: "2017-11-07 00:00"
                    }, {
                        givenDate: "2017-11-09 14:34",
                        expectedDate: "2017-11-07 00:00"
                    }, {
                        givenDate: "2017-11-09 00:00",
                        expectedDate: "2017-11-07 00:00"
                    }, {
                        givenDate: "2017-11-01 00:15",
                        expectedDate: "2017-10-30 00:00"
                    }
                ];

                for (let i = 0; i < dayTests.length; i++) {
                    it(`(${dayTests[i].givenDate}) should start searching for second snapshot at (${dayTests[i].expectedDate})`, () => {
                        assert.equal(moment(dayTests[i].expectedDate).valueOf(), retentionTestClass.getStartOfDay(moment(dayTests[i].givenDate), 3).valueOf());
                    });
                }
            });
        });

        describe('Weekly Intervals', () => {
            describe('Retention level: 1', () => {
                let weekTests = [
                    {
                        givenDate: "2017-11-09 14:54",
                        expectedDate: "2017-11-05 00:00"
                    }, {
                        givenDate: "2017-11-10 14:47",
                        expectedDate: "2017-11-05 00:00"
                    }, {
                        givenDate: "2017-11-06 14:34",
                        expectedDate: "2017-11-05 00:00"
                    }, {
                        givenDate: "2017-11-05 14:23",
                        expectedDate: "2017-11-05 00:00"
                    }, {
                        givenDate: "2017-11-01 14:15",
                        expectedDate: "2017-10-29 00:00"
                    }
                ];

                for (let i = 0; i < weekTests.length; i++) {
                    it(`(${weekTests[i].givenDate}) should start searching for first snapshot at (${weekTests[i].expectedDate})`, () => {
                        assert.equal(moment(weekTests[i].expectedDate).valueOf(), retentionTestClass.getStartOfWeek(moment(weekTests[i].givenDate), 1).valueOf());
                    });
                }
            });

            describe('Retention level: 2', () => {
                let weekTests = [
                    {
                        givenDate: "2017-11-09 14:54",
                        expectedDate: "2017-10-29 00:00"
                    }, {
                        givenDate: "2017-11-10 14:47",
                        expectedDate: "2017-10-29 00:00"
                    }, {
                        givenDate: "2017-11-06 14:34",
                        expectedDate: "2017-10-29 00:00"
                    }, {
                        givenDate: "2017-11-05 14:23",
                        expectedDate: "2017-10-29 00:00"
                    }, {
                        givenDate: "2017-11-01 14:15",
                        expectedDate: "2017-10-22 00:00"
                    }
                ];

                for (let i = 0; i < weekTests.length; i++) {
                    it(`(${weekTests[i].givenDate}) should start searching for second snapshot at (${weekTests[i].expectedDate})`, () => {
                        assert.equal(moment(weekTests[i].expectedDate).valueOf(), retentionTestClass.getStartOfWeek(moment(weekTests[i].givenDate), 2).valueOf());
                    });
                }
            });

            describe('Retention level: 3', () => {
                let weekTests = [
                    {
                        givenDate: "2017-11-09 14:54",
                        expectedDate: "2017-10-22 00:00"
                    }, {
                        givenDate: "2017-11-10 14:47",
                        expectedDate: "2017-10-22 00:00"
                    }, {
                        givenDate: "2017-11-06 14:34",
                        expectedDate: "2017-10-22 00:00"
                    }, {
                        givenDate: "2017-11-05 14:23",
                        expectedDate: "2017-10-22 00:00"
                    }, {
                        givenDate: "2017-11-01 14:15",
                        expectedDate: "2017-10-15 00:00"
                    }
                ];

                for (let i = 0; i < weekTests.length; i++) {
                    it(`(${weekTests[i].givenDate}) should start searching for second snapshot at (${weekTests[i].expectedDate})`, () => {
                        assert.equal(moment(weekTests[i].expectedDate).valueOf(), retentionTestClass.getStartOfWeek(moment(weekTests[i].givenDate), 3).valueOf());
                    });
                }
            });
        });

        describe('Monthly Intervals', () => {
            describe('Retention level: 1', () => {
                let monthTests = [
                    {
                        givenDate: "2017-11-15 14:54",
                        expectedDate: "2017-11-01 00:00"
                    }, {
                        givenDate: "2017-11-18 14:47",
                        expectedDate: "2017-11-01 00:00"
                    }, {
                        givenDate: "2017-11-30 23:59",
                        expectedDate: "2017-11-01 00:00"
                    }, {
                        givenDate: "2017-11-02 14:23",
                        expectedDate: "2017-11-01 00:00"
                    }, {
                        givenDate: "2017-01-01 00:00",
                        expectedDate: "2017-01-01 00:00"
                    }
                ];

                for (let i = 0; i < monthTests.length; i++) {
                    it(`(${monthTests[i].givenDate}) should start searching for first snapshot at (${monthTests[i].expectedDate})`, () => {
                        assert.equal(moment(monthTests[i].expectedDate).valueOf(), retentionTestClass.getStartOfMonth(moment(monthTests[i].givenDate), 1).valueOf());
                    });
                }
            });

            describe('Retention level: 2', () => {
                let monthTests = [
                    {
                        givenDate: "2017-11-15 14:54",
                        expectedDate: "2017-10-01 00:00"
                    }, {
                        givenDate: "2017-11-18 14:47",
                        expectedDate: "2017-10-01 00:00"
                    }, {
                        givenDate: "2017-11-30 23:59",
                        expectedDate: "2017-10-01 00:00"
                    }, {
                        givenDate: "2017-11-02 14:23",
                        expectedDate: "2017-10-01 00:00"
                    }, {
                        givenDate: "2017-01-01 00:00",
                        expectedDate: "2016-12-01 00:00"
                    }
                ];

                for (let i = 0; i < monthTests.length; i++) {
                    it(`(${monthTests[i].givenDate}) should start searching for second snapshot at (${monthTests[i].expectedDate})`, () => {
                        assert.equal(moment(monthTests[i].expectedDate).valueOf(), retentionTestClass.getStartOfMonth(moment(monthTests[i].givenDate), 2).valueOf());
                    });
                }
            });

            describe('Retention level: 3', () => {
                let monthTests = [
                    {
                        givenDate: "2017-11-15 14:54",
                        expectedDate: "2017-09-01 00:00"
                    }, {
                        givenDate: "2017-11-18 14:47",
                        expectedDate: "2017-09-01 00:00"
                    }, {
                        givenDate: "2017-11-30 23:59",
                        expectedDate: "2017-09-01 00:00"
                    }, {
                        givenDate: "2017-11-02 14:23",
                        expectedDate: "2017-09-01 00:00"
                    }, {
                        givenDate: "2017-01-01 00:00",
                        expectedDate: "2016-11-01 00:00"
                    }
                ];

                for (let i = 0; i < monthTests.length; i++) {
                    it(`(${monthTests[i].givenDate}) should start searching for second snapshot at (${monthTests[i].expectedDate})`, () => {
                        assert.equal(moment(monthTests[i].expectedDate).valueOf(), retentionTestClass.getStartOfMonth(moment(monthTests[i].givenDate), 3).valueOf());
                    });
                }
            });
        });
    });


    describe('Find first snapshot tests', () => {
        let firstSnapshotTests = [
            {
                startDate: "2017-09-01 04:00",
                expectedId: "d96b555a-fcb2-4ff0-a917-155b5fcb18eb"
            }
        ];

        //let sortedData = retentionTestClass.sortSnapshots(this.test_data);

        for (let i = 0; i < firstSnapshotTests.length; i++) {
            it(`Looking for first snapshot after (${firstSnapshotTests[i].startDate}), should have id (${firstSnapshotTests[i].expectedId})`, () => {
                assert.equal(firstSnapshotTests[i].expectedId, retentionTestClass.getFirstSnapshotAfterDate(this.test_data, moment.utc(firstSnapshotTests[i].startDate)).id);
            });
        }
    });
});