import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { trans, setLanguage } from "../translations";

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
      <select value={lang} onChange={handleLangChange}>
        <option value="fr">🇫🇷 Français</option>
        <option value="en">🇬🇧 English</option>
      </select>
      <h2>{trans("signup.title")}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={trans("signup.form.name")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder={trans("signup.form.last_name")}
          value={last_name}
          onChange={(e) => setLast_Name(e.target.value)}
          required
        />
        <br />
        <input
          type="email"
          placeholder={trans("signup.form.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder={trans("signup.form.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <input
          type="tel"
          name="phone"
          placeholder={trans("signup.form.phone")}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">{trans("signup.buttons.create")}</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
export default SignUp;
