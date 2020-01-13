
import {all} from 'redux-saga/effects';
import generalSagas from './general/sagas';
import authSagas from './auth/sagas';

// import {State as ApplicationState} from 'reducers';

export default function* rootSaga() {
    yield all([
        generalSagas(),
        authSagas(),
    ]);
}