import * as core from '@actions/core';
import git from '../../core/git.js';
let pushGit = function () {
    const BRANCH = 'master';
    let push = async function () {
        core.info(`Git Push`);
        try {
            await git.push(BRANCH);
        } catch (error) {
            core.info(error);
        }
    }
    return {
        push: push
    };
}();
export default pushGit;
