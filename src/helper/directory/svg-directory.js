import * as core from '@actions/core';
import directory from '../../core/directory.js';
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
export default svgDirectory;
