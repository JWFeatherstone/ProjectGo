import * as React from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../core/firebase.js";



// Handler for the email login form.
// Disables the log-in button while a log-in request is in flight.
// Not fully implemented.
export const HandleLoginSubmit = (state) => {
  const [inFlight, setInFlight] = React.useState(false);

  return [
    React.useCallback(
      async (event) => {
        event.preventDefault();
        try {
          setInFlight(true);
          console.log(state.email);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          throw new Error("Not implemented");
        } finally {
          setInFlight(false);
        }
      },
      [state.email],
    ),
    inFlight,
  ];
}

// Get the current state of the login form.

export const GetLoginState = () => {
  return React.useState({
    email: "",
    code: "",
    saml: false,
    otpSent: undefined,
    error: undefined,
  });
}

// Handle changes to the login by email form.

export const HandleLoginChange = (setState) => {
  return React.useCallback(
    function (event) {
      const { name, value } = event.target;
      setState((prev) =>
        prev[name] === value ? prev : { ...prev, [name]: value },
      );
    },
    [setState],
  );
}


// Handler for the Google sign-in button (and any future sign-in buttons).

export const UseHandleSignIn = (setState) => {
  const navigate = useNavigate();

  return React.useCallback(
    async function (event) {
      try {
        const method = event.currentTarget.dataset.method;
        const credential = await signIn({ method });
        if (credential.user) {
          setState((prev) => (prev.error ? { ...prev, error: null } : prev));
          navigate("/");
        }
      } catch (err) {
        const error = (err)?.message ?? "Login failed.";
        setState((prev) => ({ ...prev, error }));
      }
    },
    [navigate, setState],
  );
}