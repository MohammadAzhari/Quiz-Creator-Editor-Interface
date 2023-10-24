import { FormEvent, useState } from 'react'
import { TextField, Button, Box, Card, FormControlLabel, Checkbox, FormControl, RadioGroup, Radio } from '@mui/material'
import { Answer, Question, Quiz } from '../types/types'
import CreateAnswerDialog from './CreateAnswerDialog'
import CreateQuestionDialog from './CreateQuestionDialog'
import { useAppState } from '../context/AppProvider'

interface IProps {
    updatedQuiz?: Quiz
}

export default function QuizForm({ updatedQuiz }: IProps) {
    const { manageQuizzes } = useAppState()

    const [quiz, setQuiz] = useState<Quiz>(
        updatedQuiz ?? {
            created: '',
            description: '',
            modified: '',
            questions_answers: [],
            score: null,
            title: '',
            url: '',
        }
    )

    const [openCreateQuestionDialog, setOpenCreateQuestionDialog] = useState(false)
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(-1)

    const handleQuizFieldChange = (field: keyof Quiz, value: any) => {
        setQuiz((prev) => ({ ...prev, [field]: value }))
    }

    const handleQuizQuestionChange = (questionIndex: number, field: keyof Question, value: any) => {
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            questions_answers: prevQuiz.questions_answers.map((question, i) => {
                if (i === questionIndex) {
                    return {
                        ...question,
                        [field]: value,
                    }
                }
                return question
            }),
        }))
    }

    const handleAnswerChange = (questionIndex: number, answerIndex: number, field: keyof Answer, value: any) => {
        const newAnswers = quiz.questions_answers[questionIndex].answers.map((answer, i) => {
            if (i === answerIndex) {
                return { ...answer, [field]: value }
            }
            return answer
        })
        handleQuizQuestionChange(questionIndex, 'answers', newAnswers)
    }

    const onCreateAnswer = (createdAnswer: Answer) => {
        // if its frist answer make it true by default:
        if (!quiz.questions_answers[selectedQuestionIndex].answers.length) {
            createdAnswer.is_true = true
        }

        const newAnswers = [...quiz.questions_answers[selectedQuestionIndex].answers, createdAnswer]
        handleQuizQuestionChange(selectedQuestionIndex, 'answers', newAnswers)
    }

    const onCreateQuestion = (createdQuestion: Question) => {
        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            questions_answers: [...prevQuiz.questions_answers, createdQuestion],
        }))
    }

    const getTrueAnswerIndex = (questionIndex: number) => {
        for (const i in quiz.questions_answers[questionIndex].answers) {
            if (quiz.questions_answers[questionIndex].answers[i].is_true) return i
        }
    }

    const handleChooseTrueAnswer = (questionIndex: number, trueAnswerIndex: number) => {
        const newAnswers = quiz.questions_answers[questionIndex].answers.map((answer, i) => {
            if (i === trueAnswerIndex) {
                return { ...answer, is_true: true }
            }
            return { ...answer, is_true: false }
        })
        handleQuizQuestionChange(questionIndex, 'answers', newAnswers)
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (updatedQuiz) {
            manageQuizzes?.updateQuiz(quiz)
        } else {
            manageQuizzes?.addQuiz(quiz)
        }
    }

    return (
        <Box>
            <CreateAnswerDialog
                open={selectedQuestionIndex !== -1}
                onClose={() => setSelectedQuestionIndex(-1)}
                onCreateAnswer={onCreateAnswer}
            />
            <CreateQuestionDialog
                open={openCreateQuestionDialog}
                onClose={() => setOpenCreateQuestionDialog(false)}
                onCreateQuestion={onCreateQuestion}
            />
            <Box component='form' onSubmit={handleSubmit}>
                <TextField
                    label='Title'
                    value={quiz.title}
                    onChange={(event) => handleQuizFieldChange('title', event.target.value)}
                    required
                    fullWidth
                    margin='normal'
                />
                <TextField
                    label='Description'
                    value={quiz.description}
                    onChange={(event) => handleQuizFieldChange('description', event.target.value)}
                    multiline
                    required
                    fullWidth
                    margin='normal'
                />
                <TextField
                    label='Url'
                    value={quiz.url}
                    onChange={(event) => handleQuizFieldChange('url', event.target.value)}
                    multiline
                    required
                    fullWidth
                    margin='normal'
                />
                <h3>Questions</h3>
                {quiz.questions_answers.map((question, questionIndex) => (
                    <Card key={questionIndex} sx={{ px: 5 }}>
                        <TextField
                            label='Question'
                            value={question.text}
                            onChange={(event) => handleQuizQuestionChange(questionIndex, 'text', event.target.value)}
                            fullWidth
                            margin='normal'
                        />
                        <TextField
                            label='True Feedback'
                            value={question.feedback_true}
                            onChange={(event) =>
                                handleQuizQuestionChange(questionIndex, 'feedback_true', event.target.value)
                            }
                            fullWidth
                            margin='normal'
                        />
                        <TextField
                            label='False FeedBack'
                            value={question.feedback_false}
                            onChange={(event) =>
                                handleQuizQuestionChange(questionIndex, 'feedback_false', event.target.value)
                            }
                            fullWidth
                            margin='normal'
                        />
                        {question.answers.length > 0 && <h3>Answers</h3>}
                        {question.answers.map((answer, answerIndex) => (
                            <Box key={answerIndex} sx={{ px: 5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <TextField
                                        label='Answer'
                                        value={answer.text}
                                        onChange={(event) =>
                                            handleAnswerChange(questionIndex, answerIndex, 'text', event.target.value)
                                        }
                                        fullWidth
                                        margin='normal'
                                    />
                                    <FormControlLabel
                                        disabled
                                        sx={{ width: '20%', mx: 2 }}
                                        control={
                                            <Checkbox
                                                checked={answer.is_true}
                                                onChange={(event) =>
                                                    handleAnswerChange(
                                                        questionIndex,
                                                        answerIndex,
                                                        'is_true',
                                                        event.target.checked
                                                    )
                                                }
                                            />
                                        }
                                        label={'Is True'}
                                    />
                                </Box>
                            </Box>
                        ))}
                        <Box>
                            {question.answers.length > 0 && <h3>True Answer</h3>}
                            <FormControl component='fieldset'>
                                <RadioGroup
                                    value={getTrueAnswerIndex(questionIndex)}
                                    onChange={(event) =>
                                        handleChooseTrueAnswer(questionIndex, Number(event.target.value))
                                    }
                                    sx={{ display: 'flex' }}
                                >
                                    {question.answers.map((answer, i) => (
                                        <FormControlLabel key={i} value={i} control={<Radio />} label={answer.text} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Button
                            variant='contained'
                            sx={{ my: 3 }}
                            color='primary'
                            onClick={() => setSelectedQuestionIndex(questionIndex)}
                        >
                            Add Answer
                        </Button>
                    </Card>
                ))}
                <Button
                    variant='contained'
                    sx={{ my: 3 }}
                    color='primary'
                    onClick={() => setOpenCreateQuestionDialog(true)}
                >
                    Add Question
                </Button>
                <Box sx={{ my: 3, width: '100%' }}>
                    <Button type='submit' variant='outlined' fullWidth color='primary'>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
