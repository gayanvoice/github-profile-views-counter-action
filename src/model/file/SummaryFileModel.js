let SummaryFileModel =  function (status, response) {
    this.status = status;
    if (status) this.views = response;
}
export default SummaryFileModel;
