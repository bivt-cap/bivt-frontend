# bivt-frontend
## Specify the type of commit:
feat: The new feature you're adding to a particular application <br />
fix: A bug fix <br />
style: Feature and updates related to styling <br />
refactor: Refactoring a specific section of the codebase <br />
test: Everything related to testing <br />
docs: Everything related to documentation <br />
chore: Regular code maintenance. <br />
........................................................................................................
##Install Prettier💅
1. In Visual Studio Code go to View ->Extensions.
2. Search for prettier code formatter
3. Click Install

##Make VSCode to auto format every time file is saved.
1. Use Ctrl+, shortcut or go to File ->Preferences ->Settings.
2. Scroll down to Edit in settings.json . It will open your ide setting in json format :
Tell eslint to always show its status
Disable formatting in js file (we will format through EsLint)

Make Prettier run on all file formats except for JavaScript
"eslint.alwaysShowStatus": true,
"editor.formatOnSave": true,
"[javascript]": {
   "editor.formatOnSave": false
 },
"eslint.autoFixOnSave": true,
"prettier.disableLanguages": [
    "js"
]
........................................................................................................
