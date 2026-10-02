import octokit from '../../core/octokit.js';
import ResponseRepositoryModel from '../../model/octokit/ResponseRepositoryModel.js';
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
export default requestRepository;
