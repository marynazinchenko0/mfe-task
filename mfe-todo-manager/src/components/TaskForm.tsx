import React from 'react';
import type { Task } from "../types";

interface TaskFormProps {
  initialValues: Partial<Task>;
  onSubmit: (values: Omit<Task, "id" | "completed" | "created_at">) => void;
}

function TaskForm({ initialValues, onSubmit }: TaskFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = event.currentTarget;
    const data = new FormData(target);
    const title = data.get('title') as string;
    const description = data.get('description') as string;
    const priority = data.get('priority') as string;
    const deadline = data.get('deadline') as string;

    const task: Omit<Task, "id" | "completed" | "created_at"> = {
      title,
      description,
      priority,
      deadline
    };

    onSubmit(task);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">
              Title
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="title"
                id="title"
                defaultValue={initialValues.title}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-2.5">
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={initialValues.description}
                />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="priority" className="block text-sm font-semibold leading-6 text-gray-900">
              Priority
            </label>
            <div className="mt-2.5">
              <select
                id="priority"
                name="priority"
                defaultValue={initialValues.priority}
                className="h-full rounded-md ring-1 ring-inset ring-gray-300 bg-transparent bg-none py-2 px-3.5 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm w-full"
              >
                <option value="lowest">Lowest</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="highest">Highest</option>
              </select>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="deadline" className="block text-sm font-semibold leading-6 text-gray-900">
              Deadline
            </label>
            <div className="mt-2.5">
              <input
                id="deadline"
                name="deadline"
                defaultValue={initialValues.deadline}
                type="date"
                placeholder="What needs to be done?"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {initialValues.id ? "Update Task" : "Add Task"}
          </button>
        </div>
    </form>
  );
}

export default TaskForm;