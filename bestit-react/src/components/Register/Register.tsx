import { useState } from 'react';
import CvUploader from '../CvUploader';
import Step1 from './Step1';
import ProgressBar from '../ProgressBar/ProgressBar';
import Step2 from './Step2';
import { useUserData } from '../../context/UserDataContext';
import Step3 from './Step3';
interface RegisterData {
    firstName: string;
    lastName: string;
    date: string;
    phone: string;
    email: string;
    city: string;
    work_experience: Array<{
        position: string;
        company: string;
        start_date: string;
        end_date: string;
    }>;
    education: string;
    skills: string;
    additional_info: string;
    cv: string;
    photo: string;
    
}

const Register = () => {
    const {userData} = useUserData();

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<RegisterData>({
        firstName: userData.first_name,
        lastName: userData.last_name,
        date: userData.date_of_birth,
        phone: userData.phone,
        email: userData.email,
        city: userData.city,
        work_experience: userData.work_experience,
        education: userData.education,
        skills: userData.skills,
        additional_info: userData.additional_info,
        cv: userData.cv,
        photo: userData.photo,
        

    });

    const handleStepSubmit = (data: RegisterData) => {
        setFormData(prev => ({
            ...prev,
            ...data
        }));
        setCurrentStep(2);
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleNext = () => {
        if(currentStep === 1){
            let requiredFields = ["firstName", "lastName", "date", "phone", "email", "city"];
            let missingFields = requiredFields.filter(field => !formData[field as keyof RegisterData]);
            if(missingFields.length > 0){
                alert(`Proszę wypełnić wszystkie wymagane pola: ${missingFields.join(", ")}`);
                return;
            }
        }
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    return (
        <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            padding: '20px'
        }}>
            <ProgressBar currentStep={currentStep} totalSteps={3} />
            <h1 style={{ 
                textAlign: 'center',
                marginBottom: '30px',
                color: '#333'
            }}>
                Rejestracja
            </h1>
            
            <div style={{ 
                marginBottom: '30px',
                textAlign: 'center',
                color: '#666'
            }}>
                Krok {currentStep} z 4
            </div>

            {currentStep === 1 && (
                <Step1 
                    formData={formData}
                    setFormData={setFormData}
                    onNext={handleStepSubmit}
                />
            )}
            {currentStep === 2 && (<Step2
                formData={formData}
                setFormData={setFormData}
                onNext={handleStepSubmit}
            />)}
            {currentStep === 3 && (<Step3
                formData={formData}
                setFormData={setFormData}
            />)}

            <div style={{
                display: 'flex',
                gap: "12px",
                alignItems: "center",
            }}>
            {currentStep > 1 && (
                <button
                    onClick={handlePrevious}
                    className="btn"
                    style={{flex: 1}}
                >
                    Wstecz
                </button>
            )}
            <button className="btn btn-full" onClick={handleNext} style={{flex: 1}}
            >Dalej</button>
            </div>
        </div>
    );
};

export default Register;