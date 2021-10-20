import { Router } from 'express';
const router = Router();

import Routes from "./routes/index.routes"

router.use('/pub/proxy/',Routes);
router.use('/api/proxy/',Routes);

export default router; 