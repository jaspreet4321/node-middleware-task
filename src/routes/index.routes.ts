import { Router } from 'express';
const router = Router();

import { addUser , fetchUser } from '../controllers/index.controller';

router.route('/user')
.get(fetchUser)
.post(addUser);

export default router; 