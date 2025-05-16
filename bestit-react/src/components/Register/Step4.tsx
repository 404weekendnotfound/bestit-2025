import React from 'react';
import type { StepProps } from './types';

const Step4 = ({ formData, setFormData }: StepProps) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="form-container">
            <div className="form-field">
                <label htmlFor="education" className="form-label">
                    Wykształcenie
                </label>
                <input
                    id="education"
                    name="education"
                    type="text"
                    value={formData.education || ''}
                    onChange={handleInputChange}
                    placeholder="Nazwa uczelni/szkoły"
                    className="form-input"
                />
            </div>

            <div className="form-field">
                <label htmlFor="degree" className="form-label">
                    Stopień/Tytuł
                </label>
                <input
                    id="degree"
                    name="degree"
                    type="text"
                    value={formData.degree || ''}
                    onChange={handleInputChange}
                    placeholder="np. licencjat, magister, inżynier"
                    className="form-input"
                />
            </div>

            <div className="form-field">
                <label htmlFor="fieldOfStudy" className="form-label">
                    Kierunek studiów
                </label>
                <input
                    id="fieldOfStudy"
                    name="fieldOfStudy"
                    type="text"
                    value={formData.fieldOfStudy || ''}
                    onChange={handleInputChange}
                    placeholder="np. Informatyka, Zarządzanie"
                    className="form-input"
                />
            </div>

            <div className="form-field">
                <label htmlFor="graduationYear" className="form-label">
                    Rok ukończenia
                </label>
                <input
                    id="graduationYear"
                    name="graduationYear"
                    type="number"
                    min="1950"
                    max={new Date().getFullYear()}
                    value={formData.graduationYear || ''}
                    onChange={handleInputChange}
                    placeholder="Rok ukończenia studiów"
                    className="form-input"
                />
            </div>

            <div className="form-field">
                <label htmlFor="languages" className="form-label">
                    Języki obce
                </label>
                <input
                    id="languages"
                    name="languages"
                    type="text"
                    value={formData.languages || ''}
                    onChange={handleInputChange}
                    placeholder="np. Angielski B2, Niemiecki A2"
                    className="form-input"
                />
            </div>

            <div className="form-field">
                <label htmlFor="certificates" className="form-label">
                    Certyfikaty
                </label>
                <textarea
                    id="certificates"
                    name="certificates"
                    value={formData.certificates || ''}
                    onChange={handleInputChange}
                    placeholder="Wymień swoje certyfikaty i osiągnięcia"
                    className="form-input"
                    rows={4}
                />
            </div>

            <div className="form-field">
                <label htmlFor="additionalInfo" className="form-label">
                    Dodatkowe informacje
                </label>
                <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo || ''}
                    onChange={handleInputChange}
                    placeholder="Dodatkowe informacje, które chcesz przekazać"
                    className="form-input"
                    rows={4}
                />
            </div>
        </div>
    );
};

export default Step4;
