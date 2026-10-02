import svg from '../../helper/svg/svg-file.js';
import svgFile from '../../helper/file/svg-file.js';
import recordSummaryFile from '../../helper/cache/summary-cache.js';
let summarySVG = (function () {
    const filename = 'badge';
    let updateSummarySVGFile = async function (repositoryName) {
        let summaryCache = await recordSummaryFile.readSummaryCacheFile(repositoryName);
        let object = await svg.create(summaryCache.views.summary.count)
        await svgFile.createBadgeSVGFile(repositoryName, filename, object);
    }
    return {
        updateSummarySVGFile: updateSummarySVGFile
    };
})();
export default summarySVG;
