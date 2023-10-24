import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material'
import { Question } from '../types/types'

interface IProps {
    open: boolean
    onClose: () => void
    onCreateQuestion: (question: Question) => void
}

const emptyQuestion = {
    answer_id: null,
    feedback_false: '',
    feedback_true: '',
    text: '',
    answers: [],
}

export default function CreateQuestionDialog({ open, onClose, onCreateQuestion }: IProps) {
    const [question, setQuestion] = useState<Question>(emptyQuestion)

    const handleQuestionFieldChange = (field: keyof Question, value: string) => {
        setQuestion((prevQuestion) => ({ ...prevQuestion, [field]: value }))
    }

    const handleSubmit = () => {
        onCreateQuestion(question)
        setQuestion(emptyQuestion)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Question</DialogTitle>
            <DialogContent>
                <TextField
                    label='Text'
                    value={question.text}
                    onChange={(event) => handleQuestionFieldChange('text', event.target.value)}
                    fullWidth
                    margin='normal'
                />
                <TextField
                    label='Feedback if False'
                    value={question.feedback_false}
                    onChange={(event) => handleQuestionFieldChange('feedback_false', event.target.value)}
                    fullWidth
                    margin='normal'
                />
                <TextField
                    label='Feedback if True'
                    value={question.feedback_true}
                    onChange={(event) => handleQuestionFieldChange('feedback_true', event.target.value)}
                    fullWidth
                    margin='normal'
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant='contained' color='error'>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant='contained' color='primary'>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    )
}
