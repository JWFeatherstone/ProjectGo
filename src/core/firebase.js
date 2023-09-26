import { getAnalytics } from "firebase/analytics";
import { FirebaseError, initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  getAuth,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
} from "firebase/auth";
export { AuthErrorCodes, linkWithCredential } from "firebase/auth";
export { FirebaseError };
import { firebaseConfig } from "./config.js";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export function signIn(options) {
  if (options.method === GoogleAuthProvider.PROVIDER_ID) {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    provider.setCustomParameters({
      ...(options.email && { login_hint: options.email }),
      prompt: "consent",
    });
    return signInWithPopup(auth, provider);
  }

  if (options.method === FacebookAuthProvider.PROVIDER_ID) {
    const provider = new FacebookAuthProvider();
    provider.addScope("public_profile");
    provider.addScope("email");
    return signInWithPopup(auth, provider);
  }

  if (options.method === "anonymous") {
    return signInAnonymously(auth);
  }

  throw new Error(`Not supported: ${options.method}`);
}

export async function getExistingAccountFromError(
  error,
  method,
) {
  if (
    !(error instanceof FirebaseError) ||
    error.code !== "auth/account-exists-with-different-credential" ||
    !error.customData?.email
  ) {
    return undefined;
  }

  const email = error.customData?.email;
  const signInMethods = (await fetchSignInMethodsForEmail(
    auth,
    email,
  ));

  if (signInMethods.length === 0) {
    return undefined;
  }

  let credential = null;

  if (method === GoogleAuthProvider.PROVIDER_ID) {
    credential = GoogleAuthProvider.credentialFromError(error);
  }

  if (method === FacebookAuthProvider.PROVIDER_ID) {
    credential = FacebookAuthProvider.credentialFromError(error);
  }

  return credential ? { email, credential, signInMethods } : undefined;
}

export const SignInMethod = [
  GoogleAuthProvider.PROVIDER_ID,
  FacebookAuthProvider.PROVIDER_ID,
  "apple.com",
  "anonymous",
];