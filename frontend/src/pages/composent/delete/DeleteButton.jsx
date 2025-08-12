import axios from "axios";

const handleDeleteAccount = async () => {
  if (!window.confirm("Es-tu sûr de vouloir supprimer ton compte ?")) return;

  try {
    const res = await axios.delete("http://localhost:5000/api/users/profile", {
      withCredentials: true,
    });
    alert(res.data.message);

    window.location.href = "/login";
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la suppression du compte.");
  }
};

<button onClick={handleDeleteAccount} style={{ color: "red" }}>
  Supprimer mon compte
</button>;

export default handleDeleteAccount;
