const moment = require('moment');
const _ = require('lodash');

class RetentionTesting {
    getStartOfQuarterHour (date, iteration) {
        const target = moment(date);
        let current = moment().add(1, 'hours').startOf('hour');

        while (current.isAfter(target)) {
            current = current.subtract(15, 'minutes');
        }

        current = current.subtract(iteration * 15, 'minutes');
        
        return current;
    }
    getStartOfHour (date, iteration) {
        return moment(date).startOf('hour').subtract(iteration, 'hours');
    }
    getStartOfDay (date, iteration) {
        return moment(date).startOf('day').subtract(iteration, 'days');
    }
    getStartOfWeek (date, iteration) {
        return moment(date).startOf('week').subtract(iteration, 'weeks');
    }
    getStartOfMonth (date, iteration) {
        return moment(date).startOf('month').subtract(iteration, 'months');
    }

    find_retention_target_date (interval, iteration) {
        const now = moment();
        switch (interval) {
            case 'quarter_hourly':
                return this.getStartOfQuarterHour(now, iteration);
            case 'hourly':
                return this.getStartOfHour(now, iteration);
            case 'daily':
                return this.getStartOfDay(now, iteration);
            case 'weekly':
                return this.getStartOfWeek(now, iteration);
            case 'monthly':
                return this.getStartOfMonth(now, iteration);
            default:
                throw new Error('Invalid retention interval');
        }
    }

    get_snapshots_to_delete (snapshots, retention_policy) {
        for(let retention of retention_policy.retentions) {
            for(let iteration = 0; iteration <= retention.retention; iteration++) {
                let target_date = this.find_retention_target_date(retention.interval, iteration);

                const policySnapshot = this.getFirstSnapshotAfterDate(snapshots, target_date);
                
                if (policySnapshot) {
                    policySnapshot.keep = true;
                }
            }
        }

        let snapshotsToDelete = _.filter(snapshots, function(snapshot) {
            return !snapshot.keep;
        });

        return snapshotsToDelete;
    }

    getFirstSnapshotAfterDate (snapshots, date) {
        let startDate = date.clone();

        for (let i = 0; i < snapshots.length; i++) {
            if (moment.utc(snapshots[i].snapshot_date_time).valueOf() >= startDate.valueOf()) {
                return snapshots[i];
            }
        }

        return null;
    }
    sortSnapshots(snapshots) {
        return snapshots.sort(function(a, b) {
            return moment().utc(a.snapshot_date_time).valueOf() - moment().utc(b.snapshot_date_time).valueOf();
        });
    }
}

module.exports = RetentionTesting;

/*
* Options
*   1) Sort array by date, find the first entry that is >= startDate
*   2) Set closest_snapshot to snapshots[snapshots.length - 1], loop over snapshots, test if closest_snapshot is > snapshots[i] if snapshots[i] is >= startDate
*
*/


/**
 * {
    retentions: [
        {
            interval: quater_hourly,
            retention: 1
        },
        {
            interval: hourly,
            retention: 1
        },
        {
            interval: daily,
            retention: 1
        },
        {
            interval: weekly,
            retention: 1
        },
        {
            interval: monthly,
            retention: 1
        }
    ]
}
 */

