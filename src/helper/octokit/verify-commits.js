import requestCommits from './request-commits.js';
import RequestModel from '../../model/octokit/RequestModel.js';
let verifyCommits = (function () {
    const URL = '/commits?path=cache';
    const USERNAME = 'github-actions[bot]';
    let verify = async function (header, username, repository) {
        let request = new RequestModel(URL, username, repository);
        let responseCommits = await requestCommits.requestResponseCommits(header, request);
        if (responseCommits.status) {
            for (const commit of responseCommits.response) {
                if (commit !== USERNAME) {
                    return false;
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
export default verifyCommits;
