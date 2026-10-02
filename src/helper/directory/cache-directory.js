import * as core from '@actions/core';
import directory from '../../core/directory.js';
let cacheDirectory = (function () {
    let CACHE_DIRECTORY = 'cache';
    let create = async function () {
        core.info(`If not exist create '${CACHE_DIRECTORY}' directory`);
        await directory.createDirectory(CACHE_DIRECTORY);
        await directory.createGitIgnore(CACHE_DIRECTORY);
    }
    return {
        create: create
    };
})();
export default cacheDirectory;
