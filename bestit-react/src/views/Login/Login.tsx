import { useState } from "react";
import { Formik, Form } from 'formik';
import type { FormikHelpers } from 'formik';
import axios from 'axios';
import "./Login.scss";
import axiosInstance from "../../api/axios";

interface FormValues {
    file: File | null;
    notes: (string | null)[];
}

interface LoginFormData {
    email: string;
    password: string;
    repeatPassword: string;
    file: File | null;
}

const Login = () => {
    const [currentView, setCurrentView] = useState<"login" | "register">("login");
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
        repeatPassword: "",
        file: null,
    });
    const [uploadStatus, setUploadStatus] = useState<string>('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.repeatPassword) {
            alert("Hasła nie pasują do siebie");
            return;
        }

        try {
            const response = await axiosInstance.post("/upload-cv/", {
                email: formData.email,
                password: formData.password,
                file: formData.file
            }, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
            console.log(response);
            setCurrentView("login");
        } catch (err) {
            console.error(err);
            alert("Wystąpił błąd podczas rejestracji");
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/auth/login", {
                email: formData.email,
                password: formData.password
            });
            console.log(response);
            // Tutaj możesz dodać przekierowanie po zalogowaniu
        } catch (err) {
            console.error(err);
            alert("Nieprawidłowy email lub hasło");
        }
    };

    const handleFileUpload = async (
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
    ) => {
        try {
            const formData = new FormData();
            if (values.file) {
                formData.append('file', values.file);
            }
            values.notes.forEach((note, index) => {
                if (note) formData.append(`notes[${index}]`, note);
            });

            const response = await axiosInstance.post('/api/upload', formData, {
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
        <div className="login-container">
            <div className="login-form">
                <h1>{currentView === "login" ? "Logowanie" : "Rejestracja"}</h1>
                <form onSubmit={currentView === "login" ? handleLogin : handleRegister}>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className="form-input" 
                            value={formData.email} 
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Hasło</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            className="form-input" 
                            value={formData.password} 
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            minLength={6}
                        />
                    </div>
                    {currentView === "register" && (
                        <div className="form-group">
                            <label htmlFor="repeatPassword" className="form-label">Powtórz hasło</label>
                            <input 
                                type="password" 
                                id="repeatPassword" 
                                name="repeatPassword" 
                                className="form-input" 
                                value={formData.repeatPassword} 
                                onChange={(e) => setFormData({ ...formData, repeatPassword: e.target.value })}
                                required
                                minLength={6}
                            />
                        </div>
                    )}
                    {currentView == "register" && (
                        <div>
                        <p>Dodaj swoje CV</p>

                                    <div className="form-group">
                                        <input
                                            id="file"
                                            name="file"
                                            type="file"
                                            accept=".pdf,image/*"
                                            onChange={(event) => {
                                                const file = event.currentTarget.files?.[0];
                                                setFormData({ ...formData, file: file || null });
                                            }}
                                            className="form-input"
                                        />
                                    </div>
                                    {uploadStatus && (
                                        <div className={`upload-status ${uploadStatus.includes('Błąd') ? 'error' : 'success'}`}>
                                            {uploadStatus}
                                        </div>
                                    )}
                        </div>
                    )}

                    <button type="submit" className="btn btn-full">
                        {currentView === "login" ? "Zaloguj się" : "Zarejestruj się"}
                    </button>
                </form>

                {currentView === "login" ? (
                    <>
                        <p className="text-center">
                            Nie masz jeszcze konta? <span onClick={() => setCurrentView("register")} className="register-link">Zarejestruj się</span>
            
                        </p>
                        
                    </>
                ) : (
                    <p className="text-center">
                        Masz już konto? <span onClick={() => setCurrentView("login")} className="register-link">Zaloguj się</span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;