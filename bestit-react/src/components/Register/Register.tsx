import { useState } from 'react';
import CvUploader from '../CvUploader';
import Step1 from './Step1';

interface RegisterData {
    firstName: string;
    lastName: string;
    date: string;
    phone: string;
    email: string;
    city: string;
}

const Register = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<RegisterData>({
        firstName: '',
        lastName: '',
        date: '',
        phone: '',
        email: '',
        city: ''
    });

    const handleStep1Submit = (data: RegisterData) => {
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

    return (
        <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            padding: '20px'
        }}>
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

            {currentStep === 1 && (
                <Step1 
                    initialValues={formData}
                    onNext={handleStep1Submit}
                />
            )}
            {currentStep === 2 && <CvUploader />}

            {currentStep > 1 && (
                <button
                    onClick={handlePrevious}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Wstecz
                </button>
            )}
        </div>
    );
};

export default Register;