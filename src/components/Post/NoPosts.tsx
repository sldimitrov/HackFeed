import { Box, Card, Typography } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

export default function NoPosts({ message = 'No posts to display yet.' }: { message?: string }) {
    return (
        <Card
            elevation={2}
            sx={{
                py: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                mx: 'auto',
                textAlign: 'center',
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                background: 'linear-gradient(to right, #fafafa, #f0f0f0)',
            }}
        >
            <Box
                sx={{
                    bgcolor: '#eeeeee',
                    borderRadius: '50%',
                    padding: 2,
                    mb: 2,
                }}
            >
                <SentimentDissatisfiedIcon color="action" sx={{ fontSize: 48 }} />
            </Box>
            <Typography variant="h6" fontWeight="medium" color="text.secondary">
                {message}
            </Typography>
        </Card>
    );
}
