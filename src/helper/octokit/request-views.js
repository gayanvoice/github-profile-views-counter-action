import octokit from '../../core/octokit.js';
import ResponseViewsModel from '../../model/octokit/ResponseViewsModel.js';
let requestViews = (function () {
    let requestResponseViews = async function (header, request) {
        let octokitResponse = await octokit.request(header, request);
        if(octokitResponse.status){
            return new ResponseViewsModel(true, octokitResponse.response);
        } else {
            return new ResponseViewsModel(false, octokitResponse.response);
        }
    }
    return {
        requestResponseViews: requestResponseViews
    };
})();
export default requestViews;
