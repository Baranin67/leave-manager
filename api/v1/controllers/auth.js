import knexFn from "knex";
import dbConfig from "../config/database-info.js"; 
import jwt from "jsonwebtoken";
import { SECRET_ACCESS_TOKEN, REFRESH_TOKEN } from '../config/index.js';
import bcrypt from "bcrypt";

const knex = knexFn(dbConfig);


export async function login(req, res) {
    const { email, password } = req.body;
    console.log("New /auth/login request from:", req.socket.remoteAddress, "with req.body", req.body);

    const user = await knex('users').where({ email }).first();

    // Sprawdzenie, czy użytkownik istnieje
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    let isPasswordValid = false;
    // Jeśli hasło w bazie danych jest puste, sprawdzamy, czy użytkownik podał hasło
    if (!user.password) {
        isPasswordValid = true;
    }

    // Jeśli hasło jest ustawione, porównujemy je z hasłem podanym przez użytkownika
    
    if (password) {
        isPasswordValid = await bcrypt.compare(password, user.password);
    }

    // Jeśli hasło jest nieprawidłowe
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generowanie tokenów
    const accessToken = jwt.sign({ id: user.id, email: user.email }, SECRET_ACCESS_TOKEN, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id, email: user.email }, REFRESH_TOKEN, { expiresIn: '7d' });

    // Zapis refreshToken do bazy
    await knex('users').where({ id: user.id }).update({ refreshToken });

    // Wysyłka accessToken w HTTP-Only cookie
    res.cookie('accessToken', accessToken, {
        httpOnly: true, // Uniemożliwia dostęp z JavaScript
        secure: process.env.NODE_ENV === 'production', // HTTPS tylko w produkcji
        sameSite: 'Strict', // Zapobiega atakom CSRF
        maxAge: 15 * 60 * 1000 // 15 minut
    });

    console.log('Client', req.socket.remoteAddress, 'logged to account:', user.email);
    res.json({ message: 'Logged in successfully' });
}


export async function logout(req, res) {
    const userId = req.user.id; // Middleware `authenticate` needs to be prior to logout
    console.log("New /auth/logout request from:", req.socket.remoteAddress, "with id:", userId )

    await knex('users').where({ id: userId }).update({ refreshToken: null });

    // Delete accessToken from cookies
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });

    res.json({ message: 'Logged out successfully' });
}