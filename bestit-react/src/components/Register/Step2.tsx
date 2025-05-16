
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
            {fields.map((item, index) => (
                <div key={index} className="form-field">
                    <label 
                        htmlFor={item.name} 
                        className="form-label"
                    >
                        {item.label}
                    </label>
                    <input
                        id={item.name}
                        name={item.name}
                        type={item.type}
                        onChange={(e) => setFormData({ ...formData, [item.name]: e.target.value })}
                        value={formData[item.name as keyof FormValues]}
                        placeholder={item.placeholder}
                        className="form-input"
                    />
                </div>
            ))}
        </div>
    );
}

export default Step2;