import "./ProgressBar.scss";

const ProgressBar = ({currentStep, totalSteps}: {currentStep: number, totalSteps: number}) => {
    return (
        <div className="progress-bar">
            {Array.from({length: totalSteps}).map((_, index) => (
                <div key={index} className={`progress-bar-step ${index < currentStep ? "active" : ""}`}>
                    {index + 1}
                </div>
            ))}
        </div>
    )
}

export default ProgressBar;