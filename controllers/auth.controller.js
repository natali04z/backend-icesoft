import User, { findOne } from '../models/user';
import { genSalt, hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.SECRET

export async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        // Verificar si el usuario ya existe
        let user = await findOne({ email });
        if (user) return res.status(400).json({ message: "El usuario ya existe" });

        // Encriptar contraseña
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        // Crear usuario
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await findOne({ email });
        if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

        // Verificar contraseña
        const isMatch = await compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

        // Generar token
        const token = sign({ id: user._id }, SECRET, { expiresIn: "1h" });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
}
