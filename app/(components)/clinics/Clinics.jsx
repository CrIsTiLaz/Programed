"use client"; // top to the file
import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import ClinicList from "./ClinicList";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { motion } from "framer-motion";

function Clinics() {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 3;

  const handleSearch = () => {
    const sanitizedQuery = query.trim();
    if (/^[a-zA-Z0-9\s]+$/.test(sanitizedQuery)) {
      setQuery(sanitizedQuery);
    } else {
      console.error("Query invalid!");
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <section>
        <div className="container text-center mt-[-30px]">
          <h2 className="heading">Gaseste un cabinet</h2>

          <div className="max-w-[570px] mt-[10px] mx-auto bg-[#0066ff2c] flex items-center justify-center rounded-[50px] relative">
            <input
              type="search"
              className="py-4 pl-12 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor rounded-l-[50px]"
              placeholder="Cauta dupa nume / specializare"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="bg-[#0066ff58] py-[15px] px-[35px] text-white font-[600] rounded-r-[50px]"
              onClick={handleSearch}
            >
              <BiSearch size={30} />
            </button>
          </div>

          <section>
            <div className="container">
              <ClinicList
                query={debounceQuery}
                currentPage={currentPage}
                perPage={perPage}
                setTotalPages={setTotalPages}
              />
              <div className="flex justify-center items-center mt-8">
                <div className="flex gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={
                      currentPage === 1 ? "opacity-60  text-white" : ""
                    }
                  >
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <AiOutlineArrowLeft className="inline-block mr-2" />{" "}
                      Înapoi
                    </motion.div>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={
                          currentPage === page
                            ? "bg-gray-100 rounded px-4 py-2"
                            : ""
                        }
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={
                      currentPage === totalPages ? "opacity-60  text-white" : ""
                    }
                  >
                    <motion.div whileHover={{ scale: 1.1 }}>
                      Înainte
                      <AiOutlineArrowRight className="inline-block ml-2" />
                    </motion.div>
                  </button>
                </div>
              </div>
              <div className="spinner-container mt-[-50px]">
                {/* Spinner Component */}
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default Clinics;
