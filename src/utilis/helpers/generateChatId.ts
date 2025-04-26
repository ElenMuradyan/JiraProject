export function generateChatId(uid1: string, uid2: string) {
    const uidArray = [uid1, uid2].sort(); 
    const chatId = uidArray.join('_'); 
    return chatId;
}