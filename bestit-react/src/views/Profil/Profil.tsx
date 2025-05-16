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

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    bio: string;
    avatar: string;
    skills: Skill[];
    experience: Experience[];
}

const defaultProfile: UserProfile = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    bio: '',
    avatar: '',
    skills: [],
    experience: []
};

const Profil: React.FC = () => {
    const { userData, setUserData } = useUserData();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<UserProfile>(userData?.profile || defaultProfile);
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
                setProfile(prev => ({
                    ...prev,
                    avatar: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addSkill = () => {
        if (newSkill.name.trim()) {
            setProfile(prev => ({
                ...prev,
                skills: [...prev.skills, { ...newSkill, id: Date.now().toString() }]
            }));
            setNewSkill({ name: '', level: 1 });
        }
    };

    const removeSkill = (skillId: string) => {
        setProfile(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill.id !== skillId)
        }));
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
        setProfile(prev => ({
            ...prev,
            experience: [...prev.experience, newExperience]
        }));
    };

    const updateExperience = (id: string, field: keyof Experience, value: string) => {
        setProfile(prev => ({
            ...prev,
            experience: prev.experience.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        }));
    };

    const removeExperience = (experienceId: string) => {
        setProfile(prev => ({
            ...prev,
            experience: prev.experience.filter(exp => exp.id !== experienceId)
        }));
    };

    const handleSave = () => {
        setUserData({ ...userData, profile });
        setIsEditing(false);
    };

    return (
        <Layout>
        <div className="profile-container">
            <div className="profile-header">
                <div className="avatar-section" onClick={handleAvatarClick}>
                    {profile.avatar ? (
                        <img src={profile.avatar} alt="Profile" className="avatar" />
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
                                value={profile.firstName}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label>Nazwisko</label>
                            <input
                                type="text"
                                name="lastName"
                                value={profile.lastName}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label>Telefon</label>
                            <input
                                type="tel"
                                name="phone"
                                value={profile.phone}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label>Miasto</label>
                            <input
                                type="text"
                                name="city"
                                value={profile.city}
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
                        value={profile.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={4}
                    />
                </section>

                <section className="profile-section">
                    <h2>Umiejętności</h2>
                    <div className="skills-container">
                        {profile.skills.map(skill => (
                            <div key={skill.id} className="skill-tag">
                                <span>{skill.name}</span>
                                <div className="skill-level">
                                    {Array.from({ length: skill.level }).map((_, i) => (
                                        <i key={i} className="fas fa-star"></i>
                                    ))}
                                </div>
                                {isEditing && (
                                    <button
                                        className="remove-skill"
                                        onClick={() => removeSkill(skill.id)}
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                )}
                            </div>
                        ))}
                        {isEditing && (
                            <div className="add-skill">
                                <input
                                    type="text"
                                    value={newSkill.name}
                                    onChange={e => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Nowa umiejętność"
                                />
                                <select
                                    value={newSkill.level}
                                    onChange={e => setNewSkill(prev => ({ ...prev, level: Number(e.target.value) }))}
                                >
                                    {[1, 2, 3, 4, 5].map(level => (
                                        <option key={level} value={level}>
                                            Poziom {level}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={addSkill}>Dodaj</button>
                            </div>
                        )}
                    </div>
                </section>

                <section className="profile-section">
                    <h2>Doświadczenie</h2>
                    {profile.experience.map(exp => (
                        <div key={exp.id} className="experience-item">
                            <div className="experience-header">
                                <input
                                    type="text"
                                    value={exp.company}
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
                                onChange={e => updateExperience(exp.id, 'position', e.target.value)}
                                placeholder="Stanowisko"
                                disabled={!isEditing}
                            />
                            <div className="experience-dates">
                                <input
                                    type="date"
                                    value={exp.startDate}
                                    onChange={e => updateExperience(exp.id, 'startDate', e.target.value)}
                                    disabled={!isEditing}
                                />
                                <span>-</span>
                                <input
                                    type="date"
                                    value={exp.endDate}
                                    onChange={e => updateExperience(exp.id, 'endDate', e.target.value)}
                                    disabled={!isEditing}
                                />
                            </div>
                            <textarea
                                value={exp.description}
                                onChange={e => updateExperience(exp.id, 'description', e.target.value)}
                                placeholder="Opis stanowiska"
                                disabled={!isEditing}
                                rows={3}
                            />
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