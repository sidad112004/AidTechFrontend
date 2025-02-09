import React, { useState } from "react";

function Signin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }
    setError("");
    console.log("User Signed In:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="card w-96 shadow-2xl p-8 rounded-xl animate-fade-in bg-gray-800 border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white">Sign In</h2>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="text-gray-300">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="text-gray-300">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary w-full mt-6 bg-blue-600 hover:bg-blue-700 border-0">
            Sign In
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-400">
          Don't have an account?{" "}
          <a className="text-blue-400 hover:underline" href="#">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signin;
