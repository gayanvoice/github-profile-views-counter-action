const DataModel = require('./DataModel');
let ResponseViewsModel = function (status, response) {
    this.status = status;
    if(status){
        this.response = new DataModel(response.data);
    } else {
        this.response = response;
    }
}
module.exports = ResponseViewsModel;