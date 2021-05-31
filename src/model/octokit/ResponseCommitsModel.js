let ResponseCommitsModel = function (status, response) {
    let author = function (commits) {
        let array = [];
        for (const commit of commits) {
            array.push(commit.author.login);
        }
        return array;
    }
    this.status = status;
    if(status){
        this.response = author(response);
    } else {
        this.response = response;
    }
}
module.exports = ResponseCommitsModel;