import range from '../../core/range.js';
import record from '../../core/record.js';
import recordCacheFile from '../../helper/cache/record-cache.js';
import jsonFile from '../../helper/file/json-file.js';

let yearCache = (function () {
    const MAXIMUM_MONTHS = 12;
    const YEAR = 'year';

    let isSameMonth = function (first, second) {
        return first.getFullYear() === second.getFullYear() &&
            first.getMonth() === second.getMonth();
    }

    let isCurrentMonth = function (date) {
        return isSameMonth(date, new Date());
    }

    let createViews = function (records) {
        let months = [];
        for (const date of range.getMonths(MAXIMUM_MONTHS)) {
            months.push(record.createMonthlyRecord(date, records));
        }
        return months;
    }

    let updateViews = function (yearRecords, records) {
        let months = [];

        for (const date of range.getMonths(MAXIMUM_MONTHS)) {
            const existing = yearRecords.views.find(view => isSameMonth(view.timestamp, date));

            // A completed month is frozen once stored. Only the current month
            // is recalculated while new traffic is still arriving.
            if (isCurrentMonth(date)) {
                months.push(record.updateMonthlyRecord(date, records));
            } else if (existing) {
                months.push(existing);
            } else {
                // Needed only when the rolling 12-month view introduces a month
                // that is not already present in year.json.
                months.push(record.createMonthlyRecord(date, records));
            }
        }

        return months;
    }

    let readYearCacheFile = async function (repositoryName) {
        return await jsonFile.readCacheFile(repositoryName, YEAR);
    }

    let updateYearCacheFile = async function (repositoryName) {
        let records = await recordCacheFile.readRecordCacheFile(repositoryName);
        let yearRecords = await readYearCacheFile(repositoryName);

        if (records.status && yearRecords.status) {
            let yearViews = updateViews(yearRecords, records);
            await jsonFile.createCacheFile(repositoryName, YEAR, yearViews);
        } else if (records.status) {
            let yearViews = createViews(records);
            await jsonFile.createCacheFile(repositoryName, YEAR, yearViews);
        }
    }

    return {
        updateYearCacheFile: updateYearCacheFile,
        readYearCacheFile: readYearCacheFile
    };
})();

export default yearCache;
