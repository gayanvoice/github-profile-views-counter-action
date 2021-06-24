const markdownTemplate = require('./markdown-template');
const markdownFile = require('../file/markdown-file');
let summaryReadme = (function () {
    let updateSummaryMarkDownFileAdvanced = async function (response, request) {
        let object = await markdownTemplate.createSummaryMarkDownTemplateAdvanced(response, request.insightsRepository)
        await markdownFile.createSummaryMarkDownFile(object);
    }
    let updateSummaryMarkDownFileBasic = async function (response, request) {
        let object = await markdownTemplate.createSummaryMarkDownTemplateBasic(response, request.insightsRepository)
        await markdownFile.createSummaryMarkDownFile(object);
    }
    return {
        updateSummaryMarkDownFileAdvanced: updateSummaryMarkDownFileAdvanced,
        updateSummaryMarkDownFileBasic: updateSummaryMarkDownFileBasic
    };
})();
module.exports = summaryReadme;