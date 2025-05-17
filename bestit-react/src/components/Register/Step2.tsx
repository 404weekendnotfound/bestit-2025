import { useState } from 'react';
import type { StepProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './Step2.scss';

const Step2 = ({ onNext, formData, setFormData }: StepProps) => {
    const [editingExperience, setEditingExperience] = useState(true);
    const [editingEducation, setEditingEducation] = useState(true);

    const handleExperienceEdit = () => {
        setEditingExperience(!editingExperience);
    };

    const handleEducationEdit = () => {
        setEditingEducation(!editingEducation);
    };

    const addWorkExperience = () => {
        const newExperience = {
            company: '',
            position: '',
            start_date: '',
            end_date: ''
        };
        setFormData({
            ...formData,
            work_experience: [...formData.work_experience, newExperience]
        });
        setEditingExperience(true);
    };

    const removeWorkExperience = (index: number) => {
        if (formData.work_experience.length <= 1) {
            return;
        }
        const newExperience = formData.work_experience.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            work_experience: newExperience
        });
    };

    const addEducation = () => {
        const newEducation = {
            institution: '',
            degree: '',
            field: '',
            start_date: '',
            graduation_date: ''
        };
        setFormData({
            ...formData,
            education: [...formData.education, newEducation]
        });
        setEditingEducation(true);
    };

    const removeEducation = (index: number) => {
        if (formData.education.length <= 1) {
            return;
        }
        const newEducation = formData.education.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            education: newEducation
        });
    };

    return (
        <div className="form-container">
            <div className="section-header">
                <p className="form-title">Doświadczenie zawodowe</p>
                <div className="header-buttons">
                    <div className="add-button" onClick={addWorkExperience}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Dodaj</span>
                    </div>
                </div>
            </div>
            
            {formData.work_experience.map((item, index) => (
                <div key={index} className={`form-field ${editingExperience ? 'editing' : ''}`}>
                    {editingExperience && formData.work_experience.length > 1 && (
                        <div className="remove-button" onClick={() => removeWorkExperience(index)}>
                            <FontAwesomeIcon icon={faMinus} />
                        </div>
                    )}
                    <div className="form-date">
                        {editingExperience ? (
                            <>
                                <input 
                                    type="date" 
                                    value={item.start_date} 
                                    onChange={(e) => {
                                        const newExperience = [...formData.work_experience];
                                        newExperience[index] = { ...item, start_date: e.target.value };
                                        setFormData({ ...formData, work_experience: newExperience });
                                    }}
                                /> - 
                                <input 
                                    type="date" 
                                    value={item.end_date} 
                                    onChange={(e) => {
                                        const newExperience = [...formData.work_experience];
                                        newExperience[index] = { ...item, end_date: e.target.value };
                                        setFormData({ ...formData, work_experience: newExperience });
                                    }}
                                />
                            </>
                        ) : (
                            `(${item.start_date} - ${item.end_date})`
                        )}
                    </div>
                    <div className="form-field-label">
                        {editingExperience ? (
                            <input 
                                type="text" 
                                value={item.position}
                                placeholder="Stanowisko"
                                onChange={(e) => {
                                    const newExperience = [...formData.work_experience];
                                    newExperience[index] = { ...item, position: e.target.value };
                                    setFormData({ ...formData, work_experience: newExperience });
                                }}
                            />
                        ) : (
                            item.position
                        )}
                    </div>
                    <div className="form-company">
                        <i className="fas fa-location-dot"></i>
                        {editingExperience ? (
                            <input 
                                type="text" 
                                value={item.company}
                                placeholder="Nazwa firmy"
                                onChange={(e) => {
                                    const newExperience = [...formData.work_experience];
                                    newExperience[index] = { ...item, company: e.target.value };
                                    setFormData({ ...formData, work_experience: newExperience });
                                }}
                            />
                        ) : (
                            item.company
                        )}
                    </div>
                </div>
            ))}

            <div className="section-header">
                <p className="form-title">Wykształcenie</p>
                <div className="header-buttons">
                    <div className="add-button" onClick={addEducation}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Dodaj</span>
                    </div>
                </div>
            </div>
            <datalist id="schools">
                <option value="Uniwersytet Warszawski"></option>
                <option value="Uniwersytet Jagielloński"></option>
                <option value="Politechnika Warszawska"></option>
                <option value="Politechnika Wrocławska"></option>
                <option value="Politechnika Gdańska"></option>
                <option value="Politechnika Łódzka"></option>
                <option value="Politechnika Poznańska"></option>
                <option value="Akademia Górniczo-Hutnicza"></option>
                <option value="Uniwersytet im. Adama Mickiewicza w Poznaniu"></option>
                <option value="Uniwersytet Wrocławski"></option>
                <option value="Uniwersytet Gdański"></option>
                <option value="Uniwersytet Łódzki"></option>
                <option value="Szkoła Główna Handlowa"></option>
                <option value="Uniwersytet Ekonomiczny w Krakowie"></option>
                <option value="Uniwersytet Medyczny w Warszawie"></option>
                <option value="Uniwersytet Medyczny w Łodzi"></option>
                <option value="Katolicki Uniwersytet Lubelski"></option>
                <option value="Uniwersytet Marii Curie-Skłodowskiej"></option>
                <option value="Uniwersytet Śląski"></option>
                <option value="Uniwersytet Mikołaja Kopernika"></option>
            </datalist>

            {formData.education.map((item, index) => (
                <div key={index} className={`form-field ${editingEducation ? 'editing' : ''}`}>
                    {editingEducation && formData.education.length > 1 && (
                        <div className="remove-button" onClick={() => removeEducation(index)}>
                            <FontAwesomeIcon icon={faMinus} />
                        </div>
                    )}
                    <div className="form-date">
                        {editingEducation ? (
                            <>
                                <input 
                                    type="date" 
                                    value={item.start_date}
                                    onChange={(e) => {
                                        const newEducation = [...formData.education];
                                        newEducation[index] = { ...item, start_date: e.target.value };
                                        setFormData({ ...formData, education: newEducation });
                                    }}
                                /> - 
                                <input 
                                    type="date" 
                                    value={item.graduation_date}
                                    onChange={(e) => {
                                        const newEducation = [...formData.education];
                                        newEducation[index] = { ...item, graduation_date: e.target.value };
                                        setFormData({ ...formData, education: newEducation });
                                    }}
                                />
                            </>
                        ) : (
                            `(${item.start_date} - ${item.graduation_date
                            })`
                        )}
                    </div>
                    <div className="form-company">
                        <i className="fas fa-graduation-cap"></i>
                        {editingEducation ? (
                            <input 
                                type="text" 
                                value={item.degree}
                                placeholder="Stopień/Tytuł"
                                onChange={(e) => {
                                    const newEducation = [...formData.education];
                                    newEducation[index] = { ...item, degree: e.target.value };
                                    setFormData({ ...formData, education: newEducation });
                                }}
                            />
                        ) : (
                            item.degree
                        )}
                    </div>
                    <div className="form-company">
                        <i className="fas fa-graduation-cap"></i>
                        {editingEducation ? (
                            <input 
                                type="text" 
                                value={item.field}
                                placeholder="Kirunek"
                                onChange={(e) => {
                                    const newEducation = [...formData.education];
                                    newEducation[index] = { ...item, degree: e.target.value };
                                    setFormData({ ...formData, field: newEducation });
                                }}
                            />
                        ) : (
                            item.degree
                        )}
                    </div>
                    <div className="form-company">
                        <i className="fas fa-location-dot"></i>
                        {editingEducation ? (
                            <input 
                                type="text" 
                                value={item.institution}
                                placeholder="Nazwa szkoły/uczelni"
                                list="schools"
                                onChange={(e) => {
                                    const newEducation = [...formData.education];
                                    newEducation[index] = { ...item, school: e.target.value };
                                    setFormData({ ...formData, education: newEducation });
                                }}
                            />
                        ) : (
                            item.school
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Step2;