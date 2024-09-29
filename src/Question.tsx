interface QuestionProps {
    question: string;
    onAnswer: (answer: boolean) => void;
}

const Question = ({ question, onAnswer }: QuestionProps) => {
    console.log(question, 'question')

    return (
        <>
            <p>{question}</p>
            <button onClick={() => onAnswer(true)}>Yes</button>
            <button onClick={() => onAnswer(false)}>No</button>
        </>
    )
}

export default Question;