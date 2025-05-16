
interface FormValues {
    education: {
        school: string;
        degree: string;
        start_date: string;
        end_date: string;
    }[];
}
interface StepProps {
    formData: FormValues;
    setFormData: (values: FormValues) => void;
}
const Step3 = ({formData, setFormData}: StepProps) => {
    return (
        <div>
            <h3>Edukacja</h3>
            {formData.education.map((item, index) => (
                <div key={index} className="form-field">
                    {item.school} - {item.degree} ({item.start_date} - {item.end_date})
                </div>
            ))}
            <h3>Certyfikaty</h3>
            {formData.certificates.map((item, index) => (
                <div key={index} className="form-field">
                    {item.name} - {item.date}
                </div>
            ))}
        </div>
    );
}

export default Step3;