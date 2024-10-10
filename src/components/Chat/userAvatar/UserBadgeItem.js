import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";
//import {useSelector} from 'react-redux'

const UserBadgeItem = ({handleFunction, admin,user }) => {
// const auth = useSelector(state => state.auth)
// const {user} = auth
 const   handle=()=>{
  console.log(user)

 }
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
     
     >
    
      {user?.firstName}
      {admin === user?._id && <span> (Admin)</span>}
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;