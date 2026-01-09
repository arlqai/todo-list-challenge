import { useState } from 'react';
import { TextInput, Button, Group } from '@mantine/core';
import { useCreateTodo } from '#/api/todos';

export function TodoForm() {
  const [title, setTitle] = useState('');
  const createTodo = useCreateTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    createTodo.mutate(
      { title: title.trim() },
      {
        onSuccess: () => {
          setTitle('');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group>
        <TextInput
          placeholder="Add a new todo..."
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          style={{ flex: 1 }}
          disabled={createTodo.isPending}
        />
        <Button type="submit" loading={createTodo.isPending}>
          Add
        </Button>
      </Group>
    </form>
  );
}
