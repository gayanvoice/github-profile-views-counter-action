const file = require('../../core/file');
let jsonFile = (function () {
    const CACHE = 'cache';
    let createCacheFile = async function (repositoryName, fileName, object) {
        let path = `${CACHE}/${repositoryName}/${fileName}.json`;
        await file.createJsonFile(path, object);
    }
    let readCacheFile = async function (repositoryName, fileName) {
        let path = `${CACHE}/${repositoryName}/${fileName}.json`;
        return await file.readCacheFile(path)
    }
    let readConfigFile = async function () {
        let path = `config.json`;
        return await file.readConfigFile(path)
    }
    let readSummaryCacheFile = async function (repositoryName, fileName) {
        let path = `${CACHE}/${repositoryName}/${fileName}.json`;
        return await file.readSummaryFile(path)
    }
    return {
        createCacheFile: createCacheFile,
        readCacheFile: readCacheFile,
        readConfigFile: readConfigFile,
        readSummaryCacheFile: readSummaryCacheFile,
    };
})();
module.exports = jsonFile;