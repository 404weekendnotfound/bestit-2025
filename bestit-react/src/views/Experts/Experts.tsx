import Layout from "../../components/Layout/Layout"
import axiosInstance from "../../api/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Experts: React.FC = () => {
    const [experts, setExperts] = useState<any[]>([]);


    useEffect(() => {
        axiosInstance.get('/users').then((res) => {
            if(res.data.length > 0) {
                setExperts(res.data);
            }
        });
    }, []);

    return (
        <Layout>
            <div className="box">
                <h1>Experts</h1>
                {experts && experts?.length > 0 ? experts.map((expert) => (
                    <Link to={`/experts/${expert.id}`} key={expert.id}>
                        <h2>{expert.first_name} {expert.last_name}</h2>
                        <p>{expert.email}</p>
                    </Link>
                )) : <p>No experts found</p>}
            </div>
        </Layout>
    )
}

export default Experts;