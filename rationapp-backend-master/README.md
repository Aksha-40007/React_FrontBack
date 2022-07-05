
<img alt="npm" src="https://img.shields.io/badge/npm-v7.5.2-brightgreen">
<img alt="npm" src="https://img.shields.io/badge/Node-v12.17.0-brightgreen">
<img alt="Libraries.io dependency status for GitHub repo" src="https://img.shields.io/librariesio/github/Dnyaneshwarsakhare/Rationapp-backend">
<img alt="npm" src="https://img.shields.io/badge/license-ISC-brightgreen">


# Rationapp-backend
A Ration Corruption Control System mainly focus on spreading awareness among the ration card holder about transparency of the system &amp; trying to reduce corruption at some extent

---
## Requirements

For development, you will only need Node.js and a node global package, npm/yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### npm installation
  After installing node, this project will need npm too, so just run the following command.

      $ npm install -g npm

---

## Install

    $ git clone https://github.com/Dnyaneshwarsakhare/rationapp-backend
    $ cd rationapp-backend
    $ npm install

## Configure app

Open `a/nice/path/to/a.file` then edit it with your settings. You will need:

- A setting;
- Another setting;
- One more setting;

## Running the project

    $ nodemon server.js

If nodemon not installed, you can install with

    $ npm install nodemon

Otherwise

    $ node server.js

## Simple build for production

    $ npm build
