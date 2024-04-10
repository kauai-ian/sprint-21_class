import { Flex, Text, Image } from "@chakra-ui/react";
import { FC } from "react";
import { IUser } from "../../types";

const UserCard: FC<IUser> = ({
  profileImage,
  displayName,
  username,
  sub,
  followers,
}) => {
  return (
    <Flex gap={2}>
      <Image
        h="40px"
        w="40px"
        borderRadius="50%"
        src={profileImage}
        alt={displayName}
      />
      <Flex gap={1} align="center">
        <Text
          as="a"
          href={`/profile/${sub}`}
          fontWeight="extrabold"
          fontSize="md"
        >
          {displayName}
        </Text>
        <Text fontSize="sm">@{username}</Text>
      </Flex>
      <Text fontSize="sm">{followers.length} followers</Text>
    </Flex>
  );
};

export default UserCard;
