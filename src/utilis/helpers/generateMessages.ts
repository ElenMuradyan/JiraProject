import { db } from "@/services/firebase/firebase"
import { doc, getDoc } from "firebase/firestore"
import { FIRESTORE_PATH_NAMES, ROUTE_CONSTANTS } from "../constants"
import { userData } from "@/types/userState"

export const generateMessagesMenu = async ({chatIds, uid, communityId}: {chatIds: string[], uid: string, communityId: string}) => {
    const MenuItems = await Promise.all(chatIds.map(async (i: string) => {
        const id = i.split('_').filter(i => i !== uid)[0];
        const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, id);
        const userDoc = await getDoc(userRef);
        const { firstName, lastName } = userDoc.data() as userData;
        return {
            label: `${firstName} ${lastName}`,
            key: `${ROUTE_CONSTANTS.COMMUNITY}/${communityId}/Messages/${i}`
        }
    }
))
MenuItems.unshift({
    label: `Back to Community`,
    key: `${ROUTE_CONSTANTS.COMMUNITY}/${communityId}`
})
return MenuItems;
}