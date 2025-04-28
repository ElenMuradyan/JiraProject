import { FIRESTORE_PATH_NAMES } from "@/utilis/constants";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { userData } from "@/types/userState";

export const updateUser = async (uid: string, updateObject: object) => {
    const ref = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
    await updateDoc(ref, updateObject);
}

export const getUser = async (uid: string) => {
    const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
    const userSnap = await getDoc(userRef);
    return userSnap.data() as userData;
}