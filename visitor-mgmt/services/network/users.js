import { addDocument, updateDocument, getDocument } from "./firebaseManager"

export const createUserProfile = async ({ userID, name, phone, email, callingCode }) => {
    await addDocument({
        path: "users",
        docID: userID,
        data: {
            email,
            name,
            phone,
            callingCode
        }
    }).catch(e => {
        console.error("Error creating user profile", e)
    })
}

export const updateUserProfile = async ({ userID, name, phone, email }) => {
    await updateDocument({
        path: "users",
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

export const getUserProfile = async ({ userID }) => {
    const userProf = await getDocument({
        path: "users",
        docID: userID
    }).catch(e => {
        console.error("Error creating user profile", e)
    })
    return userProf
}