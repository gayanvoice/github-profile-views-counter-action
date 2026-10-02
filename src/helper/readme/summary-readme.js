import markdownTemplate from './markdown-template.js';
import markdownFile from '../file/markdown-file.js';
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
export default summaryReadme;
