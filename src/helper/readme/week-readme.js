const markdownTemplate = require('./markdown-template');
const markdownFile = require('../file/markdown-file');
const weekCache = require('../../helper/cache/week-cache');
let weekReadme = (function () {
    const filename = 'week';
    let updateWeekMarkDownFile = async function (response, request) {
        let week = await weekCache.readWeekCacheFile(response.repositoryId);
        let object = await markdownTemplate.createListMarkDownTemplate(week.views, 'Week', response, request)
        await markdownFile.createListMarkDownFile(response.repositoryId, filename, object);
    }
    return {
        updateWeekMarkDownFile: updateWeekMarkDownFile
    };
})();
module.exports = weekReadme;