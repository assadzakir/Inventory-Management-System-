/**
 * Created by Anonmous on 2/27/2017.
 */
import firebase,{ firebaseAuth, firebaseDb} from '../../config/firebase';
import {
    SIGN_IN,
    SIGN_OUT,
    REGISTER

} from './action-types';

export function registerWithCustom(credentials) {
    return {
        type: REGISTER,
        payload: credentials
    };
}

export function signInWithCustom(credentials) {
    return {
        type: SIGN_IN,
        payload: credentials
    };
}

export function signOut() {
    return {
        type: SIGN_OUT
    };
}

