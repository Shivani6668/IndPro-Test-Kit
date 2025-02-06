import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../redux/taskSlice';
import { ClipLoader } from "react-spinners";

function Home() {
  const dispatch = useDispatch();

  const { tasks, loading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === 'pending').length;
  const completedTasks = tasks.filter((task) => task.status === 'completed').length;
  const OngoingTask = tasks.filter((task) => task.status === 'Ongoing').length;

  return (
    <div className="px-4 min-h-screen py-6 sm:px-6 lg:px-8 bg-[#ebecff] text-black">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold">Task Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl font-medium">Total Tasks</h3>
        
            <p className="text-2xl sm:text-3xl font-bold">{loading ? <ClipLoader size={20} color="#000000" /> : totalTasks}</p>
        
        
        
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl font-medium">Pending Tasks</h3>
            <p className="text-2xl sm:text-3xl font-bold">{loading ? <ClipLoader size={20} color="#000000" /> : pendingTasks}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl font-medium">Completed Tasks</h3>
            <p className="text-2xl sm:text-3xl font-bold">{loading ? <ClipLoader size={20} color="#000000" /> : completedTasks}</p>
          </div>
          <div className="bg-orange-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl font-medium">Ongoing Tasks</h3>
            <p className="text-2xl sm:text-3xl font-bold">{loading ? <ClipLoader size={20} color="#000000" /> : OngoingTask}</p>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Home;
























