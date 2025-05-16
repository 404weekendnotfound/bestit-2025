import { Formik, Form } from 'formik';
import type { FormikHelpers } from 'formik';
import { useState } from 'react';
import axios from 'axios';

interface FormValues {
    linkedinUrl: string;
}

const LinkedInForm = () => {
    const [submitStatus, setSubmitStatus] = useState<string>('');

    const initialValues: FormValues = {
        linkedinUrl: ''
    };

    const validateLinkedInUrl = (url: string) => {
        if (!url) {
            return 'Link do LinkedIn jest wymagany';
        }
        if (!url.includes('linkedin.com')) {
            return 'Podany link nie jest linkiem do LinkedIn';
        }
        return '';
    };

    const handleSubmit = async (
        values: FormValues,
        { setSubmitting, resetForm }: FormikHelpers<FormValues>
    ) => {
        try {
            // Replace with your actual API endpoint
            const response = await axios.post('/api/linkedin', values);
            setSubmitStatus('Link do LinkedIn został pomyślnie zapisany!');
            resetForm();
        } catch (error) {
            setSubmitStatus('Wystąpił błąd podczas zapisywania linku. Spróbuj ponownie.');
            console.error('Submit error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
            <h1>Dodaj link do profilu LinkedIn</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, isSubmitting, errors, touched, handleBlur }) => (
                    <Form>
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="linkedinUrl" style={{ 
                                display: 'block', 
                                marginBottom: '8px',
                                fontSize: '16px'
                            }}>
                                Link do profilu LinkedIn
                            </label>
                            <input
                                id="linkedinUrl"
                                name="linkedinUrl"
                                type="url"
                                placeholder="https://www.linkedin.com/in/twoj-profil"
                                value={values.linkedinUrl}
                                onChange={(e) => {
                                    setFieldValue('linkedinUrl', e.target.value);
                                    const error = validateLinkedInUrl(e.target.value);
                                    if (error) {
                                        errors.linkedinUrl = error;
                                    } else {
                                        delete errors.linkedinUrl;
                                    }
                                }}
                                onBlur={handleBlur}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    fontSize: '16px'
                                }}
                            />
                            {touched.linkedinUrl && errors.linkedinUrl && (
                                <div style={{
                                    color: '#ff4444',
                                    fontSize: '14px',
                                    marginTop: '4px'
                                }}>
                                    {errors.linkedinUrl}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || !!errors.linkedinUrl}
                            style={{
                                backgroundColor: '#0077b5', // LinkedIn blue color
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: (isSubmitting || !!errors.linkedinUrl) ? 'not-allowed' : 'pointer',
                                opacity: (isSubmitting || !!errors.linkedinUrl) ? 0.7 : 1,
                                fontSize: '16px'
                            }}
                        >
                            {isSubmitting ? 'Zapisywanie...' : 'Zapisz link'}
                        </button>

                        {submitStatus && (
                            <div style={{
                                marginTop: '20px',
                                padding: '10px',
                                backgroundColor: submitStatus.includes('błąd') ? '#ffebee' : '#e8f5e9',
                                borderRadius: '4px',
                                fontSize: '14px'
                            }}>
                                {submitStatus}
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LinkedInForm; 