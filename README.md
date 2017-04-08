# npm - The Node Package Manager

## Table Of Contents

- [Introduction](#introduction)
    - [History](#history)
    - [Role in the Node ecosystem](#role-in-the-node-ecosystem)

- [Usage](#usage)
    - [CLI Invocation](#cli-invocation)
    - [Common Use Cases](#common-use-cases)
        - [Getting Help](#getting-help)
        - [Installing Packages](#installing-packages)
        - [Package Metadata](#package-metadata)
        - [Installing Dependencies Locally](#installing-dependencies-locally)
        - [Dependency Versioning](#dependency-versioning)
        - [Listing Dependencies](#listing-dependencies)
        - [Checking Dependencies State](#checking-dependencies-state)
        - [Updating Dependencies](#updating-dependencies)
        - [Uninstalling Dependencies](#uninstalling-dependencies)

- [Hands On With npm](#hands-on-with-npm)
- [Publishing Own Packages](#publishing-own-packages)


## Introduction

### History

- `npm` is the official package manager for `Node`.
- Created by [Isaac Z. Schlueter](http://izs.me/)
- It's a [CLI][link_cli] written in `JavaScript`

[link_cli]: https://en.wikipedia.org/wiki/Command-line_interface "Wikipedia: CLI"

### Role in the Node ecosystem

- `npm` provides a registry service for open source code to be shared and (re)used.
- `Node` provides the environment for running JavaScript code, but to build 
useful software, we need many utilities and libraries. `npm` is the go to place 
for such needs.
- As an analogy, you have got a beautiful kitchen with all those ovens and stoves. 
But you always need a market place to shop for some ingredients and only then using 
your skills, the ingredients and the tools at hand, you make stuff. `npm` is the marketplace of open source software for `Node`.
- `npm` comes bundled with `Node` installation.
- To check, open shell prompt and type and hit enter : 
    ```shell
    $: node -v && npm -v
    ```


## Usage

- As mentioned, `npm` is a cli tool, and as any other cli tool, it has got `commands` too. In this section, we will explore few commands to use with `npm`. 

- To begin with, create a directory under some suitable path. We will be referring to this directory as the `working directory`. Here is how to do it:  
    ```shell
    # create and move into directory
    $: mkdir -p ~/work/sessions/learning_npm && cd $_
    ```

### CLI Invocation

- To summon `npm` from within the `working directory`, type and hit enter:
    ```shell
    $: cd ~/work/sessions/learning_npm

    $: npm 
    ```
    `npm` presents itself with a CLI usage, just like any other CLI command


### Common Use Cases

#### **Getting Help**

- General syntax to get help around any term: `npm help <term>`
    ```shell 
    # Usage info for npm
    $: npm help npm
    
    # Manual for package.json
    $: npm help json
    ```

- General syntax to get help around any command: `npm <command> -h` 
    ```shell
    # Help around the `init` command
    $: npm init -h
    ```

#### **Installing Packages**

- Packages are unit of share and reuse. These are generally a directory of utility files or libraries. 

- When we want to use a package, we ask `npm` to get it for us and make a copy on our system so that we can use it offline.

- Packages are installed under the `node_modules` directory. *This name is a `Node` requirement not `npm`'s*. 

- We can have `node_modules` directory one per `Node` installation or one per `working directory`, commonly referred to as `global` install and `local` install respectively. 


##### Global Installation vs Local Installation

- When we anticipate a package is general purpose and can be used across projects, we want a single copy of it on our machine. This is `global` install. 

- Consider for example, a build tool like `gulp` that can be used across one or many projects.

- `npm` installs global packages under `node_modules` in `lib` directory of your `Node` installation path. 

- To find the Node installation path, type and hit enter: 
    ```shell
    $: npm config get prefix
    ```
- General syntax to install global packages:  
`npm (install | i) <package(s)> (--global | -g)`  
`npm (install | i) (--global | -g) <package(s)>`  
    ```shell      
    $: npm install gulp --global

    $: npm install gulp -g  
    
    $: npm install --global gulp  
    
    $: npm install -g gulp  
    
    $: npm i -g gulp grunt webpack
    ```

- Sometime we need different versions of a single package for use across different project. Definitely a global install cannot help in such scenarios.

- The packages that we install are technically dependencies. These dependencies are required for our project to run. 

- Imagine we created a package `P` for share and (re)use. `P` has a dependency on some package, say `D`. 

- For any one to use our package `P`, they need to have `D` available on their machine, something which we do not have any control on. 

- The way out is, define and supply `D`, the dependency, with the dependent `P`. 

- This, however, has a problem. Our package `P` starts growing in size quickly and who ever requires `P` has to pay for this extra size whether they intend to run `P` or not. 

- Also, if we update any dependency, a user need to download the entire bundle to get the update. This would be very limiting for our philosophy of share and reuse. 

- The solution is to supply a metadata of dependencies with the package. Any user then needs to download these dependencies if they wish to run `P` or just let off with these dependencies if they just want to glance at `P`'s source and do not intend on running it. 

- This reduces the bundle size significantly. Also, if we update any of our dependencies, a user just need to have the latest metadata to get those dependencies.

- Whenever a user install these dependencies, we say a `local` install has taken place. We will take a look at local install soon, but before that, take a look at the metadata.

#### **Package Metadata**

- The package metadata that we discussed earlier is a file called `package.json` with a specified schema.

- Below is a sample `package.json` from the `express` package.

    ```json
    {
        "name": "express",
        "description": "Sinatra inspired web development framework",
        "version": "2.5.11",
        "author": "TJ Holowaychuk <tj@vision-media.ca>",
        "contributors": [ 
            { "name": "TJ Holowaychuk", "email": "tj@vision-media.ca" }, 
            { "name": "Aaron Heckmann", "email": "aaron.heckmann+github@gmail.com" },
            { "name": "Ciaran Jessup", "email": "ciaranj@gmail.com" },
            { "name": "Guillermo Rauch", "email": "rauchg@gmail.com" }
        ],
        "dependencies": {
            "connect": "1.9.2",
            "mime": "1.2.4",
            "qs": "0.4.x",
            "mkdirp": "0.3.0"
        },
        "devDependencies": {
            "connect-form": "0.2.1",
            "ejs": "0.4.2",
            "expresso": "0.9.2",
            "hamljs": "0.6.x",
            "jade": "0.16.2",
            "stylus": "0.13.0",
            "should": "0.3.2",
            "express-messages": "0.0.2",
            "node-markdown": ">= 0.0.1",
            "connect-redis": ">= 0.0.1"
        },
        "keywords": ["framework", "sinatra", "web", "rest", "restful"],
        "repository": "git://github.com/visionmedia/express",
        "main": "index",
        "bin": { "express": "./bin/express" },
        "scripts": {
            "test": "make test",
            "prepublish" : "npm prune"
        }
    }

    ```

- It describes the package details like name, version, repository with dependencies and their corresponding versions. 

- `npm` provides a command that creates this metadata for us. 

- To follow along, open the shell prompt - `terminal` in case of linux or mac, `cmd` in case of windows - and cd into the `working directory`. 
    ```shell
    $: cd ~/work/sessions/learning_npm
    
    $: npm init
    ```

    This will start an interactive session wherein `npm` will ask few questions and the answers will be used to populate the metadata. Confirm once done and it will write that metadata to a `package.json` file in the `working directory`.

#### **Installing Dependencies Locally**

- Now that we have a working directory with a `package.json` file, we can start asking `npm` for finding and fetching dependencies for us. 

- There are two classes of dependency for a package that we are generally interested in. 

- These are `dependencies` and `devDependencies`.

- `dependencies` are the runtime dependencies for a package whereas `devDependencies` are build time dependencies. 

- Installing run-time dependencies locally  
    ```shell
    $: npm install lodash --save

    $: npm i -S lodash  # short for the above command
    ``` 
- Installing build-time dependencies locally  
    ```shell
    $: npm install lodash --save-dev
    
    $: npm i -D lodash # short for the above command
    ```

- To install a dependency as an optional dependency  
    ```shell 
    $: npm install lodash --save-optional

    $: npm i -O lodash # short for the above command
    ```


#### **Dependency Versioning**

- Each package has a timeline of its growth from inception to major milestones and these are marked with a versioning system. 

- `npm` follows the semantic versioning system commonly referred to as [semver][link_semver] . 

- A version is a three-segment dotted decimal number like an IP address e.g. `2.0.47` ( `Major.Minor.Patch` ).

- Each dependency in `package.json` is a key-value pair where key represents the dependency identifier and value represents its semver - version used by the package. 

- To specify hard dependency on a version, we use absolute version number, like `2.0.14`. 

- If we are ok with `patch` updates of the dependency, we prefix the version with a tilde(`~`) like `~2.0.14`.

- If you are ok with `minor` updates of the dependency, we prefix the version with a caret(`^`) like  `^2.0.14`

- We are never ok with `major` updates of a dependency as they introduce broken changes. In that case, we re-write your code as per new api contracts of the dependency and specify the updated dependency version.

[link_semver]: http://semver.org/ "Semantic Versioning"


#### **Listing Dependencies**

- To list the dependencies installed for the `working directory`: 
    ```shell
    # cd into working directory
    $: cd ~/work/sessions/learning_npm
    
    $: npm ls
    ```

#### **Checking Dependencies State**

- To check the status of a dependency - the current version that we are using and the latest:
    ```shell
    # cd into working directory
    $: cd ~/work/sessions/learning_npm
    
    $: npm outdated
    ```

#### **Updating Dependencies**

- To update the dependencies: 
    ```shell
    # cd into working directory
    $: cd ~/work/sessions/learning_npm
    
    # To update all dependencies
    $: npm update

    # To update particular dependency
    $: npm update <package>   # replace <package> with name of the package
    ```


#### **Uninstalling Dependencies**

- To uninstall the dependencies:
    ```shell
    # cd into working directory
    $: cd ~/work/sessions/learning_npm
    
    # To uninstall all dependencies
    $: npm uninstall

    # To uninstall particular dependency
    $: npm uninstall <package>   # replace <package> with name of the package
    ```


With this, we cover the basics of `npm` and are now ready for the hands-on.

## Hands On With npm

WIP

## Publishing Own Packages

WIP

