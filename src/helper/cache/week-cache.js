const range = require('../../core/range');
const record = require('../../core/record');
const recordCacheFile = require('../../helper/cache/record-cache');
const jsonFile = require('../../helper/file/json-file');
let weekCache = (function () {
    const MAXIMUM_DAYS = 7;
    const WEEK = 'week';
    let createViews = function (records) {
        let week = [];
        for (const date of range.getDates(MAXIMUM_DAYS)) {
            week.push(record.createDailyRecord(date, records))
        }
        return week;
    }
    let readWeekCacheFile = async function (repositoryName) {
        return await jsonFile.readCacheFile(repositoryName, WEEK);
    }
    let updateWeekCacheFile = async function (repositoryName) {
        let records = await recordCacheFile.readRecordCacheFile(repositoryName);
        if (records.status) {
            let weekViews = createViews(records);
            await jsonFile.createCacheFile(repositoryName, WEEK, weekViews)
        }
    }
    return {
        updateWeekCacheFile: updateWeekCacheFile,
        readWeekCacheFile: readWeekCacheFile
    };
})();
module.exports = weekCache;