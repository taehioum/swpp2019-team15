import { createMuiTheme } from "@material-ui/core/styles";
import { getThemeProps } from "@material-ui/styles";

export const theme = createMuiTheme({
    root: {
        height: "100%",
        width: "100%"
    },
    palette: {
        background: {
            default: "#f2f2f2",
            secondary: "#ffb366"
        },
        primary: {
            light: "#ffe699",
            main: "#ffb366",
            dark: "#ff9933" //color for button hover
        },
        secondary: {
            main: "#ffb366"
        }
    },
    typography: {
        fontFamily: "arial",
        useNextVariants: true
    },

    overrides: {
        MuiCard: {
            card: {
                margin: "auto",
                transition: "0.3s",
                position: "relative",
                backgroundColor: "light",
                borderStyle: "solid",
                borderColor: "primary",
                boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                "&:hover": {
                    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                }
            }
        },
        MuiCardHeader: {
            categoryHeaderText: {
                fontSize: 15,
                fontWeight: 500,
                color: "#ffb366"
            },
            itemText: {
                fontSize: 14,
                fontWeight: 500
            }
        },
        MuiPaper: {
            root: {
                marginBottom: "10px",
                display: "flex",
                flexDirection: "column"
            }
        },
        MuiButton: {
            raisedPrimary: {
                margin: "10px",
                padding: "10px",
                color: "#ffe699"
            }
        },
        MuiToolbar: {
            backgroundColor: "transparent"
        }
    }
});
