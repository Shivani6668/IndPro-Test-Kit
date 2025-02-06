import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask, updateTask } from "../redux/taskSlice";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [errorMessage, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this line

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-400";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true); // Set submitting state to true

    if (!title || !category || !priority || !dueDate) {
      setError("All fields are required.");
      setIsSubmitting(false); // Reset submitting state
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (isEditTaskOpen) {
        const response = await axios.put(
          `http://localhost:20000/api/tasks/${editTaskId}`,
          { title, category, priority, dueDate, status },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(updateTask(response.data));
      } else {
        const response = await axios.post(
          "http://localhost:20000/api/tasks",
          { title, category, priority, dueDate, status },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(fetchTasks());
       
      }

      setTitle("");
      setCategory("");
      setPriority("Medium");
      setDueDate("");
      setStatus("pending");
      setError("");
      setIsAddTaskOpen(false);
      setIsEditTaskOpen(false);

    } catch (err) {
      console.error("Error saving task:", err);
      setError("Failed to save task. Please try again.");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setCategory(task.category);
    setPriority(task.priority);
    setStatus(task.status);
    setDueDate(formatDate(task.dueDate));
    setEditTaskId(task._id);
    setIsAddTaskOpen(true);
    setIsEditTaskOpen(true);
  };

  const handleDelete = async (taskId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:20000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(deleteTask(taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesPriority = filterPriority === "All" || task.priority === filterPriority;
    const matchesCategory = filterCategory === "All" || task.category === filterCategory;
    const matchesStatus = filterStatus === "All" || task.status === filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesCategory && matchesStatus && matchesSearch;
  });

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 min-h-screen bg-[#ebecff] text-black">
      <h1 className="text-3xl font-bold text-start mb-6">Task List</h1>

      <div className="flex ml-auto gap-4 flex-wrap justify-end items-center space-x-2 mb-4 p-2 max-w-full lg:max-w-xl">
        <div className="relative w-full sm:w-64">
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tasks"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 pl-10 w-full rounded-md text-black border border-gray-300 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap justify-start space-x-1 mb-2">
          <button
            onClick={() => setFilterPriority("All")}
            className={`px-3 py-1 rounded-md text-sm ${filterPriority === "All" ? "bg-blue-900 text-white" : "bg-gray-300"}`}
          >
            All Priorities
          </button>
          <button
            onClick={() => setFilterPriority("High")}
            className={`px-3 py-1 rounded-md text-sm ${filterPriority === "High" ? "bg-red-500 text-white" : "bg-gray-300"}`}
          >
            High Priority
          </button>
          <button
            onClick={() => setFilterPriority("Medium")}
            className={`px-3 py-1 rounded-md text-sm ${filterPriority === "Medium" ? "bg-yellow-500 text-white" : "bg-gray-300"}`}
          >
            Medium Priority
          </button>
          <button
            onClick={() => setFilterPriority("Low")}
            className={`px-3 py-1 rounded-md text-sm ${filterPriority === "Low" ? "bg-green-500 text-white" : "bg-gray-300"}`}
          >
            Low Priority
          </button>
        </div>

        <div className="flex flex-wrap justify-start space-x-1 mb-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1 rounded-md text-sm bg-gray-300"
          >
            <option value="All">All Categories</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Urgent">Urgent</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1 rounded-md text-sm bg-gray-300"
          >
            <option value="All">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="Ongoing">Ongoing</option>
          </select>
        </div>

        <button
          className="px-3 py-1 rounded-md text-sm bg-blue-900 text-white"
          onClick={() => {
            setIsAddTaskOpen(true);
            setIsEditTaskOpen(false);
          }}
        >
          Add New Task
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="relative p-4 rounded-lg shadow-md bg-white text-black">
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => handleEdit(task)}
                className="text-blue-500 hover:text-blue-700"
              >
                <MdEdit size={20} />
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="text-red-500 hover:text-red-700"
              >
                <MdDelete size={20} />
              </button>
            </div>

            <h2 className="text-lg font-semibold mb-2">{task.title}</h2>
            <p className="text-sm text-gray-600">Category: {task.category}</p>
            <p className="text-sm text-gray-600">Status: {task.status}</p>
            <p className="text-sm text-gray-600">Due Date: {formatDate(task.dueDate)}</p>

            <span className={`inline-block mt-2 px-3 py-1 text-sm text-white rounded-full ${getPriorityColor(task.priority)}`}>
              {task.priority} Priority
            </span>
          </div>
        ))}

        <div
          className="p-4 rounded-lg shadow-md border-2 bg-white border-dashed border-black cursor-pointer flex items-center justify-center"
          onClick={() => setIsAddTaskOpen(true)}
        >
          <MdAdd className="text-2xl text-black" />
        </div>
      </div>

      {isAddTaskOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <motion.form
            className="text-black relative p-6 md:p-8 bg-white shadow-2xl rounded-2xl border border-gray-200 max-w-md w-full mx-auto transition-all"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            onSubmit={handleSubmit}
          >
            <button
             
              onClick={() => {
                if (isEditTaskOpen) setIsEditTaskOpen(false);
                if (isAddTaskOpen) setIsAddTaskOpen(false);
              }}
              
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <MdClose size={20} />
            </button>

            <h3 className="text-2xl mb-4 text-center">{isEditTaskOpen ? "Edit Task" : "Add Task"}</h3>

            {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

            <input
              type="text"
              placeholder="Task Title"
              className="block w-full p-2 mb-3 border rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full p-2 mb-3 border rounded-md"
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Urgent">Urgent</option>
            </select>

            <div className="flex justify-between mb-3">
              <div>
                <label>Priority</label>
                <select
                  className="block w-full p-2 mt-1 border rounded-md"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label>Status</label>
                <select
                  className="block w-full p-2 mt-1 border rounded-md"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                </select>
              </div>
            </div>

            <input
              type="date"
              className="block w-full p-2 mb-3 border rounded-md"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

            <button
              type="submit"
              className="block w-full bg-blue-900 text-white p-2 rounded-md hover:bg-blue-800"
              disabled={isSubmitting} // Disable button while submitting
            >
              {isEditTaskOpen ? "Update Task" : "Add Task"}
            </button>
          </motion.form>
        </div>
      )}
    </div>
  );
};

export default TaskList;