# Setting up MakeDocs  

Material for MakeDocs Installation:  
https://squidfunk.github.io/mkdocs-material/getting-started/  

Manage python packages with pip:  
https://realpython.com/what-is-pip/  

### Setup the GitHub pages repository  

This is optional. If deploying to GitHub pages, create the repository for the 
site, then clone down the repository.  Complete the following steps in the repository.  

#### Automate publishing in GitHub   

Add the configuration file withing the repository folder:  
- Create the folder `.github/workflows/ci.yml`  
- Insert the configuration code from:  
`https://squidfunk.github.io/mkdocs-material/publishing-your-site/#with-github-actions-material-for-mkdocs`  

#### Deployment Branch  

In the repository's settings, click on "Pages" on the left navigation bar. 
Change the Branch to "gh-pages" and "/docs". It may not let the change to 
"/docs" occur until the new mkdocs file has been pushed, and added the 
"/docs" folder.  

#### Add .gitignore  

Google .gitignore for mkdocs and add the file.  

### Create the python virtual environment  

https://docs.python.org/3/library/venv.html

- Build the envrionment with:  

`python -m venv /Users/Luke/Documents/Repo/Blog/virtual`   

- "Activate" the virtual environment:  
	- with *cmd*: `C:\> Users\Luke\Documents\Repo\Blog\virtual\Scripts\activate.bat`  
	- with PowerShell: `PS C:\> Users\Luke\Documents\Repo\Blog\virtual\Scripts\Activate.ps1`  

### Install packages in the python virtual environment  

https://realpython.com/what-is-pip/#using-pip-in-a-python-virtual-environment  

Install Material for MakeDocs in the Virtual python environment:  
`pip install mkdocs-material`

Create a new makedocs project:  
`mkdocs new .`  

Open the parent folder of the project in VS Code.  

Add the following minimal configuration to `mkdocs.yml` to set a theme:  

```yml  
site_name: My site
site_url: https://mydomain.org/mysite
theme:
  name: material
```

#### Add yaml support to VS Code  

https://squidfunk.github.io/mkdocs-material/creating-your-site/

Add the extension "YAML" by Red Hat to VS Code.  

- Navigate to the User's settings, which in VS Code, requires clicking on the 
little cog in the lower left corner, then selecting "Settings". In the upper 
right hand corner of the IDE, there is an icon that looks like two pages, side 
by side. Click this and it should open "settings.json".   

- Add the following configuration:  

```yaml  

{
  "yaml.schemas": {
    "https://squidfunk.github.io/mkdocs-material/schema.json": "mkdocs.yml"
  },
  "yaml.customTags": [ 
    "!ENV scalar",
    "!ENV sequence",
    "!relative scalar",
    "tag:yaml.org,2002:python/name:material.extensions.emoji.to_svg",
    "tag:yaml.org,2002:python/name:material.extensions.emoji.twemoji",
    "tag:yaml.org,2002:python/name:pymdownx.superfences.fence_code_format",
    "tag:yaml.org,2002:python/object/apply:pymdownx.slugs.slugify mapping"
  ]
}
```

### See live changes to the Mkdocs site  

Execute `mkdocs serve` in cmd terminal, where the virtual environment is running.  
Navigate to the local address returned.  


### Add code block styling  

For the language you want to be formated in the code block, find the associated 
configuration codes from the following site:  

https://pygments.org/docs/lexers/  

Add the lexer code to the mkdocs.yml file under "markdown_extensions:"  

You can also add more format to the code block by adding the following on the 
first line:  

> \`\`\`py title="Code Block Title" linenums="1" 

You can highlight lines by:  

> hl_lines="2-4"  


