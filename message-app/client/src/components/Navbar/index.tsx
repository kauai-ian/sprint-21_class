import { Box, Flex, Button, Stack, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import NewMessageModal from "../NewMessageModal";

export default function Navbar() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isLoading, isAuthenticated, logout, loginWithRedirect } = useAuth0();

  return (
    <Box>
      <NewMessageModal isOpen={isOpen} onClose={onClose} />
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        justify={"flex-end"}
      >
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {isLoading ? null : isAuthenticated ? (
            <>
              <Button fontSize={"sm"} fontWeight={400} onClick={onOpen}>
                New Message
              </Button>
              <Button
                fontSize={"sm"}
                fontWeight={400}
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              fontSize={"sm"}
              fontWeight={600}
              onClick={() => loginWithRedirect()}
            >
              Sign Up
            </Button>
          )}
        </Stack>
      </Flex>
    </Box>
  );
}
