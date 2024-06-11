import React from 'react'

function FormateDate(dateString) {

    const date = new Date(dateString);
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };
    // Extrage componentele datei folosind locale-ul ro-RO pentru a te asigura că luna este în formatul corect
    const day = date.toLocaleDateString("ro-RO", { day: "2-digit" });
    const month = date.toLocaleDateString("ro-RO", { month: "long" });
    const year = date.toLocaleDateString("ro-RO", { year: "numeric" });

    // Construiește și returnează șirul de caractere al datei în formatul dorit
    return `${day} ${month}, ${year}`;
};

export default FormateDate