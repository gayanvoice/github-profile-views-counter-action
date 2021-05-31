const octokit = require('../../core/octokit');
const ResponseRepositoryModel = require('../../model/octokit/ResponseRepositoryModel');
let requestRepository = (function () {
    let request = async function (header, request) {
        let octokitResponse = await octokit.request(header, request);
        if(octokitResponse.status){
            return new ResponseRepositoryModel(true, octokitResponse.response);
        } else {
            return new ResponseRepositoryModel(false, octokitResponse.response);
        }
    }
    return {
        request: request
    };
})();
module.exports = requestRepository;