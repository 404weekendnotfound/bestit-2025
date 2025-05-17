import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Step1 from './Step1';
import ProgressBar from '../ProgressBar/ProgressBar';
import Step2 from './Step2';
import { useUserData } from '../../context/UserDataContext';
import Step3 from './Step3';
import type { FormValues } from './types';
import axiosInstance from '../../api/axios';
import Nav from '../Nav/Nav';

const Register = () => {
    const {userData, setUserData} = useUserData();
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormValues>({
        firstName: userData?.first_name || '',
        lastName: userData?.last_name || '',
        date: userData?.date || '',
        phone: userData?.phone || '',
        email: userData?.email || '',
        city: userData?.city || '',
        education: userData?.education || [],
        work_experience: userData?.work_experience || [],
        skills: userData?.skills || [],
        certifications: userData?.certifications || [],
        interests: userData?.interests || [],
        additionalInfo: userData?.additional_info || '',
        cv: userData?.cv || '',
        photo: userData?.photo || '',
        degree: userData?.degree || '',
        fieldOfStudy: userData?.field_of_study || '',
        graduationYear: userData?.graduation_year || '',
        languages: userData?.languages || ''
    });

    const handleStepSubmit = (data: Partial<FormValues>) => {
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

    const handleNext = async () => {
        if(currentStep === 1){
            let requiredFields = ["firstName", "lastName", "date", "phone", "email", "city"];
            let missingFields = requiredFields.filter(field => !formData[field as keyof FormValues]);
            if(missingFields.length > 0){
                alert(`Proszę wypełnić wszystkie wymagane pola: ${missingFields.join(", ")}`);
                return;
            }
        }
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            console.log('Formularz gotowy do wysłania:', formData);
            
            // Get the user_id from userData
            const userId = userData?.id;
            
            // Transform data to match backend schema
            const transformedData = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                phone: formData.phone,
                email: formData.email,
                address: formData.city,
                job_experience: formData.work_experience?.map(exp => ({
                    position: exp.position,
                    company: exp.company,
                    start_date: exp.start_date || "",
                    end_date: exp.end_date || "",
                    user_id: userId
                })) || [],
                education: formData.education?.length ? formData.education.map(edu => ({
                    degree: edu.degree || "",
                    field: edu.field || "",
                    institution: edu.institution || "",
                    graduation_date: edu.graduation_date || "",
                    user_id: userId
                })) : [{
                    degree: formData.degree || "",
                    field: formData.fieldOfStudy || "",
                    institution: "", 
                    graduation_date: formData.graduationYear || "",
                    user_id: userId
                }],
                certificates: formData.certifications?.map(cert => ({
                    name: cert.name,
                    issuer: cert.issuer,
                    issue_date: cert.date,
                    user_id: userId
                })) || [],
                interests: formData.interests?.map(interest => ({
                    interest: interest,
                    user_id: userId
                })) || []
            };
            
            console.log('Transformed data:', transformedData);
            
            try {
                const response = await axiosInstance.put(`/users/email/${userData.email}`, transformedData);
                console.log('Server response:', response);
                setUserData(response.data);
                localStorage.setItem("userData", JSON.stringify(response.data));
                navigate('/dashboard');
            } catch (error: any) {
                console.error('Error updating user:', error);
                console.error('Error response:', error.response?.data);
                alert(`Błąd aktualizacji danych: ${error.response?.data?.detail || error.message}`);
            }
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
        <div>
        <Nav/>
        <div style={{ 
            width: '100%',
            maxWidth: '800px', 
            margin: '0 auto', 
            padding: '20px'
        }}>
            <ProgressBar currentStep={currentStep} totalSteps={3} />
            
            <div style={{ 
                marginTop: '12px',
                marginBottom: '24px',
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
        </div>
    );
};

export default Register;