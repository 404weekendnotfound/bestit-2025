import Layout from "../../components/Layout/Layout"
import axiosInstance from "../../api/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Experts.scss';
import { API_URL } from "../../api/axios";

interface Expert {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

const Experts: React.FC = () => {
    const [experts, setExperts] = useState<Expert[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchExperts = async () => {
            try {
                console.log('Using API URL:', API_URL);
                setLoading(true);
                const response = await axiosInstance.get('/users/');
                console.log('Response:', response.data);
                // Ensure we're getting an array and it has the correct shape
                if (Array.isArray(response.data)) {
                    setExperts(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                    setError('Nieprawidłowy format danych z serwera');
                }
            } catch (err) {
                console.error('Error fetching experts:', err);
                setError('Nie udało się pobrać listy ekspertów');
            } finally {
                setLoading(false);
            }
        };

        fetchExperts();
    }, []);

    return (
        <Layout>
            <div className="box">
                <h1>Experts</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : experts.length > 0 ? (
                    <div className="experts-grid">
                        {experts.map((expert) => (
                            <Link 
                                to={`/experts/${expert.id}`} 
                                key={expert.id}
                                className="expert-card"
                            >
                                <h2>{expert.first_name} {expert.last_name}</h2>
                                <p>{expert.email}</p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p>No experts found</p>
                )}
            </div>
        </Layout>
    );
};

export default Experts;