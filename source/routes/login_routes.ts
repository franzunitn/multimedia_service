/** source/routes/recombeeRoutes.ts */
import express from 'express';
import controller from '../controllers/multimedia_controller';
const login_router = express.Router();

//registra un utente su loginsystem e recombee
login_router.post('/register', controller.register);
//logga un utente
login_router.post('/login', controller.login);

export = login_router;