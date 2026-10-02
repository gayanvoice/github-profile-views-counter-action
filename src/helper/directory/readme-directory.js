import * as core from '@actions/core';
import directory from '../../core/directory.js';
let readmeDirectory = (function () {
    let README_DIRECTORY = 'readme';
    let create = async function () {
        core.info(`If not exist create '${README_DIRECTORY}' directory`);
        await directory.createDirectory(README_DIRECTORY);
        await directory.createGitIgnore(README_DIRECTORY);
    }
    return {
        create: create
    };
})();
export default readmeDirectory;
