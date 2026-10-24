import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { MAIN_PATH } from "src/constant";
import { BoxProps } from "@mui/material/Box";

export default function Logo({ sx }: BoxProps) {
  return (
    <RouterLink
      to={`/${MAIN_PATH.browse}`}
      style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}
    >
      <Typography
        component="span"
        sx={{
          color: "#E50914",
          fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
          fontSize: { xs: 26, sm: 30 },
          fontWeight: 900,
          letterSpacing: 2,
          lineHeight: 1,
          textTransform: "uppercase",
          userSelect: "none",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
          transition: "transform 0.2s ease, opacity 0.2s ease",
          "&:hover": {
            opacity: 0.9,
            transform: "scale(1.02)",
          },
          ...sx,
        }}
      >
        MovGenZ
      </Typography>
    </RouterLink>
  );
}
