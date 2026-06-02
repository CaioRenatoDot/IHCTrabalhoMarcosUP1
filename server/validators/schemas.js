import { z } from 'zod'

const emailSchema = z
  .string({ required_error: 'E-mail é obrigatório.' })
  .trim()
  .email('Informe um e-mail válido.')
  .max(255)

const passwordSchema = z
  .string({ required_error: 'Senha é obrigatória.' })
  .min(8, 'A senha deve ter no mínimo 8 caracteres.')
  .max(128, 'A senha deve ter no máximo 128 caracteres.')

export const registerSchema = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório.' })
    .trim()
    .min(2, 'Nome deve ter ao menos 2 caracteres.')
    .max(120),
  email: emailSchema,
  password: passwordSchema,
})

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string({ required_error: 'Senha é obrigatória.' }).min(1, 'Senha é obrigatória.'),
})

export const updateProfileSchema = z
  .object({
    name: z.string().trim().min(2).max(120).optional(),
    email: emailSchema.optional(),
  })
  .refine((data) => data.name !== undefined || data.email !== undefined, {
    message: 'Informe ao menos um campo para atualizar (name ou email).',
  })

const answerSchema = z.object({
  questionId: z
    .string({ required_error: 'questionId é obrigatório.' })
    .trim()
    .min(1)
    .max(80),
  value: z.union([z.string(), z.number(), z.boolean()]),
})

export const questionnaireSchema = z.object({
  answers: z
    .array(answerSchema, { required_error: 'answers é obrigatório.' })
    .min(1, 'Informe ao menos uma resposta.')
    .max(50, 'Máximo de 50 respostas por envio.'),
})

export const evaluationSchema = z
  .object({
    questionnaireResponseId: z.number().int().positive().optional(),
    answers: z.array(answerSchema).min(1).max(50).optional(),
  })
  .refine((data) => data.questionnaireResponseId || (data.answers && data.answers.length > 0), {
    message: 'Informe questionnaireResponseId ou answers para gerar a avaliação.',
  })

export function parseBody(schema, body) {
  const result = schema.safeParse(body)

  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      field: issue.path.join('.') || 'body',
      message: issue.message,
    }))

    return { success: false, details }
  }

  return { success: true, data: result.data }
}
