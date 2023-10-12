import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { updateEmail, updateProfile } from "firebase/auth";
import * as React from "react";
import { useAuthCallback, useCurrentUser } from "../../core/auth.js";

const Profile = () => {
  const [{ input, ...state }, setState] = useState();
  const handleChange = useHandleChange(setState);
  const handleSubmit = useHandleSubmit(input, setState);

  return (
    <main className="profile-section">
    <Container sx={{ my: 4 }} maxWidth="sm">
      <Typography sx={{ mb: 4 }} variant="h2">
        Update your profile
      </Typography>

      {state.error && (
        <Alert sx={{ mb: 3 }} severity={"error"} children={state.error} />
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="displayName"
          label="Display Name"
          value={input.displayName}
          helperText={" "}
          onChange={handleChange}
          disabled={state.loading}
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
        />

        <TextField
          name="email"
          type="email"
          label="Email"
          value={input.email}
          helperText={" "}
          onChange={handleChange}
          disabled={state.loading}
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
        />

        <Button
          variant="contained"
          type="submit"
          children="Update Profile"
          disabled={state.loading}
        />
      </Box>
    </Container>
    </main>
  );
}

function useState() {
  const me = useCurrentUser();
  const [state, setState] = React.useState({
    input: {
      displayName: me?.displayName ?? "",
      email: me?.email ?? "",
    },
    loading: me === undefined,
    error: undefined,
  });

  React.useEffect(() => {
    if (me?.uid) {
      setState((prev) => ({
        ...prev,
        input: {
          ...prev.input,
          displayName: me.displayName ?? "",
          email: me.email ?? "",
        },
        loading: false,
      }));
    }
  }, [setState, me?.uid, me?.email, me?.displayName]);

  return [state, setState];
}

function useHandleChange(setState) {
  return React.useCallback(
    (event) => {
      const { name, value } = event.target;
      setState((prev) => ({
        ...prev,
        input: { ...prev.input, [name]: value },
      }));
    },
    [setState],
  );
}

function useHandleSubmit(input, setState) {
  const saveProfile = useAuthCallback(
    async (me) => {
      await updateProfile(me, { displayName: input.displayName });
      await updateEmail(me, input.email);
    },
    [input.displayName, input.email],
  );

  return React.useCallback(
    async (event) => {
      event.preventDefault();
      setState((prev) => ({ ...prev, loading: true }));
      try {
        await saveProfile();
        setState((prev) => ({ ...prev, loading: false, error: undefined }));
      } catch (err) {
        const error = (err)?.message ?? "Failed.";
        setState((prev) => ({ ...prev, loading: false, error }));
      }
    },
    [setState, saveProfile],
  );
}

export default Profile;