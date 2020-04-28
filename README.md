# bivt-frontend
## Specify the type of commit:
feat: The new feature you're adding to a particular application <br />
fix: A bug fix <br />
style: Feature and updates related to styling <br />
refactor: Refactoring a specific section of the codebase <br />
test: Everything related to testing <br />
docs: Everything related to documentation <br />
chore: Regular code maintenance. <br />
<hr><br />
##Install Prettier💅<br />
1. In Visual Studio Code go to View ->Extensions.<br />
2. Search for prettier code formatter<br />
3. Click Install<br />

##Make VSCode to auto format every time file is saved.<br />
1. Use Ctrl+, shortcut or go to File ->Preferences ->Settings.<br />
2. Scroll down to Edit in settings.json . It will open your ide setting in json format :<br />
Tell eslint to always show its status<br />
Disable formatting in js file (we will format through EsLint)<br />

Make Prettier run on all file formats except for JavaScript<br />
"eslint.alwaysShowStatus": true,<br />
"editor.formatOnSave": true,<br />
"[javascript]": {<br />
   "editor.formatOnSave": false<br />
 },<br />
"eslint.autoFixOnSave": true,<br />
"prettier.disableLanguages": [<br />
    "js"<br />
]<br />
https://scottsauber.com/2017/06/10/prettier-format-on-save-never-worry-about-formatting-javascript-again/<br />
<hr><br />
