import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useState, useEffect } from 'react';

export function Auth() {
 const [currentUser, setCurrentUser] = useState<User | null>(null);
 useEffect(() => {
 const unsub = onAuthStateChanged(auth, (u) => setCurrentUser(u));
 return () => unsub();
 }, []);


    return currentUser;
} 

export default Auth