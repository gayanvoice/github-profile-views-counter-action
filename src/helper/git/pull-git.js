import * as core from '@actions/core';
import git from '../../core/git.js';
let pullGit = function () {
    let pull = async function () {
        core.info(`Git Pull`)
        try {
            await git.pull();
        } catch (error) {
            core.info(error);
        }
    }
    return {
        pull: pull
    };
}();
export default pullGit;
