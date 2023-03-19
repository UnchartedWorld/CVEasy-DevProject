import { Box } from '@mui/material';
import { Container } from '@mui/system';
import UploadButtonSection from 'components/UploadButtonSection';
import UploadCodeGuide from 'components/UploadCodeGuide';
import UploadGuidelines from 'components/UploadGuidelines';

export default function UploadPage() {
    return (
        <Box component={"main"} sx={{ flexGrow: 1, minHeight: "100dvh" }}>
            <Container>
                <UploadGuidelines />
                <UploadCodeGuide />
                <UploadButtonSection />
            </Container>
        </Box>
    )
}