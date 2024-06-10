import { createLazyFileRoute } from '@tanstack/react-router'
import React from 'react'

// @ts-ignore
const TodoManager = React.lazy(() => import('todoManager/TodoManager'))

// @ts-ignore
export const Route = createLazyFileRoute('/todo-creation')({
  component: TodoManager,
})
