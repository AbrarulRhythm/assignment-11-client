import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
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

    // observe user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            const loggedUser = { email: currentUser?.email };

            if (!currentUser) {
                localStorage.removeItem('token');
                setIsTokenSet(true);
                setLoading(false);
                return;
            }

            fetch('http://localhost:3000/getToken', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(loggedUser)
            })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem('token', data.token);

                    setIsTokenSet(true);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Failed to get token:', error);
                    setIsTokenSet(true);
                    setLoading(false);
                });
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const authInfo = {
        user,
        loading,
        isTokenSet,
        createUser,
        updateUserProfile,
        googleSignIn,
        userSignIn,
        userSignOut,
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;