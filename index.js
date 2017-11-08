const moment = require('moment');
const uuid = require('uuid/v4');

function get_snapshots() {
    //start building snapshots on November 1st
    let start_date = moment("20170901T0000");
    let snapshots = [];
    for (let i = 0; i < 10000; i++){
        snapshots.push({
            id: uuid(),
            name: start_date.format("YYYYMMDDHHmm"),
            host_id: 0,
            snapshot_date_time: start_date.toDate()
        });

        start_date = start_date.add(moment.duration(15, "minutes"));
    }

    return snapshots;
}

function applyRetentionPolicies(snapshots, date) {

    for(let policy = 0; policy < retention_policy.retentions.length; policy++) {
        let interval = retention_policy.retentions[policy].interval;
        let retention_number = retention_policy.retentions[policy].retention;

        for(let r = 0; r < retention_number; r++) {
            let retention_date = date.clone();
            if (interval === 'quarter_hourly') {
                retention_date.minutes(Math.floor(retention_date.minutes() / 15) * 15);
                retention_date.subtract(r*15, "minutes");
            } else {
                let period = '';
                switch (interval) {
                    case 'hourly':
                        period = 'hour';
                        break;
                    case 'daily':
                        period = 'day';
                        break;
                    case 'weekly':
                        period = 'week';
                        break;
                    case 'monthly':
                        period = 'month';
                        break;
                }
                retention_date = retention_date.startOf(period);
                retention_date = retention_date.subtract(r, (period + "s"));
            }

            getFirstSnapshotAfterDate(snapshots, retention_date);
        }
    }
}

function getFirstSnapshotAfterDate(snapshots, date) {
    let closest_snapshot = snapshots[snapshots.length - 1];
    date = date.subtract(1, "minutes");
    for(let i = 0; i < snapshots.length; i++) {
        //only look at snapshots that are after the date
        if (snapshots[i].snapshot_date_time >= date.toDate()) {
            if (closest_snapshot.snapshot_date_time > snapshots[i].snapshot_date_time){
                closest_snapshot = snapshots[i];
            }
        }
    }

    return closest_snapshot.id;
}

const retention_policy = {
    retentions: [
        {
            interval: 'quarter_hourly',
            offset: 5,
            retention: 2
        },
        {
            interval: 'hourly',
            offset: 30,
            retention: 3
        },
        {
            interval: 'daily',
            offset: 0,
            retention: 2
        },
        {
            interval: 'weekly',
            offset: 0,
            retention: 2
        },
        {
            interval: 'monthly',
            offset: 0,
            retention: 2
        }
    ]
};

let snapshots = get_snapshots();
applyRetentionPolicies(snapshots);
