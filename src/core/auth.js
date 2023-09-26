import React from "react";
import { atom, useRecoilValueLoadable } from "recoil";
import { useOpenLoginDialog } from "../dialogs/LoginDialog";
import { auth, signIn } from "./firebase.js";

let idTokenPromise;
let idTokenPromiseResolve;

const unsubscribeIdTokenChanged = auth.onIdTokenChanged((user) => {
  if (user) {
    idTokenPromise = user.getIdToken();
    idTokenPromiseResolve && idTokenPromiseResolve(idTokenPromise);
  } else {
    idTokenPromise = Promise.resolve(null);
    idTokenPromiseResolve && idTokenPromiseResolve(null);
  }
});

if (import.meta.hot) {
  import.meta.hot.dispose(unsubscribeIdTokenChanged);
}

export async function getIdToken() {
  if (!idTokenPromise) {
    idTokenPromise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("getIdToken() timeout"));
      }, 5000);

      idTokenPromiseResolve = (value) => {
        resolve(value);
        clearTimeout(timeout);
        idTokenPromiseResolve = undefined;
      };
    });
  }

  return await idTokenPromise;
}

export const SignInMethods = ["google.com", "apple.com", "anonymous"];

export const CurrentUser = atom({
  key: "CurrentUser",
  dangerouslyAllowMutability: true,
  effects: [
    (ctx) => {
      if (ctx.trigger === "get") {
        return auth.onAuthStateChanged((user) => {
          ctx.setSelf(user);
        });
      }
    },
  ],
});

export function useCurrentUser() {
  const value = useRecoilValueLoadable(CurrentUser);
  return value.state === "loading" ? undefined : value.valueOrThrow();
}

export function useSignIn() {
  const openLoginDialog = useOpenLoginDialog();
  return React.useCallback(
    async function (options) {
      if (options?.method) {
        try {
          return await signIn(options);
        } catch (err) {
          return await openLoginDialog({ error: err });
        }
      } else {
        return await openLoginDialog();
      }
    },
    [openLoginDialog],
  );
}

export function useSignOut() {
  return React.useCallback(() => auth.signOut(), []);
}

export function useAuthCallback(callback, deps = []) {
  const openLoginDialog = useOpenLoginDialog();
  return React.useCallback(
    async (...args) => {
      const fb = await import("../core/firebase.js");

      try {
        if (!fb.auth.currentUser) {
          await openLoginDialog();
        }

        if (!fb.auth.currentUser) {
          return Promise.reject(new Error("Not authenticated."));
        }

        return await callback(fb.auth.currentUser, ...args);
      } catch (err) {
        const code = err?.code;

        if (code?.startsWith?.("/auth") || code === "permission-denied") {
          await openLoginDialog();

          if (!fb.auth.currentUser) {
            throw new Error("Not authenticated.");
          }

          return await callback(fb.auth.currentUser, ...args);
        } else {
          throw err;
        }
      }
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [openLoginDialog, ...deps],
  );
}
