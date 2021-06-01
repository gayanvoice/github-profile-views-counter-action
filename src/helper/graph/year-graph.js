const graphFile = require('../file/graph-file');
const yearCache = require('../../helper/cache/year-cache');
const GraphFileModel = require('../../model/file/GraphFileModel');
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
module.exports = yearGraph;