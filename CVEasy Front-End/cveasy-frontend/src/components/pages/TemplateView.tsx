import { Typography, Container } from "@mui/material";

export default function TemplateView () {
    
    return (
        <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
            <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
            >
                The Theme
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" component="p">
                This is currently just a placeholder. This exists to allow me to ensure this page functions, but will 
                eventually be converted into a more functional version of the template view.
            </Typography>
        </Container>
    )
    
}