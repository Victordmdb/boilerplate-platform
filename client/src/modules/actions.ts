import * as AuthActions from './auth/actions';
import * as GeneralActions from './general/actions';
import { routerActions } from 'connected-react-router';

export default {
    auth        : AuthActions,
    general     : GeneralActions,
    router      : routerActions,
};