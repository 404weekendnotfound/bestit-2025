import type { FormValues, StepProps } from './types';

const Step1 = ({ formData, setFormData}: StepProps) => {
    const fields = [
        {name: "firstName", label: "Imię", type: "text", placeholder: "Wprowadź swoje imię"},
        {name: "lastName", label: "Nazwisko", type: "text", placeholder: "Wprowadź swoje nazwisko"},
        {name: "date", label: "Data urodzenia", type: "date", placeholder: "Wprowadź datę urodzenia"},
        {name: "phone", label: "Telefon", type: "tel", placeholder: "Wprowadź numer telefonu (9 cyfr)"},
        {name: "email", label: "Email", type: "email", placeholder: "Wprowadź swoją email"},
        {name: "city", label: "Miasto", type: "text", placeholder: "Wprowadź swoje miasto"}
    ];

    const validateName = (name: string) => {
        if (!name) {
            return 'To pole jest wymagane';
        }
        if (name.length < 2) {
            return 'Minimum 2 znaki';
        }
        if (!/^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s-]+$/.test(name)) {
            return 'Można użyć tylko liter, spacji i myślników';
        }
        return undefined;
    };

    const validateDate = (date: string) => {
        if (!date) {
            return 'To pole jest wymagane';
        }
        const selectedDate = new Date(date);
        const today = new Date();
        if (selectedDate > today) {
            return 'Data nie może być z przyszłości';
        }
        return undefined;
    };

    const validatePhone = (phone: string) => {
        if (!phone) {
            return 'To pole jest wymagane';
        }
        if (!/^\d{9}$/.test(phone)) {
            return 'Numer telefonu musi składać się z 9 cyfr';
        }
        return undefined;
    };

    const validateEmail = (email: string) => {
        if (!email) {
            return 'To pole jest wymagane';
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            return 'Nieprawidłowy format adresu email';
        }
        return undefined;
    };

    const validateCity = (city: string) => {
        if (!city) {
            return 'To pole jest wymagane';
        }
        if (city.length < 2) {
            return 'Nazwa miasta musi mieć minimum 2 znaki';
        }
        if (!/^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s-]+$/.test(city)) {
            return 'Można użyć tylko liter, spacji i myślników';
        }
        return undefined;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="form-container">
                        {fields.map((item, index) => (
                            <div key={index} className="form-field">
                                <label 
                                    htmlFor={item.name} 
                                    className="form-label"
                                >
                                    {item.label}
                                </label>
                                <input
                                    id={item.name}
                                    name={item.name}
                                    type={item.type}
                                    onChange={handleChange}
                                    value={formData[item.name as keyof FormValues]}
                                    placeholder={item.placeholder}
                                    className="form-input"
                                />
                            </div>
                        ))}
        </div>
    );
};

export default Step1; 