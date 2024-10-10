import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout"; 
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../../Chat/config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../../Chat/context/ChatProvider";
import {useSelector} from 'react-redux'
import ErrorBoundary from '../../pages/Zervant/handleErrors '

const MyChats = ({ fetchAgain }) => {
  const auth = useSelector(state => state.auth)
  const {user} = auth
  const token = useSelector(state => state.token)
 const [loggedUser, setLoggedUser] = useState();



  //const {user} = auth
const { selectedChat,setSelectedChat, chats, setChats } = ChatState();

  const toast = useToast();
  console.log(user)
  console.log(user._id);
//console.log(loggedUser)
  console.log(token);
  console.log(chats);

  const fetchChats = async () => {
  
    try {
      //let config= user.token
      const { data } = await axios.get("/api/chat",{headers: {Authorization: token}});
      setChats(data);
      console.log(data)
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      console.log(error)
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
   // 
   
    // eslint-disable-next-line
  }, [fetchAgain,user]);
 // console.log(loggedUser)

  return (
    <ErrorBoundary>    
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
      
     <GroupChatModal>
    
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            Nouveau groupe de discussion
          </Button>
  </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll" 
          >
            {chats.map((chat) => (
              <Box
              key={chat._id}
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
               // key={chat._id}
              >
              {/*  <Text>
                  {!chat.isGroupChat
                    ? chat.users && chat.users.length > 0 // Assurez-vous que chat.users est défini et non vide
                    ? getSender(user, chat.users)
                    : "Nom de l'expéditeur manquant"
                    : chat.chatName}
                  </Text>*/}
                  <Text>
                    {!chat.isGroupChat
                      ? chat.users && chat.users.length > 0
                      ? getSender(user, chat.users) || "Nom de l'expéditeur manquant"
                      : "Nom de l'expéditeur manquant"
                      : chat.chatName}
                    </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs" color="green" >
                    <b>{chat.latestMessage.sender.firstName} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                   
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
      <button onClick={fetchChats}></button>

    </Box>
    </ErrorBoundary>

  );
};

export default MyChats;