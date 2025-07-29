import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
    private authService = new AuthService;

    // Requests
    // Get all users 
    async getAll(req: Request, res: Response) {
        console.log("UserController");
        try {
            const users = await this.authService.getAll();
            res.send({ status: "OK", data: users });
        } catch (error) {
            res.status(500).send({ status: "Failed", message: error });
        }
    };

    // Get one user by the id 
    async getById(req: Request, res: Response) {
        console.log("UserController");
        try {
            const user = await this.authService.getById(Number(req.params.id));
            res.send({ status: "OK", data: user });
        } catch (error) {
            res.status(500).send({ status: "Failed", message: error });
        }
    };

    // Création du premier syndic d'une copro
    async syndicRegister(req: Request, res: Response) {
        console.log('auth controller')
        const {
            residenceName,
            addresses,
            lastName,
            firstName,
            email,
            password,
            phoneNumber,
            age,
            appartmentNumber,
        } = req.body;

        const createSyndic = await this.authService.registerSyndic({
            residenceName,
            addresses,
            lastName,
            firstName,
            email,
            password,
            phoneNumber,
            age,
            appartmentNumber,
        });

        if (createSyndic) {
            res.status(201).json({ message: "Syndic created" });
        } else {
            res.status(500).json({ message: "Failed to create" });
        };
    };




}