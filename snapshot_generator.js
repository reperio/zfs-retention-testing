const moment = require('moment');
const uuid = require('uuid/v4');

function get_snapshots() {
    //start building snapshots on November 1st
    let start_date = moment.utc(moment("20170901T0000Z"));

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

console.log(JSON.stringify(get_snapshots()));