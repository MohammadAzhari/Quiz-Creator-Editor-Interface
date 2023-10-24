import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { IAppContext } from '../types/types'
import data from '../data/quiz.json'
import { Quiz } from '../types/types'
import { getCurrentTime } from '../utils/utils'

const AppContext = createContext<IAppContext>({})

export const useAppState = () => {
    return useContext<IAppContext>(AppContext)
}

export default function AppProvider({ children }: { children: JSX.Element }) {
    const [quizzes, setQuizzes] = useState<Quiz[]>([data as Quiz])
    const [showQuizForm, setShowQuizForm] = useState(false)
    const [updatedQuizIndex, setUpdatedQuizIndex] = useState<number>()

    const manageQuizzes = useMemo(
        () => ({
            getQuizzes: () => quizzes,
            addQuiz: (quiz: Quiz) => {
                quiz.created = quiz.modified = getCurrentTime()
                setQuizzes((prevQuizzes) => [...prevQuizzes, quiz])
                setShowQuizForm(false)
            },
            updateQuiz: (newQuiz: Quiz) => {
                newQuiz.modified = getCurrentTime()
                setQuizzes((prev) =>
                    prev.map((quiz, i) => {
                        if (i === updatedQuizIndex) return newQuiz
                        return quiz
                    })
                )
                setShowQuizForm(false)
            },
            getUpdatedQuiz: () => {
                return quizzes[updatedQuizIndex!]
            },
        }),
        [updatedQuizIndex, quizzes]
    )

    const manageShowingQuizForm = useMemo(
        () => ({
            close: () => {
                setShowQuizForm(false)
                setUpdatedQuizIndex(undefined)
            },
            open: (quizIndex?: number) => {
                setUpdatedQuizIndex(quizIndex)
                setShowQuizForm(true)
            },
            isShowed: () => showQuizForm,
        }),
        [showQuizForm, updatedQuizIndex]
    )

    return (
        <AppContext.Provider
            value={{
                manageShowingQuizForm,
                manageQuizzes,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
