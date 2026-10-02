import * as core from '@actions/core';
import directory from '../../core/directory.js';
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
export default graphDirectory;
