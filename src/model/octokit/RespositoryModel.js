let Repository = function (data) {
    this.repositoryName = data.name;
    this.repositoryId = data.id;
    this.ownerLogin = data.owner.login;
    this.ownerId = data.owner.id;
}
module.exports = Repository;