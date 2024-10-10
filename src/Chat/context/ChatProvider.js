import React, { createContext, useContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState();


 // const dispatch = useDispatch()

  const history =  useNavigate();
 // const auth = useSelector(state => state.auth)
  //const token = useSelector(state => state.token)
 // const users = useSelector(state => state.users)
 // const {user} = auth
  // }
 // const userDetails = useSelector((state) => state.userDetails)
  //const { loading, error, user } = userDetails

 // const userLogin = useSelector((state) => state.userLogin)
 // const { userInfo } = userLogin




  useEffect(() => {
   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) history("/login");
    

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;