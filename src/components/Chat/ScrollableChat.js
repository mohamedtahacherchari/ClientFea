import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import React, { useState } from 'react';

import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../Chat/config/ChatLogics";
import { useSelector } from 'react-redux';

const ScrollableChat = ({ messages }) => {
  const auth = useSelector(state => state.auth);
  const { user } = auth;
  const [isShown, setIsShown] = useState(false);

  console.log(messages);
  console.log(user._id);

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.firstName} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  firstname={m.sender.firstName}
                  src={m.sender.avatar}
                />
              </Tooltip>
            )}

            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {/*m.content.includes('<img') ? (
                <div dangerouslySetInnerHTML={{ __html: m.content }} />
              ) : (
                <button
                  onMouseEnter={() => setIsShown(true)}
                  onMouseLeave={() => setIsShown(false)}
                >
                  {m.content}
                </button>
              )*/}
              {m.content.startsWith('<img') ? (
               <div dangerouslySetInnerHTML={{ __html: m.content }} />
                       ) : (
                        <span
           onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)} >
    {m.content}
  </span>)}

              <div style={{ fontSize: "10px" }}>
                {m.deliveredAt.substring(11, 16)} {m.deliveredAt.substring(0, 10).split("-").reverse().join("-")}
              </div>
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
