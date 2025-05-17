import React, { useState } from 'react';
import type { StepProps } from './types';

const Step3 = ({ formData, setFormData }: StepProps) => {


    const addCertificate = () => {
        const newCertificate = {
            name: '',
            date: '',
        };
        setFormData({
            ...formData,
            certificates: [...formData.certificates, newCertificate]
        });
        setEditingExperience(true);
    };

    const handleCertificateChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newCertificates = [...formData.certificates];
        newCertificates[index] = {
            name: e.target.value,
            date: '',
        };
        setFormData({ ...formData, certificates: newCertificates });
    };

    const handleInterestChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newInterests = [...formData.interests];
        newInterests[index] = e.target.value;
        setFormData({ ...formData, interests: newInterests });
    };

    const removeCertificate = (index: number) => {
        if (formData.certifications.length <= 1) {
            return;
        }
        const newCertificate = formData.certifications.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            certificates: newCertificate
        });
    }

    const addSkill = () => {
        const newSkill = {
            name: '',
            level: '',
        };
        setFormData({
            ...formData,
            skills: [...formData.skills, newSkill]
        });
    }

    const handleSkillChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newSkills = [...formData.skills];
        newSkills[index] = e.target.value;
        setFormData({ ...formData, skills: newSkills });
    }

    const removeSkill = (index: number) => {
        if (formData.skills.length <= 1) {
            return;
        }
        const newSkills = formData.skills.filter((_, i) => i !== index);
        setFormData({ ...formData, skills: newSkills });
    }

    const addInterest = () => {
        const newInterest = "";
        setFormData({
            ...formData,
            interests: [...formData.interests, newInterest]
        });
    }

    const removeInterest = (index: number) => {
        if (formData.interests.length <= 1) {
            return;
        }
    }

    const handleSkillLevelChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newSkills = [...formData.skills];
        newSkills[index].level = e.target.value;
        setFormData({ ...formData, skills: newSkills });
    }

    const handleCertificateDateChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newCertificates = [...formData.certifications];
        newCertificates[index].date = e.target.value;
        setFormData({ ...formData, certifications: newCertificates });
    }

    return (
        <div className="form-container">
        
            <div className="form-field">
                <label htmlFor="languages" className="form-label">
                    Umiejętności
                </label>
                <button className='form-button' onClick={addSkill}>Dodaj</button>
                {formData?.skills && formData?.skills?.map((skill, index) => (
                    <div key={index}>
                        <input
                            className='form-input'
                            type="text"
                            value={skill.name}
                            onChange={(e) => handleSkillChange(index, e)}
                        />
                        <input
                            className='form-input'
                            type="text"
                            value={skill.level}
                            onChange={(e) => handleSkillLevelChange(index, e)}
                        />
                        <button className='form-button' onClick={() => removeSkill(index)}>Usuń</button>
                    </div>
                ))}
            </div>

            <div className="form-field">
                <label htmlFor="certificates" className="form-label">
                Certyfikaty i szkolenia
                </label>
                <button className='form-button' onClick={addCertificate}>Dodaj</button>
                {formData?.certifications && formData?.certifications?.map((certificate, index) => (
                    <div key={index}>
                        <input
                            className='form-input'
                            type="text"
                            value={certificate.name}
                            onChange={(e) => handleCertificateChange(index, e)}
                        />
                        <input
                            className='form-input'
                            type="text"
                            value={certificate.date}
                            onChange={(e) => handleCertificateDateChange(index, e)}
                        />
                        <button className='form-button' onClick={() => removeCertificate(index)}>Usuń</button>
                    </div>
                ))}
            </div>

            <div className="form-field">
                <label htmlFor="additionalInfo" className="form-label">
                    Zainteresowania
                </label>
                <button className='form-button' onClick={addInterest}>Dodaj</button>
                {formData?.interests && formData?.interests?.map((interest, index) => (
                    <div key={index}>
                        <input
                            className='form-input'
                            type="text"
                            value={interest}
                            onChange={(e) => handleInterestChange(index, e)}
                        />
                        <button className='form-button' onClick={() => removeInterest(index)}>Usuń</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Step3;
