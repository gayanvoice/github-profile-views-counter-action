const svg = require('../../helper/svg/svg-file');
const svgFile = require('../../helper/file/svg-file');
const recordSummaryFile = require('../../helper/cache/summary-cache');
let profileSVG = function () {
    let updateProfileSVGFile = async function (response) {
        let numberOfViews = 0;
        for (const repository of response) {
            let summaryCache = await recordSummaryFile.readSummaryCacheFile(repository.repositoryId);
            numberOfViews = numberOfViews + summaryCache.views.summary.count;
        }
        let object = await svg.create(numberOfViews)
        await svgFile.createProfileSVGFile(object);
    }
    return {
        updateProfileSVGFile: updateProfileSVGFile
    };
}();
module.exports = profileSVG;