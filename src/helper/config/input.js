const core = require('@actions/core');
const HeaderModel = require('../../model/input/HeaderModel');
const RequestModel = require('../../model/input/RequestModel');
const jsonFile = require('../../helper/file/json-file');
let input = (function () {
    // const INSIGHT_REPOSITORY = 'gayanvoice/insights';
    // const AUTH_KEY = '';
    // const USER_AGENT = 'process.env.USER_AGENT';
    const INSIGHT_REPOSITORY = process.env.GITHUB_REPOSITORY;
    const AUTH_KEY = process.env.INSIGHTS_TOKEN;
    const USER_AGENT = process.env.USER_AGENT;
    let getUsernameAndRepository = function () {
        return INSIGHT_REPOSITORY.split("/");
    }
    let getHeader = async function () {
        return new HeaderModel(AUTH_KEY, USER_AGENT);
    }
    let getRequest = async function () {
        const USERNAME = getUsernameAndRepository()[0];
        const REPOSITORY = getUsernameAndRepository()[1];
        let configJson = await jsonFile.readConfigFile();
        if(configJson.status){
            core.info("Config Json available")
            core.info(`Config Json username='${USERNAME}' insightRepository='${REPOSITORY}' devMode='${configJson.data.devMode}' ` +
                `advancedMode='${configJson.data.advancedMode}' language='${configJson.data.language}' repository='${configJson.data.repository.toString()}'`)
            return new RequestModel(
                true,
                USERNAME,
                REPOSITORY,
                configJson.data.devMode,
                configJson.data.advancedMode,
                configJson.data.language,
                configJson.data.repository);
        } else {
            core.info("Config Json Error")
            return new RequestModel(false);
        }
    }
    return {
        getHeader: getHeader,
        getRequest: getRequest
    };
})();
module.exports = input;