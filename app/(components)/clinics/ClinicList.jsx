import React, { useEffect, useState } from "react";
import { BASE_URL } from "@/app/config";
import Loading from "@/app/loading";
import Error from "@/app/error/Error";
import ClinicCard from "./ClinicCard";

function ClinicList({ query, currentPage, perPage, setTotalPages }) {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${BASE_URL}/clinics?query=${query}&page=${currentPage}&perPage=${perPage}`
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }
        setClinics(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, currentPage, perPage, setTotalPages]);
  if (loading) return <Loading />;
  if (error) return <Error errMessage={"Erroare"} />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 ">
      {clinics.map((clinic) => (
        <ClinicCard key={clinic._id} clinic={clinic} />
      ))}
    </div>
  );
}

export default ClinicList;
