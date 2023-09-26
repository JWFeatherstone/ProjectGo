import {
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import {
  atom,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
} from "recoil";
import { components } from "./components.js";
import palettes from "./palettes";
import * as typography from "./typography.js";

export const ThemeName = atom({
  key: "ThemeName",
  effects: [
    (ctx) => {
      const storageKey = "theme";

      if (ctx.trigger === "get") {
        const name =
          localStorage?.getItem(storageKey) === "dark"
            ? "dark"
            : localStorage?.getItem(storageKey) === "light"
            ? "light"
            : matchMedia?.("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        ctx.setSelf(name);
      }

      ctx.onSet((value) => {
        localStorage?.setItem(storageKey, value);
      });
    },
  ],
});


export const Theme = selectorFamily({
  key: "Theme",
  dangerouslyAllowMutability: true,
  get(name) {
    return function () {
      const { palette } = createTheme({ palette: palettes[name] });
      return createTheme(
        {
          palette,
          typography: typography.options,
          components: components(palette),
        },
        {
          typography: typography.overrides,
        },
      );
    };
  },
});

export function useTheme(name) {
  const selected = useRecoilValue(ThemeName);
  return useRecoilValue(Theme(name ?? selected));
}

export function useToggleTheme(name) {
  return useRecoilCallback(
    (ctx) => () => {
      ctx.set(
        ThemeName,
        name ?? ((prev) => (prev === "dark" ? "light" : "dark")),
      );
    },
    [],
  );
}

export function ThemeProvider(props) {
  return <MuiThemeProvider theme={useTheme()} {...props} />;
}