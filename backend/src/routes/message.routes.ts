// src/routes/message.routes.ts
import { Router } from 'express'
import { send, inbox, conversation } from '../controllers/message.controller'
import { protect } from '../middleware/auth.middleware'

const router = Router()

router.use(protect)

router.post('/', send)
router.get('/inbox', inbox)
router.get('/conversation/:userId', conversation)

export default router
