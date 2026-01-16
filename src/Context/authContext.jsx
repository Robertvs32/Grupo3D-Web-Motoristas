import { createContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../Config/firebaseConfig'


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            firebaseUser ? setUser(firebaseUser) : setUser(null);
        })
        return unsubscribe;
    }, [])

    const login = async (email, senha) => {
        try{
            await signInWithEmailAndPassword(auth, email, senha);
        }catch(error){
            alert(error);
        }
    }

    const logout = async () => {
        try{
            await signOut(auth);
        }catch(error){
            alert(error);
        }
    }

    return(
        <AuthContext.Provider value={{login, logout, user}}>
            {children}
        </AuthContext.Provider>
    )
}