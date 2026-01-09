import { nanoid } from 'nanoid';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

class TodosDatabase {
  private todos = new Map<string, Todo>();

  constructor() {
    // Seed with sample data
    this.seed();
  }

  private seed() {
    const seedTodos: Omit<Todo, 'id' | 'createdAt'>[] = [
      { title: 'Faire les courses', completed: false },
      { title: 'Répondre aux emails', completed: true },
      { title: 'Préparer la réunion', completed: false },
      { title: 'Réviser le code du projet', completed: false },
    ];

    seedTodos.forEach((todo) => this.create(todo));
  }

  getAll(): Todo[] {
    return Array.from(this.todos.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  getById(id: string): Todo | undefined {
    return this.todos.get(id);
  }

  create(data: Omit<Todo, 'id' | 'createdAt'>): Todo {
    const todo: Todo = {
      id: nanoid(),
      ...data,
      createdAt: new Date(),
    };
    this.todos.set(todo.id, todo);
    return todo;
  }

  update(id: string, data: Partial<Omit<Todo, 'id' | 'createdAt'>>): Todo | undefined {
    const todo = this.todos.get(id);
    if (!todo) return undefined;

    const updated = { ...todo, ...data };
    this.todos.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.todos.delete(id);
  }
}

// Export a singleton instance
export const db = new TodosDatabase();
