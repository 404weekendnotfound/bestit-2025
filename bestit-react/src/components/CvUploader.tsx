import { Formik, Form } from 'formik';
import type { FormikHelpers } from 'formik';
import { useState } from 'react';
import axios from 'axios';

interface FormValues {
    file: File | null;
    notes: (File | null)[];
}

const CvUploader = () => {
    const [uploadStatus, setUploadStatus] = useState<string>('');

    const initialValues: FormValues = {
        file: null,
        notes: [null]
    };

    const handleSubmit = async (
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
    ) => {
        try {
            const formData = new FormData();
            if (values.file) formData.append('file', values.file);
            values.notes.forEach((note, index) => {
                if (note) formData.append(`notes[${index}]`, note);
            });

            // Replace with your actual API endpoint
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUploadStatus('Pliki zostały pomyślnie przesłane!');
        } catch (error) {
            setUploadStatus('Błąd podczas przesyłania plików. Spróbuj ponownie.');
            console.error('Upload error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
            <h1>Dodaj pliki w formacie pdf lub zdjęcia</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="file" style={{ display: 'block', marginBottom: '8px' }}>
                                CV (PDF lub zdjęcie)
                            </label>
                            <input
                                id="file"
                                name="file"
                                type="file"
                                accept=".pdf,image/*"
                                onChange={(event) => {
                                    const file = event.currentTarget.files?.[0];
                                    setFieldValue('file', file);
                                }}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>
                                Notatki (PDF lub zdjęcia)
                            </label>
                            {values.notes.map((_, index) => (
                                <div key={index} style={{ 
                                    display: 'flex', 
                                    gap: '8px', 
                                    marginBottom: index !== values.notes.length - 1 ? '8px' : '0' 
                                }}>
                                    <input
                                        type="file"
                                        accept=".pdf,image/*"
                                        onChange={(event) => {
                                            const file = event.currentTarget.files?.[0] || null;
                                            const newNotes = [...values.notes];
                                            newNotes[index] = file;
                                            setFieldValue('notes', newNotes);
                                        }}
                                        style={{
                                            flex: 1,
                                            padding: '8px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px'
                                        }}
                                    />
                                    {values.notes.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newNotes = values.notes.filter((_, i) => i !== index);
                                                setFieldValue('notes', newNotes);
                                            }}
                                            style={{
                                                padding: '4px 8px',
                                                backgroundColor: '#ff4444',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                minWidth: '24px'
                                            }}
                                        >
                                            -
                                        </button>
                                    )}
                                </div>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFieldValue('notes', [...values.notes, null]);
                                    }}
                                    style={{
                                        marginTop: '8px',
                                        padding: '4px 8px',
                                        backgroundColor: 'transparent',
                                        color: '#4CAF50',
                                        border: '1px solid #4CAF50',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
                                > 
                                    + Dodaj kolejną notatkę
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                opacity: isSubmitting ? 0.7 : 1
                            }}
                        >
                            {isSubmitting ? 'Przesyłanie...' : 'Prześlij pliki'}
                        </button>

                        {uploadStatus && (
                            <div style={{
                                marginTop: '20px',
                                padding: '10px',
                                backgroundColor: uploadStatus.includes('Błąd') ? '#ffebee' : '#e8f5e9',
                                borderRadius: '4px'
                            }}>
                                {uploadStatus}
                            </div>
                        )}
                                    </Form>
                                )}
                            </Formik>
                        </div>
    );
};

export default CvUploader;