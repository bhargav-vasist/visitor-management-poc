import { serverTimestamp, collection, query, where, getDocs, limit, orderBy } from "firebase/firestore"
import { firestoreDB } from "../../firebaseConfig"
import { addDocumentAuto, updateDocument, getDocument, updateDocumentForRef } from "./firestoreManager"

const visitorsDBRef = collection(firestoreDB, 'visitors')

export const createVisitorProfile = async ({ name, phone, email, callingCode, profileImage }) => {
    return await addDocumentAuto({
        collectionRef: visitorsDBRef,
        data: {
            email,
            name,
            phone,
            callingCode,
            profileImageURL: ""
        }
    }).catch(e => {
        console.error("Error creating user profile", e)
    })
}

export const updateUserProfile = async ({ userID, name, phone, email }) => {
    await updateDocument({
        path: "visitors",
        docID: userID,
        data: {
            email,
            name,
            phone
        }
    }).catch(e => {
        console.error("Error creating user profile", e)
    })
}

export const getVisitorProfile = async (phone) => {
    // First, find the visitor document by phone number
    const visitorQ = query(visitorsDBRef, where("phone", "==", phone), limit(1))
    const visitorQuerySnapshot = await getDocs(visitorQ)

    if (visitorQuerySnapshot.empty) {
        console.log('No matching visitor.');
        return;
    }
    return visitorQuerySnapshot.docs[0]
}

export const createVisitorVisit = async ({ phone, email, department, pointOfContact }) => {
    try {
        // Query to find the visitor document by phone number
        const visitorDoc = await getVisitorProfile(phone)

        // Add the visit record to the 'visits' subcollection
        const messageRef = collection(firestoreDB, 'visitors', visitorDoc.id, 'visits')

        await addDocumentAuto({
            collectionRef: messageRef,
            data: {
                checkInTime: serverTimestamp(),
                department: department,
                pointOfContact: pointOfContact
            }
        })
        console.log('Visit added successfully');
    } catch (error) {
        console.error('Error adding visit: ', error);
    }
}

export const updateCheckOutTime = async (phone) => {
    try {
        console.log("Bro", phone)
        const visitorDoc = await getVisitorProfile(phone)
        const messageRef = collection(firestoreDB, 'visitors', visitorDoc.id, 'visits')

        const visitorQ = query(messageRef, orderBy('checkInTime', 'desc'), limit(1))
        const visitsQuerySnapshot = await getDocs(visitorQ)

        if (visitsQuerySnapshot.empty) {
            console.log('No matching visitor.');
            return;
        }
        const latestVisitDoc = visitsQuerySnapshot.docs[0];

        // Update the checkOutTime for this visit
        const status = await updateDocumentForRef({
            docRef: latestVisitDoc.ref,
            data: {
                checkOutTime: serverTimestamp()
            }
        })
        console.log('Check-out time updated successfully');
        return status
    } catch (error) {
        console.error('Error updating check-out time: ', error);
    }
};
