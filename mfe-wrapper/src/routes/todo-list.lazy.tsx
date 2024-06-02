import { createLazyFileRoute } from '@tanstack/react-router'

// @ts-ignore
export const Route = createLazyFileRoute('/todo-list')({
  component: TodoList,
})

function TodoList() {
  return <div className="p-2">Hello from Todo list page!!</div>
}
