const recordSummaryFile = require('../../helper/cache/summary-cache');
let markdownTemplate = function () {
    const ACTION_NAME = 'GitHub Profile Views Counter';
    const ACTION_URL = 'https://github.com/gayanvoice/github-profile-views-counter';
    const AUTHOR_NAME = 'gayanvoice';
    const AUTHOR_URL = 'https://github.com/gayanvoice';
    let getDate = function () {
        let date = new Date();
        let time = date.toLocaleString('en-US', { timeZone: 'UTC', hour: 'numeric', minute: 'numeric', hour12: true })
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${time} UTC`
    }
    let formatDate = function (timestamp) {
        let date = new Date(timestamp);
        let time = date.toLocaleString('en-US', { timeZone: 'UTC', hour: 'numeric', minute: 'numeric', hour12: true })
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${time} UTC`
    }
    let footerComponent = function (actionName, actionUrl, authorName, authorUrl) {
        let markdown =  `[**Set up ${actionName} for your repositories ↗️**](${actionUrl})\n`;
        markdown = markdown + `## ⛔ DO NOT\n`;
        markdown = markdown + `- Do not commit any changes to \`./cache\` directory. This feature helps to integrity of the records for visitors.\n`;
        markdown = markdown + `- The app will automatically stop measuring insights until you revoke those commits.\n`;
        markdown = markdown + `## 📦 Third party\n\n`;
        markdown = markdown + `- [@octokit/rest](https://www.npmjs.com/package/@octokit/rest) - Send REST API requests to GitHub.\n`;
        markdown = markdown + `- [fs-extra](https://www.npmjs.com/package/fs-extra) - Creating directories and files.\n`;
        markdown = markdown + `- [simple-git](https://www.npmjs.com/package/simple-git) - Handling Git commands.\n`;
        markdown = markdown + `- [node-chart-exec](https://www.npmjs.com/package/node-chart-exec) - Generate graphs.\n`;
        markdown = markdown + `## 📄 License\n`;
        markdown = markdown + `- Powered by: [${actionName} ↗️](${actionUrl})\n`;
        markdown = markdown + `- Code: [MIT ↗️](./LICENSE) © [${authorName} ↗️](${authorUrl})\n`;
        markdown = markdown + `- Data in the \`./cache\` directory: [Open Database License ↗️](https://opendatacommons.org/licenses/odbl/1-0/)`;
        return markdown;
    }
    let createSummaryPageTableComponent = async function (response, insightsRepository) {
        let table = `<table>\n`;
        table = table + `\t<tr>\n`;
        table = table + `\t\t<th>\n`;
        table = table + `\t\t\tRepository\n`;
        table = table + `\t\t</th>\n`;
        table = table + `\t\t<th>\n`;
        table = table + `\t\t\tLast Updated\n`;
        table = table + `\t\t</th>\n`;
        table = table + `\t\t<th>\n`;
        table = table + `\t\t\tUnique\n`;
        table = table + `\t\t</th>\n`;
        table = table + `\t\t<th>\n`;
        table = table + `\t\t\tViews\n`;
        table = table + `\t\t</th>\n`;
        table = table + `\t</tr>\n`;
        for (const repository of response) {
            let repositoryUrl = `https://github.com/${repository.ownerLogin}/${insightsRepository}`;
            let readmeUrl = `${repositoryUrl}/tree/master/readme`
            let graphUrl = `${repositoryUrl}/raw/master/graph`
            let summaryCache = await recordSummaryFile.readSummaryCacheFile(repository.repositoryId);
            table = table + `\t<tr>\n`;
            table = table + `\t\t<td>\n`;
            table = table + `\t\t\t<a href="${readmeUrl}/${repository.repositoryId}/week.md">\n`;
            table = table + `\t\t\t\t${repository.repositoryName}\n`;
            table = table + `\t\t\t</a>\n`;
            table = table + `\t\t</td>\n`;
            table = table + `\t\t<td>\n`;
            table = table + `\t\t\t${formatDate(summaryCache.views.timestamp)}\n`;
            table = table + `\t\t</td>\n`;
            table = table + `\t\t<td>\n`;
            table = table + `\t\t\t${summaryCache.views.summary.uniques}\n`;
            table = table + `\t\t</td>\n`;
            table = table + `\t\t<td>\n`;
            table = table + `\t\t\t<img alt="Response time graph" src="${graphUrl}/${repository.repositoryId}/small/week.png" height="20"> ${summaryCache.views.summary.count}\n`;
            table = table + `\t\t</td>\n`;
            table = table + `\t</tr>\n`;
        }
        table = table + `</table>\n\n`;
        return table;
    }
    let summaryPage = async function (actionName, actionUrl, authorName, authorUrl, response, insightsRepository) {
        let lastUpdate = getDate();
        let tableComponent = await createSummaryPageTableComponent(response, insightsRepository);
        let repositoryUrl = `https://github.com/${response[0].ownerLogin}/${insightsRepository}`;
        let svgBadge = `[![Image of ${repositoryUrl}](${repositoryUrl}/blob/master/svg/profile/badge.svg)](${repositoryUrl})`;
        let markdown =  `## [🚀 ${actionName}](${actionUrl})\n`;
        markdown = markdown + `**${actionName}** is an opensource project that powered entirely by  \`GitHub Actions\` to fetch and store insights of repositories.\n`;
        markdown = markdown + `It uses \`GitHub API\` to fetch the insight data of your repositories and commits changes into a separate repository.\n\n`
        markdown = markdown + `The project created and maintained by [gayanvoice](https://github.com/gayanvoice). Don't forget to follow him on [GitHub](https://github.com/gayanvoice), [Twitter](https://twitter.com/gayanvoice), and [Medium](https://gayanvoice.medium.com/).\n\n`;
        markdown = markdown + tableComponent;
        markdown = markdown + `<small><i>Last updated on ${lastUpdate}</i></small>\n\n`;
        markdown = markdown +   `## ✂️Copy and 📋 Paste\n`;
        markdown = markdown + `### Total Views Badge\n`;
        markdown = markdown + `${svgBadge}\n\n`;
        markdown = markdown + `\`\`\`readme\n`;
        markdown = markdown + `${svgBadge}\n`;
        markdown = markdown + `\`\`\`\n`;
        markdown = markdown + footerComponent(actionName, actionUrl, authorName, authorUrl);
        return markdown;
    }

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
        `FOOTER`;
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
        template = template.replace('{update}', getDate());
        return template;
    }

    let createSummaryMarkDownTemplate = async function (response, repository) {
        return await summaryPage(ACTION_NAME, ACTION_URL, AUTHOR_NAME, AUTHOR_URL, response, repository);
    }
    return {
        createListMarkDownTemplate: createListMarkDownTemplate,
        createSummaryMarkDownTemplate: createSummaryMarkDownTemplate
    };
}();
module.exports = markdownTemplate