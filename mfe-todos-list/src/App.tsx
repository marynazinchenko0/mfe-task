import { useEffect, useState } from 'react'
import type { Task } from './types'
import { completeTask, deleteTask } from "./lib/mutations.ts";
import ListFilter from "./components/ListFilter.tsx";
import {getTaskList} from "./lib/queries.ts";

function App() {
  const [todos, setTodos] = useState([] as Task[])
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [priority, setPriority] = useState<string | undefined>();
  const [deadline, setDeadline] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();

  useEffect(() => {
    getTodos();
  }, [sortBy, priority, deadline, status]);

  async function getTodos() {
    getTaskList(sortBy, priority, deadline, status).then(({data: tasks}) => {
      setTodos(tasks as Task[]);
    });
  }

  function completeTodo (id: number) {
    completeTask(id).then(() => {
      getTodos();
    })
  }

  function deleteTodo(id: number) {
    deleteTask(id).then(() => {
      getTodos();
    })
  }

  return (
    <div className="mx-auto max-w-xl p-8">
      <p className="text-2xl font-semibold text-gray-900">Filter</p>
      <ListFilter
        sortBy={sortBy}
        setSortBy={setSortBy}
        priority={priority}
        setPriority={setPriority}
        deadline={deadline}
        setDeadline={setDeadline}
        status={status}
        setStatus={setStatus}
      />
      <h1 className="text-3xl font-semibold text-gray-900">My tasks:</h1>
      <ul role="list" className="mt-10">
        {todos.map((todo) => (
          <li key={todo.id} className="p-5 border-gray-300 border-2 rounded mb-3">
            <div className="flex justify-between flex-col sm:flex-row gap-x-6">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{todo.title}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{todo.description}</p>
                  <p className="text-sm leading-6 text-gray-900">Priority: {todo.priority.toUpperCase()}</p>
                  <p
                    className="text-sm leading-6 text-gray-900">Deadline: {new Date(todo.deadline).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 items-end">
                {todo.completed
                  ? <p className="text-sm leading-6 text-gray-200">Completed</p>
                  : <button onClick={() => completeTodo(todo.id)} className="bg-green-600 text-white p-2 rounded">
                    Mark as complete</button>
                }

                <button onClick={() => deleteTodo(todo.id)} className="bg-red-600 text-white p-2 rounded">Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
