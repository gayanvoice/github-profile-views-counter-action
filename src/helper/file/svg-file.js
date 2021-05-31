const file = require('../../core/file');
let svgFile = (function () {
    const SVG = 'svg';
    let createSVGFile = async function (repositoryName, fileName, object) {
        let path = `${SVG}/${repositoryName}/${fileName}.svg`;
        await file.createOtherFile(path, object);
    }
    return {
        createSVGFile: createSVGFile
    };
})();
module.exports = svgFile;