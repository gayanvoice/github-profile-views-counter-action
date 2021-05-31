const recordSummaryFile = require('../../helper/cache/summary-cache');
let markdownTemplate = (function () {
    const ACTION_NAME = 'GitHub Insights';
    const ACTION_URL = 'https://github.com/gayanvoice/github-insights';
    const AUTHOR_NAME = 'gayanvoice';
    const AUTHOR_URL = 'https://github.com/gayanvoice';
    const FOOTER =  `[**Set up ${ACTION_NAME} for your repositories ↗️**](${ACTION_URL})\n`
        + `## ⛔ DO NOT\n`
        + `- Do not commit any changes to \`./cache\` directory. This feature helps to integrity of the records for visitors.\n`
        + `- The app will automatically stop measuring insights until you revoke those commits.\n`
        + `## 📄 License\n`
        + `- Powered by: [${ACTION_NAME} ↗️](${ACTION_URL})\n`
        + `- Code: [MIT ↗️](./LICENSE) © [${AUTHOR_NAME} ↗️](${AUTHOR_URL})\n`
        + `- Data in the \`./cache\` directory: [Open Database License ↗️](https://opendatacommons.org/licenses/odbl/1-0/)`;

    const summaryMarkDownTemplate = `## [:chart_with_upwards_trend: ${ACTION_NAME}](${ACTION_URL})\n` +
        `**${ACTION_NAME}** (${ACTION_URL}) is an opensource project that powered entirely by  \`GitHub Actions\` to fetch and store insights of repositories.\n` +
        `It uses \`GitHub API\` to fetch the insight data of your repositories and commits changes into a separate repository. It is created and maintained by ${AUTHOR_NAME} (${AUTHOR_URL}).\n` +
        `{rowList}\n` +
        `<small><i>Last updated on {update}</i></small>\n\n`
        + FOOTER;

    const listMarkDownTemplate = `{header}\n` +
        `{menu}\n` +
        `### :octocat: {repositoryName}\n` +
        `{chart}\n\n` +
        `**:calendar: {file} Insights Table**\n` +
        `{rowList}\n` +
        `<small><i>Last updated on {update}</i></small>\n\n` +
        `## ✂️Copy and 📋 Paste\n`+
        `### SVG Badge\n` +
        `{svgBadge}\n` +
        `\`\`\`readme\n` +
        `{svgBadgeCode}\n` +
        `\`\`\`\n` +
        `### Header\n` +
        `{chartBadge}\n` +
        `\`\`\`readme\n` +
        `{chartBadgeCode}\n` +
        `\`\`\`\n` +
        FOOTER;
    let createListMarkDownTemplate = async function (views, file, response, request) {
        let template = listMarkDownTemplate;
        let insightsRepositoryUrl = `https://github.com/${response.ownerLogin}/${request.insightsRepository}`;
        let readmeUrl = `${insightsRepositoryUrl}/blob/master/readme/${response.repositoryId}`;
        let header = `## [🔙 ${request.insightsRepository}](${insightsRepositoryUrl})`;
        let menu;
        if (request.advancedMode) {
            menu = `| [**Week →**](${readmeUrl}/week.md) | [**Month →**](${readmeUrl}/month.md) | [**Year →**](${readmeUrl}/year.md) |\n | ------------ | --------------- | ----- |\n`;
        } else {
            menu = `### Some features are mot available\n #### GitHub Insights Action only features \`week\` reports. To active \`month\`, and \`year\` reports `
            + `edit [config.json](${insightsRepositoryUrl}/blob/master/config.json) and set \`true\` in \`advancedMode\`.`;
        }
        let rowList = `| Last Updated | Unique | Count |\n | ------------ | --------------- | ----- |\n`;
        for (const view of views.reverse()) {
            rowList = `${rowList} | \`${view.timestamp.getFullYear()}/${view.timestamp.getMonth() + 1}/${view.timestamp.getDate()}\` |  \`${view.uniques}\` | \`${view.count}\` |\n`;
        }
        let chart = `![Image of ${request.insightsRepository}](${insightsRepositoryUrl}/blob/master/graph/${response.repositoryId}/large/${file.toLowerCase()}.png)`;
        let chartBadge = `# ${response.repositoryName} [<img alt="Image of ${request.insightsRepository}" src="${insightsRepositoryUrl}/blob/master/graph/${response.repositoryId}/small/week.png" height="20">](${insightsRepositoryUrl}/blob/master/readme/${response.repositoryId}/week.md)`;
        let svgBadge = `[![Image of ${request.insightsRepository}](${insightsRepositoryUrl}/blob/master/svg/${response.repositoryId}/badge.svg)](${insightsRepositoryUrl}/blob/master/readme/${response.repositoryId}/week.md)`;
        let repositoryName = `[${response.repositoryName}](https://github.com/${response.ownerLogin}/${response.repositoryName})`;
        template = template.replace('{chart}', chart);
        template = template.replace('{chartBadge}', chartBadge);
        template = template.replace('{chartBadgeCode}', chartBadge);
        template = template.replace('{svgBadge}', svgBadge);
        template = template.replace('{svgBadgeCode}', svgBadge);
        template = template.replace('{header}', header);
        template = template.replace('{menu}', menu);
        template = template.replace('{rowList}', rowList);
        template = template.replace('{file}', file);
        template = template.replace('{repositoryName}', repositoryName);
        template = template.replace('{update}', getLastUpdate());
        return template;
    }
    let createRepositoryList = async function (response, insightsRepository) {
        let rowList = `| Repository | Last Updated | Unique | Views |\n | ---------- | ------------ | ------ | ----- |\n`;
        for (const repository of response) {
            let insightsRepositoryUrl = `https://github.com/${repository.ownerLogin}/${insightsRepository}`;
            let readmeUrl = `${insightsRepositoryUrl}/tree/master/readme`
            let graphUrl = `${insightsRepositoryUrl}/raw/master/graph`
            let summaryCache = await recordSummaryFile.readSummaryCacheFile(repository.repositoryId);
            rowList = rowList + `|[${repository.repositoryName}](${readmeUrl}/${repository.repositoryId}/week.md)|` +
                `${summaryCache.views.timestamp}|` +
                `${summaryCache.views.summary.uniques}|` +
                `<img alt="Response time graph" src="${graphUrl}/${repository.repositoryId}/small/week.png" height="20"> ${summaryCache.views.summary.count}|\n`;
        }
        return rowList;
    }
    let getLastUpdate = function () {
        let date = new Date();
        return `${date}`
    }
    let createSummaryMarkDownTemplate = async function (response, insightsRepository) {
        let template = summaryMarkDownTemplate;
        let rowList = await  createRepositoryList(response, insightsRepository);
        template = template.replace('{rowList}', rowList);
        template = template.replace('{update}', getLastUpdate());
        return template;
    }
    return {
        createListMarkDownTemplate: createListMarkDownTemplate,
        createSummaryMarkDownTemplate: createSummaryMarkDownTemplate
    };
})();
module.exports = markdownTemplate