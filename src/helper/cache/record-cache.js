const range = require('../../core/range');
const record = require('../../core/record');
const jsonFile = require('../../helper/file/json-file');
let recordCache = (function () {
    const MAXIMUM_DAYS = 365;
    const RECORDS = 'records';
    let updateViews = function (views, traffic) {
        let file = [];
        for (const date of range.getDates(MAXIMUM_DAYS)) {
            file.push(record.checkDailyRecord(views, date))
        }
        let update = [];
        for (const view of file) {
            update.push(record.updateDailyRecord(view, traffic))
        }
        return update;
    }
    let createViews = function (traffic) {
        let file = [];
        for (const date of range.getDates(MAXIMUM_DAYS)) {
            file.push(record.createDailyRecord(date, traffic))
        }
        return file;
    }
    let readRecordCacheFile = async function (repositoryName) {
       return await jsonFile.readCacheFile(repositoryName, RECORDS);
    }
    let updateRecordCacheFile = async function (repositoryName, traffic) {
        let records = await jsonFile.readCacheFile(repositoryName, RECORDS);
        if (records.status) {
            let recordViews = updateViews(records.views, traffic)
            await jsonFile.createCacheFile(repositoryName, RECORDS, recordViews)
        } else {
            let recordViews = createViews(traffic);
            await jsonFile.createCacheFile(repositoryName, RECORDS, recordViews)
        }
    }
    return {
        updateRecordCacheFile: updateRecordCacheFile,
        readRecordCacheFile: readRecordCacheFile
    };
})();
module.exports = recordCache;