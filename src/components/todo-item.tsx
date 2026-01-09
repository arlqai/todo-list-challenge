import { Checkbox, Text, ActionIcon, Group } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useUpdateTodo, useDeleteTodo } from '#/api/todos';
import type { Todo } from '#/server/db';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const handleToggle = () => {
    updateTodo.mutate({
      id: todo.id,
      data: { completed: !todo.completed },
    });
  };

  const handleDelete = () => {
    deleteTodo.mutate(todo.id);
  };

  return (
    <Group justify="space-between" p="sm">
      <Group>
        <Checkbox
          checked={todo.completed}
          onChange={handleToggle}
          disabled={updateTodo.isPending}
        />
        <Text
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            opacity: todo.completed ? 0.6 : 1,
          }}
        >
          {todo.title}
        </Text>
      </Group>
      <ActionIcon
        color="red"
        variant="subtle"
        onClick={handleDelete}
        loading={deleteTodo.isPending}
      >
        <IconTrash size={18} />
      </ActionIcon>
    </Group>
  );
}
