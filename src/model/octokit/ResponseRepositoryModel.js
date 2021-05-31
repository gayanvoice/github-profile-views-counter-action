const RepositoryModel = require('./RespositoryModel');
let ResponseRepositoryModel = function (status, response) {
    this.status = status;
    if(status){
        this.response = new RepositoryModel(response.data);
    } else {
        this.response = response;
    }
}
module.exports = ResponseRepositoryModel;