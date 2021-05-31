const core = require('@actions/core');
const directory = require('../../core/directory');
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
module.exports = cacheDirectory;