import range from '../../core/range.js';
import record from '../../core/record.js';
import recordCacheFile from '../../helper/cache/record-cache.js';
import jsonFile from '../../helper/file/json-file.js';
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
export default weekCache;
