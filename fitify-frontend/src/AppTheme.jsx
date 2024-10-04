import * as React from "react";
import PropTypes from "prop-types";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { inputsCustomizations } from "./theme/customizations/inputs";
import { dataDisplayCustomizations } from "./theme/customizations/dataDisplay";
import { feedbackCustomizations } from "./theme/customizations/feedback";
import { navigationCustomizations } from "./theme/customizations/navigation";
import { surfacesCustomizations } from "./theme/customizations/surfaces";
import {
  colorSchemes,
  typography,
  shadows,
  shape,
} from "./theme/themePrimitives";

const AppTheme = ({
  children,
  disableCustomTheme = false,
  themeComponents = {},
}) => {
  const theme = React.useMemo(() => {
    if (disableCustomTheme) return {};

    return createTheme({
      cssVariables: {
        colorSchemeSelector: "data-mui-color-scheme",
        cssVarPrefix: "template",
      },
      colorSchemes,
      typography,
      shadows,
      shape,
      components: {
        ...inputsCustomizations,
        ...dataDisplayCustomizations,
        ...feedbackCustomizations,
        ...navigationCustomizations,
        ...surfacesCustomizations,
        ...themeComponents,
      },
    });
  }, [disableCustomTheme, themeComponents]);

  if (disableCustomTheme) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
};

AppTheme.propTypes = {
  children: PropTypes.node,
  disableCustomTheme: PropTypes.bool,
  themeComponents: PropTypes.object,
};

export default AppTheme;
