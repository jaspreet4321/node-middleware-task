import { Router } from 'express';
const router = Router();

import { addUser, fetchUser } from './controller';

router.post('/save/:id', addUser);
router.get('/save/:id', fetchUser);

export default router; 