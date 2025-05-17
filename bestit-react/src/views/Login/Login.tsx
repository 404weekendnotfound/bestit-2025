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

    const handleDemo = async () => {
        setUserData({"first_name":"Marek","last_name":"Kowalski","address":"ul. Polna 12, 00-123 Warszawa","city":"Warszawa","phone":"+48 600 123 456","email":"marek.kowalski@example.com","linkedin":"linkedin.com/in/marekkowalski-bio","date_of_birth":null,"age":null,"work_experience":[{"position":"Senior Biomedical Engineer","company":"MedTech Solutions Sp. z o.o.","start_date":"2017","end_date":null},{"position":"R&D Engineer","company":"BioInnova SA","start_date":"2010","end_date":"2017"},{"position":"Biomedical Engineer","company":"Szpital Kliniczny XYZ","start_date":"2003","end_date":"2010"}],"education":[{"degree":"Doktor nauk technicznych (PhD)","field":"Inżynieria Biomedyczna","institution":"Politechnika Warszawska","graduation_date":"2014"},{"degree":"Magister inżynier","field":"Inżynieria Biomedyczna","institution":"Politechnika Warszawska, Wydział Mechatroniki","graduation_date":"2000"}],"certifications":[{"name":"PMP (Project Management Professional)","issuer":null,"date":"2018"},{"name":"Audytor wewnętrzny ISO 13485","issuer":null,"date":"2016"}],"skills":[{"name":"Projektowanie urządzeń medycznych (CAD, SolidWorks)","level":null},{"name":"Analiza sygnałów biomedycznych (MATLAB, Python)","level":null},{"name":"Regulatory Compliance (ISO 13485, MDR)","level":null},{"name":"Zarządzanie projektami (PMI, Agile)","level":null},{"name":"polski","level":"ojczysty"},{"name":"angielski","level":"C1"},{"name":"niemiecki","level":"B1"}],"interests":["Kolarstwo szosowe","druk 3D","fotografia techniczna"],"companies":[{"name":"MedTech Solutions Sp. z o.o.","website":null,"market_value":null,"revenue":null,"products_services":null},{"name":"BioInnova SA","website":null,"market_value":null,"revenue":null,"products_services":null},{"name":"Szpital Kliniczny XYZ","website":null,"market_value":null,"revenue":null,"products_services":null}],"db_error":"(psycopg2.errors.NotNullViolation) null value in column \"issuer\" of relation \"certificate\" violates not-null constraint\nDETAIL:  Failing row contains (6, PMP (Project Management Professional), null, 2018, 3).\n\n[SQL: INSERT INTO certificate (name, issuer, issue_date, user_id) SELECT p0::VARCHAR, p1::VARCHAR, p2::VARCHAR, p3::INTEGER FROM (VALUES (%(name__0)s, %(issuer__0)s, %(issue_date__0)s, %(user_id__0)s, 0), (%(name__1)s, %(issuer__1)s, %(issue_date__1)s, %(user_id__1)s, 1)) AS imp_sen(p0, p1, p2, p3, sen_counter) ORDER BY sen_counter RETURNING certificate.id, certificate.id AS id__1]\n[parameters: {'user_id__0': 3, 'issuer__0': None, 'name__0': 'PMP (Project Management Professional)', 'issue_date__0': '2018', 'user_id__1': 3, 'issuer__1': None, 'name__1': 'Audytor wewnętrzny ISO 13485', 'issue_date__1': '2016'}]\n(Background on this error at: https://sqlalche.me/e/20/gkpj)"});

        navigate("/dashboard");
    }

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
                    <button className="btn btn-full" style={{marginTop: "12px"}} onClick={handleDemo}>
                        Skorzystaj z demo
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