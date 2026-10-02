import input from './helper/config/input.js';
import cacheDirectory from './helper/directory/cache-directory.js';
import svgDirectory from './helper/directory/svg-directory.js';
import readmeDirectory from './helper/directory/readme-directory.js';
import graphDirectory from './helper/directory/graph-directory.js';
import pullGit from './helper/git/pull-git.js';
import commitGit from './helper/git/commit-git.js';
import pushGit from './helper/git/push-git.js';
import recordCache from './helper/cache/record-cache.js';
import weekCache from './helper/cache/week-cache.js';
import monthCache from './helper/cache/month-cache.js';
import yearCache from './helper/cache/year-cache.js';
import maxCache from './helper/cache/max-cache.js';
import summaryCache from './helper/cache/summary-cache.js';
import requestOctokit from './helper/octokit/request-octokit.js';
import summarySVG from './helper/svg/summary-svg.js';
import profileSVG from './helper/svg/profile_svg.js';
import summaryReadme from './helper/readme/summary-readme.js';
import weekReadme from './helper/readme/week-readme.js';
import monthReadme from './helper/readme/month-readme.js';
import yearReadme from './helper/readme/year-readme.js';
import weekGraph from './helper/graph/week-graph.js';
import monthGraph from './helper/graph/month-graph.js';
import yearGraph from './helper/graph/year-graph.js';
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
