import { BASE_URL, token } from "@/app/config";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [currentToken, setCurrentToken] = useState("");

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setCurrentToken(currentToken);
  }, []);
  const params = useParams();
  const id = params.doctorId;

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!rating || !reviewText) {
        setLoading(false);
        // Sweet alert pentru eroare: Rating and reviews Fields are required
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Câmpurile pentru evaluare și recenzii sunt obligatorii!",
          confirmButtonText: "OK",
        });
      }
      const requestBody = { rating, reviewText };
      const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify({ rating, reviewText }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setLoading(false);
      Swal.fire(
        "Felicitări!",
        "Recenzia dumneavoastră a fost trimisă cu succes!",
        "success"
      );

      router.push("/");
    } catch (err) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    }
  };

  return (
    <form action="" onSubmit={handleSubmitReview}>
      <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          Cum ai evalua experiența?
        </h3>

        <div>
          {[...Array(5).keys()].map((_, index) => {
            index += 1;

            return (
              <button
                key={index}
                type="button"
                className={`${
                  index <= ((rating && hover) || hover)
                    ? "text-yellowColor"
                    : "text-gray-400"
                } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setHover(0);
                  setRating(0);
                }}
              >
                <span>
                  <AiFillStar />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-[30px]">
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          Lasă un feedback și o sugestie
        </h3>

        <textarea
          className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
          rows="5"
          placeholder="Scrie mesajul tău"
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>

      <button type="submit" className="btn">
        {loading ? <ClipLoader size={25} color="#fff" /> : "Trimite feedback"}
      </button>
    </form>
  );
}

export default FeedbackForm;
