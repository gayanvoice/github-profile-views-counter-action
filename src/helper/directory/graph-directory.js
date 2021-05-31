const core = require('@actions/core');
const directory = require('../../core/directory');
let graphDirectory = (function () {
    let GRAPH_DIRECTORY = 'graph';
    let create = async function () {
        core.info(`If not exist create '${GRAPH_DIRECTORY}' directory`);
        await directory.createDirectory(GRAPH_DIRECTORY);
        await directory.createGitIgnore(GRAPH_DIRECTORY);
    }
    return {
        create: create
    };
})();
module.exports = graphDirectory;