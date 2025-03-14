import express from 'express';
import {
    proyecto,
    ley,
    parlamentario,
    comisiones,
    sesiones,
    periodos
} from "../controllers/sistemasLegislativosController.js";

const router = express.Router();

router.get('/proyecto', proyecto);
router.get('/ley', ley);
router.get('/parlamentario', parlamentario);
router.get('/comisiones', comisiones);
router.get('/sesiones', sesiones);
router.get('/periodos', periodos);

export default router;