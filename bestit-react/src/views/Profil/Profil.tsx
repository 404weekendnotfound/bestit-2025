import React, { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { useUserData } from '../../context/UserDataContext';
import './Profil.scss';
import Layout from '../../components/Layout/Layout';

interface Skill {
    id: string;
    name: string;
    level: number;
}

interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
}


const Profil: React.FC = () => {
    const { userData, setUserData } = useUserData();
    const [isEditing, setIsEditing] = useState(false);
    const [newSkill, setNewSkill] = useState({ name: '', level: 1 });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserData({...userData, avatar: reader.result as string})
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserData({...userData, [name]: value})
    };

    const addSkill = () => {
        if (newSkill.name.trim()) {
            setUserData({...userData, skills: [...userData.skills, { ...newSkill, id: Date.now().toString() }]})
            setNewSkill({ name: '', level: 1 });
        }
    };

    const removeSkill = (skillId: string) => {
        setUserData({...userData, skills: userData.skills.filter((skill: Skill) => skill.id !== skillId)})
    };

    const addExperience = () => {
        const newExperience: Experience = {
            id: Date.now().toString(),
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            description: ''
        };
        setUserData({...userData, experience: [...userData.experience, newExperience]})
    };

    const updateExperience = (id: string, field: keyof Experience, value: string) => {
        setUserData({...userData, experience: userData.experience.map((exp: Experience) =>
            exp.id === id ? { ...exp, [field]: value } : exp
        )})
    };

    const removeExperience = (experienceId: string) => {
        setUserData({...userData, experience: userData.experience.filter((exp: Experience) => exp.id !== experienceId)})
    };

    const handleSave = () => {
        setUserData({ ...userData });
        setIsEditing(false);
    };

    return (
        <Layout>
        <div className="profile-container box">
            <div className="profile-header">
                <div className="avatar-section" onClick={handleAvatarClick}>
                    {userData?.avatar ? (
                        <img src={userData.avatar} alt="Profile" className="avatar" />
                    ) : (
                        <div className="avatar-placeholder">
                            <i className="fas fa-user"></i>
                        </div>
                    )}
                    {isEditing && <div className="avatar-overlay">Zmień zdjęcie</div>}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                </div>
                <div className="profile-actions">
                    {isEditing ? (
                        <>
                            <button className="btn btn-primary" onClick={handleSave}>
                                Zapisz zmiany
                            </button>
                            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                                Anuluj
                            </button>
                        </>
                    ) : (
                        <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                            Edytuj profil
                        </button>
                    )}
                </div>
            </div>

            <div className="profile-content">
                <section className="profile-section">
                    <h2>Informacje kontaktowe</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Imię</label>
                            <input
                                type="text"
                                name="firstName"
                                value={userData?.first_name || ''}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label>Nazwisko</label>
                            <input
                                type="text"
                                name="lastName"
                                value={userData?.last_name || ''}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={userData?.email || ''}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label>Telefon</label>
                            <input
                                type="tel"
                                name="phone"
                                value={userData?.phone || ''}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label>Miasto</label>
                            <input
                                type="text"
                                name="city"
                                value={userData?.city || ''}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                </section>

                <section className="profile-section">
                    <h2>O mnie</h2>
                    <textarea
                        name="bio"
                        value={userData?.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={4}
                    />
                </section>

                <section className="profile-section">
                    <h2>Doświadczenie</h2>
                    {userData?.work_experience?.map((exp: Experience) => (
                        <div key={exp.id} className="experience-item">
                            <div className="experience-header">
                                <input
                                    type="text"
                                    value={exp.company}
                                    className="experience-company"
                                    onChange={e => updateExperience(exp.id, 'company', e.target.value)}
                                    placeholder="Nazwa firmy"
                                    disabled={!isEditing}
                                />
                                {isEditing && (
                                    <button
                                        className="remove-experience"
                                        onClick={() => removeExperience(exp.id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                )}
                            </div>
                            <input
                                type="text"
                                value={exp.position}
                                className="experience-position"                              
                                onChange={e => updateExperience(exp.id, 'position', e.target.value)}
                                placeholder="Stanowisko"
                                disabled={!isEditing}
                            />
                            <div className="experience-dates">
                                <input
                                    type="date"
                                    value={exp.startDate}
                                    className="experience-date"
                                    onChange={e => updateExperience(exp.id, 'startDate', e.target.value)}
                                    disabled={!isEditing}
                                />
                                <input
                                    type="date"
                                    value={exp.endDate}
                                    className="experience-date"
                                    onChange={e => updateExperience(exp.id, 'endDate', e.target.value)}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                    ))}
                    {isEditing && (
                        <button className="btn btn-secondary" onClick={addExperience}>
                            Dodaj doświadczenie
                        </button>
                    )}
                </section>
            </div>
        </div>
        </Layout>
    );
};

export default Profil; 