import { createSupabaseServerClient } from '../lib/supabase.js'

export async function requireAuthSession(req, res, next) {
  try {
    const supabase = createSupabaseServerClient(req, res)
    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
      return res.status(401).json({
        ok: false,
        error: 'É necessário estar autenticado para enviar uma avaliação',
      })
    }

    req.authUser = data.user
    return next()
  } catch (error) {
    return res.status(503).json({
      ok: false,
      error: error?.message || 'Não foi possível validar a sessão',
    })
  }
}
