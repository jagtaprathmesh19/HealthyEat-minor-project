import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import ModeNightRoundedIcon from "@mui/icons-material/ModeNightRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import React from "react";

const ToggleColorMode = React.memo(({ mode, toggleColorMode, ...props }) => {
  return (
    <IconButton
      onClick={toggleColorMode}
      size="small"
      color="primary"
      aria-label="Toggle between dark and light mode"
      {...props}
    >
      {mode === "dark" ? (
        <WbSunnyRoundedIcon fontSize="small" />
      ) : (
        <ModeNightRoundedIcon fontSize="small" />
      )}
    </IconButton>
  );
});

ToggleColorMode.displayName = "ToggleColorMode";

ToggleColorMode.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default ToggleColorMode;
