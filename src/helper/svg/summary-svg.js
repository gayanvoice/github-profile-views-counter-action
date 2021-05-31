const svg = require('../../helper/svg/svg-file');
const svgFile = require('../../helper/file/svg-file');
const recordSummaryFile = require('../../helper/cache/summary-cache');
let summarySVG = (function () {
    const filename = 'badge';
    let updateSummarySVGFile = async function (repositoryName) {
        let summaryCache = await recordSummaryFile.readSummaryCacheFile(repositoryName);
        let object = await svg.create(summaryCache.views.summary.count)
        await svgFile.createSVGFile(repositoryName, filename, object);
    }
    return {
        updateSummarySVGFile: updateSummarySVGFile
    };
})();
module.exports = summarySVG;