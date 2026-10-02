import * as core from '@actions/core';
import fs from 'fs-extra';
import ConfigFileModel from '../model/file/ConfigFileModel.js';
import CacheFileModel from '../model/file/CacheFileModel.js';
import SummaryFileModel from '../model/file/SummaryFileModel.js';
let file = (function () {
    let saveJson = async function (fileName, jsonObject) {
        try {
            await fs.outputJson(fileName, jsonObject)
            core.info( `Json file has been updated at ${fileName}`)
        } catch (error) {
            core.info( `Json file has not been updated at ${fileName}`)
        }
    }
    let saveOther = async function (fileName, object) {
        try {
            await fs.outputFile(fileName, object)
            core.info( `Other file has been updated at ${fileName}`)
        } catch (error) {
            core.info( `Other file has not been updated at ${fileName}`)
        }
    }
    let readCacheJson = async function (fileName) {
        try {
            let file = await fs.readJson(fileName);
            return new CacheFileModel(true, file);
        } catch (error) {
            return new CacheFileModel(false);
        }
    }
    let readConfigJson = async function (fileName) {
        try {
            let file = await fs.readJson(fileName);
            return new ConfigFileModel(true, file);
        } catch (error) {
            return new ConfigFileModel(false);
        }
    }
    let readSummaryJson = async function (fileName) {
        try {
            let file = await fs.readJson(fileName);
            return new SummaryFileModel(true, file);
        } catch (error) {
            return new SummaryFileModel(false);
        }
    }
    let createJsonFile = async function (fileName, jsonObject) {
        await saveJson(fileName, jsonObject);
    }
    let createOtherFile = async function (fileName, object) {
        await saveOther(fileName, object);
    }
    let readConfigFile = async function (fileName) {
        return await readConfigJson(fileName);
    }
    let readCacheFile = async function (fileName) {
        return await readCacheJson(fileName);
    }
    let readSummaryFile = async function (fileName) {
        return await readSummaryJson(fileName);
    }
    return {
        createJsonFile: createJsonFile,
        createOtherFile: createOtherFile,
        readCacheFile: readCacheFile,
        readConfigFile: readConfigFile,
        readSummaryFile: readSummaryFile
    };
})();
export default file;
