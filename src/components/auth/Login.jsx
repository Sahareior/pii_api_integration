import React, { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/auth.api";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("admin@1source.chat");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await login({ email, password }).unwrap();
      toast.success("Login successful!");
      navigate('/overview');
    } catch (err) {
      toast.error(err?.data?.message || err?.data?.detail || "Login failed. Please check your credentials.");
      console.error("Login error:", err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-black text-white rounded-2xl shadow-2xl p-8 space-y-6">

        {/* Logo */}
        <div className="flex flex-col items-center space-y-4">
          <img
            src="/logo.jpg"
            alt="logo"
            className="w-[13vw] h-[10vh] object-cover"
          />
          <h1 className="text-3xl font-semibold">Welcome Back</h1>
          <p className="text-gray-400 text-sm">
            Sign in to your admin account
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">
              Email Address
            </label>
            <div className="mt-1 flex items-center border border-gray-600 rounded-lg px-3 py-2 bg-black">
              <FiMail className="text-white mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">
              Password
            </label>
            <div className="mt-1 flex items-center border border-gray-600 rounded-lg px-3 py-2 bg-black">
              <FiLock className="text-white mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEyeOff className="text-gray-400" />
                ) : (
                  <FiEye className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="accent-white"
            />
            <span>Remember me</span>
          </div>

          {/* Sign In Button */}
          <button 
            onClick={handleLogin} 
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-gray-300 to-gray-400 text-black font-medium hover:opacity-90 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></span>
            ) : (
                <>
                    <FiLogIn />
                    Sign In
                </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
