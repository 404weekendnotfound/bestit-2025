
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
            <p className="form-title">Doświadczenie zawodowe</p>
            {formData.work_experience.map((item, index) => (
                <div key={index} className="form-field">
              <div className="form-date">({item.start_date} - {item.end_date})</div>
                    <div className="form-field-label">
                        {item.position}
                        </div>
                     <div className="form-company">  
                        <i className="fas fa-location-dot"></i>
                            {item.company} 
                        
                        </div> 
                </div>
            ))}
            <p className="form-title"> Wykształcenie</p>
            {formData.education.map((item, index) => (
                <div key={index} className="form-field">
                    <div className="form-date">({item.start_date} - {item.end_date})</div>
                    <div className="form-company">
                        <i className="fas fa-graduation-cap"></i>
                        {item.degree} 
                    </div>
                    <div className="form-company">  
                    <i className="fas fa-location-dot"></i>
                        {item.school} 
                    </div> 
                </div>
            ))}
        </div>
    );
}

export default Step2;