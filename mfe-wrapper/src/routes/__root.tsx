import {createRootRoute, Link, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-1">
        <Link to="/" className="block px-4 py-2 [&.active]:text-indigo-500">
          Home
        </Link>
        <Link to="/todo-list" className="block px-4 py-2 [&.active]:text-indigo-500">
          List & Filter
        </Link>
        <Link to="/todo-creation" className="block px-4 py-2 [&.active]:text-indigo-500">
          Manage
        </Link>
        <Link to="/login" className="block px-4 py-2 [&.active]:text-indigo-500">
          Login
        </Link>
      </div>
      <hr/>
      <Outlet/>
      <TanStackRouterDevtools/>
    </>
  ),
})
