import { Button } from "@mui/material";
import * as React from "react";
import AuthIcon from "../../icons/AuthIcon";

export function LoginButton(props) {
  const { method, onClick, linkTo, ...other } = props;
  const handleClick = useHandleClick(method, onClick, linkTo);

  return (
    <Button
      variant="outlined"
      size="large"
      href="/login"
      startIcon={<AuthIcon variant={method} />}
      fullWidth
      {...other}
      onClick={handleClick}
    >
      <span style={{ flexGrow: 1, textAlign: "center" }}>
        {method === "google.com"
          ? "Continue with Google"
          : method === "facebook.com"
          ? "Continue with Facebook"
          : method === "anonymous"
          ? "Continue as Anonymous"
          : `Continue with ${method}`}
      </span>
    </Button>
  );
}

function useHandleClick(
  method,
  onClick,
  linkTo,
) {
  return React.useCallback(
    (event) => {
      onClick?.(event, method, linkTo);
    },
    [method, onClick, linkTo],
  );
}