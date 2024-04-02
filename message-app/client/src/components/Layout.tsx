import { Box, Container, Flex, Center } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { FC } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  const location = useLocation();
  return (
    <Flex flexDir="column" gap={4}>
      <Box width="100%" h="150px">
        {location.pathname === "/callback" ? null : <Navbar />}
      </Box>
      <Container flex="1">
        <Center>{children}</Center>
      </Container>
    </Flex>
  );
};

export default Layout;
