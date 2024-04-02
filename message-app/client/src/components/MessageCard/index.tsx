import { Grid, GridItem, Flex, Text, Image } from "@chakra-ui/react";
import { FC } from "react";
import { IMessage } from "../../types";
import dayjs from "dayjs";

export type Props = {
  body: string;
  createdDate: string;
  profileImage: string;
  displayName: string;
  username: string;
  likes: IMessage["likes"];
};

const MessageCard: FC<Props> = ({
  body,
  createdDate,
  profileImage,
  displayName,
  username,
  likes,
}) => {
  const date = dayjs(createdDate).format("MMM D, YYYY");
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
            <Text fontWeight="extrabold" fontSize="md">
              {displayName}
            </Text>
            <Text fontSize="sm">@{username}</Text>
            <Text fontSize="sm">{date}</Text>
          </Flex>
          <Text>{body}</Text>
          <Flex>
            <Text>{likes.length} likes</Text>
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default MessageCard;
