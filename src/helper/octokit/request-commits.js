const octokit = require('../../core/octokit');
const ResponseCommitsModel = require('../../model/octokit/ResponseCommitsModel');
let requestCommits = (function () {
    let requestResponseCommits = async function (header, request) {
        let octokitResponse = await octokit.request(header, request);
        if(octokitResponse.status){
            let data  = octokitResponse.response.data;
            if(data.length === 0){
                return new ResponseCommitsModel(false, octokitResponse.response)
            } else {
                return new ResponseCommitsModel(true, data)
            }
        } else {
            return new ResponseCommitsModel(false, octokitResponse.response)
        }
    }
    return {
        requestResponseCommits: requestResponseCommits
    };
})();
module.exports = requestCommits;