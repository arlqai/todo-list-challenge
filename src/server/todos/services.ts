import { db } from "./db";
import type { CreateTodoInput, UpdateTodoInput } from "./schemas";

export const todoService = {
  getAll() {
    return db.getAll();
  },

  create(data: CreateTodoInput) {
    return db.create({ ...data, completed: false });
  },

  update(id: string, data: UpdateTodoInput) {
    return db.update(id, data);
  },

  delete(id: string) {
    return db.delete(id);
  },
};
