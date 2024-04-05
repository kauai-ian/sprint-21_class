import { GridItem, Grid } from "@chakra-ui/react";
import Navbar from "../Navbar";
import { FC } from "react";
import Sidebar from "../Sidebar";

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <Grid
      templateAreas={`"nav nav" "sidebar main"`}
      gridTemplateRows={'auto 1fr'}
      gridTemplateColumns={'150px 1fr'}
      gap='1'
      overflow="hidden"
      height="100vh"
    >
    <GridItem area={'nav'}>
      <Navbar />
    </GridItem>
    <GridItem area={'sidebar'}>
      <Sidebar />
    </GridItem>
    <GridItem area={'main'} overflow="auto" pb="200px">
      { children }
    </GridItem>
  </Grid>
  );
};

export default Layout;
