import {priorityLabels} from '../types'


interface ListFilterProps {
  sortBy: string | undefined;
  setSortBy: (value: string | undefined) => void;
  priority: string | undefined;
  setPriority: (value: string | undefined) => void;
  deadline: string | undefined;
  setDeadline: (value: string | undefined) => void;
  status: string | undefined;
  setStatus: (value: string | undefined) => void;
}

function ListFilter({
                      sortBy,
                      setSortBy,
                      priority,
                      setPriority,
                      deadline,
                      setDeadline,
                      status,
                      setStatus
                    }: ListFilterProps) {
  const clearPriorityFilter = () => {
    setPriority('');
  }

  const clearDeadlineFilter = () => {
    setDeadline('');
    setSortBy('');
  }

  const clearStatusFilter = () => {
    setStatus('');
  }


  return (
    <div className="grid gap-4 mb-10">
      <p>Deadline</p>
      <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value='nearest'>Nearest deadline</option>
        <option value='furthest'>Furthest deadline</option>
      </select>

      <input
        id="deadline"
        name="deadline"
        type="date"
        value={deadline}
        onChange={e => setDeadline(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
      />

      {
        (sortBy || deadline) &&
          <button onClick={() => clearDeadlineFilter()} className="underline text-xs text-end">
              Clear filter
          </button>
      }
      <hr/>

      <p>Priority</p>

      <div className="flex items-center space-x-2">
        <input type="radio" value="all" id="r1" checked={priority === "" || priority === undefined}
               onChange={() => setPriority('')} name="selectedProirity"/>
        <label htmlFor="r1">All</label>
      </div>
      {
        Object.entries(priorityLabels).map(([key, value]) => (
          <div key={key} className="flex items-center space-x-2">
            <input type="radio" value={key} id={`r${key}`} name="selectedProirity" checked={priority === key}
                   onChange={() => setPriority(key)}/>
            <label htmlFor={`r${key}`}>{value}</label>
          </div>
        ))
      }

      {
        (priority && priority !== 'all') &&
          <button onClick={() => clearPriorityFilter()} className="underline text-xs text-end">
              Clear filter
          </button>
      }
      <hr/>

      <p>Status</p>
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value='completed'>Completed</option>
        <option value='uncompleted'>Uncompleted</option>
      </select>
      {
        (status) &&
          <button onClick={() => clearStatusFilter()} className="underline text-xs text-end">
              Clear filter
          </button>
      }
    </div>
  )
}

export default ListFilter