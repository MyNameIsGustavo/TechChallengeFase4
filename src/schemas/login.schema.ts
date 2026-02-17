import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email obrigatório")
    .email("Email inválido"),

  senha: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
})

export type LoginValidacao = z.infer<typeof loginSchema>