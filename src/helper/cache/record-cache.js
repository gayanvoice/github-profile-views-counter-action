import record from '../../core/record.js';
import jsonFile from '../../helper/file/json-file.js';

let recordCache = (function () {
    const RECORDS = 'records';

    let isSameDay = function (first, second) {
        return first.getFullYear() === second.getFullYear() &&
            first.getMonth() === second.getMonth() &&
            first.getDate() === second.getDate();
    }

    let isCurrentMonth = function (date) {
        const today = new Date();
        return date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth();
    }

    let sortViews = function (views) {
        return views.sort((first, second) => first.timestamp - second.timestamp);
    }

    let updateViews = function (views, traffic) {
        let update = [];

        for (const view of views) {
            // Historical/closed months are immutable. Only records belonging to
            // the current month may be refreshed from GitHub traffic data.
            if (isCurrentMonth(view.timestamp)) {
                update.push(record.updateDailyRecord(view, traffic));
            } else {
                update.push(view);
            }
        }

        // Append traffic dates that do not exist yet. This keeps records.json
        // as an unlimited all-time daily history instead of a rolling window.
        for (const trafficView of traffic.views) {
            let exists = update.some(view => isSameDay(view.timestamp, trafficView.timestamp));
            if (!exists) {
                update.push(trafficView);
            }
        }

        return sortViews(update);
    }

    let createViews = function (traffic) {
        return sortViews([...traffic.views]);
    }

    let readRecordCacheFile = async function (repositoryName) {
       return await jsonFile.readCacheFile(repositoryName, RECORDS);
    }

    let updateRecordCacheFile = async function (repositoryName, traffic) {
        let records = await jsonFile.readCacheFile(repositoryName, RECORDS);
        if (records.status) {
            let recordViews = updateViews(records.views, traffic);
            await jsonFile.createCacheFile(repositoryName, RECORDS, recordViews);
        } else {
            let recordViews = createViews(traffic);
            await jsonFile.createCacheFile(repositoryName, RECORDS, recordViews);
        }
    }

    return {
        updateRecordCacheFile: updateRecordCacheFile,
        readRecordCacheFile: readRecordCacheFile
    };
})();

export default recordCache;
