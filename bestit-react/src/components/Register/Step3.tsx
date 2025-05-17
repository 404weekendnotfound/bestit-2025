import React, { useState } from 'react';
import type { StepProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const Step3 = ({ formData, setFormData }: StepProps) => {


    const addCertification = () => {
        const newCertification = {
            name: '',
            date: '',
        };
        setFormData({
            ...formData,
            certifications: [...formData.certifications, newCertification]
        });
        setEditingExperience(true);
    };

    const handleCertificateChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newCertifications = [...formData.certifications];
        newCertifications[index] = {
            name: e.target.value,
            date: '',
        };
        setFormData({ ...formData, certifications: newCertifications });
    };

    const handleInterestChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newInterests = [...formData.interests];
        newInterests[index] = e.target.value;
        setFormData({ ...formData, interests: newInterests });
    };

    const removeCertifications = (index: number) => {
        if (formData.certifications.length <= 1) {
            return;
        }
        const newCertifications = formData.certifications.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            certifications: newCertifications
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
        const newInterests = formData.interests.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            interests: newInterests
        });
    }

    const handleSkillLevelChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newSkills = [...formData.skills];
        newSkills[index].level = e.target.value;
        setFormData({ ...formData, skills: newSkills });
    }

    const handleCertificateDateChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newCertificates = [...formData.certifications];
        newCertificates[index] = {
            ...newCertificates[index],
            date: e.target.value
        };
        setFormData({ ...formData, certifications: newCertificates });
    }

    return (
        <div className="form-container">
            <div className="form-field">
                <label htmlFor="languages" className="form-label">
                    Umiejętności
                </label>
                <div className="header-buttons">
                    <div className="add-button" onClick={addSkill}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Dodaj</span>
                    </div>
                </div>
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
                        <div className="remove-button" onClick={() => removeSkill(index)}>
                            <FontAwesomeIcon icon={faMinus} />
                        </div>                  
                    </div>
                ))}
            </div>

            <div className="form-field">
                <label htmlFor="certificates" className="form-label">
                Certyfikaty i szkolenia
                </label>
                <div className="header-buttons">
                    <div className="add-button" onClick={addCertification}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Dodaj</span>
                    </div>
                </div>
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
                        <div className="remove-button" onClick={() => removeCertification(index)}>
                            <FontAwesomeIcon icon={faMinus} />
                        </div>              
                     </div>
                ))}
            </div>

            <div className="form-field">
                <label htmlFor="additionalInfo" className="form-label">
                    Zainteresowania
                </label>
                <div className="header-buttons">
                    <div className="add-button" onClick={addInterest}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Dodaj</span>
                    </div>                
                </div>
                {formData?.interests && formData?.interests?.map((interest, index) => (
                    <div key={index}>
                        <input
                            className='form-input'
                            type="text"
                            value={interest}
                            onChange={(e) => handleInterestChange(index, e)}
                        />
                        <div className="remove-button" onClick={() => removeInterest(index)}>
                            <FontAwesomeIcon icon={faMinus} />
                        </div> 
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Step3;
