import Layout from "../../components/Layout/Layout"
import { useState } from "react";
import { Link } from "react-router-dom";

const Health: React.FC = () => {
    const [health, setHealth] = useState<any[]>([]);
    const [values, setValues] = useState(['', '', '', '', '']);
    const [error, setError] = useState('');
    const [isClicked, setIsClicked] = useState(false);

    const handleInputChange = (index: number, value: string) => {
        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);
        setError('');
        setIsClicked(false);
    };

    const handleSubmit = () => {
        if (values.some(value => value.trim() === '')) {
            setError('Wszystkie pola muszą być wypełnione!');
            return;
        }
        setError('');
        setIsClicked(true);
    };

    return (
        <Layout>
            <div className="box">
                <h1>Wdzięcznopis</h1>
                {health.map((health) => (
                    <Link to={`/health/${health.id}`} key={health.id}>
                        <h2>{health.first_name} {health.last_name}</h2>
                        <p>{health.email}</p>
                    </Link>
                ))}
                <div className="health-form">
                    {values.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            className="form-input"
                            placeholder="Wpisz wdzięcznopis"
                            value={value}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                    ))}
                    {error && <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>}
                    {isClicked && <div className="success-message">Miłego dnia!</div>}
                    <button 
                        className={`health-btn ${isClicked ? 'clicked' : ''}`} 
                        onClick={handleSubmit}
                    >
                        Zapisz
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default Health;