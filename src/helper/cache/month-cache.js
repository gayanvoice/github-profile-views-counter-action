import range from '../../core/range.js';
import record from '../../core/record.js';
import recordCacheFile from '../../helper/cache/record-cache.js';
import jsonFile from '../../helper/file/json-file.js';
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
export default monthCache;
