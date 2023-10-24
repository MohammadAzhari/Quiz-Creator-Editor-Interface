import { Box, Button, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useAppState } from '../context/AppProvider'
import QuizCard from '../components/QuizCard'

export default function ListQuizScreen() {
    const { manageQuizzes, manageShowingQuizForm } = useAppState()

    const handleClickCreateQuiz = () => {
        manageShowingQuizForm!.open()
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingY: '3rem' }}>
                <Typography variant='h3' component='div'>
                    List Quiz
                </Typography>
                <Button color='primary' onClick={handleClickCreateQuiz} variant='contained' startIcon={<Add />}>
                    Create New Quiz
                </Button>
            </Box>
            <Box sx={{ marginTop: '2rem' }}>
                {manageQuizzes?.getQuizzes()?.map((quiz, i) => (
                    <QuizCard quiz={quiz} handleEditQuiz={() => manageShowingQuizForm!.open(i)} key={i} />
                ))}
            </Box>
        </Box>
    )
}
