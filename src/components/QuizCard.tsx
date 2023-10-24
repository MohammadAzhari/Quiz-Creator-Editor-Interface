import { Edit, ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from '@mui/material'
import { Quiz } from '../types/types'

interface IProps {
    quiz: Quiz
    handleEditQuiz: () => void
}

export default function QuizCard({ quiz, handleEditQuiz }: IProps) {

    return (
        <Accordion sx={{ width: '100%' }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Box>
                    <Typography variant='h5' component='div'>
                        Title: {quiz.title}
                    </Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box>
                    <Typography variant='body1'>Description: {quiz.description}</Typography>
                    <Typography variant='body1'>Created: {quiz.created}</Typography>
                    <Typography variant='body1'>Modified: {quiz.modified}</Typography>
                    <Typography variant='body1'>Score: {quiz.score !== null ? quiz.score : 'N/A'}</Typography>
                    <Typography variant='h6' component='div' sx={{ marginTop: '1rem' }}>
                        Questions:
                    </Typography>
                    {quiz.questions_answers.map((questionAnswer) => (
                        <Box sx={{ px: 5, my: 2 }} key={questionAnswer.id}>
                            <Typography variant='body2'>Question: {questionAnswer.text}</Typography>
                            <Typography variant='body2'>Feedback (True): {questionAnswer.feedback_true}</Typography>
                            <Typography variant='body2'>Feedback (False): {questionAnswer.feedback_false}</Typography>
                        </Box>
                    ))}
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'end' }}>
                        <Button variant='outlined' onClick={handleEditQuiz} endIcon={<Edit />}>
                            Edit
                        </Button>
                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}
