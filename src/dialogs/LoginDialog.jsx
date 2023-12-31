import { Close } from "@mui/icons-material";
import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import * as React from "react";
import { atom, useRecoilCallback, useRecoilValue } from "recoil";
import { SignInMethods } from "../core/auth.js";
import {
  LoginButton,
} from "../layout/components/LoginButton";

export const LoginDialogState = atom({
  key: "LoginDialogState",
  default: { open: false },
});

export function LoginDialog(props) {
  const { error, signIn, linkTo, ...state } = useRecoilValue(LoginDialogState);

  const signInMethods = linkTo
    ? SignInMethods.filter((method) => linkTo.signInMethods.includes(method))
    : SignInMethods;

  return (
    <Dialog scroll="body" maxWidth="xs" fullWidth {...props} {...state}>
      <DialogContent
        sx={{
          py: 4,
          px: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={(event) => state.onClose?.(event, "backdropClick")}
          children={<Close />}
        />

        <Typography
          sx={{ mb: 3 }}
          variant="h3"
          align="center"
          children="Log in / Register"
        />

        {error && (
          <Alert
            sx={{ marginBottom: "1rem", width: "100%" }}
            severity={linkTo ? "warning" : "error"}
          >
            {linkTo
              ? `There is an existing account with the same email (${linkTo.email}). Would you like to link it?`
              : error.message}
          </Alert>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gridGap: "1rem",
            width: "100%",
          }}
        >
          {signInMethods.map((method) => (
            <LoginButton
              key={method}
              method={method}
              linkTo={linkTo}
              onClick={signIn}
              fullWidth
            />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export function useOpenLoginDialog() {
  return useRecoilCallback(
    (ctx) => (params) => {
      return new Promise((resolve) => {
        ctx.set(LoginDialogState, {
          ...params,
          open: true,
          error: params?.error,
          async onClose(event, reason) {
            params?.onClose?.(event, reason);
            if (!event.isDefaultPrevented()) {
              ctx.set(LoginDialogState, (prev) => ({ ...prev, open: false }));
              const fb = await import("../core/firebase.js");
              throw new fb.FirebaseError(
                fb.AuthErrorCodes.USER_CANCELLED,
                "Login canceled.",
              );
            }
          },
          async signIn(event, method, linkTo) {
            event.preventDefault();
            const fb = await import("../core/firebase.js");
            try {
              const user = await fb.signIn({ method, email: linkTo?.email });

              if (linkTo) {
                await fb.linkWithCredential(user.user, linkTo.credential);
              }

              ctx.set(LoginDialogState, (prev) => ({
                ...prev,
                open: false,
                error: undefined,
                linkTo: undefined,
              }));

              resolve(user);
            } catch (err) {
              const linkTo = await fb.getExistingAccountFromError(err, method);
              const error = err ? (err) : new Error("Login failed");
              ctx.set(LoginDialogState, (prev) => ({ ...prev, error, linkTo }));
            }
          },
        });
      });
    },
    [],
  );
}