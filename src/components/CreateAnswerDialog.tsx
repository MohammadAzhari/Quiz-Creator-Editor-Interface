import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material'
import { Answer } from '../types/types'

interface IProps {
    open: boolean
    onClose: () => void
    onCreateAnswer: (question: Answer) => void
}

const emptyAnswer = {
    is_true: false,
    text: '',
}

export default function CreateAnswerDialog({ open, onClose, onCreateAnswer }: IProps) {
    const [answer, setAnswer] = useState<Answer>(emptyAnswer)

    const handleQuestionFieldChange = (field: keyof Answer, value: any) => {
        setAnswer((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = () => {
        onCreateAnswer(answer)
        setAnswer(emptyAnswer)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Answer</DialogTitle>
            <DialogContent>
                <TextField
                    label='Text'
                    value={answer.text}
                    onChange={(event) => handleQuestionFieldChange('text', event.target.value)}
                    fullWidth
                    margin='normal'
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='primary'>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color='primary'>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    )
}
