const range = require('../../core/range');
const recordCacheFile = require('../../helper/cache/record-cache');
const jsonFile = require('../../helper/file/json-file');
const SummaryModel = require('../../model/cache/SummaryModel');
const SummaryFileModel = require('../../model/cache/SummaryFileModel');
let summaryCache = (function () {
    const SUMMARY = 'summary';
    let checkIfUpdated = function (date, timestamp) {
        let today = new Date();
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1)
        if (date.getFullYear() === timestamp.getFullYear() &&
            date.getMonth() === timestamp.getMonth() &&
            date.getDate() === timestamp.getDate()) {
            return false;
        } else {
            return !(date.getDate() === today.getDate() ||
                date.getDate() === yesterday.getDate());
        }
    }
    let updateViews = function (summaryCache, recordCache) {
        let timestamp = new Date(summaryCache.views.timestamp);
        let uniques = summaryCache.views.summary.uniques;
        let count = summaryCache.views.summary.count;
        let dateRange = [];
        for (const date of range.getRemainingDates(timestamp)) {
            if (checkIfUpdated(date, timestamp)) {
                dateRange.push(date)
            }
        }
        for (const record of recordCache) {
            for (const date of dateRange) {
                if (date.getFullYear() === record.timestamp.getFullYear() &&
                    date.getMonth() === record.timestamp.getMonth() &&
                    date.getDate() === record.timestamp.getDate()) {
                    timestamp = record.timestamp;
                    uniques = uniques + record.uniques;
                    count = count + record.count;
                }
            }
        }
        return { timestamp: timestamp, summary: new SummaryModel(uniques, count)}
    }
    let createViews = function (records) {
        let uniques = 0;
        let count = 0;
        for (const record of records) {
            uniques = uniques + record.uniques;
            count = count + record.count;
        }
        return new SummaryModel(uniques, count);
    }
    let readSummaryCacheFile = async function (repositoryName) {
        return await jsonFile.readSummaryCacheFile(repositoryName, SUMMARY);
    }
    let updateSummaryCacheFile = async function (repositoryName) {
        let recordsCache = await recordCacheFile.readRecordCacheFile(repositoryName);
        let summaryCache = await readSummaryCacheFile(repositoryName);
        if (recordsCache.status && summaryCache.status) {
            let summaryViews = updateViews(summaryCache, recordsCache.views);
            await jsonFile.createCacheFile(repositoryName, SUMMARY,summaryViews )
        } else {
            let view = recordsCache.views[recordsCache.views.length - 4]
            let summaryViews = new SummaryFileModel(new Date(view.timestamp), createViews(recordsCache.views));
            await jsonFile.createCacheFile(repositoryName, SUMMARY, summaryViews)
        }
    }
    return {
        updateSummaryCacheFile: updateSummaryCacheFile,
        readSummaryCacheFile: readSummaryCacheFile
    };
})();
module.exports = summaryCache;