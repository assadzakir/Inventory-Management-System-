/**
 * Created by Anonmous on 2/27/2017.
 */
import firebase from 'firebase';

try{
    const firebaseConfig = {
        apiKey: "AIzaSyCjXD2Xh02lmGvVlkb0oMxVLMwFHr6qtrg",
        authDomain: "inventory-management-sys-528b7.firebaseapp.com",
        databaseURL: "https://inventory-management-sys-528b7.firebaseio.com",
        storageBucket: "",
        messagingSenderId: "948135820911"
    };

   var firebaseApp = firebase.initializeApp(firebaseConfig);
}catch (e){

}


export default firebase;
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();