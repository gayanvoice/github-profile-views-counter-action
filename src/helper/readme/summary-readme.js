const markdownTemplate = require('./markdown-template');
const markdownFile = require('../file/markdown-file');
let summaryReadme = (function () {
    let updateSummaryMarkDownFile = async function (response, request) {
        let object = await markdownTemplate.createSummaryMarkDownTemplate(response, request.insightsRepository)
        await markdownFile.createSummaryMarkDownFile(object);
    }
    return {
        updateSummaryMarkDownFile: updateSummaryMarkDownFile
    };
})();
module.exports = summaryReadme;