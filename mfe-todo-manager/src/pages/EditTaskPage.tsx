import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient.ts";
import {updateTask} from "../lib/mutations.ts";
import type { Task } from "../types";
import {Link, useParams} from "react-router-dom";
import TaskForm from '../components/TaskForm';

function EditTaskPage() {
  const { id } = useParams();

  const [todo, setTodo] = useState({} as Task)

  useEffect(() => {
    getTodo(Number(id));
  }, []);

  async function getTodo(id: number) {
    const { data } = await supabase.from("todos").select().eq('id', id);
    if (data) {
      setTodo(data[0] as Task);
    }
  }

  function handleEditTask(task: Omit<Task, "id" | "completed" | "created_at">) {
    const taskWithId = {
      ...task,
      id: Number(id)
    }
    updateTask(taskWithId).then(() => {
      console.log("Task updated");
    });
  }

  return (
      <div className="p-8">
        <h1 className="mx-auto mt-16 max-w-xl sm:mt-20 text-3xl font-semibold text-gray-900">Edit Task</h1>
        <TaskForm initialValues={todo} onSubmit={handleEditTask} />
        <Link to={`/`}
              className="mx-auto mt-10 max-w-xl block w-full rounded-md bg-blue-300 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          Back to creation form</Link>
      </div>
  );
}

export default EditTaskPage;