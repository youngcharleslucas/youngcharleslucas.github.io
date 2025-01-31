# React 19  

Resources:  

Course Website: <https://react-v9.holt.courses/>
Course Repo: <https://github.com/btholt/citr-v9-project>  


### Run the React page using unpkg.com  

The first commit will have the React dependencies imported via a script in the 
*index.html* file. You can run the project with:  

`npx serve`  

### Package.json

`npm init -y` to create package.json  

### Prettier

This adds a file that is checked during the Continuos Integration path. If the 
project is failing the Prettier Linter, then it will not push the code.  

Add Prettier code formatting. Install into VS Code. Then install Prettier onto 
the project:   

	`npm i -D prettier`  

!!! note

    The `D` means that it is a development tool     

Add a command that formats the project. Open package.json, then under "scripts" 
include:  

``` json title="package.json"  
"format": "prettier --write \"src/**/*.{js,jsx,css,html}\""
```  

To run the added script to clean up the document, enter into the terminal:  

```
npm run format  
```  

### ESLint  

`npm i -D eslint`  
`npm install --save-dev eslint-config-prettier`
`npm i -D eslint-plugin-react@7.37.1`  

Create a new file called `eslint.config.mjs`  

Add the following code to that file:  

```js  
import js from "@eslint/js";
import globals from "globals"; 
import prettier from "eslint-config-prettier";  

/** @type {import('eslint').Linter.Config[]} */

export default [
    js.configs.recommended,
    {
        files: ["**/*.js", "**/*.jsx"],
        languageOtpions: {
            globals: {...globals.browser, ...globals.node },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    },
    prettier
]
```

Add this line under "scripts" in package.json:  

`"lint": "eslint",`  

You can now execute the linter with the command:  
`npm run lint`  

If there are errors, they can be fixed with the following command:  

`npm run lint -- --fix`

### Vite

The bundler  

`npm i vite`  

`npm i @vitejs/plugin-react`  


Create a file called `vite.config.js` and paste in the following code:  

```js  
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});  
```  

### React  

`npm i react@18.3.1`  
`npm i react-dom@18.3.1`  
 

### React Dev tools  

`$0` entered into the console will print the last element selected by the dev 
inspector.  

`$r` entered into the console prints the last React component selected into the 
console.  


