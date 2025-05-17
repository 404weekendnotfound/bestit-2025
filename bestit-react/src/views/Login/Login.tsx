import { useState } from "react";
import type { FormikHelpers } from 'formik';
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { useUserData } from "../../context/UserDataContext";
import Nav from "../../components/Nav/Nav";
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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {setUserData} = useUserData();

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
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
            console.log(response.data);
            setUserData(response.data);
            localStorage.setItem("userData", JSON.stringify(response.data));
            navigate("/register");
            setUploadStatus('Rejestracja zakończona sukcesem!');
            setIsLoading(false);
            setCurrentView("login");
        } catch (err) {
            console.error(err);
            setIsLoading(false);
            setUploadStatus('Wystąpił błąd podczas rejestracji');
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.get(`/users/email/${formData.email}`);
            console.log(response);
            setUserData({
                ...response.data,
                firstName: response.data.first_name,
                lastName: response.data.last_name,
                email: response.data.email,
                password: response.data.password,
                repeatPassword: response.data.repeat_password,
                file: response.data.file,
            });
            localStorage.setItem("userData", JSON.stringify(response.data));
            navigate("/dashboard");
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
        <div>
        <Nav/>
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
                                <p style={{fontSize: "10px"}}><input type="checkbox"></input> Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb rekrutacji zgodnie z art. 6 ust. 1 lit. a Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r.</p>
                        </div>
                    )}

                    <button type="submit" className="btn btn-full" disabled={isLoading}>
                        {isLoading ? "Ładowanie..." : currentView === "login" ? "Zaloguj się" : "Zarejestruj się"}
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
        </div>
    );
};

export default Login;