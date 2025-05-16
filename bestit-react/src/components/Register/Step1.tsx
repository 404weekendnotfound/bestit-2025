import { Formik, Form } from 'formik';
import type { FormikHelpers } from 'formik';

interface FormValues {
    firstName: string;
    lastName: string;
    date: string;
    phone: string;
    email: string;
    city: string;
}

interface Step1Props {
    onNext?: (values: FormValues) => void;
}

const Step1 = ({ onNext }: Step1Props) => {
    const initialValues: FormValues = {
        firstName: '',
        lastName: '',
        date: '',
        phone: '',
        email: '',
        city: ''
    };

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
            return 'Numer telefonu musi składać się z dokładnie 9 cyfr';
        }
        return undefined;
    };

    const handleSubmit = (
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
    ) => {
        try {
            console.log('Step 1 values:', values);
            if (onNext) {
                onNext(values);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="form-container">
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validate={(values) => {
                    const errors: Partial<FormValues> = {};
                    const firstNameError = validateName(values.firstName);
                    const lastNameError = validateName(values.lastName);
                    const dateError = validateDate(values.date);
                    const phoneError = validatePhone(values.phone);
                    const emailError = validateEmail(values.email);
                    const cityError = validateCity(values.city);
                    if (firstNameError) {
                        errors.firstName = firstNameError;
                    }
                    if (lastNameError) {
                        errors.lastName = lastNameError;
                    }
                    if (dateError) {
                        errors.date = dateError;
                    }
                    if (phoneError) {
                        errors.phone = phoneError;
                    }
                    if (emailError) {
                        errors.email = emailError;
                    }
                    if (cityError) {
                        errors.city = cityError;
                    }
                    return errors;
                }}
            >
                {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
                    <Form className="form">
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
                                    onBlur={handleBlur}
                                    value={values[item.name as keyof FormValues]}
                                    placeholder={item.placeholder}
                                    className="form-input"
                                />
                                {touched[item.name as keyof FormValues] && errors[item.name as keyof FormValues] && (
                                    <div className="form-error">
                                        {errors[item.name as keyof FormValues]}
                                    </div>
                                )}
                            </div>
                        ))}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="form-button"
                        >
                            {isSubmitting ? 'Zapisywanie...' : 'Dalej'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Step1; 