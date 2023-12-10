import { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth'
const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            console.log("User status changed", user)
            setCurrentUser(user);
            setLoading(false);
        });

        // Clean up the subscription on unmount
        return unsubscribe;
    }, []);

    return { currentUser, loading };
};

export default useAuth;
