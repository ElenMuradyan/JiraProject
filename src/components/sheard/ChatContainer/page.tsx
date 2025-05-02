import { useEffect, useRef } from "react";
import { message } from "@/types/messages";
import { useSelector } from "react-redux";
import { RootState } from "@/state-management/redux/store";

export default function ChatContainer ({messages}: {messages: message[]}) {
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);  
    const { userData } = useSelector((state: RootState) => state.userProfile.authUserInfo);
    
    useEffect(() => {
      messagesContainerRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages]);
  
    return(   
        <div className="messagesContainer p-4 space-y-4">
        {messages?.map((msg, idx) => {
          const isMyMessage = msg.senderId === userData?.uid;
  
          return (
            <div
              key={idx}
              className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-center ${isMyMessage ? "flex-row-reverse" : "flex-row"}`}>
                <img
                  src={isMyMessage ? userData?.imgUrl || "/default-avatar.png" : msg.senderImg || "/default-avatar.png"}
                  alt="Sender Avatar"
                  className="w-8 h-8 rounded-full mx-2"
                />
                <div
                  className={`rounded-2xl p-3 text-sm shadow-md max-w-[70%] ${
                    isMyMessage
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
        <div className="hi" ref={messagesContainerRef}></div>
      </div>
    )
};