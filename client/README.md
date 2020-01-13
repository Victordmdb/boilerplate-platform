# Prototype Web Client

## Main Dependencies
* [Typescript] (https://www.typescriptlang.org/docs/home.html) for code syntax
* [React] (https://reactjs.org/docs/getting-started.html) for UI syntax
* [EUI] (https://elastic.github.io/eui) for UI component lib
* [SASS](https://sass-lang.com/) for styling,though this must be on top of existing [EUI themes](https://github.com/elastic/eui/blob/master/wiki/theming.md)
* [React-Redux](https://react-redux.js.org/api/connect) & [Redux-Saga](https://redux-saga.js.org/) for state management
* [Axios](https://github.com/axios/axios) & [React-Fetching-Library](https://marcin-piela.github.io/react-fetching-library/) for data queries
* [Formik](https://jaredpalmer.com/formik/docs/overview) & [Yup](https://github.com/jquense/yup) for form state & validation
* [Cypress](https://docs.cypress.io) for testing

Familiarity with these packages is required to modify the code.

## Environment variables
A `.env.development` is required for development, and a `.env.production` is required for production. These are to be saved in the same folder as `.env.example`.

## React syntax
The syntax makes mainly use of [Functional Components](https://www.robinwieruch.de/react-function-component) and [React Hooks](https://reactjs.org/docs/hooks-intro.html). Sometimes [React HOC](https://reactjs.org/docs/higher-order-components.html) are used, but sparingly.

Code should be separated between [Container and Display](https://medium.com/@cburbank/react-container-and-display-components-29c428d86841).

## EUI notes
`<EuiForm>` does not generate a `<form>` element due to an [initial implementation issue](https://github.com/elastic/eui/issues/2272), therefore `onSubmit` doesn't work. Therefore you need to wrap a `<form onSubmit>` with a `<EuiForm>`. 

## Other notes
To modify the .env files or add new ones, prepend with `REACT_APP_` as required by CRA scripts (https://create-react-app.dev/docs/adding-custom-environment-variables/)