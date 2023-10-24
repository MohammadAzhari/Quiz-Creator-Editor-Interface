import { Box, Typography, IconButton } from '@mui/material'
import { useAppState } from '../context/AppProvider'
import { ArrowBack } from '@mui/icons-material'
import QuizForm from '../components/QuizForm'

export default function QuizFormScreen() {
    const { manageShowingQuizForm, manageQuizzes } = useAppState()

    const handleBack = () => {
        manageShowingQuizForm!.close()
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', paddingY: '3rem' }}>
                <IconButton onClick={handleBack}>
                    <ArrowBack />
                </IconButton>
                <Typography variant='h4' component='div'>
                    Quiz Form
                </Typography>
            </Box>
            <QuizForm updatedQuiz={manageQuizzes?.getUpdatedQuiz()} />
        </Box>
    )
}
