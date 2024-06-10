import supabase from "./supabaseClient.ts";


export function getTaskList(
  sortBy?: string,
  priority?: string,
  deadline?: string,
  status?: string
) {
  const {orderType, orderAscending} = setOrderType(sortBy);

  let query = supabase
    .from('todos')
    .select('*', {count: 'exact'})
    .order(orderType, {ascending: orderAscending})

  query = applyFilter(query, 'priority', priority);
  query = applyFilter(query, 'deadline', deadline);
  query = applyStatusFilter(query, status);

  return query;
}

function setOrderType(sortBy: string | undefined) {
  let orderType = 'created_at';
  let orderAscending = false;

  if (sortBy && (sortBy === 'nearest' || sortBy === 'furthest')) {
    orderType = 'deadline';

    if (sortBy === 'nearest') {
      orderAscending = true;
    }
  }

  return {orderType, orderAscending};
}

function applyFilter(query: any, filterBy: string, filterValue: string | undefined) {
  if (filterValue) {
    query = query.filter(filterBy, 'in', `(${filterValue})`);
  }

  return query;
}


function applyStatusFilter(query: any, filterValue: string | undefined) {
  if (filterValue) {
    const status = filterValue === 'completed'
    query = query.eq('completed', status)
  }

  return query;
}