import record from '../../core/record.js';
import recordCacheFile from '../../helper/cache/record-cache.js';
import jsonFile from '../../helper/file/json-file.js';
let maxCache = (function () {
    const MAX = 'max';
    let isSameMonth = function (first, second) {
        return first.getFullYear() === second.getFullYear() &&
            first.getMonth() === second.getMonth();
    }
    let isCurrentMonth = function (date) {
        const today = new Date();
        return isSameMonth(date, today);
    }
    let sortViews = function (views) {
        return views.sort((first, second) => first.timestamp - second.timestamp);
    }
    let getRecordMonths = function (records) {
        let months = [];
        for (const view of records.views) {
            const month = new Date(view.timestamp.getFullYear(), view.timestamp.getMonth(), 1);
            if (!months.some(date => isSameMonth(date, month))) {
                months.push(month);
            }
        }
        return months;
    }
    let updateViews = function (maxRecords, records) {
        let updates = [...maxRecords.views];
        for (const date of getRecordMonths(records)) {
            const index = updates.findIndex(view => isSameMonth(view.timestamp, date));
            if (index === -1) {
                updates.push(record.createMonthlyRecord(date, records));
            } else if (isCurrentMonth(date)) {
                updates[index] = record.updateMonthlyRecord(date, records);
            }
        }
        return sortViews(updates);
    }
    let createViews = function (records) {
        let max = [];
        for (const date of getRecordMonths(records)) {
            max.push(record.createMonthlyRecord(date, records))
        }
        return sortViews(max);
    }
    let readMaxCacheFile = async function (repositoryName) {
        return await jsonFile.readCacheFile(repositoryName, MAX);
    }
    let updateMaxCacheFile = async function (repositoryName) {
        let records = await recordCacheFile.readRecordCacheFile(repositoryName);
        let maxRecords = await readMaxCacheFile(repositoryName);
        if (records.status && maxRecords.status) {
            let maxViews = updateViews(maxRecords, records);
            await jsonFile.createCacheFile(repositoryName, MAX, maxViews)
        } else if (records.status) {
            let maxViews = createViews(records);
            await jsonFile.createCacheFile(repositoryName, MAX, maxViews)
        }
    }
    return {
        updateMaxCacheFile: updateMaxCacheFile,
        readMaxCacheFile: readMaxCacheFile
    };
})();
export default maxCache;
