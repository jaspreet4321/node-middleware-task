import { Router } from 'express';
const router = Router();

import Routes from "./routes/index.routes"

router.use('/pub/proxy/',Routes);

export default router; 