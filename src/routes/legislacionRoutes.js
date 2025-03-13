import express from 'express';
import { proyecto } from "../controllers/sistemasLegislativosController.js";

const router = express.Router();

router.get('/proyecto', proyecto);

export default router;