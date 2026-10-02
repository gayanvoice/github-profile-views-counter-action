import markdownTemplate from './markdown-template.js';
import markdownFile from '../file/markdown-file.js';
import yearCache from '../../helper/cache/year-cache.js';
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
export default yearReadme;
