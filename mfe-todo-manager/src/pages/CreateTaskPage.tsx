import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient.ts";
import {createTask} from "../lib/mutations.ts";
import type { Task } from "../types";
import {
  Link
} from "react-router-dom";
import TaskForm from '../components/TaskForm';

function CreateTaskPage() {
  const [todos, setTodos] = useState([] as Task[])

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    const { data } = await supabase.from("todos").select();
    setTodos(data as Task[]);
  }

  function handleCreateTask(task: Omit<Task, "id" | "completed" | "created_at">) {
    createTask(task).then(() => {
      getTodos();
    });
  }

  return (
      <div className="p-8">
        <h1 className="mx-auto mt-10 max-w-xl text-3xl font-semibold text-gray-900">Create new task:</h1>
        <TaskForm initialValues={{}} onSubmit={handleCreateTask} />

        <div className="mx-auto mt-16 max-w-xl sm:mt-20">
          <h2 className="text-3xl font-semibold text-gray-900">My tasks:</h2>
          <ul role="list" className="divide-y divide-gray-100">
            {todos.map((todo) => (
              <li key={todo.id} className="py-5">
                <div className="flex justify-between flex-col sm:flex-row gap-x-6">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{todo.title}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{todo.description}</p>
                    </div>
                  </div>
                  <div className="shrink-0 sm:flex sm:flex-col items-end">
                    <p className="text-sm leading-6 text-gray-900">Priority: {todo.priority.toUpperCase()}</p>
                    <p className="text-sm leading-6 text-gray-900">Created
                      at: {new Date(todo.created_at).toLocaleString()}</p>
                  </div>
                </div>
                <Link  to={`/edit/${todo.id}`}
                      className="block w-full rounded-md bg-blue-300 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"> Edit
                  Task</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
}

export default CreateTaskPage;