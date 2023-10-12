import { Typography } from "@mui/material";

const Logo = (props) => {
  const { sx, ...other } = props;

  return (
    <Typography
      sx={{
        ...sx,
        display: "flex",
        alignItems: "center",
        fontSize: "1.5rem",
        fontWeight: 500,
        fontFamily: "JetBrains Mono",
      }}
      variant="h2"
      {...other}
    >
      CoProject_
    </Typography>
  );
}

export default Logo;