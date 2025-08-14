import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    keepLoggedIn: false
  });

  // Load saved credentials on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");
    const savedKeep = localStorage.getItem("keepLoggedIn") === "true";

    if (savedEmail && savedPassword) {
      setSignInData({
        email: savedEmail,
        password: savedPassword,
        keepLoggedIn: savedKeep
      });
    }
  }, []);

  // Handles input changes
  const handleSignInChange = (e) => {
    const { id, value, type, checked } = e.target;
    setSignInData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value
    }));
    if (error) setError("");
  };

  // Handle form submit
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    console.log("Saving credentials:", signInData);

    // Always save credentials to localStorage
    if (signInData.keepLoggedIn) {
      localStorage.setItem("userEmail", signInData.email);
      localStorage.setItem("userPassword", signInData.password);
      localStorage.setItem("keepLoggedIn", "true");
    } else {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userPassword");
      localStorage.setItem("keepLoggedIn", "false");
    }

    // Store dummy user info for dashboard
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ email: signInData.email, name: "User" })
    );
    localStorage.setItem("isAuthenticated", "true");

    setTimeout(() => {
      setIsLoading(false);
      navigate("/admin/default"); // Go to dashboard
    }, 500);
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        {/* Header */}
        <div className="mb-8 text-center">
          <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
            Sign In
          </h4>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Enter your email and password to sign in!
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 w-full rounded-lg bg-red-50 border border-red-200 p-3 dark:bg-red-900/20 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Google Auth Button */}
        <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer hover:bg-gray-100 transition-colors dark:bg-navy-800 dark:hover:bg-navy-700">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </h5>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSignInSubmit} className="w-full">
          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="mail@example.com"
            id="email"
            type="email"
            value={signInData.email}
            onChange={handleSignInChange}
            required
          />
          {/* Password */}
          <div className="relative mb-3">
            <InputField
              variant="auth"
              label="Password*"
              placeholder="Min. 8 characters"
              id="password"
              type={showPassword ? "text" : "password"}
              value={signInData.password}
              onChange={handleSignInChange}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <MdVisibilityOff size={20} />
              ) : (
                <MdVisibility size={20} />
              )}
            </button>
          </div>

          {/* Checkbox */}
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox
                id="keepLoggedIn"
                checked={signInData.keepLoggedIn}
                onChange={handleSignInChange}
              />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged In
              </p>
            </div>
            <button
              type="button"
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`linear mt-2 w-full rounded-xl py-[12px] text-base font-medium text-white transition duration-200 
              ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed dark:bg-gray-600"
                  : "bg-brand-500 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
              }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing In...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
