import { useState } from 'react';
import CvUploader from '../CvUploader';
import Step1 from './Step1';
import ProgressBar from '../ProgressBar/ProgressBar';
import Step2 from './Step2';
import { useUserData } from '../../context/UserDataContext';
import Step3 from './Step3';
import type { FormValues } from './types';

interface RegisterData extends FormValues {
    skills: string;
    additional_info: string;
    cv: string;
    photo: string;
}

const Register = () => {
    const {userData} = useUserData();

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<RegisterData>({
        firstName: userData?.first_name || '',
        lastName: userData?.last_name || '',
        date: userData?.date || '',
        phone: userData?.phone || '',
        email: userData?.email || '',
        city: userData?.city || '',
        education: userData?.education || [],
        work_experience: userData?.work_experience || [],
        skills: userData?.skills || '',
        additional_info: userData?.additional_info || '',
        cv: userData?.cv || '',
        photo: userData?.photo || '',
        degree: userData?.degree || '',
        fieldOfStudy: userData?.field_of_study || '',
        graduationYear: userData?.graduation_year || '',
        languages: userData?.languages || '',
        certificates: userData?.certificates || '',
        additionalInfo: userData?.additional_info || ''
    });

    const handleStepSubmit = (data: Partial<RegisterData>) => {
        setFormData(prev => ({
            ...prev,
            ...data
        }));
        setCurrentStep(prev => prev + 1);
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
        } else {
            // Tutaj możemy dodać logikę wysyłania formularza
            console.log('Formularz gotowy do wysłania:', formData);
            // Możemy dodać wywołanie API do zapisania danych
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Step1 
                        formData={formData}
                        setFormData={setFormData}
                        onNext={handleStepSubmit}
                    />
                );
            case 2:
                return (
                    <Step2
                        formData={formData}
                        setFormData={setFormData}
                        onNext={handleStepSubmit}
                    />
                );
            case 3:
                return (
                    <Step3
                        formData={formData}
                        setFormData={setFormData}
                        onNext={handleStepSubmit}
                    />
                );
            default:
                return null;
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
                Krok {currentStep} z 3
            </div>

            {renderStep()}

            <div style={{
                display: 'flex',
                gap: "12px",
                alignItems: "center",
                marginTop: '20px'
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
                <button 
                    className="btn btn-full" 
                    onClick={handleNext} 
                    style={{flex: 1}}
                >
                    {currentStep === 3 ? 'Zakończ' : 'Dalej'}
                </button>
            </div>
        </div>
    );
};

export default Register;