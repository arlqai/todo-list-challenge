import { createFileRoute } from '@tanstack/react-router';
import { Container, Title, Stack } from '@mantine/core';
import { TodoForm } from '#/components/todo-form';
import { TodoList } from '#/components/todo-list';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Title order={1}>Todo List</Title>
        <TodoForm />
        <TodoList />
      </Stack>
    </Container>
  );
}
