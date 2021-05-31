const range = require('../../core/range');
const record = require('../../core/record');
const recordCacheFile = require('../../helper/cache/record-cache');
const jsonFile = require('../../helper/file/json-file');
let yearCache = (function () {
    const MAXIMUM_MONTHS = 12;
    const MINIMUM_MONTHS = 1;
    const YEAR = 'year';
    let updateViews = function (yearRecords, records) {
        let viewsFromFile = [];
        for (const date of range.getMonths(MAXIMUM_MONTHS)) {
            viewsFromFile.push(record.checkMonthlyRecord(date, yearRecords.views))
        }
        let updateMonth = [];
        for (const date of range.getMonths(MINIMUM_MONTHS)) {
            updateMonth.push(record.updateMonthlyRecord(date, records));
        }
        let updates = [];
        for (const view of viewsFromFile) {
            updates.push(record.checkMonthlyRecordUpdated(view, updateMonth));
        }
        return updates;
    }
    let createViews = function (records) {
        let month = [];
        for (const date of range.getMonths(MAXIMUM_MONTHS)) {
            month.push(record.createMonthlyRecord(date, records))
        }
        return month;
    }
    let readYearCacheFile = async function (repositoryName) {
        return await jsonFile.readCacheFile(repositoryName, YEAR);
    }
    let updateYearCacheFile = async function (repositoryName) {
        let records = await recordCacheFile.readRecordCacheFile(repositoryName);
        let yearRecords = await readYearCacheFile(repositoryName);
        if (records.status && yearRecords.status) {
            let yearViews = updateViews(yearRecords, records);
            await jsonFile.createCacheFile(repositoryName, YEAR, yearViews)
        } else {
            let yearViews = createViews(records);
            await jsonFile.createCacheFile(repositoryName, YEAR, yearViews)
        }
    }
    return {
        updateYearCacheFile: updateYearCacheFile,
        readYearCacheFile: readYearCacheFile
    };
})();
module.exports = yearCache;