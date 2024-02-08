import { useEffect, useState, useRef } from "react";
import { collection, where, orderBy, onSnapshot } from "@firebase/firestore";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collectionName, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const query = useRef(_query).current;
  const orderByField = useRef(_orderBy).current;

  useEffect(() => {
    let queryRef = collection(projectFirestore, collectionName);

    if (query) {
      query.forEach((q) => {
        queryRef = where(queryRef, ...q);
      });
    }

    if (orderByField) {
      queryRef = orderBy(queryRef, ...orderByField);
    }

    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });

      // update state
      setDocuments(results);
      setError(null);
    }, (error) => {
      console.error(error);
      setError('Could not fetch the data');
    });

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [collectionName, query, orderByField]);

  return { documents, error };
};