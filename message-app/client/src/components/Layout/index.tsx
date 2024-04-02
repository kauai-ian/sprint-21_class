import { GridItem, Grid } from "@chakra-ui/react";
import Navbar from "../Navbar";
import { FC } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  const location = useLocation();
  return (

    <Grid
      templateAreas={`"nav nav" "sidebar main"`}
      gridTemplateRows={'auto 1fr'}
      gridTemplateColumns={'150px 1fr'}
      gap='1'
    >
    <GridItem area={'nav'}>
      {location.pathname === "/callback" ? null : <Navbar />}
    </GridItem>
    <GridItem area={'sidebar'}>
      <Sidebar />
    </GridItem>
    <GridItem area={'main'} overflow="auto">
      { children }
    </GridItem>
  </Grid>
  );
};

export default Layout;
