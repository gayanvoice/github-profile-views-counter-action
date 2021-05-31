const core = require('@actions/core');
const directory = require('../../core/directory');
let svgDirectory = (function () {
    let SVG_DIRECTORY = 'svg';
    let create = async function () {
        core.info(`If not exist create '${SVG_DIRECTORY}' directory`);
        await directory.createDirectory(SVG_DIRECTORY);
        await directory.createGitIgnore(SVG_DIRECTORY);
    }
    return {
        create: create
    };
})();
module.exports = svgDirectory;