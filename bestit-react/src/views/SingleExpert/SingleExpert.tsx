import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout"
import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../../api/axios";


const SingleExpert: React.FC = () => {
    const { id } = useParams();
    const [expert, setExpert] = useState<any>(null);

    useEffect(() => {
        axiosInstance.get(`/users/${id}`).then((res) => {
            setExpert(res.data);
        });
    }, [id]);

    return (
        <Layout>
            {expert ? <div className="box">
                
                <h1>{expert.first_name || ''} {expert.last_name || ''}</h1>
                <p>{expert.email || ''}</p>
                <p>{expert.phone || ''}</p>
                <p>{expert.city || ''}</p>
                <p>{expert.country || ''}</p>
                <p>{expert.description || ''}</p>
                <p>{expert.skills || ''}</p>

                <button className="btn btn-primary">Umów spotkanie</button>
                
            </div> : <div className="box">
                <h1>Expert not found</h1>
            </div>}
        </Layout>
    )
}

export default SingleExpert;