import markdownTemplate from './markdown-template.js';
import markdownFile from '../file/markdown-file.js';
import monthCache from '../../helper/cache/month-cache.js';
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
export default weekReadme;
