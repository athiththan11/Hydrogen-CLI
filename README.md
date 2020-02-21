<h1 align='center'>Hydrogen CLI</h1>

<p align='center'>An interactive CLI tool for WSO2 Servers</p>

<br>

<br>

<p align="center">
  <img width="200" src="src/assets/hydrogen.png">
</p>

<br>

<br>

<br />

## Intro

A command line tool to alter and configure WSO2 servers for different requirements. The `hydrogen` supports to perform the following alterations and configurations ...

- Replace Carbon H2 datasources of `WSO2 Identity Server` with other supported datasources
- Replace AM H2 datasource of `WSO2 API Manager` with other supported datasources
- Set up AM, UM, REG datasources of `WSO2 API Manager` with other supported datasources

& many more.

Checkout for more on [**Hydrogen CLI WiKi**](https://github.com/athiththan11/hydrogen-CLI/wiki)

<br />

## Table of Contents

- [Intro](#intro)
- [Table of Contents](#table-of-contents)
- [Install & Run](#install--run)
  - [Dev Environment](#dev-environment)
  - [Troubleshoot](#troubleshoot)
- [Commands](#commands)
  - [Datasource](#datasource)
    - [datasource:apim](#datasourceapim)
    - [datasource:is](#datasourceis)
  - [Distribute](#distribute)
    - [distribute:apim](#distributeapim)
- [Examples](#examples)
  - [Datasource Examples](#datasource-examples)
  - [Distribute Examples](#distribute-examples)
- [License](#license)

<br />

## Install & Run

> Recommended to use `NodeJS v10.18.1` in your environment use the `hydrogen` flawlessly.

### Dev Environment

Clone or download the project and tool from [here](https://github.com/athiththan11/hydrogen-CLI). After successful clone process, execute the following command to install the dependencies from the root directory

```shell
npm install
```

And execute the following command to link the CLI tool with your local Node Modules libs

```shell
npm link
```

To verify, fire up a terminal and execute the following command

```shell
hydrogen --version
```

### Troubleshoot

If you encounter a similar error trace as following while running the tool, Please follow the given steps to solve it.

```shell
Error: /node_modules/libxmljs/build/xmljs.node: invalid ELF header
    at bindings (~/node_modules/bindings/bindings.js:84:48)
    at Object.<anonymous> (~/node_modules/libxmljs/lib/bindings.js:1:99)
```

- Check your locally installed Node version. If you have no Node installed or if you have any higher versions than v10.18.1, then install Node v10.18.1 using NVM (nvm helps to manage and run different node versions)
- Delete the `node_modules` folder from the `hydrogen` directory (extracted directory)
- Execute `npm install` from the root path of `hydrogen`

This will re-install all defined dependencies and builds to work with your environment as well as with `NodeJS v10.18.1` environment.

<br />

## Commands

Below listed are a couple of available commands and descriptions of `hydrogen CLI` tool.

> All altered configurations are commented with `HYDROGENERATED:` keyword. If you want to list all the applied alterations, open a configured node and search for the keyword `HYDROGENERATED:` to list all the altered configurations.

<br />

### Datasource

`Datasource` commands are used to alter and configure `master-datasource.xml` of WSO2 servers for the following use-cases

- Replace AM_DB H2 datasource with other supported datasources. For example: MySQL, Postgre, MSSQL etc.
- Configure AM, UM & REG datasources

You can list all available `datasource` commands by executing `hydrogen datasource --help`.

```shell
Alter datasource configurations of WSO2 Platforms with supported config models and database vendors

USAGE
  $ hydrogen  datasource [COMMAND]

DESCRIPTION
  ...
  Alter datasource configurations of WSO2 Platforms based on your requirements

  Use the following command to list all available 'Datasource' related commands
  $ hydrogen datasource --help

COMMANDS
  datasource:apim  Alter datasource configurations related WSO2 API Manager products with supported datasource config models
  datasource:is    Alter datasource configurations related WSO2 Identity Server products with supported datasource config models
```

#### datasource:apim

```shell
Alter datasource configurations related WSO2 API Manager products with supported datasource config models

USAGE
  $ hydrogen datasource:apim [FLAG] [ARG]

OPTIONS
  -c, --container                       create a docker container for the datasource
  -d, --datasource=mysql|postgre|mssql  (required) the type of datasource. refer to the supported options below
  -g, --generate                        create database and tables in the docker container
  -r, --replace                         replace AM_DB H2 datasource configurations
  -s, --setup                           configure AM, UM & REG datasources
  -v, --version=2.6                     (required) [default: 2.6] version of the WSO2 API Manager

DESCRIPTION
  ...
  Alter datasource configurations of WSO2 API Manager server based on your requirement

EXAMPLES
  Replace AM_DB H2 datasource with MySQL
  $ hydrogen datasource:apim --replace -v 2.6 --datasource mysql
  Replace AM_DB H2 datasource with MySQL and create Docker container for the datasource
  $ hydrogen datasource:apim --replace -v 2.6 --datasource mysql --container --generate
  Configure AM, UM & REG datasource with Postgre
  $ hydrogen datasource:apim --setup -v 2.6 --datasource postgre
  Configure AM, UM & REG datasources with Postgre and create Docker container for the datasources
  $ hydrogen datasource:apim --setup -v 2.6 --datasource postgre --container --generate
```

#### datasource:is

```shell
Alter datasource configurations related WSO2 Identity Server products with supported datasource config models

USAGE
  $ hydrogen datasource:is [FLAG] [ARG]

OPTIONS
  -c, --contianer                       create a docker container for the datasource
  -d, --datasource=mysql|postgre|mssql  (required) the type of datasource. refer to the supported options below
  -g, --generate                        create database and tables in the docker container
  -r, --replace                         replace Carbon H2 datasource configuration
  -v, --version=5.7                     (required) [default: 5.7] version of the WSO2 Identity Server

DESCRIPTION
  ...
  Alter datasource configurations of WSO2 Identity Server based on your requirement

EXAMPLE
  Replace Carbon H2 datasource with MySQL
  $ hydrogen datasource:is --replace -v 5.7 --datasource mysql
```

<br />

### Distribute

`Distribute` commands are used to configure deployment setups for `WSO2 API Manager` servers.

```shell
Configure WSO2 platforms for different distributed setups

USAGE
  $ hydrogen distribute [COMMAND]

DESCRIPTION
  ...
  Configure WSO2 platforms with available distributed setups based on your requirements

  Use the following command to list all available 'Distribute' related commands
  $ hydrogen distribute --help

COMMANDS
  distribute:apim  Configure WSO2 API Manager products for distributed deployments with supported config models
```

#### distribute:apim

```shell
Configure WSO2 API Manager products for distributed deployments with supported config models

USAGE
  $ hydrogen distribute:apim [FLAG] [ARG]

OPTIONS
  -C, --config=config                   JSON configuration path
  -D, --distributed                     deployment setup for distributed setup
  -I, --is-km                           deployment setup for identity server as key manager
  -M, --publish-multiple-gateway        deployment setup for publish through multiple-gateways
  -c, --container                       create a docker container for the datasource
  -d, --datasource=mysql|postgre|mssql  (required) [default: mysql] the type of datasource. refer to the supported options below
  -g, --generate                        create database and tables in the docker container
  -n, --count=count                     number of gateway nodes to be configured for publish-multiple-gateway layout
  -v, --version=2.6                     (required) [default: 2.6] version of the WSO2 API Manager

DESCRIPTION
  ...
  Configure WSO2 API Manager products for distributed deployments and setups based on your requirement

EXAMPLES
  Setup Publish through Multiple Gateway deployment with 2 Gateway Nodes and a AIO
  $ hydrogen distribute:apim --publish-multiple-gateway --count 2
  Setup Identity Server as Key Manager with API Manager and Postgre datasource container
  $ hydrogen distribute:apim --is-km --datasource postgre --container --generate
```

<br />

## Examples

### Datasource Examples

- Need to configure `WSO2 Identity Server v5.7` replacing the default shipped Carbon H2 datasource with `Postgre`
  - Download and extract a fresh-pack of `WSO2 Identity Server v5.7`
  - Fire up a terminal and navigate to the root directory of the extracted `WSO2 IS` server
  - Execute the following

    ```shell
    # from root directory of wso2is | inside wso2is-5.7.0
    hydrogen datasource:is --replace -v 5.7 --datasource postgre
    ```

- Need to configure `WSO2 API Manager v2.6` replacing the defualt shipped AM_DB H2 datasource with `Postgre`
  - Download and extract a fresh-pack of `WSO2 API Manager v2.6`
  - Fire up a terminal and navigate to the root directory of the extracted `WSO2 APIM` server
  - Execute the following

    ```shell
    # from root directory of wso2 apim | inside wso2am-2.6.0
    hydrogen datasource:apim --replace -v 2.6 --datasource postgre
    ```

- Need to configure `WSO2 API Manager v2.6` setting up AM, UM, and REG datasource with `Postgre` and also to generate a Postgre Docker container with the databases and tables
  - Download and extract a fresh-pack of `WSO2 API Manager v2.6`
  - Start the Docker service in your environment (if you don't have Docker installed, install Docker before executing the command to work without any errors)
  - Fire up a terminal and navigate to the root directory of the extracted `WSO2 APIM` server
  - Execute the following

    ```shell
    # from root directory of wso2 apim | inside wso2am-2.6.0
    hydrogen datasource:apim --setup -v 2.6 --datasource postgre --container --generate
    ```

### Distribute Examples

- Need to configure `WSO2 API Manager v2.6` and `WSO2 Identity Server as Key Manager v5.7` with `Postgre` Datasource
  - Download and extract both `WSO2 API Manager v2.6` & `WSO2 Identity Server as Key Manager v5.7` packs (Note: Place both the extracted packs inside a new folder)
  
    ```shell
    - New Folder
      - wso2am-2.6.0
      - wso2is-km-5.7.0
    ```

  - Fire up a terminal and navigate to the root directory of the placed folder
  - Execute the following
  
    ```shell
    # from root directory of the extracted packs
    hydrogen distribute:apim --is-km --datasource postgre
    ```

## License

Licensed under [MIT](https://github.com/athiththan11/hydrogen-CLI/blob/master/LICENSE).
