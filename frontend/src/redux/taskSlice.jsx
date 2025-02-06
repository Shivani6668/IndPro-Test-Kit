import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseURL } from "../api";

const API_URL = `${BaseURL}/api/tasks`;

const getAuthToken = () => {
  return localStorage.getItem("token");
};

const axiosConfig = () => {
  const token = getAuthToken();
  return token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL, axiosConfig()); 
    console.log("API response:", response.data); 
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch tasks");
  }
});

// Add task
export const addTask = createAsyncThunk("tasks/addTask", async (taskData, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, taskData, axiosConfig()); 
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to add task");
  }
});

// Update task
export const updateTask = createAsyncThunk("tasks/updateTask", async (task, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${task._id}`, task, axiosConfig()); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update task");
    }
  });

// Delete task
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`, axiosConfig());
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete task");
  }
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch tasks actions
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add task actions
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      // Update task actions
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      // Delete task actions
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;




































