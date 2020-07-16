# Shopping site with PHP
###### This project main objective is create a system file explorer that allows the user to navigate, create directories and upload files in the same way as he would in his usual operating system.

## The pill 🚀
This project main objective is create a **system file explorer** that allows the user to **navigate**, **create** directories and **upload** files in the same way as he would in his usual operating system.
The file explorer is a tool that **allows** you to directly **view** and **manipulate** the files and directories associated with a path, so you must take into account from which path the user starts and which path they can access.
In our team we try to do a minimalist and functional **file system** based in a simple division in **frontend** and **backend** that one (**backend**) is the responsable to send the file and folder data in **JSON** format and the other (**frontend**) is in charge to transform this information in something visual for the user.


## Main objectives 📋
* Understand how the file system works.
* Improve your knowledge in PHP (special the use of files inside a server)
* Improve your knowledge in HTML, CSS & Javascript (the presentation and use of data provided by the server)
* Improve your knowledge in logic and programming.


### Folder organization 📂
- Local-FileSystem-explorer - The root of the project
    - html - The folder that contains the php of basic elements in html to build index.php
        - _footer.php_
        - _head.php_
        - _header.php_
    - images - This folder have all the images used in the folder show container.
    - node_modules - This is a folder of NPM. Inside we have JQuery and Bootstrap dependencies. [Inside .gitignore]
    - php - This folder contains all the php of the page that make orders in the server side.
        - _csvReaderToHTML.php_
        - _deleteFile.php_
        - _dirStruct.php_
        - _fileInfo.php_
        - _newFolder.php_
        - _openFile.php_
        - _renameFile.php_
        - _rootStruct.php_
        - _searchEngine.php_
        - _uploadFile.php_
    - root - This folder contains all the information that show to the user.
    - src - This folder contains the personal _js- and _css_ of the page.
        - _style.css_
        - _app.js_
    - _.gitignore_
    - _index.php_
    - _README.md_
    - _package.json_
    - _package-lock.json_

## Build with 🛠️

_This are the tools of external that I use_

* [NPM](https://www.npmjs.com/) - The package manager
* [GIT](https://git-scm.com/) - For a good control of project version.
* [JQuery](https://jquery.com/) - For ajax request to php.


## Authors ✒️
* **A.Grandes.R** - *All the work of design and code* - [Repository](https://code.assemblerschool.com/albert-grandes/)
* **Eloy Rodriguez** - *All the work of design and code* - [Repository](https://code.assemblerschool.com/eloy-rodriguez/)



## Additional information
#### Git structure
This project has 2 main branches, develop and master. All changes are pushed into develop and at the end of the day if everything is correct we merge develop to master.