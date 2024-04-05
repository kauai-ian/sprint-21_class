import { Grid, GridItem, Flex, Text, Image, Icon } from "@chakra-ui/react";
import { FC } from "react";
import { IMessage } from "../../types";
import dayjs from "dayjs";
import useCurrentUser from "../../hooks/useCurrentUser";
import useMessages from "../../hooks/useMessages";
import * as api from "../../api/messages";
import { FiHeart } from "react-icons/fi";

export type Props = {
  body: string;
  createdDate: string;
  profileImage: string;
  displayName: string;
  username: string;
  authorSub: string;
  likes: IMessage["likes"];
  _id: string;
};

const MessageCard: FC<Props> = ({
  body,
  createdDate,
  profileImage,
  displayName,
  username,
  authorSub,
  likes,
  _id,
}) => {
  const { currentUser } = useCurrentUser();
  const { updateMessageLikes } = useMessages();
  const alreadyLiked = likes.some((like) => like._id === currentUser?._id);

  const date = dayjs(createdDate).format("MMM D, YYYY");

  const handleLike = async () => {
    if (!currentUser) {
      return;
    }

    // Optimistic update -> Don't wait for the server to respond
    const newLikes = alreadyLiked
      ? likes.filter((like) => like._id !== currentUser._id)
      : [...likes, currentUser];
    console.log(newLikes);
    updateMessageLikes(_id, newLikes);

    await api.likeMessage(_id, currentUser._id);
    console.log("Liked!");
  };

  return (
    <Grid
      templateColumns="auto 1fr"
      gap={4}
      p={4}
      border="1px solid #ccc"
      borderRadius="md"
    >
      <GridItem>
        <Image
          h="40px"
          w="40px"
          borderRadius="50%"
          src={profileImage}
          alt={displayName}
        />
      </GridItem>
      <GridItem>
        <Flex flexDir="column" gap={2} justify="space-between">
          <Flex gap={1} align="center">
            <Text
              as="a"
              href={`/profile/${authorSub}`}
              fontWeight="extrabold"
              fontSize="md"
            >
              {displayName}
            </Text>
            <Text fontSize="sm">@{username}</Text>
            <Text fontSize="sm">{date}</Text>
          </Flex>
          <Text>{body}</Text>
          <Flex>
            <Text
              display="flex"
              gap={2}
              alignItems="center"
              as="button"
              onClick={handleLike}
              _focus={{ outline: "transparent" }}
              _hover={{ borderColor: "transparent" }}
              color={alreadyLiked ? "pink" : "initial"}
            >
              <Icon
                as={FiHeart}
                fill={alreadyLiked ? "currentcolor" : "none"}
              />{" "}
              {likes.length} like{likes.length !== 1 && "s"}
            </Text>
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default MessageCard;
