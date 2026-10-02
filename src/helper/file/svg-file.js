import file from '../../core/file.js';
let svgFile = (function () {
    const SVG = 'svg';
    let createBadgeSVGFile = async function (repositoryName, fileName, object) {
        let path = `${SVG}/${repositoryName}/${fileName}.svg`;
        await file.createOtherFile(path, object);
    }
    let createProfileSVGFile = async function (object) {
        let path = `${SVG}/profile/badge.svg`;
        await file.createOtherFile(path, object);
    }
    return {
        createBadgeSVGFile: createBadgeSVGFile,
        createProfileSVGFile: createProfileSVGFile
    };
})();
export default svgFile;
