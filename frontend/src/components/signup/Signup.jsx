import React, { useState } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { Link } from "react-router";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: null, // Will store the location object: { lat, lng }
  });
  const [error, setError] = useState("");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [marker, setMarker] = useState(null);

  // Handle regular input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // When user clicks on the map, record the clicked coordinates
  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarker({ lat, lng });
  };

  // When the user confirms their location from the map
  const handleMapConfirm = () => {
    if (!marker) {
      setError("Please select a location on the map.");
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      location: marker,
    }));
    setIsMapModalOpen(false);
    setError("");
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, phone, location } = formData;
    if (!name || !email || !password || !phone || !location) {
      setError("All fields are required!");
      return;
    }
    setError("");
    // Process the form data (e.g., send it to an API)
    console.log("User Signed Up:", formData);
    // Optionally reset the form after submission:
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      location: null,
    });
    setMarker(null);
  };

  // Map container style and default center (you can adjust these as needed)
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 28.644800, 
    lng: 77.216721,
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="card w-96 shadow-2xl p-8 rounded-xl animate-fade-in bg-gray-800 border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white">Sign Up</h2>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        <form className="mt-6" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="text-gray-300">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              className="input input-bordered w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-control mt-4">
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
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="text-gray-300">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className="input input-bordered w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone Field */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="text-gray-300">Phone</span>
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              className="input input-bordered w-full bg-gray-700 text-white border-gray-600 focus:border-blue-500"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Location Field */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="text-gray-300">Location</span>
            </label>
            {formData.location ? (
              <div className="text-white">
                Selected Location: <br />
                Latitude: {formData.location.lat.toFixed(4)}, Longitude: {formData.location.lng.toFixed(4)}
              </div>
            ) : (
              <div className="text-gray-400">No location selected</div>
            )}
            <button
              type="button"
              onClick={() => setIsMapModalOpen(true)}
              className="btn btn-secondary mt-2"
            >
              Select Location
            </button>
          </div>

          <button className="btn btn-primary w-full mt-6 bg-blue-600 hover:bg-blue-700 border-0">
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-400">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-400 hover:underline" href="#">
            Sign In
          </Link>
        </p>
      </div>

      {/* Map Modal */}
      {isMapModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-4 rounded-lg relative w-11/12 md:w-3/4 lg:w-1/2">
            <h2 className="text-xl font-bold text-white mb-4">Select Your Location</h2>
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_API_KEY">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onClick={handleMapClick}
              >
                {marker && <Marker position={marker} />}
              </GoogleMap>
            </LoadScript>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setIsMapModalOpen(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleMapConfirm}
                className="btn btn-primary"
              >
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
