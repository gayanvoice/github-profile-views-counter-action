const markdownTemplate = require('./markdown-template');
const markdownFile = require('../file/markdown-file');
const monthCache = require('../../helper/cache/month-cache');
let weekReadme = (function () {
    const MONTH = 'month';
    let updateMonthMarkDownFile = async function (response, request) {
        let month = await monthCache.readMonthCacheFile(response.repositoryId);
        let object = await markdownTemplate.createListMarkDownTemplate(month.views, 'Month', response, request)
        await markdownFile.createListMarkDownFile(response.repositoryId, MONTH, object);
    }
    return {
        updateMonthMarkDownFile: updateMonthMarkDownFile
    };
})();
module.exports = weekReadme;