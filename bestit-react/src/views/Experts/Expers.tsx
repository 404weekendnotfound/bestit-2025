import Layout from "../../components/Layout/Layout"
import axiosInstance from "../../api/axios";
import { useEffect, useState } from "react";

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
            </div>
        </Layout>
    )
}

export default Experts;