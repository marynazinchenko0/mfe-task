import { createLazyFileRoute } from '@tanstack/react-router'
import React from "react";

const TodoList = React.lazy(() => import('todoList/TodoList'))

export const Route = createLazyFileRoute('/todo-list')({
  component: TodoList,
})
