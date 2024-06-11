'use client'
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { RecoveryContext } from "../context/RecoveryContext";
import { useRouter } from 'next/navigation';
import { BASE_URL } from "../config";
import Swal from "sweetalert2";

export default function OTPInput() {
    const { email, otp, setPage } = useContext(RecoveryContext);
    const [timerCount, setTimer] = React.useState(60);
    const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
    const [disable, setDisable] = useState(true);
    const router = useRouter();


    function resendOTP() {
        if (disable) return;

        fetch(`${BASE_URL}/auth/send_recovery_email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                OTP: otp,
                recipient_email: email,
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                setDisable(true);
                Swal.fire({
                    title: 'Success!',
                    text: 'OTP has been resent to your email.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                setTimer(60);
            })
            .catch((err) => {
                console.error(err);
                Swal.fire({
                    title: 'Error!',
                    text: err.message || 'Failed to resend OTP!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }


    function verfiyOTP() {
        if (parseInt(OTPinput.join("")) === otp) {
            router.push('/reset');
            return;
        }
        Swal.fire({
            title: 'Error!',
            text: 'The code you have entered is not correct, try again or re-send the link',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    React.useEffect(() => {
        let interval = setInterval(() => {
            setTimer((lastTimerCount) => {
                lastTimerCount <= 1 && clearInterval(interval);
                if (lastTimerCount <= 1) setDisable(false);
                if (lastTimerCount <= 0) return lastTimerCount;
                return lastTimerCount - 1;
            });
        }, 1000); //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval);
    }, [disable]);

    return (
        <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
            <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Verificare email</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>Ti-am trimis un cod pe email {email}</p>
                        </div>
                    </div>

                    <div>
                        <form>
                            <div className="flex flex-col space-y-16">
                                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                    <div className="w-16 h-16 ">
                                        <input
                                            maxLength="1"
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            name=""
                                            id=""
                                            onChange={(e) =>
                                                setOTPinput([
                                                    e.target.value,
                                                    OTPinput[1],
                                                    OTPinput[2],
                                                    OTPinput[3],
                                                ])
                                            }
                                        ></input>
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input
                                            maxLength="1"
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            name=""
                                            id=""
                                            onChange={(e) =>
                                                setOTPinput([
                                                    OTPinput[0],
                                                    e.target.value,
                                                    OTPinput[2],
                                                    OTPinput[3],
                                                ])
                                            }
                                        ></input>
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input
                                            maxLength="1"
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            name=""
                                            id=""
                                            onChange={(e) =>
                                                setOTPinput([
                                                    OTPinput[0],
                                                    OTPinput[1],
                                                    e.target.value,
                                                    OTPinput[3],
                                                ])
                                            }
                                        ></input>
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input
                                            maxLength="1"
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            name=""
                                            id=""
                                            onChange={(e) =>
                                                setOTPinput([
                                                    OTPinput[0],
                                                    OTPinput[1],
                                                    OTPinput[2],
                                                    e.target.value,
                                                ])
                                            }
                                        ></input>
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <a
                                            onClick={() => verfiyOTP()}
                                            className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                                        >
                                            Verifica cont
                                        </a>
                                    </div>

                                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Nu ai primit codul?</p>{" "}
                                        <a
                                            className="flex flex-row items-center"
                                            style={{
                                                color: disable ? "gray" : "blue",
                                                cursor: disable ? "none" : "pointer",
                                                textDecorationLine: disable ? "none" : "underline",
                                            }}
                                            onClick={() => resendOTP()}
                                        >
                                            {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}