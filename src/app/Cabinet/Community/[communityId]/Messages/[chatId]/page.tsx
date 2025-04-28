'use client'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ChatContainer from '@/components/sheard/ChatContainer/page';
import { useParams } from 'next/navigation';
import { message } from '@/types/messages';
import { LoadingOutlined, SendOutlined } from '@ant-design/icons';
import { RootState } from '@/state-management/redux/store';
import { realTimeDB } from '@/services/firebase/firebase';
import { onChildAdded, push, ref } from 'firebase/database';
import image from '../../../../../../../public/undraw_online-dating_w9n9.svg';

import '../../../../../../styles/chat.css';

export default function ChatPage() {
  const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
  const [messages, setMessages] = useState<message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const { chatId, communityId } = useParams();

    useEffect(() => { 
        if(!chatId) return;
        setMessages([]); 
        const messagesRef = ref(realTimeDB, `${communityId}/chats/${chatId}/messages`);
        const unsubscribe = onChildAdded(messagesRef, (snapshot) => {
            const newMessage = snapshot.val();
            setMessages((prev) => [...prev, newMessage])
        });

        return () => {
            unsubscribe();
        }
  }, [chatId]);  

  const sendMessage = async () => {
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

  return ( 
    <>
    <ChatContainer messages={messages}/>
    <div className="inputContainer">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && sendMessage()}
            placeholder="Type a message..."
          />
          <div className='buttonContainer'>
          <button
            disabled={loading}
            onClick={() => !loading ? sendMessage() : null}
          >
            {loading ? <LoadingOutlined /> : <SendOutlined />}
          </button>
          </div>
        </div>
    </>
   );
}