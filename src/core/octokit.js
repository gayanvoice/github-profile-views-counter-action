const {Octokit} = require("@octokit/rest");
const ResponseModel = require('../model/octokit/ResponseModel');
let octokit = (function () {
    let request = async function (header, request) {
        const octokit = new Octokit({
            auth: header.authKey,
            userAgent: header.userAgent,
        });
        return await octokit.request('GET /repos/{owner}/{repo}' + request.url, {
            owner: request.username,
            repo: request.repository
        }).then(response => {
            return new ResponseModel(true, response)
        }).catch(error => {
            if(error.status === 401){
                return new ResponseModel(false, `Error ${error.status}. Invalid credentials for 'authentication key' is invalid.`)
            } else if(error.status === 404){
                return new ResponseModel(false, `Error ${error.status}. The requested URL '${request.username}/${request.repository}' was not found. ` +
                    `The required 'username' or 'repository' is invalid.`)
            } else {
                return new ResponseModel(false, `Error ${error.status}. ${error.name}`)
            }
        });
    }
    return {
        request: request
    };
})();
module.exports = octokit;