import { Toolbar } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AppToolbar from "./components/AppToolbar/AppToolbar";

const AppLayout = ({ children } ) => {
  return (
    <>
      <AppToolbar />
      <Suspense>
          {children}
      </Suspense>
    </>
  );
}

export default AppLayout;