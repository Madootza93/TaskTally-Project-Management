import { useEffect, useState } from "react";
import { doc, onSnapshot } from "@firebase/firestore";
import { projectFirestore } from '../firebase/config';

export const useDocument = (collectionName, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // realtime data for the document
  useEffect(() => {
    const docRef = doc(projectFirestore, collectionName, id);

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setDocument({ ...snapshot.data(), id: snapshot.id });
        setError(null);
      } else {
        setError('No such document exists!');
      }
    }, (err) => {
      console.error(err.message);
      setError('Failed to get document.');
    });

    return () => unsubscribe();
  }, [collectionName, id]);

  return { document, error };
};
