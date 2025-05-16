
interface FormValues {
    jobs: {
        name: string
    }
}

interface StepProps {
    onNext?: () => void;
    formData: FormValues;
    setFormData: (values: FormValues) => void;
}


const Step2= ({ onNext, formData, setFormData }: StepProps) => {
    const fields = [
        {name: "firstName", label: "Imię", type: "text", placeholder: "Wprowadź swoje imię"},
    ];
    return (
        <div className="form-container">
            <h3>Praca</h3>
            {formData.work_experience.map((item, index) => (
                <div key={index} className="form-field">
                    {item.position} - {item.company} ({item.start_date} - {item.end_date})
                </div>
            ))}
            <h3>Edukacja</h3>
            {formData.education.map((item, index) => (
                <div key={index} className="form-field">
                    {item.school} - {item.degree} ({item.start_date} - {item.end_date})
                </div>
            ))}
        </div>
    );
}

export default Step2;