import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useToggleTheme } from "../../theme/index";

const ThemeButton = (props) => {
  const { ...other } = props;
  const toggleTheme = useToggleTheme();
  const theme = useTheme();

  return (
    <IconButton onClick={toggleTheme} {...other}>
      {theme.palette.mode === "light" ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
}

export default ThemeButton;