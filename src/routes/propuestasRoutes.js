import express from 'express';
import {
    obtenerPropuesta,
    crearPropuesta, obtenerPropuestasUsuario
} from "../controllers/propuestasRoutes.js";
import { verificarToken } from "../middlewares/token.js";

const router = express.Router();

router.get('/getProposals', obtenerPropuesta);
router.get('/getProposalsUser/:id', obtenerPropuestasUsuario);
router.post('/createProposal', verificarToken, crearPropuesta)

export default router;