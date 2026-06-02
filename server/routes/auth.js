import { Router } from 'express'
import bcrypt from 'bcryptjs'
import db from '../db.js'
import { config } from '../config.js'
import { authenticate } from '../middleware/auth.js'
import { AppError } from '../utils/errors.js'
import { signToken } from '../utils/jwt.js'
import { loginSchema, parseBody, registerSchema, updateProfileSchema } from '../validators/schemas.js'

const router = Router()

function formatUser(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function findUserByEmail(email) {
  return db
    .prepare('SELECT id, name, email, password_hash, created_at, updated_at FROM users WHERE email = ?')
    .get(email.trim().toLowerCase())
}

function findUserById(id) {
  return db
    .prepare('SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?')
    .get(id)
}

router.post('/register', (req, res, next) => {
  try {
    const parsed = parseBody(registerSchema, req.body)

    if (!parsed.success) {
      throw new AppError(400, 'Dados de cadastro inválidos.', parsed.details)
    }

    const { name, email, password } = parsed.data
    const normalizedEmail = email.toLowerCase()

    if (findUserByEmail(normalizedEmail)) {
      throw new AppError(409, 'E-mail já cadastrado.')
    }

    const passwordHash = bcrypt.hashSync(password, config.bcryptRounds)

    const result = db
      .prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)')
      .run(name, normalizedEmail, passwordHash)

    const user = findUserById(result.lastInsertRowid)
    const token = signToken({ sub: user.id, email: user.email })

    return res.status(201).json({
      success: true,
      data: {
        user: formatUser(user),
        token,
      },
    })
  } catch (error) {
    return next(error)
  }
})

router.post('/login', (req, res, next) => {
  try {
    const parsed = parseBody(loginSchema, req.body)

    if (!parsed.success) {
      throw new AppError(400, 'Dados de login inválidos.', parsed.details)
    }

    const { email, password } = parsed.data
    const user = findUserByEmail(email)

    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      throw new AppError(401, 'E-mail ou senha incorretos.')
    }

    const token = signToken({ sub: user.id, email: user.email })

    return res.json({
      success: true,
      data: {
        user: formatUser(user),
        token,
      },
    })
  } catch (error) {
    return next(error)
  }
})

router.get('/profile', authenticate, (req, res, next) => {
  try {
    const user = findUserById(req.user.id)

    if (!user) {
      throw new AppError(404, 'Usuário não encontrado.')
    }

    return res.json({
      success: true,
      data: { user: formatUser(user) },
    })
  } catch (error) {
    return next(error)
  }
})

router.put('/profile', authenticate, (req, res, next) => {
  try {
    const parsed = parseBody(updateProfileSchema, req.body)

    if (!parsed.success) {
      throw new AppError(400, 'Dados de perfil inválidos.', parsed.details)
    }

    const current = findUserById(req.user.id)

    if (!current) {
      throw new AppError(404, 'Usuário não encontrado.')
    }

    const nextName = parsed.data.name ?? current.name
    const nextEmail = parsed.data.email?.toLowerCase() ?? current.email

    if (nextEmail !== current.email) {
      const existing = findUserByEmail(nextEmail)

      if (existing && existing.id !== current.id) {
        throw new AppError(409, 'E-mail já está em uso por outra conta.')
      }
    }

    db.prepare(
      `UPDATE users
       SET name = ?, email = ?, updated_at = datetime('now')
       WHERE id = ?`,
    ).run(nextName, nextEmail, current.id)

    const updated = findUserById(current.id)

    return res.json({
      success: true,
      data: { user: formatUser(updated) },
    })
  } catch (error) {
    return next(error)
  }
})

export default router
