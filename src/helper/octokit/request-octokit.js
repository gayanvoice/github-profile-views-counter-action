import * as core from '@actions/core';
import input from '../config/input.js';
import requestRepositoryOctokit from '../octokit/request-repository.js';
import verifyCommitsOctokit from '../octokit/verify-commits.js';
import requestViewsOctokit from '../octokit/request-views.js';
import RequestModel from '../../model/octokit/RequestModel.js';
let requestOctokit = (function () {
    let verifyCommits = async function (header, request) {
        let verify =  await verifyCommitsOctokit.verify(header, request.username, request.insightsRepository);
        if(verify){
            core.info(`Insight repository '${request.username}/${request.insightsRepository}/cache' verified`);
        } else {
            core.info(`Not verified. Found unauthorized commits in '${request.username}/${request.insightsRepository}/cache'. ` +
            `Revoke previous unauthorized commits from '${request.username}/${request.insightsRepository}/cache'`);
        }
        return verify;
    }
    let requestViews = async function (header, response) {
        let request = new RequestModel('/traffic/views',  response.ownerLogin, response.repositoryName)
        let views = await requestViewsOctokit.requestResponseViews(header, request);
        if(views.status){
            core.info(`Repository views '${response.ownerLogin}/${response.repositoryName}' available`);
        } else {
            core.info(`Repository views not available '${response.ownerLogin}/${response.repositoryName}'. `+
                `This property may not exist for this URL '${response.ownerLogin}/${response.repositoryName}', may not be retrievable ` +
                `${views.response}`);
        }
        return views;
    }
    let requestInsightRepository = async function (header, request) {
        let requestModel = new RequestModel('', request.username, request.insightsRepository)
        let insightsRepository =  await requestRepositoryOctokit.request(header, requestModel);
        if(insightsRepository.status){
            core.info(`Insight repository '${request.username}/${request.insightsRepository}' available`);
        } else {
            core.info(`Insight repository not available '${request.username}/${request.insightsRepository}'. `+
                `This property may not exist for this URL '${request.username}/${request.insightsRepository}', may not be retrievable ` +
                `${insightsRepository.response}`);
        }
        return insightsRepository;
    }
    let requestRepository = async function (header, request, repositoryName) {
        let requestModel = new RequestModel('', request.username, repositoryName);
        let repository = await requestRepositoryOctokit.request(header, requestModel);
        if(repository.status){
            core.info(`Repository '${request.username}/${repositoryName}' available`);
        } else {
            core.info(`Repository not available '${request.username}/${repositoryName}'. `+
                `This property may not exist for this URL '${request.username}/${repositoryName}', may not be retrievable ` +
                `${repository.response}`);
        }
        return repository;
    }
    return {
        verifyCommits: verifyCommits,
        requestViews: requestViews,
        requestInsightRepository: requestInsightRepository,
        requestRepository: requestRepository
    };
})();
export default requestOctokit;
