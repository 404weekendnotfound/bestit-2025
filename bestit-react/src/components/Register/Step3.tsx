import React from 'react';
import type { StepProps } from './types';

const Step3 = ({ formData, setFormData }: StepProps) => {
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
                <input
                    id="certificates"
                    name="certificates"
                    value={formData.certificates || ''}
                    onChange={handleInputChange}
                    placeholder="Wymień swoje certyfikaty i osiągnięcia"
                    className="form-input"
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

export default Step3;
