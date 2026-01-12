import { z } from 'zod';

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  completed: z.boolean(),
  createdAt: z.date(),
});

export const CreateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
});

export const UpdateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long').optional(),
  completed: z.boolean().optional(),
});

export type TodoInput = z.infer<typeof TodoSchema>;
export type CreateTodoInput = z.infer<typeof CreateTodoSchema>;
export type UpdateTodoInput = z.infer<typeof UpdateTodoSchema>;
