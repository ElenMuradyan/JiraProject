import { ROUTE_CONSTANTS } from "../constants"
import { getUser } from "@/services/firebase/databaseActions"

export const generateMessagesMenu = async ({chatIds, uid, communityId}: {chatIds: string[], uid: string, communityId: string}) => {
    const MenuItems = await Promise.all(chatIds.map(async (i: string) => {
        const id = i.split('_').filter(i => i !== uid)[0];
        const { firstName, lastName } = await getUser(id);
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