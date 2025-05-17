import React, { useState } from 'react';
import type { StepProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './Step2.scss';

const Step3 = ({ formData, setFormData }: StepProps) => {
    const [errors, setErrors] = useState<{
        skills: string[];
        certifications: string[];
        interests: string[];
    }>({
        skills: [],
        certifications: [],
        interests: []
    });

    const validateSkill = (skill: { name: string; level: string }, index: number) => {
        const newErrors = [...errors.skills];
        if (!skill.name) {
            newErrors[index] = "Nazwa umiejętności jest wymagana";
        } else if (!skill.level) {
            newErrors[index] = "Poziom umiejętności jest wymagany";
        } else {
            newErrors[index] = "";
        }
        setErrors(prev => ({ ...prev, skills: newErrors }));
        return !newErrors[index];
    };

    const validateCertification = (cert: { name: string; date: string }, index: number) => {
        const newErrors = [...errors.certifications];
        if (!cert.name) {
            newErrors[index] = "Nazwa certyfikatu jest wymagana";
        } else if (!cert.date) {
            newErrors[index] = "Data uzyskania jest wymagana";
        } else {
            newErrors[index] = "";
        }
        setErrors(prev => ({ ...prev, certifications: newErrors }));
        return !newErrors[index];
    };

    const validateInterest = (interest: string, index: number) => {
        const newErrors = [...errors.interests];
        if (!interest) {
            newErrors[index] = "Zainteresowanie jest wymagane";
        } else {
            newErrors[index] = "";
        }
        setErrors(prev => ({ ...prev, interests: newErrors }));
        return !newErrors[index];
    };

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
            ...newCertifications[index],
            name: e.target.value
        };
        setFormData({ ...formData, certifications: newCertifications });
        validateCertification(newCertifications[index], index);
    };

    const handleInterestChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newInterests = [...formData.interests];
        newInterests[index] = e.target.value;
        setFormData({ ...formData, interests: newInterests });
        validateInterest(newInterests[index], index);
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
        newSkills[index] = {
            ...newSkills[index],
            name: e.target.value
        };
        setFormData({ ...formData, skills: newSkills });
        validateSkill(newSkills[index], index);
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
        newSkills[index] = {
            ...newSkills[index],
            level: e.target.value
        };
        setFormData({ ...formData, skills: newSkills });
        validateSkill(newSkills[index], index);
    }

    const handleCertificateDateChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newCertificates = [...formData.certifications];
        newCertificates[index] = {
            ...newCertificates[index],
            date: e.target.value
        };
        setFormData({ ...formData, certifications: newCertificates });
        validateCertification(newCertificates[index], index);
    }

    return (
        <div className="form-container">
            <div className="section-header">
                <p className="form-title">Umiejętności</p>
                <div className="header-buttons">
                    <div className="add-button" onClick={addSkill}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Dodaj</span>
                    </div>
                </div>
            </div>
            {formData?.skills && formData?.skills?.map((skill, index) => (
                <div key={index} className="form-field editing">
                    {formData.skills.length > 1 && (
                        <div className="remove-button" onClick={() => removeSkill(index)}>
                            <FontAwesomeIcon icon={faMinus} />
                        </div>
                    )}
                    <div className="input-group">
                        <input
                            className={`form-input ${errors.skills[index] ? 'error' : ''}`}
                            type="text"
                            value={skill.name}
                            placeholder="Nazwa umiejętności"
                            onChange={(e) => handleSkillChange(index, e)}
                        />
                        <input
                            className={`form-input ${errors.skills[index] ? 'error' : ''}`}
                            type="text"
                            value={skill.level}
                            placeholder="Poziom umiejętności"
                            onChange={(e) => handleSkillLevelChange(index, e)}
                        />
                        {errors.skills[index] && (
                            <div className="error-message">{errors.skills[index]}</div>
                        )}
                    </div>
                </div>
            ))}

            <div className="section-header">
                <p className="form-title">Certyfikaty i szkolenia</p>
                <div className="header-buttons">
                    <div className="add-button" onClick={addCertification}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Dodaj</span>
                    </div>
                </div>
            </div>
            {formData?.certifications && formData?.certifications?.map((certificate, index) => (
                <div key={index} className="form-field editing">
                    {formData.certifications.length > 1 && (
                        <div className="remove-button" onClick={() => removeCertifications(index)}>
                            <FontAwesomeIcon icon={faMinus} />
                        </div>
                    )}
                    <div className="input-group">
                        <input
                            className={`form-input ${errors.certifications[index] ? 'error' : ''}`}
                            type="text"
                            value={certificate.name}
                            placeholder="Nazwa certyfikatu"
                            onChange={(e) => handleCertificateChange(index, e)}
                        />
                        <input
                            className={`form-input ${errors.certifications[index] ? 'error' : ''}`}
                            type="date"
                            value={certificate.date}
                            onChange={(e) => handleCertificateDateChange(index, e)}
                        />
                        {errors.certifications[index] && (
                            <div className="error-message">{errors.certifications[index]}</div>
                        )}
                    </div>
                </div>
            ))}

            <div className="section-header">
                <p className="form-title">Zainteresowania</p>
                <div className="header-buttons">
                    <div className="add-button" onClick={addInterest}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Dodaj</span>
                    </div>
                </div>
            </div>
            {formData?.interests && formData?.interests?.map((interest, index) => (
                <div key={index} className="form-field editing">
                    {formData.interests.length > 1 && (
                        <div className="remove-button" onClick={() => removeInterest(index)}>
                            <FontAwesomeIcon icon={faMinus} />
                        </div>
                    )}
                    <div className="input-group">
                        <input
                            className={`form-input ${errors.interests[index] ? 'error' : ''}`}
                            type="text"
                            value={interest}
                            placeholder="Zainteresowanie"
                            onChange={(e) => handleInterestChange(index, e)}
                        />
                        {errors.interests[index] && (
                            <div className="error-message">{errors.interests[index]}</div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Step3;
