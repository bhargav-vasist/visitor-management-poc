import { serverTimestamp, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { firestoreDB } from '../../firebaseConfig'

export const addDocument = async ({ path, docID, data }) => {
    const docRef = doc(firestoreDB, path, docID)
    const serverData = {
        ...data,
        timestamp: serverTimestamp()
    }
    await setDoc(docRef, serverData);
}

export const updateDocument = async ({ path, docID, data }) => {
    const docRef = doc(firestoreDB, path, docID)
    console.log("Updating", data)
    const serverData = {
        ...data,
        timestamp: serverTimestamp()
    }
    await updateDoc(docRef, serverData);
}

export const getDocument = async ({ path, docID }) => {
    const docRef = doc(firestoreDB, path, docID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data()
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}