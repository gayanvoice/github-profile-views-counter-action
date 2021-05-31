const range = require('../../core/range');
const record = require('../../core/record');
const recordCacheFile = require('../../helper/cache/record-cache');
const jsonFile = require('../../helper/file/json-file');
let monthCache = (function () {
    const DAYS = 30;
    const MONTH = 'month';
    let createViews = function (records) {
        let month = [];
        for (const date of range.getDates(DAYS)) {
            month.push(record.createDailyRecord(date, records))
        }
        return month;
    }
    let readMonthCacheFile = async function (repositoryName) {
        return await jsonFile.readCacheFile(repositoryName, MONTH);
    }
    let updateMonthCacheFile = async function (repositoryName) {
        let records = await recordCacheFile.readRecordCacheFile(repositoryName);
        if (records.status) {
            let monthViews = createViews(records);
            await jsonFile.createCacheFile(repositoryName, MONTH, monthViews)
        }
    }
    return {
        updateMonthCacheFile: updateMonthCacheFile,
        readMonthCacheFile: readMonthCacheFile
    };
})();
module.exports = monthCache;