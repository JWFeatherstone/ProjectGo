import { Suspense } from "react";
import AppToolbar from "./components/AppToolbar/AppToolbar";
import { Toolbar } from "@mui/material";
import { Container } from "@mui/material";

const AppLayout = ({ children} ) => {

  return (
    <>
      <AppToolbar />
      <Toolbar />
      <Suspense>
          {children}
      </Suspense>
    </>
  );
}

export default AppLayout;