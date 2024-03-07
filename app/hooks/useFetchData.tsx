import { useEffect, useState } from 'react';
import { token } from '../config';
import Swal from 'sweetalert2';

function useFetchData(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // await new Promise(resolve => setTimeout(resolve, 3000))
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
        // const fetchDataWithDelay = async (delayInMilliseconds) => {
        //     // Așteaptă intervalul specificat înainte de a continua
        //     await new Promise(resolve => setTimeout(resolve, delayInMilliseconds));

        //     // Apelul funcției fetchData
        //     await fetchData();
        // };
        fetchData();
    }, [url]);

    return {
        data,
        loading,
        error,
    };
}

export default useFetchData;

export async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
