const core = require('@actions/core');
const directory = require('../../core/directory');
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
module.exports = readmeDirectory;