const { z } = require('zod');


const createTaskSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'El título de la tarea es obligatorio' }).min(3, 'El título debe tener al menos 3 caracteres'),
    description: z.string().optional(),
    category: z.string().optional(),
    status: z.enum(['pending', 'completed']).optional()
  })
});

module.exports = { createTaskSchema };