# Prototype API Server

## Main Dependencies
This package makes use of the following libs :
* [Typescript] (https://www.typescriptlang.org/docs/home.html) for code syntax
* [Mongoose] (https://mongoosejs.com/docs/) & [Typegoose] (https://typegoose.github.io/typegoose/docs) for Typed DB access
* [Hapi] (https://hapi.dev/api/) for REST API
* [CASL] (https://github.com/stalniy/casl) for permissioning

You must be fairly comfortable with these packages to work with this code.

## Environment variables
A `.env.development` is required for development, and a `.env.production` is required for production. These are to be saved in the same folder as `.env.example`.

## Errors

### Build
When building the server, if you get an issue saying :

>error TS2688: Cannot find type definition file for 'jest'.
>error TS2688: Cannot find type definition file for 'react'.

This can be resolved by deleting the following line in the server/tsconfig.json file

>"types": ["react", "jest"]

Though this line is required for development mode :D so revert changes after build is complete.

The issue is to do with react-native typings being included in dependencies, so until those dependencies are removed or react-native typings are removed theres no easy way of fixing it.

### Updates
Do not update @hapi/boom to v8+ as it creates namespace issues, [see github issue](https://github.com/hapijs/boom/issues/248).