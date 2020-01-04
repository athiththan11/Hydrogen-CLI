<h1 align='center'>hydrogen</h1>

<p align='center'>An interactive CLI tool for WSO2 Servers</p>

<br>

<br>

<p align="center">
  <img width="200" src="src/assets/hydrogen.png">
</p>

<br>

<br>

[:construction: Work In Progress]

<br />

## Intro

A command line tool to alter and configure fresh packs of WSO2 products for different requirements. The `hydrogen` supports to perform the following alterations and configurations ...

* Replace H2 databases of WSO2 IS with other supported databases
* Configure API manager for distributed deployment
* Configure API manager and IS as Keymanager

& more on the way.

Checkout for more on [**Hydrogen WiKi**](https://github.com/athiththan11/hydrogen/wiki) & [**Hydrogen Project**](https://github.com/athiththan11/hydrogen/projects).

<br />

## Install & Run

> You don't need to install NodeJS to use the `hydrogen`, since the packages and dependencies are compressed and provided as `tar` objects. If in need to rebuild and use the `hydrogen`, then the recomended version of NodeJS is `v8.9`. **{ Node v8.9.0 Recomended }**

Download the `tar` file according to your environment from [here](https://github.com/athiththan11/hydrogen/releases). Extract and place it in your favourite location and set the `$PATH` variable to point the `/bin` folder of `hydrogen`.

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

* Check your locally installed Node version. If you have no Node installed or if you have any higher versions than v8.9, then install Node v8.9.0 using NVM (nvm helps to manage and run different node versions)
* Delete the `node_modules` folder from the `hydrogen` directory (extracted directory)
* Execute `npm install` from the root path of `hydrogen`

This will reinstall all defined dependencies and builds to work with your environment as well as with NodeJS v8.9.0 environment.

<br />

## Commands

Below listed are the available commands and descriptions of `hydrogen`.

> All altered configurations are commented with `HYDROGENERATED:` keyword. If you want to list all the applied alterations, open a configured node and search for the keyword `HYDROGENERATED:` to list all the altered configurations.

<br />

## License

Licensed under [MIT](https://github.com/athiththan11/hydrogen-CLI/blob/master/LICENSE).
