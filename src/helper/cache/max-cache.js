const range = require('../../core/range');
const record = require('../../core/record');
const recordCacheFile = require('../../helper/cache/record-cache');
const jsonFile = require('../../helper/file/json-file');
let maxCache = (function () {
    const MAXIMUM_MONTHS = 60;
    const UPDATE_MINIMUM_MONTHS = 1;
    const MAX = 'max';
    let updateViews = function (maxRecords, records) {
        let viewsFromFile = [];
        for (const date of range.getMonths(MAXIMUM_MONTHS)) {
            viewsFromFile.push(record.checkMonthlyRecord(date, maxRecords.views))
        }
        let updateMonth = [];
        for (const date of range.getMonths(UPDATE_MINIMUM_MONTHS)) {
            updateMonth.push(record.updateMonthlyRecord(date, records));
        }
        let updates = [];
        for (const view of viewsFromFile) {
            updates.push(record.checkMonthlyRecordUpdated(view, updateMonth));
        }
        return updates;
    }
    let createViews = function (records) {
        let max = [];
        for (const date of range.getMonths(MAXIMUM_MONTHS)) {
            max.push(record.createMonthlyRecord(date, records))
        }
        return max;
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
        } else {
            let maxViews = createViews(records);
            await jsonFile.createCacheFile(repositoryName, MAX, maxViews)
        }
    }
    return {
        updateMaxCacheFile: updateMaxCacheFile,
        readMaxCacheFile: readMaxCacheFile
    };
})();
module.exports = maxCache;