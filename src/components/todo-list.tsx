import { Stack, Paper, Text } from '@mantine/core';
import { useTodos } from '#/api/todos';
import { TodoItem } from './todo-item';

export function TodoList() {
  const { data: todos } = useTodos();

  if (todos.length === 0) {
    return (
      <Paper p="md" withBorder>
        <Text c="dimmed" ta="center">
          No todos yet. Add one to get started!
        </Text>
      </Paper>
    );
  }

  return (
    <Stack gap="xs">
      {todos.map((todo) => (
        <Paper key={todo.id} withBorder>
          <TodoItem todo={todo} />
        </Paper>
      ))}
    </Stack>
  );
}
