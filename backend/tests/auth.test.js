const authController = require("../controllers/authController");
const User = require("../models/user");
const httpMocks = require("node-mocks-http");

// Mock de User
jest.mock("../models/user");

describe("Contrôleur d'inscription", () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.error.mockRestore();
  });

  it("doit créer un nouvel utilisateur avec succès", async () => {
    // Simulation de la requête
    req.body = {
      name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      role: "user",
    };

    // Mock de User.findOne (aucun utilisateur existant)
    User.findOne.mockResolvedValue(null);

    // Mock de User.create (simule la création d'un utilisateur)
    const mockNewUser = {
      name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      password: "hashedPassword", // Le mot de passe est déjà haché par le hook beforeCreate
      phone: null,
      role: "user",
      toJSON: () => ({
        name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        phone: null,
        role: "user",
      }),
    };
    User.create.mockResolvedValue(mockNewUser);

    // Appel du contrôleur
    await authController.registerUser(req, res);

    // Vérifications
    expect(User.findOne).toHaveBeenCalledWith({
      where: { email: "john.doe@example.com" },
    });
    expect(User.create).toHaveBeenCalledWith({
      name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      password: "password123", // Le mot de passe non haché est passé à User.create
      phone: null,
      role: "user",
    });
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toEqual({
      message: "Utilisateur crée avec succès",
      user: {
        name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        phone: null,
        role: "user",
      },
    });
  });

  it("doit retourner une erreur si l'email est déjà utilisé", async () => {
    // Simulation de la requête
    req.body = {
      name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      role: "user",
    };

    // Mock de User.findOne (utilisateur existant)
    User.findOne.mockResolvedValue({ email: "john.doe@example.com" });

    // Appel du contrôleur
    await authController.registerUser(req, res);

    // Vérifications
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({ error: "Email est déjà utilisé" });
  });

  it("doit retourner une erreur en cas d'erreur serveur", async () => {
    // Simulation de la requête
    req.body = {
      name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      role: "user",
    };

    // Mock de User.findOne (erreur simulée)
    User.findOne.mockRejectedValue(new Error("Erreur de base de données"));

    // Appel du contrôleur
    await authController.registerUser(req, res);

    // Vérifications
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({ error: "erreur serveur" });
  });
});
