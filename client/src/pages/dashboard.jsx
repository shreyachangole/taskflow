import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Plus,
  Edit,
  Trash2,
  Archive,
  Calendar,
  Tag,
  Filter,
  Grid,
  List,
  Menu,
  X,
  User,
  Bell,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Moon,
  Sun
} from 'lucide-react';
import axios from 'axios';
const Dashboard = () => {
  // Get the profile information
  const [user, setUser] = useState(null);
  const getUser = localStorage.getItem('token');
  useEffect(() => {
    if (getUser) {
      axios.get('/api/auth/profile', { headers: { Authorization: `Bearer ${getUser}` } })
        .then(res => setUser(res.data.data.user))
        .catch(err => console.error('Error fetching profile:', err));
    }
  }, []);
  const userId=user?._id;
  // Everything for the token and axiosconfig for every api
  const token = localStorage.getItem('token');
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
  // State management

  // Loading state for tasks
  const [loadingTasks, setLoadingTasks] = useState(false);
  // Get all the tasks from backend
  useEffect(() => {
  if (!token) {
    window.location.href = '/login';
    return;
  }
  if (!userId) return; // Wait until userId is available

  setLoadingTasks(true);
  axios.get('/api/todos', {
    ...axiosConfig,
    params: { userId }
  })
    .then(res => {
      let todos = [];
      if (res.data && res.data.data && Array.isArray(res.data.data.todos)) {
        todos = res.data.data.todos.map(todo => ({
          ...todo,
          id: todo._id || todo.id
        }));
      }
      setTasks(todos);
    })
    .catch(err => {
      console.log('Error fetching tasks', err);
      const msg = err?.response?.data?.message || 'Error fetching tasks';
      showNotification(msg, 'error');
    })
    .finally(() => setLoadingTasks(false));
}, [token, userId]);

  const [tasks, setTasks] = useState([]);

  const [categories, setCategories] = useState([
    { id: 1, name: 'Design', color: 'bg-purple-500', count: 1 },
    { id: 2, name: 'Development', color: 'bg-blue-500', count: 1 },
    { id: 3, name: 'Content', color: 'bg-green-500', count: 1 },
    { id: 4, name: 'Management', color: 'bg-orange-500', count: 1 }
  ]);

  const [currentView, setCurrentView] = useState('dashboard');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'kanban'
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [filterBy, setFilterBy] = useState('all');
  // Remove light mode, always use dark mode
  const isDarkMode = true;
  const [notifications, setNotifications] = useState([]);

  // Task form state
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    category: ''
  });

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    color: 'bg-blue-500'
  });

  // Update category counts
  useEffect(() => {
    const updatedCategories = categories.map(cat => ({
      ...cat,
      count: tasks.filter(task => task.category === cat.name && !task.archived).length
    }));
    setCategories(updatedCategories);
  }, [tasks]);

  // Notification system
  const showNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  // Task operations
  const addTask = () => {
    if (!taskForm.title.trim()) {
      showNotification('Please enter a task title', 'error');
      return;
    }
    if (!taskForm.description || taskForm.description.trim().length < 10) {
      showNotification('Description must be at least 10 characters', 'error');
      return;
    }
    // Only send fields expected by backend
    const newTask = {
      title: taskForm.title.trim(),
      description: taskForm.description.trim(),
      dueDate: taskForm.dueDate || undefined,
      priority: taskForm.priority || 'medium',
      category: taskForm.category || 'general',
      // completed, status, archived are handled by backend defaults
    };
    axios.post('/api/todos', newTask, axiosConfig)
      .then(res => {
        setTasks(prev => [...prev, res.data.data.todo]);
        setTaskForm({ title: '', description: '', dueDate: '', priority: 'medium', category: '' });
        setShowTaskModal(false);
        showNotification('Task added successfully!');
      })
      .catch(err => {
        const msg = err?.response?.data?.message || 'Error adding task';
        console.error('Error adding task:', err);
        showNotification(msg, 'error');
      });
  };

  const updateTask = () => {
    setTasks(prev => prev.map(task =>
      task.id === editingTask.id ? { ...task, ...taskForm } : task
    ));
    setEditingTask(null);
    setTaskForm({ title: '', description: '', dueDate: '', priority: 'medium', category: '' });
    setShowTaskModal(false);
    showNotification('Task updated successfully!');
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed, status: !task.completed ? 'done' : 'todo' }
        : task
    ));
    const task = tasks.find(t => t.id === taskId);
    showNotification(`Task ${task.completed ? 'marked as incomplete' : 'completed'}!`);
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    showNotification('Task deleted successfully!');
  };

  const archiveTask = (taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, archived: true } : task
    ));
    showNotification('Task archived successfully!');
  };

  // Category operations
  const addCategory = () => {
    if (!categoryForm.name.trim()) {
      showNotification('Please enter a category name', 'error');
      return;
    }

    const newCategory = {
      id: Date.now(),
      ...categoryForm,
      count: 0
    };

    setCategories(prev => [...prev, newCategory]);
    setCategoryForm({ name: '', color: 'bg-blue-500' });
    setShowCategoryModal(false);
    showNotification('Category added successfully!');
  };

  const updateCategory = () => {
    setCategories(prev => prev.map(cat =>
      cat.id === editingCategory.id ? { ...cat, ...categoryForm } : cat
    ));
    setEditingCategory(null);
    setCategoryForm({ name: '', color: 'bg-blue-500' });
    setShowCategoryModal(false);
    showNotification('Category updated successfully!');
  };

  const deleteCategory = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    // Remove category from tasks
    setTasks(prev => prev.map(task =>
      task.category === category.name ? { ...task, category: '' } : task
    ));
    showNotification('Category deleted successfully!');
  };

  // Filter tasks
  const getFilteredTasks = () => {
    let filtered = tasks;

    switch (filterBy) {
      case 'today':
        const today = new Date().toISOString().split('T')[0];
        filtered = tasks.filter(task => task.dueDate === today && !task.archived);
        break;
      case 'upcoming':
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        filtered = tasks.filter(task => new Date(task.dueDate) >= tomorrow && !task.archived);
        break;
      case 'completed':
        filtered = tasks.filter(task => task.completed && !task.archived);
        break;
      case 'archived':
        filtered = tasks.filter(task => task.archived);
        break;
      default:
        filtered = tasks.filter(task => !task.archived);
    }

    return filtered;
  };

  // Get stats
  const getStats = () => {
    const activeTasks = tasks.filter(task => !task.archived);
    const today = new Date().toISOString().split('T')[0];

    return {
      total: activeTasks.length,
      completed: activeTasks.filter(task => task.completed).length,
      overdue: activeTasks.filter(task => !task.completed && task.dueDate < today).length,
      archived: tasks.filter(task => task.archived).length
    };
  };

  const stats = getStats();
  const filteredTasks = getFilteredTasks();

  // Modal handlers
  const openTaskModal = (task = null) => {
    if (task) {
      setEditingTask(task);
      setTaskForm({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        category: task.category
      });
    } else {
      setEditingTask(null);
      setTaskForm({ title: '', description: '', dueDate: '', priority: 'medium', category: '' });
    }
    setShowTaskModal(true);
  };

  const openCategoryModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setCategoryForm({ name: category.name, color: category.color });
    } else {
      setEditingCategory(null);
      setCategoryForm({ name: '', color: 'bg-blue-500' });
    }
    setShowCategoryModal(true);
  };

  const colorOptions = [
    'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500',
    'bg-red-500', 'bg-pink-500', 'bg-indigo-500', 'bg-yellow-500'
  ];

  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <div className="min-h-screen bg-black text-white transition-colors duration-200">
      {/* Navigation Bar */}

      <div className="pt-16 flex">
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-black border-r border-gray-800
        `}>
          <div className="pt-4 pb-4 h-full flex flex-col">
            <div className="flex-1 px-4">
              <div className="space-y-2">
                <button
                  onClick={() => { setFilterBy('all'); setCurrentView('tasks'); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${filterBy === 'all' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'
                    }`}
                >
                  All Tasks
                </button>
                <button
                  onClick={() => { setFilterBy('today'); setCurrentView('tasks'); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${filterBy === 'today' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'
                    }`}
                >
                  Today
                </button>
                <button
                  onClick={() => { setFilterBy('upcoming'); setCurrentView('tasks'); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${filterBy === 'upcoming' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'
                    }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => { setFilterBy('completed'); setCurrentView('tasks'); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${filterBy === 'completed' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'
                    }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => { setFilterBy('archived'); setCurrentView('tasks'); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${filterBy === 'archived' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'
                    }`}
                >
                  Archived
                </button>
              </div>

              <div className="mt-8">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Categories
                </h3>
                <div className="space-y-1">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-700">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${category.color} mr-2`}></div>
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <span className="text-xs text-gray-400">{category.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-4 pt-4 border-t border-gray-700">
              <button
                onClick={() => openCategoryModal()}
                className="w-full flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} className="mr-2" />
                Add Category
              </button>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Dashboard View */}
            {currentView === 'dashboard' && (
              <div>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                  <p className="text-gray-400">Welcome back! Here's your productivity overview.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-blue-500 bg-opacity-20">
                        <CheckSquare className="text-blue-500" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-400">Total Tasks</p>
                        <p className="text-2xl font-bold">{stats.total}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-green-500 bg-opacity-20">
                        <CheckCircle className="text-green-500" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-400">Completed</p>
                        <p className="text-2xl font-bold">{stats.completed}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-red-500 bg-opacity-20">
                        <AlertCircle className="text-red-500" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-400">Overdue</p>
                        <p className="text-2xl font-bold">{stats.overdue}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-purple-500 bg-opacity-20">
                        <Archive className="text-purple-500" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-400">Archived</p>
                        <p className="text-2xl font-bold">{stats.archived}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Tasks */}
                <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Recent Tasks</h2>
                    <button
                      onClick={() => setCurrentView('tasks')}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-4">
                    {tasks.filter(task => !task.archived).slice(0, 5).map(task => (
                      <div key={task.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                        <button
                          onClick={() => toggleTaskComplete(task.id)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${task.completed
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-400 hover:border-green-400'
                            }`}
                        >
                          {task.completed && <CheckCircle size={12} className="text-white" />}
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            {task.category && (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${categories.find(c => c.name === task.category)?.color || 'bg-gray-500'
                                } text-white`}>
                                {task.category}
                              </span>
                            )}
                            {task.dueDate && (
                              <span className="text-xs text-gray-400 flex items-center">
                                <Calendar size={12} className="mr-1" />
                                {task.dueDate}
                              </span>
                            )}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                              {task.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tasks View */}
            {currentView === 'tasks' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      {filterBy === 'all' && 'All Tasks'}
                      {filterBy === 'today' && 'Today\'s Tasks'}
                      {filterBy === 'upcoming' && 'Upcoming Tasks'}
                      {filterBy === 'completed' && 'Completed Tasks'}
                      {filterBy === 'archived' && 'Archived Tasks'}
                    </h1>
                    <p className="text-gray-400">{filteredTasks.length} tasks</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex rounded-lg overflow-hidden border border-gray-600">
                      <button
                        onClick={() => setViewMode('list')}
                        className={`px-3 py-2 text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'hover:bg-gray-700'
                          }`}
                      >
                        <List size={16} />
                      </button>
                      <button
                        onClick={() => setViewMode('kanban')}
                        className={`px-3 py-2 text-sm font-medium transition-colors ${viewMode === 'kanban' ? 'bg-blue-500 text-white' : 'hover:bg-gray-700'
                          }`}
                      >
                        <Grid size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => openTaskModal()}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Task
                    </button>
                  </div>
                </div>

                {/* List View */}
                {viewMode === 'list' && (
                  <div className="space-y-4">
                    {loadingTasks ? (
                      <div className="text-center text-gray-400 py-8">Loading tasks...</div>
                    ) : filteredTasks.length === 0 ? (
                      <div className="text-center text-gray-400 py-8">No tasks found.</div>
                    ) : (
                      filteredTasks.map(task => (
                        <div key={task.id} className="bg-gray-900 rounded-lg border border-gray-800 p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-start space-x-4">
                            <button
                              onClick={() => toggleTaskComplete(task.id)}
                              className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors mt-1 ${task.completed
                                  ? 'bg-green-500 border-green-500'
                                  : 'border-gray-400 hover:border-green-400'
                                }`}
                            >
                              {task.completed && <CheckCircle size={14} className="text-white" />}
                            </button>
                            <div className="flex-1">
                              <h3 className={`text-lg font-semibold mb-2 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                                {task.title}
                              </h3>
                              {task.description && (
                                <p className="text-gray-400 mb-3">{task.description}</p>
                              )}
                              <div className="flex items-center space-x-4">
                                {task.category && (
                                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${categories.find(c => c.name === task.category)?.color || 'bg-gray-500'
                                    } text-white`}>
                                    {task.category}
                                  </span>
                                )}
                                {task.dueDate && (
                                  <span className="text-sm text-gray-400 flex items-center">
                                    <Calendar size={14} className="mr-1" />
                                    {task.dueDate}
                                  </span>
                                )}
                                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${priorityColors[task.priority]}`}>
                                  {task.priority}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => openTaskModal(task)}
                                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
                                aria-label="Edit task"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => archiveTask(task.id)}
                                className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-gray-800 rounded-lg transition-colors"
                                aria-label="Archive task"
                              >
                                <Archive size={16} />
                              </button>
                              <button
                                onClick={() => deleteTask(task.id)}
                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
                                aria-label="Delete task"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Kanban View */}
                {viewMode === 'kanban' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {['todo', 'in-progress', 'done'].map(status => (
                      <div key={status} className="bg-gray-900 rounded-lg border border-gray-800 p-4">
                        <h3 className="font-semibold mb-4 capitalize">
                          {status === 'in-progress' ? 'In Progress' : status}
                          <span className="ml-2 text-sm text-gray-400">
                            ({filteredTasks.filter(task => task.status === status).length})
                          </span>
                        </h3>

                        <div className="space-y-3">
                          {filteredTasks.filter(task => task.status === status).map(task => (
                            <div key={task.id} className="bg-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                                  {task.title}
                                </h4>
                                <div className="flex space-x-1">
                                  <button
                                    onClick={() => openTaskModal(task)}
                                    className="p-1 text-gray-400 hover:text-blue-400 hover:bg-gray-900 transition-colors"
                                  >
                                    <Edit size={14} />
                                  </button>
                                  <button
                                    onClick={() => deleteTask(task.id)}
                                    className="p-1 text-gray-400 hover:text-red-400 hover:bg-gray-900 transition-colors"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>

                              {task.description && (
                                <p className="text-sm text-gray-400 mb-3">{task.description}</p>
                              )}

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  {task.category && (
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${categories.find(c => c.name === task.category)?.color || 'bg-gray-500'
                                      } text-white`}>
                                      {task.category}
                                    </span>
                                  )}
                                  <span className={`px-2 py-1 rounded text-xs font-medium border ${priorityColors[task.priority]}`}>
                                    {task.priority}
                                  </span>
                                </div>

                                {task.dueDate && (
                                  <span className="text-xs text-gray-400 flex items-center">
                                    <Calendar size={12} className="mr-1" />
                                    {task.dueDate}
                                  </span>
                                )}
                              </div>

                              <div className="mt-3 flex items-center">
                                <button
                                  onClick={() => toggleTaskComplete(task.id)}
                                  className={`flex items-center text-sm font-medium transition-colors ${task.completed
                                      ? 'text-green-400 hover:text-green-300'
                                      : 'text-gray-400 hover:text-green-400'
                                    }`}
                                >
                                  <CheckCircle size={16} className="mr-1" />
                                  {task.completed ? 'Completed' : 'Mark Complete'}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Categories View */}
            {currentView === 'categories' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Categories</h1>
                    <p className="text-gray-400">Manage your task categories</p>
                  </div>

                  <button
                    onClick={() => openCategoryModal()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Category
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map(category => (
                    <div key={category.id} className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full ${category.color} mr-3`}></div>
                          <h3 className="text-lg font-semibold">{category.name}</h3>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => openCategoryModal(category)}
                            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
                            aria-label="Edit category"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deleteCategory(category.id)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
                            aria-label="Delete category"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-3xl font-bold text-blue-400 mb-1">{category.count}</p>
                        <p className="text-sm text-gray-400">
                          {category.count === 1 ? 'task' : 'tasks'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile View */}
            {/* Profile View removed */}
          </div>
        </div>
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold">
                {editingTask ? 'Edit Task' : 'Add New Task'}
              </h2>
              <button
                onClick={() => setShowTaskModal(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter task description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Due Date</label>
                <input
                  type="date"
                  value={taskForm.dueDate}
                  onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Priority</label>
                <select
                  value={taskForm.priority}
                  onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={taskForm.category}
                  onChange={(e) => setTaskForm({ ...taskForm, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-3 p-6 border-t border-gray-800">
              <button
                onClick={editingTask ? updateTask : addTask}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {editingTask ? 'Update Task' : 'Add Task'}
              </button>
              <button
                onClick={() => setShowTaskModal(false)}
                className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg ${isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <div className="grid grid-cols-4 gap-3">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      onClick={() => setCategoryForm({ ...categoryForm, color })}
                      className={`w-12 h-12 rounded-lg ${color} border-2 transition-all ${categoryForm.color === color ? 'border-white scale-110' : 'border-gray-800'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-3 p-6 border-t border-gray-800">
              <button
                onClick={editingCategory ? updateCategory : addCategory}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {editingCategory ? 'Update Category' : 'Add Category'}
              </button>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Add Task Button */}
      {currentView === 'tasks' && (
        <button
          onClick={() => openTaskModal()}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center z-40"
          aria-label="Add new task"
        >
          <Plus size={24} />
        </button>
      )}

      {/* Notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`px-4 py-3 rounded-lg shadow-lg max-w-sm transition-all transform ${notification.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
              }`}
          >
            <div className="flex items-center">
              {notification.type === 'success' ? (
                <CheckCircle size={16} className="mr-2" />
              ) : (
                <AlertCircle size={16} className="mr-2" />
              )}
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;