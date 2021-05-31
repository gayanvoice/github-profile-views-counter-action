const file = require('../../core/file');
let markdownFile = (function () {
    const README = 'readme';
    let createListMarkDownFile = async function (repositoryId, fileName, object) {
        let path = `${README}/${repositoryId}/${fileName}.md`;
        await file.createOtherFile(path, object);
    }
    let createSummaryMarkDownFile = async function (object) {
        let path = `README.md`;
        await file.createOtherFile(path, object);
    }
    return {
        createListMarkDownFile: createListMarkDownFile,
        createSummaryMarkDownFile: createSummaryMarkDownFile
    };
})();
module.exports = markdownFile;