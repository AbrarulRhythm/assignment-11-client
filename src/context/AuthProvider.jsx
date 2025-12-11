import React, { useCallback, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxios from '../hooks/useAxios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const axiosInstance = useAxios();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isTokenSet, setIsTokenSet] = useState(false);

    // Create User
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Sign In
    const userSignIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Update User Profile
    const updateUserProfile = (profile) => {
        setLoading(true);
        return updateProfile(auth.currentUser, profile);
    }

    // Social Login (Google)
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // Sign Out
    const userSignOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // Set JWT Toke
    const fetchAndSetToken = useCallback(async (currentUser) => {
        if (!currentUser) {
            localStorage.removeItem('token');
            setIsTokenSet(true);
            setLoading(false);
            return;
        }

        const loggedUser = { email: currentUser.email };

        try {
            const res = await axiosInstance.post('/getToken', loggedUser);
            const data = res.data;

            if (data.token) {
                localStorage.setItem('token', data.token)
            }
            else {
                localStorage.removeItem('token');
            }
        }
        catch (error) {
            console.error("Token fetch failed:", error);
            localStorage.removeItem('token');
        }

        setIsTokenSet(true);
        setLoading(false);
    }, [setIsTokenSet, setLoading, axiosInstance]);

    // observe user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            fetchAndSetToken(currentUser);
        });

        return () => {
            unsubscribe();
        }
    }, [setUser, fetchAndSetToken]);

    const authInfo = {
        user,
        loading,
        isTokenSet,
        createUser,
        updateUserProfile,
        googleSignIn,
        userSignIn,
        getNewCustomTokenFromServer: fetchAndSetToken,
        userSignOut,
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;