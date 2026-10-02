import weekCache from '../../helper/cache/week-cache.js';
import graphFile from '../../helper/file/graph-file.js';
import GraphFileModel from '../../model/file/GraphFileModel.js';
let weekGraph = function () {
    const filename = 'week'
    let updateWeekGraphFile = async function (response) {
        let week = await weekCache.readWeekCacheFile(response.repositoryId);
        let labels = [];
        let uniqueData = [];
        let countData = [];
        if(week.status){
            for(const view of week.views){
                labels.push('"' + (view.timestamp.getMonth() + 1) + '/' + view.timestamp.getDate() + '"');
                uniqueData.push(view.uniques);
                countData.push(view.count);
            }
        }
        let graph = new GraphFileModel(labels, uniqueData, countData);
        await graphFile.createGraphFile(response.repositoryId, filename, graph);
    }
    return {
        updateWeekGraphFile: updateWeekGraphFile
    };
}();
export default weekGraph;
