let ConfigDataModel = function (file) {
    const languages = ["en-US"];
    let getRepositoryArray = function (repositories) {
        let repository_array = [];
        for (const repository of repositories) {
            repository_array.push(repository);
        }
        return repository_array;
    }
    let getBooleanValue = function (value) {
        return value === 'true' || value === true;
    }
    let getLanguageValue = function (language) {
        if (language === undefined) {
            return "en-US";
        } else {
            if (languages.includes(language)) {
                return language;
            } else {
                return "en-US";
            }
        }
    }
    this.devMode = getBooleanValue(file.devMode);
    this.advancedMode = getBooleanValue(file.advancedMode);
    this.language = getLanguageValue(file.language);
    this.repository = getRepositoryArray(file.repository);
}
module.exports = ConfigDataModel;