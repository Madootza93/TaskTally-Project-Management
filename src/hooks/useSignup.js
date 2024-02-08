import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await createUserWithEmailAndPassword(projectAuth, email, password);

      if (!res || !res.user) {
        throw new Error('Could not complete signup');
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const storageRef = ref(projectStorage, uploadPath);
      const img = await uploadBytesResumable(storageRef, thumbnail);
      const imgUrl = await getDownloadURL(img.ref);

      // Check if the user object has the updateProfile method
      if (typeof updateProfile === 'function') {
        // add display name to user
        await updateProfile(res.user, { displayName, photoURL: imgUrl });
      } else {
        console.error('updateProfile method not available on user object');
      }

      // create a user document in Firestore
      const userDocRef = doc(projectFirestore, 'users', res.user.uid);
      
      console.log('Firestore User Doc Ref:', userDocRef);
      console.log('Data to be Set in Firestore:', {
        email: res.user.email,
        displayName,
        photoURL: imgUrl,
        online: true,
      });

      await setDoc(userDocRef, {
        email: res.user.email,
        displayName,
        photoURL: imgUrl,
        online: true,
      });

      console.log('Firestore User Document Created Successfully');

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      console.error('Signup Error Code:', err.code);
      console.error('Signup Error Message:', err.message);

      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};