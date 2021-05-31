const weekCache = require('../../helper/cache/week-cache');
const graphFile = require('../../helper/file/graph-file');
const GraphFileModel = require('../../model/file/GraphFileModel');
let weekGraph = function () {
    const filename = 'week'
    let updateWeekGraphFile = async function (response) {
        let week = await weekCache.readWeekCacheFile(response.repositoryId);
        let labels = [];
        let uniqueData = [];
        let countData = [];
        if(week.status){
            for(const view of week.views){
                labels.push('"' + view.timestamp.getMonth() + '/' + view.timestamp.getDate() + '"');
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
module.exports = weekGraph;