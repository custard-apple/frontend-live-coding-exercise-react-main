
interface ResultProps {
    currentScore: number;
    averageScore: number;
}
const Results = ({ currentScore, averageScore }: ResultProps) => {
    return (
        <div>
            <p>Current Score : {currentScore.toFixed(2)}%</p>
            <p>Average Score: {averageScore.toFixed(2)}%</p>
        </div>
    )
}

export default Results;