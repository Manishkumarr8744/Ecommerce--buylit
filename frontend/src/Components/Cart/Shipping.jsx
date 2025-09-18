import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";
import { saveshippingInfo } from "../../Reducer/CartReducer/cartAction";
import MetaData from "../Layouts/MetaData";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [pincode, setPinCode] = useState(shippingInfo.pincode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(saveshippingInfo({ address, city, state, country, pincode, phoneNo }));

    navigate("/process/payment");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-12">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <MetaData title={`Shipping`} />

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🛒 Shipping Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Address */}
          <div>
            <label className="block text-gray-700 mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 mb-1">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Country Dropdown */}
          <div>
            <label className="block text-gray-700 mb-1">Country</label>
            <select
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setState(""); // Reset state when country changes
              }}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              required
            >
              <option value="">Select Country</option>
              {Country.getAllCountries().map((c) => (
                <option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* State Dropdown */}
          <div>
            <label className="block text-gray-700 mb-1">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              required
              disabled={!country}
            >
              <option value="">Select State</option>
              {country &&
                State.getStatesOfCountry(country).map((s) => (
                  <option key={s.isoCode} value={s.isoCode}>
                    {s.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-gray-700 mb-1">Pincode</label>
            <input
              type="number"
              value={pincode}
              onChange={(e) => setPinCode(e.target.value)}
              placeholder="Enter your pincode"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-medium hover:scale-105 transition-transform"
          >
            Continue to Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
