import DataModel from './DataModel.js';
let ResponseViewsModel = function (status, response) {
    this.status = status;
    if(status){
        this.response = new DataModel(response.data);
    } else {
        this.response = response;
    }
}
export default ResponseViewsModel;
