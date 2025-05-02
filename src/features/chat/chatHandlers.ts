import { realTimeDB } from "@/services/firebase/firebase";
import { onChildAdded, push, ref } from "firebase/database";
import { ListenForMessagesParams, SendMessageParams } from "@/types/messageHandlers";
import image from '../../../public/Images/avatar.jpg';

export const sendMessage = async ({input, chatId, communityId, setLoading, setInput, userData}: SendMessageParams) => {
    if (!input.trim() || !chatId || !userData?.uid) return;
    setLoading(true);

    try{
        const messagesRef = ref(realTimeDB, `${communityId}/chats/${chatId}/messages`);
        await push(messagesRef, {
            senderId: userData.uid,
            imgUrl: userData.imgUrl ? userData.imgUrl : image.src,                    
            text: input,
            timestamp: Date.now()    
        });

        setInput('');
    }catch(err: any){
        console.error('Failed to send message', err.message);
    }finally{
        setLoading(false);
    }
};

export const listenForMessages = ({communityId, chatId, onNewMessage}: ListenForMessagesParams) => {
    const messagesRef = ref(realTimeDB, `${communityId}/chats/${chatId}/messages`);
    const unsubscribe = onChildAdded(messagesRef, (snapshot) => {
      const newMessage = snapshot.val();
      onNewMessage(newMessage);
    });
  
    return unsubscribe;
};
  