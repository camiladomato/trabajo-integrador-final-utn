const { z } = require('zod');


const registerSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'El nombre es obligatorio' }).min(3, 'El nombre debe tener al menos 3 caracteres'),
    email: z.string({ required_error: 'El email es obligatorio' }).email('El formato del email es inválido'),
    password: z.string({ required_error: 'La contraseña es obligatoria' }).min(6, 'La contraseña debe tener al menos 6 caracteres'),
    role: z.enum(['user', 'admin']).optional() 
  })
});


const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'El email es obligatorio' }).email('El formato del email es inválido'),
    password: z.string({ required_error: 'La contraseña es obligatoria' }).min(1, 'La contraseña no puede estar vacía')
  })
});

module.exports = { registerSchema, loginSchema };