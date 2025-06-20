import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Globe } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    keepSignedIn: false,
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Signup successful!", {
        position: "top-right",
        autoClose: 2000,
      });

      navigate("/login");

      console.log("API response:", response.data);
    } catch (error: any) {
      console.error("Signup error:", error.response?.data || error.message);
      toast.error(
        `Signup failed: ${error.response?.data?.message || "Server error"}`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-100 px-6 py-12">
      <motion.div
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Branding */}
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center space-x-2">
            <Globe className="h-6 w-6 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">
              Globetripster
            </span>
          </Link>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {/* 👁️ Placeholder for eye icon */}
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7
                  -1.274 4.057-5.064 7-9.542 7
                  -4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>

          <div className="flex items-center">
            <input
              id="keepSignedIn"
              type="checkbox"
              name="keepSignedIn"
              checked={formData.keepSignedIn}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="keepSignedIn"
              className="ml-2 text-sm text-gray-400"
            >
              Keep me signed in
            </label>
          </div>

          <p className="text-xs text-gray-500">
            This keeps you signed in on this device. Avoid on shared devices.
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition-all duration-200 shadow-md"
          >
            Sign Up
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          By signing up, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms
          </a>
          ,{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy
          </a>
          , and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Rewards
          </a>
          .
        </p>

        <div className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
