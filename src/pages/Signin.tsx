import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notification } from "../components/Notification";
import {API_BASE_URL} from "../config";
import axios from "axios";

export function Signin() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
      });

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false)
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };

    const handleSubmit = async () => {
        setLoading(true);
        setMessage("");
        try {
            const response = await axios.post(
              `${API_BASE_URL}/api/v1/user/signin`,
              {
                username: formData.username,
                password: formData.password,
              },
              {
                headers: { "Content-Type": "application/json" },
              }
            );
          
            setMessage("Signin successful! Redirecting to dashboard...");
            setShowToast(true);
          
            const { token, role } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
          
            setTimeout(() => {
                if (role === "admin") {
                    navigate("/admin");
                } else if(role === "user") {
                    navigate("/dashboard");
                }else{
                    navigate("/moderator")
                }
            }, 2000);
          } catch (error: unknown) {
            let errorMessage = "Something went wrong!";
            if (axios.isAxiosError(error)) {
              errorMessage = error.response?.data?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
              errorMessage = error.message;
            }
            setMessage(errorMessage);
            setShowToast(true);
          } finally {
            setLoading(false);
          }
    }

    return <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
        <div className="flex flex-col w-1/4">
            <div className="text-center text-2xl font-medium">
                <span>
                    Sign in your account
                </span>
            </div>
            <div className="flex flex-col gap-4 w-full mt-5">
                <div>
                    <Input name="username" value={formData.username} onChange={handleChange} placeholder="Enter your username" />   
                </div>
                <div>
                    <Input name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" type="password" />   
                </div>
                <div className="flex justify-between text-sm ml-3">
                    <div className="flex gap-2 ">
                        <div>
                            <input type="checkbox" name="" id="" />
                        </div>
                        <div>
                            Remeber Me
                        </div>
                    </div>
                    <span className="text-blue-700 cursor-pointer">
                        Forgot your password?
                    </span>
                </div>
                <div>
                <button
                    className={`bg-[#7164c0] text-white rounded w-full py-2 ml-2 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleSubmit}
                    disabled={loading}
                    >
                {loading ? "Signing In..." : "Sign in"}
                </button>
                {message && (
                <Notification message={message} show={showToast} />
                )}
                </div>
                <div className="flex justify-center gap-1 mt-5 text-sm">
                    <span className="text-gray-500">
                        Don't have an account
                    </span>
                    <button onClick={() => navigate("/signup")} className="text-blue-700">
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    </div>
}

function Input({ placeholder, name, value, onChange, type}: { placeholder: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string;}) {
    return (
      <div>
        <input placeholder={placeholder} name={name} type={type} value={value} className="px-4 py-2 border rounded-md m-2 w-full" onChange={onChange}></input>
      </div>
    );
  }
  