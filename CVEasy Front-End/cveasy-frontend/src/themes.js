import {createTheme} from "@mui/material/styles";
import { brandPrimary, brandSecondary } from "CustomColors";


const themes = createTheme({
    palette: {
        primary: {
            main: brandPrimary[400],
        },
        secondary: {
            main: brandSecondary[600],
        },
        primaryLight: {
            main: brandPrimary[400]
        },
    },
});

export default themes