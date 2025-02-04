import express from 'express';
import {
    autenticar,
    crearUsuario
} from "../controllers/userController.js";
import { verificarToken } from "../middlewares/token.js";

const router = express.Router();

router.post('/auth', autenticar);
router.post('/createUser', crearUsuario)

// Valida la session del usuario con token en cookie
router.get('/authSession', verificarToken)

export default router;