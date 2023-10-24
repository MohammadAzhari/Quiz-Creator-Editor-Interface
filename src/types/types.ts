export interface IAppContext {
    manageQuizzes?: {
        getQuizzes: () => Quiz[]
        addQuiz: (quiz: Quiz) => void
        updateQuiz: (quiz: Quiz) => void
        getUpdatedQuiz: () => Quiz | undefined
    }
    manageShowingQuizForm?: {
        close: () => void
        open: (quizIndex?: number) => void
        isShowed: () => boolean
    }
}

export type Answer = {
    id?: number
    is_true: boolean
    text: string
}

export type Question = {
    answer_id: number | null
    feedback_false: string
    feedback_true: string
    id?: number
    text: string
    answers: Answer[]
}

export type Quiz = {
    created: string
    description: string
    id?: number
    modified: string
    questions_answers: Question[]
    score: number | null
    title: string
    url: string
}
