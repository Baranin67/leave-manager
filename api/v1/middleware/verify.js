import jwt from "jsonwebtoken";
import { SECRET_ACCESS_TOKEN, REFRESH_TOKEN } from '../config/index.js';
import knexFn from "knex";
import dbConfig from "../config/database-info.js"; 

const knex = knexFn(dbConfig);

export function authenticate(refreshAuth) {
    return async (req, res, next) => {
        let token = req.cookies.accessToken;

        if (!token) return res.status(401).json({ error: 'No token provided' });

        try {
            // Próbujemy zweryfikować accessToken
            const decoded = jwt.verify(token, ACCESS_SECRET);
            const user = await knex('users').where({ id: decoded.id }).first();

            if (!user) return res.status(401).json({ error: 'Unauthorized' });

            req.user = user;
            return next();

        } catch (err) {
            // Access token wygasł lub nieprawidłowy
            console.log('Access token for client', req.socket.remoteAddress, 'is expired or invalid, trying refresh...');
            
                try {
                    // Spróbuj użyć refreshToken z bazy
                    const decoded = jwt.decode(token); // Bierzemy user.id z wygasłego tokena
                    if (!decoded?.id) throw new Error('Invalid token');

                    const user = await knex('users').where({ id: decoded.id }).first();
                    if (!user || !user.refreshToken) return res.status(401).json({ error: 'Unauthorized' });

                    // Weryfikacja refresh tokena
                    jwt.verify(user.refreshToken, REFRESH_TOKEN);

                    // Wygeneruj nowy access token
                    const newAccessToken = jwt.sign({ id: user.id, email: user.email }, SECRET_ACCESS_TOKEN, { expiresIn: '15m' });

                    // Wygeneruj nowy refreshToken
                    const newRefreshToken = jwt.sign({ id: user.id, email: user.email }, REFRESH_TOKEN, { expiresIn: '60d' });

                    // Zapisz nowy refreshToken w bazie danych
                    await knex('users').where({ id: user.id }).update({ refreshToken: newRefreshToken });

                    // Zapisz usera do req i odśwież cookie z access tokenem
                    req.user = user;
                    res.cookie('accessToken', newAccessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'Strict',
                        maxAge: 15 * 60 * 1000 // 15 minut
                    });

                    // Nie zapisujemy refreshToken w cookies, przechowujemy go tylko w bazie danych
                    console.log('Access token refreshed for client', req.socket.remoteAddress, 'logged to user:', user.email);
                    return next();

            } catch (refreshError) {
                console.log('Refresh token invalid:', refreshError.message);
                return res.status(401).json({ error: 'Invalid or expired token' });
            }
        }
    };
}