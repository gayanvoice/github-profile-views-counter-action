const markdownTemplate = require('./markdown-template');
const markdownFile = require('../file/markdown-file');
const yearCache = require('../../helper/cache/year-cache');
let yearReadme = (function () {
    const YEAR = 'year';
    let updateYearMarkDownFile = async function (response, request) {
        let year = await yearCache.readYearCacheFile(response.repositoryId);
        let object = await markdownTemplate.createListMarkDownTemplate(year.views, 'Year', response, request)
        await markdownFile.createListMarkDownFile(response.repositoryId, YEAR, object);
    }
    return {
        updateYearMarkDownFile: updateYearMarkDownFile
    };
})();
module.exports = yearReadme;