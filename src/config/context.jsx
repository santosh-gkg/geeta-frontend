import { createContext, useState, useEffect } from "react";
import runChat from "./groq";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState('');
    const [currentChat, setCurrentChat] = useState(null);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const storedChats = JSON.parse(localStorage.getItem('chats')) || [];
        setChats(storedChats);
        if (storedChats.length === 0){
            startNewChat();
        }
        else{
            setCurrentChat(storedChats[0].id);
        }
    }, []);
    
    useEffect(() => {
        localStorage.setItem('chats', JSON.stringify(chats));
    }, [chats]);

    const startNewChat = () => {
        let newid = chats.length === 0 ? 1 : chats[0].id + 1;
        const newChat = { id: newid, messages: [] };
        
        // console.log(chats[1].id);
        setChats([newChat, ...chats]);
        // console.log(chats[0].id);
        setCurrentChat(newChat.id);
    };
    const start=() => {
        
    };
    useEffect(() => {
        start();
    }, []); // Runs only once when the component mounts

    
    
    const saveChatsToLocalStorage = (updatedChats) => {
        localStorage.setItem('chats', JSON.stringify(updatedChats));
        setChats(updatedChats);
    };
    const deleteChat = (chatId) => {
        const updatedChats = chats.filter(chat => chat.id !== chatId);
       
        saveChatsToLocalStorage(updatedChats);
    };
    const sendMessage = async (message) => {
        
        setChats(prevChats =>
            prevChats.map(chat =>
                chat.id === currentChat ? { ...chat, messages: [...chat.messages, { role: 'user', content: message }] } : chat
            )
        );
        setInput('');
        
        const currentChatMessages = chats.find(chat => chat.id === currentChat)?.messages || [];
        const response = await runChat(currentChatMessages,message);
        let newarray = "";
        if (response) {
            let responseArray = response.split('\n\n');
            
            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newarray += responseArray[i];
                } else {
                    newarray += "<br><br>" + responseArray[i] + "<br><br>";
                }
            }
        }
        let newarray1 = "";
        newarray1=newarray.split('**');
        let newarray2="";
        for (let i=0; i<newarray1.length; i++){
            if (i===0 || i%2!==1){
                newarray2 = newarray2 + newarray1[i];
            }
            else{
                newarray2 = newarray2 +"<b>"+newarray1[i] +" </b>" ;
            }
        }
        setChats(prevChats =>
            prevChats.map(chat =>
                chat.id === currentChat ? { ...chat, messages: [...chat.messages, { role: 'assistant', content: newarray2 }] } : chat
            )
        );
    };
        


    const loadChat = (chatId) => {
        setCurrentChat(chatId);
    };

    return (
        <Context.Provider value={{ input, setInput, currentChat, chats, startNewChat, sendMessage, loadChat, deleteChat}}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
