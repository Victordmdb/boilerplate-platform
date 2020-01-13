# Prototype Platform

## Scripts
* Run `npm run setup` to install the packages.
* Run `npm run dev` to launch the development environment, with hot reload
* Run `npm run build` to build the packages for production

## Readme

[Client ReadMe](client/README.md) for more details on the client
[Server ReadMe](server/README.md) for more details on the server

## Environment variables
A `.env.development` is required for development, and a `.env.production` is required for production. These are to be saved in the same folder as `.env.example`.

## Commit guidelines
* Remove any `console.log`, they should only be used for debugging
* Run tests locally
* Run build locally

## Update guidelines
Run `npm update` on client and server to update packages [PATCH & MINOR versions](https://semver.org/).
Run `npm outdated` to determine if there are any MAJOR package changes. These usually have breaking changes so should be done one by one, particulary for the main dependencies.
To update a specific package to the latest MAJOR version run `npm i packagename@versionnumber`, e.g to update react from 15 to 16 run `npm i react@16.8.0`
