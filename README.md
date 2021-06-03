# 📈 GitHub Insights  
  
Shows number of page views and unique visitors breakdown per week, month, and year of your repositories using [GitHub Actions](https://github.com/features/actions).  The github-insights action updates the insights fetched from [GitHub API](https://docs.github.com/en/rest) for [every 6 hours](https://github.com/gayanvoice/github-insights-template/blob/master/.github/workflows/action.yml#L4).

This action is written by [gayanvoice](https://github.com/gayanvoice). Don't forget to follow me on [GitHub](https://github.com/gayanvoice), [Medium](https://medium.com/@gayanvoice) and [Twitter](https://twitter.com/gayanvoice).  

## Setup

### Step 1 - ⚡️ Create a repository from the template   
- Star ⭐ this repository 😉  
- Go to the [github-insights-template](https://github.com/gayanvoice/github-insights-template) of this GitHub Action.  
- Click on `Use this template` button on the top-right.  
- Enter a name for `Repository name` and select `public` option.  
- Click on `Create repository from template` to create your insights repository.  
  
💰 **Billing note:** GitHub offers [unlimited build minutes](https://github.com/pricing) for `pubic` repositories. If you select `private` option when you create the repository you have to pay for build minutes or limit the number of build jobs in `- cron` option in [action.yml](https://github.com/gayanvoice/github-insights-template/blob/master/.github/workflows/action.yml) of your insights repository.  
  
### Step 2 - 🔑 Add repository secrets  
  
#### Generate `personal access token`
  
- Click on your profile picture on the top-right corner and select `Settings` option.  
- In the left sidebar, select `Developer settings` option.  
- In the left sidebar, click on `Personal access tokens` option.  
- Click on `Generate new token` button.  
- Enter a name for the token.  
- Select `repo` and `workflow` options from scopes.  
- Click on `Generate token` button.  
- Copy the token to a file.  
  
#### Add the `repository secret`
  
- In your insights repository, select `Settings` option.  
- In the left sidebar, click on `Secrets` option.  
- Click on `New repository secret` button on top-right corner of `Actions secrets` page.  
- Enter the name of the secret as `INSIGHTS_TOKEN` in `Name` field.  
- Paste your personal access token in `Value` field.  
- Save your personal access token by click on `Add secret` button.  
  
### Step 3 - 📄 Update `config.json`
  
The `config.json` file is used as the central configuration store. Add names of repositories you want to store insights. You can follow this [config.json](https://github.com/gayanvoice/insights/blob/master/config.json).  
```json  
{  
	 "devMode": "false",
	 "advancedMode": "true",
	 "language": "en-US",
	 "repository":
	 [ "repository-name" ]
 }  
```  
  
| Key       | Description                                              | Type   |  Required? |  
| --------- | -------------------------------------------------------- | ------ | --------- |  
| `devMode` | Disables git functions and generating graphs in you insights repository | `bool` | Yes        |  
| `advancedMode` | Enables month and year records of the repositories. | `bool` | Yes        |  
| `language` | Language of the readme files. *Not supporting* | `string` | Yes        |  
| `repository` | List of repositories to show the insights. | `array` | Yes        |

## 📦 Third party
- [@actions/core](https://www.npmjs.com/package/@actions/core) - Show output on the command line. 
- [@octokit/rest](https://www.npmjs.com/package/@octokit/rest) - Send requests to GitHub API.
- [fs-extra](https://www.npmjs.com/package/fs-extra) - Creating directories and files.
- [simple-git](https://www.npmjs.com/package/simple-git) - Handling Git commands.
- [node-chart-exec](https://www.npmjs.com/package/node-chart-exec) - Generate charts using `npx` commands.
## 📄 License
- Repository: [gayanvoice/github-insights](https://github.com/gayanvoice/github-insights)
- Template - [gayanvoice/github-insights-template](https://github.com/gayanvoice/github-insights-template)
- Code: [MIT](./LICENSE) © [Gayan Kuruppu](https://github.com/gayanvoice)
