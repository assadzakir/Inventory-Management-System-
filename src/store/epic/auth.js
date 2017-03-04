/**
 * Created by Anonmous on 2/27/2017.
 */
import {Observable} from "rxjs";
import {ActionsObservable} from "redux-observable";
import {browserHistory} from 'react-router';


import {
    SIGN_IN_ERROR,
    SIGN_IN_SUCCESS,
    SIGN_OUT_SUCCESS,
    SIGN_OUT_ERROR,
    REGISTER_ERROR,
    REGISTER_SUCCESS,
    SIGN_IN,
    SIGN_OUT,
    REGISTER

} from '../../store/actions';

import firebase, {firebaseAuth, firebaseDb} from '../../config/firebase';


export function setLocalStorage(pro, userObj) {
    localStorage.setItem(pro, JSON.stringify(userObj));
}


export function clearLocalStorage(data) {
    localStorage.removeItem(data);
}

export function getLocalStorage(val) {
    return JSON.parse(localStorage.getItem(val));
}


export const registerEpic = action$ =>
    action$.ofType(REGISTER)
        .switchMap(({payload}) => {
            return firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
                .then(d => {


                    let obj = payload;

                    obj['key'] = d.uid;

                    firebaseDb.ref().child(`users/${d.uid}`)
                        .set({
                            firstName: obj.firstName,
                            lastName: obj.lastName,
                            email: obj.email,
                            uid: obj.key,
                            role: 'user',
                            lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP
                        })

                    return {
                        type: REGISTER_SUCCESS,
                        payload: obj

                    };


                })
                .catch((err) => {

                    console.log('PostActions.ADDPOST catch ', err);

                    return {

                        type: REGISTER_ERROR,

                        payload: null

                    };


                })

        })

export const logoutEpic = action$ =>
    action$.ofType(SIGN_OUT)
        .switchMap(() => {
            return firebaseAuth.signOut()
                .then(d => {

                    localStorage.removeItem('react-localStorage-user');
                    return {
                        type: SIGN_OUT_SUCCESS,
                    };
                })
                .catch((err) => {

                    return {
                        type: SIGN_OUT_ERROR

                    };


                })

        })


export const loginEpic = action$ =>
    action$.ofType(SIGN_IN)
        .switchMap(({payload}) => {

            return Observable.fromPromise(firebase.auth().signInWithEmailAndPassword(payload.email, payload.password))

                .catch(err => {

                    console.log('err ', err);

                    return Observable.of(err)

                })

                .switchMap((d) => {

                    console.log('d login ', d);

                    if (d.message) {

                        // error

                        return Observable.of({

                            type: SIGN_IN_ERROR,

                            payload: d.message

                        });

                    }
                    return Observable.fromPromise(firebase.database().ref('/').child(`users/${d.uid}`).once('value'))

                        .map(u => {

                            //set local storage

                            localStorage.setItem('react-localStorage-user', JSON.stringify(u.val()));


                            return {

                                type: SIGN_IN_SUCCESS,
                                payload: u.val()

                            }

                        })


                })

        });


export const fetchStockFromServer = action$ =>
    action$.ofType('FETCHING_DATA')
        .switchMap(() => {
            return Observable.fromPromise(firebase.database().ref().child('stock').once('value'))
                .map(u => {
                    console.log(u);
                    return {
                        type: 'FETCH_STOCK',
                        payload: u.val()
                    }
                });
            }
        );

export const fetchSalesFromServer = action$ =>
    action$.ofType('FETCHING_DATA')
        .switchMap(() => {
                return Observable.fromPromise(firebase.database().ref().child('sales').once('value'))
                    .map(u => {
                        console.log(u);
                        return {
                            type: 'FETCH_SALES',
                            payload: u.val()
                        }
                    });
            }
        );

export const fetchProductFromServer = action$ =>
    action$.ofType('FETCHING_DATA')
        .switchMap(() => {
                return Observable.fromPromise(firebase.database().ref().child('product').once('value'))
                    .map(u => {
                        console.log(u);
                        return {
                            type: 'FETCH_PRODUCT',
                            payload: u.val()
                        }
                    });
            }
        );

export const fetcStoreFromServer = action$ =>
    action$.ofType('FETCHING_DATA')
        .switchMap(() => {
                return Observable.fromPromise(firebase.database().ref().child('store').once('value'))
                    .map(u => {
                        console.log(u);
                        return {
                            type: 'FETCH_STORE',
                            payload: u.val()
                        }
                    });
            }
        );




