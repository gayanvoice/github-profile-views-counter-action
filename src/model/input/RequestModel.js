let RequestModel = function (status, username, insightsRepository, devMode, advancedMode, language, repository) {
    this.status = status;
    if (this.status) this.username = username;
    if (this.status) this.insightsRepository = insightsRepository;
    if (this.status) this.devMode = devMode;
    if (this.status) this.advancedMode = advancedMode;
    if (this.status) this.language = language;
    if (this.status) this.repository = repository;
}
module.exports = RequestModel;