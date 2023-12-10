import { doc, setDoc, updateDoc } from "firebase/firestore";
import { firestoreDB } from '../../firebaseConfig'

export const addDocument = async ({ path, docID, data }) => {
    const docRef = doc(firestoreDB, path, docID)
    await setDoc(docRef, data);
}

export const updateDocument = async ({ path, docID, data }) => {
    const docRef = doc(firestoreDB, path, docID)
    await updateDoc(docRef, data);
}