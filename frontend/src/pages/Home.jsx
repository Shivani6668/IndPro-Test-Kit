import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../redux/taskSlice';

function Home() {
  const dispatch = useDispatch();

  // Access tasks and loading state from Redux
  const { tasks, loading } = useSelector((state) => state.tasks);

  // Fetch tasks when the component mounts
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Task summary data based on status
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === 'pending').length;
  const completedTasks = tasks.filter((task) => task.status === 'completed').length;

  return (
    <div className="px-4 min-h-screen py-6 sm:px-6 lg:px-8 bg-[#ebecff] text-black">
      {/* Task Summary */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold">Task Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl font-medium">Total Tasks</h3>
            <p className="text-2xl sm:text-3xl font-bold">{loading ? 'Loading...' : totalTasks}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl font-medium">Pending Tasks</h3>
            <p className="text-2xl sm:text-3xl font-bold">{loading ? 'Loading...' : pendingTasks}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl font-medium">Completed Tasks</h3>
            <p className="text-2xl sm:text-3xl font-bold">{loading ? 'Loading...' : completedTasks}</p>
          </div>
        </div>
      </div>

      {/* Optionally, display tasks here */}
      {/* You can render your tasks list here */}
    </div>
  );
}

export default Home;
