import React, { useContext, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";

const Profile = () => {
  const { user, deleteAccount } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    address: user?.address || "",
    phone: user?.phone || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  if (!user) return <p>Chargement du Profile...</p>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis :", formData);
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-1/4 p-6 border-r bg-white">
        <h3 className="text-lg font-semibold mb-4">Manage My Account</h3>
        <ul className="space-y-3">
          <li className="text-red-500 font-medium cursor-pointer">
            My Profile
          </li>
          <li className="text-gray-700 cursor-pointer">Address Book</li>
          <li className="text-gray-700 cursor-pointer">My Payment Options</li>
        </ul>

        <h3 className="text-lg font-semibold mt-6 mb-4">My Orders</h3>
        <ul className="space-y-3">
          <li className="text-gray-700 cursor-pointer">My Returns</li>
          <li className="text-gray-700 cursor-pointer">My Cancellations</li>
        </ul>

        <h3 className="text-lg font-semibold mt-6 mb-4">My Wishlist</h3>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-2xl font-semibold mb-6">Edit Your Profile</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-xl p-6 w-full max-w-2xl"
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium">phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Password Section */}
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-6 space-x-3">
            <button
              type="button"
              className="px-4 py-2 border rounded-lg"
              onClick={() =>
                setFormData({
                  ...formData,
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                })
              }
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Save Changes
            </button>
          </div>

          {/* Delete account */}
          <div className="mt-6">
            <button
              type="button"
              onClick={deleteAccount}
              className="text-sm text-red-500 underline"
            >
              Supprimer mon compte
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Profile;
