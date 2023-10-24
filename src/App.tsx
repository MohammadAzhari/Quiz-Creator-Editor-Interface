import { Container } from '@mui/material'
import { useAppState } from './context/AppProvider'
import ListQuizScreen from './screens/ListQuizScreen'
import QuizFormScreen from './screens/QuizFormScreen'

export default function App() {
    const { manageShowingQuizForm } = useAppState()

    return (
        <Container>
            {manageShowingQuizForm?.isShowed() ? <QuizFormScreen /> : <ListQuizScreen />}
        </Container>
    )
}
