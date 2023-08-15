import React, { createContext, useContext, useEffect, useState } from "react";
import {
    updateProfile,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword
} from 'firebase/auth'
import { auth, db } from "../FirebaseConfi";
import { addDoc, collection } from "firebase/firestore";
const userAuthContext = createContext();
export function UserAuthContextProvider({ children }) {
    async function signUp(email, password) {
        try{
            const userRes = await createUserWithEmailAndPassword(auth, email, password);
        }
        catch(err){
            console.log("Error creating new user", err);
        }
    }
    function setName(values) {
        const { name: displayName } = values;
        return updateProfile(auth.currentUser, { displayName })
    }
    async function storeUser(values){
        const userInfo={
            name: values.fullName,
            number: values.phoneNumber,
            email: values.email,
            password: values.password,
        }
         try{
            await addDoc(collection(db, 'users'), userInfo);
            console.log("user added");
         }catch(err){
            console.log(err.message);
         }
        
    }
    function logOut() {
        return signOut(auth);
    }
    function signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const [user, setUser] = useState("");
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);
        return <userAuthContext.Provider value={{ user, logOut, signIn, signUp, setName, storeUser }}> {children} </userAuthContext.Provider>
}
export function useUserAuth() {
    return useContext(userAuthContext);
}










