import Layout from "../../components/Layout/Layout"
import axiosInstance from "../../api/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Experts: React.FC = () => {
    const [experts, setExperts] = useState<any[]>([]);


    useEffect(() => {
        axiosInstance.get('/users').then((res) => {
            setExperts(res.data);
        });
    }, []);

    return (
        <Layout>
            <div className="box">
                <h1>Experts</h1>
                {experts.map((expert) => (
                    <Link to={`/experts/${expert.id}`} key={expert.id}>
                        <h2>{expert.first_name} {expert.last_name}</h2>
                        <p>{expert.email}</p>
                    </Link>
                ))}
            </div>
        </Layout>
    )
}

export default Experts;