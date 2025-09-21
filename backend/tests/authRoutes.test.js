const request = require("supertest");
const app = require("../app");
const { User } = require("../../models/user");

// Mock de User
jest.mock("../models/adress", () => ({
  belongsTo: jest.fn(),
}));
jest.mock("../models/Panier", () => ({
  hasOne: jest.fn(),
  belongsTo: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
}));
jest.mock("../models/user", () => ({
  hasMany: jest.fn(),
  hasOne: jest.fn(),
  belongsTo: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
}));
jest.mock("../models/Avis", () => ({
  hasMany: jest.fn(),
  belongsTo: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
}));
describe("Route POST /api/register", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("doit créer un nouvel utilisateur si les données sont valides", async () => {
    // Mock des validations (pas d'erreurs)
    const { validationResult } = require("express-validator");
    validationResult.mockReturnValue({ isEmpty: () => true });

    // Mock de User.findOne (aucun utilisateur existant)
    User.findOne.mockResolvedValue(null);

    // Mock de User.create (simule la création d'un utilisateur)
    const mockNewUser = {
      name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      password: "hashedPassword",
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

    // Envoi de la requête
    const response = await request(app).post("/api/register").send({
      name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      role: "user",
    });

    // Vérifications
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
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

  it("doit retourner une erreur 400 si les données sont invalides", async () => {
    // Mock des validations (erreur de validation)
    const { validationResult } = require("express-validator");
    validationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => [
        { msg: "Email invalide", param: "email", location: "body" },
      ],
    });

    // Envoi de la requête
    const response = await request(app).post("/api/register").send({
      name: "John",
      last_name: "Doe",
      email: "invalid-email",
      password: "password123",
      role: "user",
    });

    // Vérifications
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: [{ msg: "Email invalide", param: "email", location: "body" }],
    });
  });

  it("doit retourner une erreur 400 si l'email est déjà utilisé", async () => {
    // Mock des validations (pas d'erreurs)
    const { validationResult } = require("express-validator");
    validationResult.mockReturnValue({ isEmpty: () => true });

    // Mock de User.findOne (utilisateur existant)
    User.findOne.mockResolvedValue({ email: "john.doe@example.com" });

    // Envoi de la requête
    const response = await request(app).post("/register").send({
      name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      role: "user",
    });

    // Vérifications
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Email est déjà utilisé" });
  });
});
