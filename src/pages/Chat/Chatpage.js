import { Box,Grid,GridItem } from "@chakra-ui/layout";
import { useState } from "react";
//import url from "https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap";
import "./Chatpage.css"
import Chatbox from "../../components/Chat/Chatbox";
import MyChats from "../../components/Chat/MyChats";
import SideDrawer from "../../components/Chat/miscellaneous/SideDrawer";
import {useSelector} from 'react-redux'

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const auth = useSelector(state => state.auth)
  const {user} = auth
  return (
    <div className="Chatpage">
    <div style={{ width: "100%"}} >
      {user && <SideDrawer/>}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
    </div>
  );
};

export default Chatpage;