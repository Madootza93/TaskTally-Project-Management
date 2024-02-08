import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      // update online status if the user document exists
      const { uid } = user;
      const userDocRef = doc(projectFirestore, 'users', uid);

      // check if the document exists before updating
      const docSnapshot = await getDoc(userDocRef);

      if (docSnapshot.exists()) {
        await updateDoc(userDocRef, { online: false });
      } else {
        console.warn('User document does not exist in Firestore.');
      }

      // sign the user out
      await signOut(projectAuth);

      // dispatch logout action
      dispatch({ type: 'LOGOUT' });

      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.error('Logout Error:', err);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};
