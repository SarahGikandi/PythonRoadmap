import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider, db } from "../firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Persist profile to Firestore
            const profileRef = doc(db, 'users', user.uid, 'profile', 'data');
            const profileSnap = await getDoc(profileRef);

            if (!profileSnap.exists()) {
                await setDoc(profileRef, {
                    name: user.displayName,
                    email: user.email,
                    currentWeek: 1,
                    createdAt: new Date().toISOString()
                }, { merge: true });
            }
            return result;
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        }
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        loginWithGoogle,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
