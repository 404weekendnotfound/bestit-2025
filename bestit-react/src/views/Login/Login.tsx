import { useState } from "react";
import "./Login.scss";
import axiosInstance from "../../api/axios";

const Login = () => {
    const [currentView, setCurrentView] = useState<"login" | "register">("login");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        repeatPassword: "",
    });

    const handleRegister = () => {
        if (formData.password !== formData.repeatPassword) {
            alert("Hasła nie pasują do siebie");
            return;
        }

        axiosInstance.post("/auth/register", {
            email: formData.email,
            password: formData.password
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
        

    }

    const handleLogin = () => {
        console.log(formData);
    }
    
    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Login</h1>
                <form action="">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" id="email" name="email" className="form-input" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" name="password" className="form-input" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    </div>
                    {currentView == "register" && (
                        <div className="form-group">
                            <label htmlFor="repeatPassword" className="form-label">Repeat Password</label>
                            <input type="password" id="repeatPassword" name="repeatPassword" className="form-input" value={formData.repeatPassword} onChange={(e) => setFormData({ ...formData, repeatPassword: e.target.value })} />
                        </div>
                    )}
                    <button type="submit" className="btn btn-full">{currentView == "login" ? "Login" : "Register"}</button>
                </form>
                {currentView == "login" ?
                    <p style={{textAlign: "center"}}>Jeżeli nie masz jeszcze konta, <span onClick={() => setCurrentView("register")}>zarejestruj się</span></p>
                :
                    <p style={{textAlign: "center"}}>Masz już konto? <span onClick={() => setCurrentView("login")}>Zaloguj się</span></p>
                }
            </div>
        </div>
    );
};

export default Login;