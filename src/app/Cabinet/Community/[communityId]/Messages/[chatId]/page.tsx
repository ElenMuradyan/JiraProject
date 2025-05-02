'use client'
import { useEffect, useState } from 'react';
import ChatContainer from '@/components/sheard/ChatContainer/page';
import { useParams } from 'next/navigation';
import { message } from '@/types/messages';
import { LoadingOutlined, SendOutlined } from '@ant-design/icons';
import { listenForMessages, sendMessage } from '@/features/chat/chatHandlers';
import { useSelector } from 'react-redux';
import { RootState } from '@/state-management/redux/store';
import { userData } from '@/types/userState';

import '../../../../../../styles/chat.css';

export default function ChatPage() {
  const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
  const [messages, setMessages] = useState<message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const { chatId, communityId } = useParams();

    useEffect(() => { 
        if(typeof chatId !== 'string' || typeof communityId !== 'string') return;
        setMessages([]); 
        const unsubscribe = listenForMessages({communityId, chatId, onNewMessage: (newMessage) => {
          setMessages((prev) => [...prev, newMessage]);
        }});
    
        return () => {
            unsubscribe();
        }
  }, [chatId]);  

  return ( 
    <>
    <ChatContainer messages={messages}/>
    <div className="inputContainer">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && typeof chatId === 'string' && typeof communityId === 'string' && sendMessage({input, chatId, communityId, setLoading, setInput, userData: userData as userData})}
            placeholder="Type a message..."
          />
          <div className='buttonContainer'>
          <button
            disabled={loading}
            onClick={() => !loading && typeof chatId === 'string' && typeof communityId === 'string' ? sendMessage({input, chatId, communityId, setLoading, setInput, userData: userData as userData}) : null}
          >
            {loading ? <LoadingOutlined /> : <SendOutlined />}
          </button>
          </div>
        </div>
    </>
   );
}