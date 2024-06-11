import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function useFetchData(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) return; // Așteaptă până când token-ul este disponibil

            setLoading(true);
            try {
                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const result = await res.json();

                if (!res.ok) {
                    throw new Error(result.message);
                }

                setData(result.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message);
            }
        };

        fetchData();
    }, [url, token]);

    return {
        data,
        loading,
        error,
    };
}

export default useFetchData;
