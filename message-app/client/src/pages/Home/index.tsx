import { Button, Container, Stack, Box, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

export type Props = {
  handleLogin: () => void;
};

export const Home: FC<Props> = ({ handleLogin }) => {
  return (
    <Container maxW={"3xl"}>
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Join our message Board <br />
          <Text as={"span"} color={"green.400"}>
            today
          </Text>
        </Heading>
        <Text color={"gray.500"}>Sign in to post messages on our board</Text>
        <Stack
          direction={"column"}
          spacing={3}
          align={"center"}
          alignSelf={"center"}
          position={"relative"}
        >
          <Button
            colorScheme={"green"}
            bg={"green.400"}
            rounded={"full"}
            px={6}
            _hover={{
              bg: "green.500",
            }}
            onClick={handleLogin}
          >
            Get Started
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

const HomePage = () => {

  return <Home handleLogin={() => {}} />;
};

export default HomePage;
