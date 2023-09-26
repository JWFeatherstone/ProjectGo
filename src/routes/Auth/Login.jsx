import {
  Alert,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import AuthIcon from "../../icons/AuthIcon";
import {
  HandleLoginSubmit,
  GetLoginState,
  HandleLoginChange,
  UseHandleSignIn,
} from "./Login.hooks.jsx";
import './Login.css';

const Login = () => {
  const [state, setState] = GetLoginState();
  const handleChange = HandleLoginChange(setState);
  const handleSignIn = UseHandleSignIn(setState);
  const [handleSubmit, submitInFlight] = HandleLoginSubmit(state);
  const { pathname, search } = useLocation();
  const isSignUp = pathname === "/register";

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1rem",
        flexGrow: 0.8,
      }}
      className="login-container"
    >
      <Typography
        sx={{ mb: 2, fontWeight: 800, order: -3 }}
        variant="h1"
        align="center"
      >
        {isSignUp ? "Register" : "Login"}
      </Typography>

      {state.error && (
        <Alert
          sx={{ mb: 2, order: -2 }}
          severity="error"
        >
          {state.error}
        </Alert>
      )}

      {state.otpSent && (
        <Alert sx={{ mb: 2 }} severity="success">
          Please enter the One Time Password (OTP) that has been sent to your
          email address.
        </Alert>
      )}

      <form id="login-form" onSubmit={handleSubmit}>
        {state.otpSent ? (
          <TextField
            key="code"
            name="code"
            variant="outlined"
            label="OTP code"
            placeholder="Enter OTP code..."
            InputLabelProps={{ shrink: true }}
            InputProps={{ sx: { fontWeight: 700 } }}
            onChange={handleChange}
            disabled={submitInFlight}
            autoComplete="off"
            autoFocus
            fullWidth
            required
          />
        ) : (
          <TextField
            key="email"
            name="email"
            type="email"
            variant="outlined"
            label="Email"
            placeholder="Enter your email address..."
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
            disabled={submitInFlight}
            fullWidth
            required
          />
        )}
      </form>

      <Button
        color="inherit"
        form="login-form"
        type="submit"
        variant="outlined"
        size="large"
        disabled={submitInFlight}
        fullWidth
      >
        {
          state.otpSent
            ? "Sign In"
            : `Continue with Email`
        }
      </Button>

      <Divider
        sx={{ color: "divider", order: isSignUp ? undefined : -1 }}
      >
        OR
      </Divider>

      <Button
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "white" : undefined,
          order: isSignUp ? undefined : -2,
        }}
        color="inherit"
        type="submit"
        variant="outlined"
        size="large"
        startIcon={<AuthIcon variant="google.com" />}
        onClick={handleSignIn}
        data-method="google.com"
        fullWidth
      >
        Continue with Google
      </Button>

    </Container>
  );
}

export default Login;

Login.displayName = "Login";