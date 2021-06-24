const input = require('./helper/config/input');
const cacheDirectory = require('./helper/directory/cache-directory');
const svgDirectory = require('./helper/directory/svg-directory');
const readmeDirectory = require('./helper/directory/readme-directory');
const graphDirectory = require('./helper/directory/graph-directory');
const pullGit = require('./helper/git/pull-git');
const commitGit = require('./helper/git/commit-git');
const pushGit = require('./helper/git/push-git');
const recordCache = require('./helper/cache/record-cache');
const weekCache = require('./helper/cache/week-cache');
const monthCache = require('./helper/cache/month-cache');
const yearCache = require('./helper/cache/year-cache');
const maxCache = require('./helper/cache/max-cache');
const summaryCache = require('./helper/cache/summary-cache');
const requestOctokit = require('./helper/octokit/request-octokit');
const summarySVG = require('./helper/svg/summary-svg');
const profileSVG = require('./helper/svg/profile_svg');
const summaryReadme = require('./helper/readme/summary-readme');
const weekReadme = require('./helper/readme/week-readme');
const monthReadme = require('./helper/readme/month-readme');
const yearReadme = require('./helper/readme/year-readme');
const weekGraph = require('./helper/graph/week-graph');
const monthGraph = require('./helper/graph/month-graph');
const yearGraph = require('./helper/graph/year-graph');
let Index = function () {
    let createDirectories = async function () {
        await cacheDirectory.create();
        await svgDirectory.create();
        await readmeDirectory.create();
        await graphDirectory.create();
    }
    let advancedMode = async function (responseRepository, octokitResponseViews, request) {
        await recordCache.updateRecordCacheFile(responseRepository.response.repositoryId, octokitResponseViews.response);
        await weekCache.updateWeekCacheFile(responseRepository.response.repositoryId);
        await monthCache.updateMonthCacheFile(responseRepository.response.repositoryId);
        await yearCache.updateYearCacheFile(responseRepository.response.repositoryId);
        await maxCache.updateMaxCacheFile(responseRepository.response.repositoryId);
        await summaryCache.updateSummaryCacheFile(responseRepository.response.repositoryId);
        await summarySVG.updateSummarySVGFile(responseRepository.response.repositoryId);
        await weekReadme.updateWeekMarkDownFile(responseRepository.response, request);
        await monthReadme.updateMonthMarkDownFile(responseRepository.response, request);
        await yearReadme.updateYearMarkDownFile(responseRepository.response, request);
        if (!request.devMode) await weekGraph.updateWeekGraphFile(responseRepository.response);
        if (!request.devMode) await monthGraph.updateMonthGraphFile(responseRepository.response);
        if (!request.devMode) await yearGraph.updateYearGraphFile(responseRepository.response);
    }
    let basicMode = async function (responseRepository, octokitResponseViews, request) {
        await recordCache.updateRecordCacheFile(responseRepository.response.repositoryId, octokitResponseViews.response);
        await yearCache.updateYearCacheFile(responseRepository.response.repositoryId);
        await summaryCache.updateSummaryCacheFile(responseRepository.response.repositoryId);
        await summarySVG.updateSummarySVGFile(responseRepository.response.repositoryId);
        await yearReadme.updateYearMarkDownFile(responseRepository.response, request);
        if (!request.devMode) await yearGraph.updateYearGraphFile(responseRepository.response);
    }
    let main = async function () {
        let header = await input.getHeader();
        let request = await input.getRequest();
        if(request.status) {
            if (!request.devMode) await pullGit.pull();
            await createDirectories()
            let insightRepository = await requestOctokit.requestInsightRepository(header, request)
            let verifyCommits = await requestOctokit.verifyCommits(header, request);
            if (insightRepository.status && verifyCommits) {
                let response = [];
                for await (const repositoryName of request.repository) {
                    let responseRepository = await requestOctokit.requestRepository(header, request, repositoryName);
                    if (responseRepository.status) {
                        let octokitResponseViews = await requestOctokit.requestViews(header, responseRepository.response);
                        if (octokitResponseViews.status) {
                            response.push(responseRepository.response);
                            if (request.advancedMode) {
                                await advancedMode(responseRepository, octokitResponseViews, request);
                            } else {
                               await basicMode(responseRepository, octokitResponseViews, request);
                            }
                        }
                    }
                }
                await profileSVG.updateProfileSVGFile(response);
                if (request.advancedMode) {
                    await summaryReadme.updateSummaryMarkDownFileAdvanced(response, request);
                } else {
                    await summaryReadme.updateSummaryMarkDownFileBasic(response, request);
                }
                if (!request.devMode) await commitGit.commit("Update views");
                if (!request.devMode) await pushGit.push();
            }
        }
    }
    return {
        run: main,
    };
}();
Index.run().then(() => { });