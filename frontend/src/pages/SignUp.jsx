import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { trans, setLanguage } from "../translations";
import Footer from "./composent/Footer";
import HeaderPage from "./composent/Header_page";
const SignUp = () => {
  const [name, setName] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [lang, setLang] = useState("fr");
  const [error, setError] = useState("");
  const navigate = useNavigate("");

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    setLanguage(newLang);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = axios.post("http://localhost:5000/api/register", {
        name,
        last_name,
        email,
        password,
        phone,
      });
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      setError("Erreur losr de l'inscritption. vérifie les champs");
    }
  };

  return (
    <div>
      <HeaderPage></HeaderPage>

      <main className="flex flex-1 bg-gray-50">
        {/* Left image section */}
        <div className="flex-1 flex items-center justify-center p-10">
          <img
            src="/path-to-your-image.png"
            alt="Shopping and mobile"
            className="max-w-full max-h-[500px]"
          />
        </div>

        <div className="w-1/3 bg-white p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6">
            {trans("signup.title")}
          </h2>
          <p className="mb-4">Enter your details below</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={trans("signup.form.name")}
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br />
            <input
              type="text"
              placeholder={trans("signup.form.last_name")}
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={last_name}
              onChange={(e) => setLast_Name(e.target.value)}
              required
            />
            <br />
            <input
              type="email"
              placeholder={trans("signup.form.email")}
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <input
              type="password"
              placeholder={trans("signup.form.password")}
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <input
              type="tel"
              name="phone"
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder={trans("signup.form.phone")}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              className="w-full bg-red-500 text-white rounded py-2 hover:bg-red-600 transition"
              type="submit"
            >
              {trans("signup.buttons.create")}
            </button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <button className="mt-4 w-full border border-gray-300 rounded py-2 flex justify-center items-center space-x-2 hover:bg-gray-100 transition">
            <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
            <span>Sign up with Google</span>
          </button>
          <p className="mt-6 text-center text-gray-600">
            Already have account?{" "}
            <a href="/login" className="text-red-500 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};
export default SignUp;
