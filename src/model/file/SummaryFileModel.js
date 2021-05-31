let SummaryFileModel =  function (status, response) {
    this.status = status;
    if (status) this.views = response;
}
module.exports = SummaryFileModel;