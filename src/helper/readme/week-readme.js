import markdownTemplate from './markdown-template.js';
import markdownFile from '../file/markdown-file.js';
import weekCache from '../../helper/cache/week-cache.js';
let weekReadme = (function () {
    const filename = 'week';
    let updateWeekMarkDownFile = async function (response, request) {
        let week = await weekCache.readWeekCacheFile(response.repositoryId);
        let object = await markdownTemplate.createListMarkDownTemplate(week.views, 'Week', response, request)
        await markdownFile.createListMarkDownFile(response.repositoryId, filename, object);
    }
    return {
        updateWeekMarkDownFile: updateWeekMarkDownFile
    };
})();
export default weekReadme;
