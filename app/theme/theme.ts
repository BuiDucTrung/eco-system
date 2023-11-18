import { Container } from "@mui/material";
import { Heebo } from "next/font/google";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const heebo = Heebo({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FF6464",
    },
    secondary: {
      light: "#edf7fa",
      main: "#00A8CC",
    },
    text: {
      primary: "#21243D",
    },
  },
  typography: {
    fontFamily: heebo.style.fontFamily,
    fontSize: 12,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "md",
      },
      styleOverrides: {
        maxWidthSm: {
          maxWidth: "680px",

          "@media (min-width: 600px)": {
            maxWidth: "680px",
          },
        },
        maxWidthMd: {
          maxWidth: "860px",
          "@media(min-width:900px)": {
            maxWidth: "860px",
          },
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
      styleOverrides: {
        root: {
          color: "black",
          "&:hover, &.active": {
            color: "#FF6464",
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            color: "white",
          },
        },
      ],
    },
    MuiChip: {
      styleOverrides: {
        root: {
          paddingInline: 2,
        },
      },
      variants: [
        {
          props: { color: "secondary" },
          style: {
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
            backgroundColor: "#142850",
          },
        },
        {
          props: { color: "primary" },
          style: {
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
          },
        },
      ],
    },
  },
});
theme = responsiveFontSizes(theme);
// theme.typography.h3 = {
//   fontSize: "2rem",
//   [theme.breakpoints.up("md")]: {
//     fontSize: "3rem",
//   },
// };

export default theme;
