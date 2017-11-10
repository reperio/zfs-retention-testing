const moment = require('moment');

class RetentionTesting {
    manipulateDate (date, timeFrame, number) {
        let newDate = date.clone();
        number = number - 1 || 0;
        if (number < 0) number = 0;

        //console.log("before change: " + newDate.format('LLL'));
        newDate.startOf(timeFrame);
        newDate.subtract(number, timeFrame + "s");
        //console.log("after change: " + newDate.format('LLL'));
        return newDate;
    }
    getStartOf15Minutes (date, number) {
        let newDate = date.clone();
        number = number - 1 || 0;
        if (number < 0) number = 0;

        //console.log("before change: " + newDate.format('LLL'));
        newDate.minutes(Math.floor(newDate.minutes() / 15) * 15);
        newDate.subtract(number * 15, "minutes");
        //console.log("after change: " + newDate.format('LLL'));
        return newDate;
    }
    getStartOfHour (date, number)  {
        return this.manipulateDate(date, "hour", number);
    }
    getStartOfDay (date, number)  {
        return this.manipulateDate(date, "day", number);
    }
    getStartOfWeek (date, number) {
        return this.manipulateDate(date, "week", number);
    }
    getStartOfMonth (date, number) {
        return this.manipulateDate(date, "month", number);
    }
    applyRetentionLogic (snapshots, date, retention_policy) {
        let snapshotsToKeep = [];
        let snapshotsToDelete = [];
        for(let policy of retention_policy.retentions){
            for(let num = 0; num < policy.retention; num++){

                //get starting point for search based on interval
                let newDate = null;
                switch (interval) {
                    case 'quater_hourly':
                        newDate = this.getStartOf15Minutes(date, num);
                        break;
                    case 'hourly':
                        newDate = this.getStartOfHour(date, num);
                        break;
                    case 'daily':
                        newDate = this.getStartOfDay(date, num);
                        break;
                    case 'weekly':
                        newDate = this.getStartOfWeek(date, num);
                        break;
                    case 'monthly':
                        newDate = this.getStartOfMonth(date, num);
                        break;
                }

                const policySnapshot = this.getFirstSnapshotAfterDate(snapshots, newDate);
                if (policySnapshot !== null) {
                    snapshotsToKeep.push(policySnapshot);
                }
            }
        }

        let policySnapshotIds = [];
        for (let i = 0; i < snapshotsToKeep.length; i++){
            policySnapshotIds.push(snapshotsToKeep[i].id);
        }

        for(let i = 0; i < snapshots.length; i++){
            if (!policySnapshotIds.contains(snapshots[i].id)){
                snapshotsToDelete.push(snapshots[i]);
            }
        }

        return {
            snapshotsToDelete: snapshotsToDelete,
            snapshotsToKeep: snapshotsToKeep
        };
    }

    getFirstSnapshotAfterDate (snapshots, date) {
        let startDate = date.clone();
        //startDate.subtract(1, "minutes");
        //console.log(startDate.format('LLL'));
        for (let i = 0; i < snapshots.length; i++) {
            if (moment.utc(snapshots[i].snapshot_date_time).valueOf() >= startDate.valueOf()){
                return snapshots[i];
            }
        }

        return null;
    }
    sortSnapshots(snapshots){
        return snapshots.sort(function(a,b) {
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

