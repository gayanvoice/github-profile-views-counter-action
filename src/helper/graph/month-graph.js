import graphFile from '../file/graph-file.js';
import monthCache from '../../helper/cache/month-cache.js';
import GraphFileModel from '../../model/file/GraphFileModel.js';
let monthGraph = (function () {
    const filename = 'month'
    let updateMonthGraphFile = async function (response) {
        let month = await monthCache.readMonthCacheFile(response.repositoryId);
        let labels = [];
        let uniqueData = [];
        let countData = [];
        if(month.status){
            for(const view of month.views){
                labels.push('"' + (view.timestamp.getMonth() + 1) + '/' + view.timestamp.getDate() + '"');
                uniqueData.push(view.uniques);
                countData.push(view.count);
            }
        }
        let graph = new GraphFileModel(labels, uniqueData, countData);
        await graphFile.createGraphFile(response.repositoryId, filename, graph);
    }
    return {
        updateMonthGraphFile: updateMonthGraphFile
    };
})();
export default monthGraph;
