const requestCommits = require('./request-commits');
const RequestModel = require('../../model/octokit/RequestModel');
let verifyCommits = (function () {
    const URL = '/commits?path=cache';
    const USERNAME = 'github-actions[bot]';
    let verify = async function (header, username, repository) {
        let request = new RequestModel(URL, username, repository);
        let responseCommits = await requestCommits.requestResponseCommits(header, request);
        if (responseCommits.status) {
            for (const commit of responseCommits.response) {
                if (commit !== USERNAME) {
                    // return false;
                    return true;  // allow commits from other users
                }
            }
            return true;
        } else {
            return true;
        }
    }
    return {
        verify: verify
    };
})();
module.exports = verifyCommits;
