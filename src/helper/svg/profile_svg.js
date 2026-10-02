import svg from '../../helper/svg/svg-file.js';
import svgFile from '../../helper/file/svg-file.js';
import recordSummaryFile from '../../helper/cache/summary-cache.js';
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
export default profileSVG;
