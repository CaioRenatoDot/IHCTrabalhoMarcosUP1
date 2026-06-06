import { Router } from 'express'
import { issueCsrfToken } from '../middleware/csrf.js'

export const securityRouter = Router()

securityRouter.get('/csrf', issueCsrfToken)
