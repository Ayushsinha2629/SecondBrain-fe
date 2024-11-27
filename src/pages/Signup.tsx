import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {API_BASE_URL} from "../config";
import { Notification } from "../components/Notification";
import axios from "axios";

export function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      setShowToast(true);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
        await axios.post(`${API_BASE_URL}/api/v1/user/signup`, {
            username: formData.username,
            password: formData.password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      
        setMessage("Signup successful! Redirecting to login...");
        setShowToast(true);
      
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } catch (error: unknown) {
        let errorMessage = "Something went wrong!";
        if (axios.isAxiosError(error)) {
          // Extract error message from Axios response
          errorMessage = error.response?.data?.message || error.message || errorMessage;
        } else if (error instanceof Error) {
          // General JS error fallback
          errorMessage = error.message;
        }
      
        setMessage(errorMessage);
        setShowToast(true);
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <div className="flex flex-col w-1/4">
        <div className="text-center text-2xl font-medium">
          <span>Create your account</span>
        </div>
        <div className="flex flex-col gap-4 w-full mt-5">
          <div>
            <Input
              placeholder="Enter your username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <Input
              placeholder="Enter your password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <Input
              placeholder="Re-Enter your password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              className={`bg-[#7164c0] text-white rounded w-full py-2 ml-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign up"}
            </button>
          </div>
          {message && (
           <Notification message={message} show={showToast} />
          )}
          <div className="flex justify-center gap-1 mt-5 text-sm">
            <span className="text-gray-500">Already have an account?</span>
            <span
              className="text-blue-700 cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              Log in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({
  placeholder,
  name,
  value,
  onChange,
  type = "text",
}: {
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <div>
      <input
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        className="px-4 py-2 border rounded-md m-2 w-full"
        onChange={onChange}
      />
    </div>
  );
}
