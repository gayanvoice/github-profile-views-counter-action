import graphFile from '../file/graph-file.js';
import yearCache from '../../helper/cache/year-cache.js';
import GraphFileModel from '../../model/file/GraphFileModel.js';
let yearGraph = (function () {
    const filename = 'year'
    let updateYearGraphFile = async function (response) {
        let year = await yearCache.readYearCacheFile(response.repositoryId);
        let labels = [];
        let uniqueData = [];
        let countData = [];
        if(year.status){
            for(const view of year.views){
                labels.push('"' + (view.timestamp.getFullYear() + 1) + '/' + view.timestamp.getMonth() + '"');
                uniqueData.push(view.uniques);
                countData.push(view.count);
            }
        }
        let graph = new GraphFileModel(labels, uniqueData, countData);
        await graphFile.createGraphFile(response.repositoryId, filename, graph);
    }
    return {
        updateYearGraphFile: updateYearGraphFile
    };
})();
export default yearGraph;
