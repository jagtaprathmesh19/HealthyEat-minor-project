import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getSignInSideTheme from "./theme/getSignInSideTheme";
import SignInCard from "./SignInCard";
import Content from "./Content";
import TemplateFrame from "./TemplateFrame";

// Custom hook for theme management
const useThemeMode = () => {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);

  React.useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return { mode, showCustomTheme, toggleColorMode, toggleCustomTheme };
};

export default function SignInSide() {
  const { mode, showCustomTheme, toggleColorMode, toggleCustomTheme } =
    useThemeMode();

  const defaultTheme = React.useMemo(
    () => createTheme({ palette: { mode } }),
    [mode]
  );
  const SignInSideTheme = React.useMemo(
    () => createTheme(getSignInSideTheme(mode)),
    [mode]
  );

  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider theme={showCustomTheme ? SignInSideTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <Stack
          direction="column"
          component="main"
          sx={[
            {
              justifyContent: "space-between",
              height: { xs: "auto", md: "100%" },
            },
            (theme) => ({
              backgroundImage:
                "radial-gradient(ellipse at 70% 51%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
              backgroundSize: "cover",
              ...theme.applyStyles("dark", {
                backgroundImage:
                  "radial-gradient(at 70% 51%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
              }),
            }),
          ]}
        >
          <Stack
            direction={{ xs: "column-reverse", md: "row" }}
            sx={{
              justifyContent: "center",
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: "auto",
            }}
          >
            <Content />
            <SignInCard />
          </Stack>
        </Stack>
      </ThemeProvider>
    </TemplateFrame>
  );
}
