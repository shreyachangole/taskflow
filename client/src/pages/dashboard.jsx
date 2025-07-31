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
  Sun,
  Home,
  Folder
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
  const userId = user?._id;

  // Everything for the token and axiosconfig for every api
  const token = localStorage.getItem('token');
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  // State management
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
  const [categories, setCategories] = useState([]);
  // Fetch categories from backend
  useEffect(() => {
    if (!token) return;
    axios.get('/api/categories', axiosConfig)
      .then(res => {
        if (res.data && res.data.data && Array.isArray(res.data.data.categories)) {
          // Add count property for UI
          const cats = res.data.data.categories.map(cat => ({
            ...cat,
            id: cat._id || cat.id,
            count: tasks.filter(task => task.category === cat.name && !task.archived).length
          }));
          setCategories(cats);
        }
      })
      .catch(err => {
        showNotification('Error fetching categories', 'error');
      });
    // eslint-disable-next-line
  }, [token]);

  const [currentView, setCurrentView] = useState('dashboard');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'kanban'
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [filterBy, setFilterBy] = useState('all');
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

  // Update category counts when tasks change
  useEffect(() => {
    setCategories(prev => prev.map(cat => ({
      ...cat,
      count: tasks.filter(task => task.category === cat.name && !task.archived).length
    })));
  }, [tasks]);

  // Notification system
  const showNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  // Modal handlers
  const openTaskModal = (task = null) => {
    if (task) {
      setEditingTask(task);
      setTaskForm({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        priority: task.priority || 'medium',
        category: task.category || ''
      });
    } else {
      setEditingTask(null);
      setTaskForm({ title: '', description: '', dueDate: '', priority: 'medium', category: '' });
    }
    setShowTaskModal(true);
  };

  const openTaskDetailsModal = (task) => {
    setSelectedTask(task);
    setShowTaskDetailsModal(true);
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

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filterBy === 'all') return !task.archived;
    if (filterBy === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return !task.archived && task.dueDate && task.dueDate.split('T')[0] === today;
    }
    if (filterBy === 'upcoming') {
      const today = new Date();
      return !task.archived && task.dueDate && new Date(task.dueDate) > today;
    }
    if (filterBy === 'completed') return task.completed && !task.archived;
    if (filterBy === 'archived') return task.archived;
    return !task.archived && task.category === filterBy;
  });

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

    const newTask = {
      title: taskForm.title.trim(),
      description: taskForm.description.trim(),
      dueDate: taskForm.dueDate || undefined,
      priority: taskForm.priority || 'medium',
      category: taskForm.category || 'general',
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
    if (!editingTask) return;
    axios.put(`/api/todos/${editingTask.id}`, taskForm, axiosConfig)
      .then(res => {
        const updatedTask = res.data.data.todo;
        setTasks(prev => prev.map(task =>
          task.id === updatedTask._id || task.id === updatedTask.id ? { ...task, ...updatedTask, id: updatedTask._id || updatedTask.id } : task
        ));
        setEditingTask(null);
        setTaskForm({ title: '', description: '', dueDate: '', priority: 'medium', category: '' });
        setShowTaskModal(false);
        showNotification('Task updated successfully!');
      })
      .catch(err => {
        const msg = err?.response?.data?.message || 'Error updating task';
        showNotification(msg, 'error');
      });
  };

  const toggleTaskComplete = (taskId) => {
    axios.patch(`/api/todos/${taskId}/toggle`, {}, axiosConfig)
      .then(res => {
        const updatedTask = res.data.data.todo;
        setTasks(prev => prev.map(task =>
          task.id === updatedTask._id || task.id === updatedTask.id ? { ...task, ...updatedTask, id: updatedTask._id || updatedTask.id } : task
        ));
        showNotification(`Task ${updatedTask.completed ? 'completed' : 'marked as incomplete'}!`);
      })
      .catch(err => {
        const msg = err?.response?.data?.message || 'Error toggling task';
        showNotification(msg, 'error');
      });
  };

  const deleteTask = (taskId) => {
    axios.delete(`/api/todos/${taskId}`, axiosConfig)
      .then(() => {
        setTasks(prev => prev.filter(task => task.id !== taskId));
        showNotification('Task deleted successfully!');
      })
      .catch(err => {
        const msg = err?.response?.data?.message || 'Error deleting task';
        showNotification(msg, 'error');
      });
  };

  const archiveTask = (taskId) => {
    axios.patch(`/api/todos/${taskId}`, { archived: true }, axiosConfig)
      .then(res => {
        const updatedTask = res.data.data.todo;
        setTasks(prev => prev.map(task =>
          task.id === updatedTask._id || task.id === updatedTask.id ? { ...task, ...updatedTask, id: updatedTask._id || updatedTask.id } : task
        ));
        showNotification('Task archived successfully!');
      })
      .catch(err => {
        const msg = err?.response?.data?.message || 'Error archiving task';
        showNotification(msg, 'error');
      });
  };

  // Category operations
  // Helper to map Tailwind color class to hex
  const tailwindToHex = (tw) => {
    const map = {
      'bg-blue-500': '#3b82f6',
      'bg-purple-500': '#a21caf',
      'bg-green-500': '#22c55e',
      'bg-orange-500': '#f97316',
      'bg-red-500': '#ef4444',
      'bg-pink-500': '#ec4899',
      'bg-indigo-500': '#6366f1',
      'bg-yellow-500': '#eab308'
    };
    return map[tw] || '#3b82f6';
  };

  const addCategory = () => {
    if (!categoryForm.name.trim()) {
      showNotification('Please enter a category name', 'error');
      return;
    }

    axios.post('/api/categories', {
      name: categoryForm.name.trim(),
      color: tailwindToHex(categoryForm.color),
      userId: userId
    }, axiosConfig)
      .then(res => {
        const cat = res.data.data.category;
        setCategories(prev => ([
          ...prev,
          { ...cat, id: cat._id || cat.id, count: 0 }
        ]));
        setCategoryForm({ name: '', color: 'bg-blue-500' });
        setShowCategoryModal(false);
        showNotification('Category added successfully!');
      })
      .catch(err => {
        const msg = err?.response?.data?.message || 'Error adding category';
        showNotification(msg, 'error');
      });
  };

  const updateCategory = () => {
    if (!editingCategory) return;
    setCategories(prev => prev.map(cat =>
      cat.id === editingCategory.id ? { ...cat, ...categoryForm } : cat
    ));
    setEditingCategory(null);
    setCategoryForm({ name: '', color: 'bg-blue-500' });
    setShowCategoryModal(false);
    showNotification('Category updated successfully!');
  };

  const deleteCategory = (categoryId) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    showNotification('Category deleted successfully!');
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

  // Compute stats for dashboard cards
  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed && !t.archived).length;
    const overdue = tasks.filter(t => !t.completed && !t.archived && t.dueDate && new Date(t.dueDate) < new Date()).length;
    const archived = tasks.filter(t => t.archived).length;
    return { total, completed, overdue, archived };
  };
  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-800 text-white mt-10 rounded-lg shadow-lg">
      {/* Hamburger Menu Button - Fixed position on left for mobile */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 p-3 bg-blue-700 rounded-xl shadow-xl hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-800 transition-all duration-200 md:hidden"
        aria-label="Toggle menu"
      >
        <Menu size={24} className="text-white" />
      </button>

      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          bg-blue-900 border-r border-blue-800 shadow-2xl
          md:static md:translate-x-0 md:w-72
        `}>
          <div className="h-full flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-blue-800 scrollbar-track-blue-900">
            {/* Sidebar Header */}
            <div className="px-6 py-6 border-b border-blue-800 sticky top-0 bg-gray-900 z-10">
              <div className="flex items-center justify-between">
    
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 md:hidden"
                >
                  <X size={22} />
                </button>
              </div>
              {/* User Info */}
              <div className="mt-6 flex items-center gap-3 p-3 bg-blue-800/60 rounded-xl border border-blue-700/50 shadow-inner">
                <div className="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-base font-semibold">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-400">Welcome back!</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="px-4 py-4 bg-gray-900 ">
              <div className="space-y-2">
                <button
                  onClick={() => { setCurrentView('dashboard'); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-base font-semibold transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-blue-600/20
                    ${currentView === 'dashboard' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' : 'hover:bg-gray-800/80 hover:scale-[1.03]'}
                  `}
                >
                  <Home size={18} className="mr-2" />
                  Dashboard
                </button>
                <button
                  onClick={() => { setCurrentView('tasks'); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-base font-semibold transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-blue-600/20
                    ${currentView === 'tasks' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' : 'hover:bg-gray-800/80 hover:scale-[1.03]'}
                  `}
                >
                  <CheckSquare size={18} className="mr-2" />
                  Tasks
                </button>
                <button
                  onClick={() => { setCurrentView('categories'); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-base font-semibold transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-blue-600/20
                    ${currentView === 'categories' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' : 'hover:bg-gray-800/80 hover:scale-[1.03]'}
                  `}
                >
                  <Folder size={18} className="mr-2" />
                  Categories
                </button>
              </div>
            </div>

            <div className="flex-1 px-4 py-4 overflow-y-auto scrollbar-thin bg-gray-900 scrollbar-thumb-gray-800 scrollbar-track-gray-900">
              <div className="space-y-2">
                <button
                  onClick={() => { setFilterBy('all'); setCurrentView('tasks'); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    filterBy === 'all' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'
                  }`}
                >
                  All Tasks
                </button>
                <button
                  onClick={() => { setFilterBy('today'); setCurrentView('tasks'); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    filterBy === 'today' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => { setFilterBy('upcoming'); setCurrentView('tasks'); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    filterBy === 'upcoming' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => { setFilterBy('completed'); setCurrentView('tasks'); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    filterBy === 'completed' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'
                  }`}
                >
                  Completed
                </button>
              </div>

              <div className="mt-8">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Categories
                </h3>
                <div className="space-y-1">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => { setFilterBy(category.name); setCurrentView('tasks'); setSidebarOpen(false); }}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors text-left ${
                        filterBy === category.name ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${category.color} mr-3`}></div>
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <span className="text-xs text-gray-400">{category.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-4 py-4 border-t border-blue-800 bg-gray-900">
              <button
                onClick={() => openCategoryModal()}
                className="w-full flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
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
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
            {/* Dashboard View */}
            {currentView === 'dashboard' && (
              <div>
                <div className="mb-6 sm:mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">Dashboard</h1>
                  <p className="text-gray-400 text-sm sm:text-base">Welcome back! Here's your productivity overview.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-800">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-blue-500 bg-opacity-20">
                        <CheckSquare className="text-blue-500" size={20} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-400">Total Tasks</p>
                        <p className="text-xl sm:text-2xl font-bold">{stats.total}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-800">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-green-500 bg-opacity-20">
                        <CheckCircle className="text-green-500" size={20} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-400">Completed</p>
                        <p className="text-xl sm:text-2xl font-bold">{stats.completed}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-800 sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-red-500 bg-opacity-20">
                        <AlertCircle className="text-red-500" size={20} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-400">Overdue</p>
                        <p className="text-xl sm:text-2xl font-bold">{stats.overdue}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Tasks */}
                <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold">Recent Tasks</h2>
                    <button
                      onClick={() => setCurrentView('tasks')}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    {tasks.filter(task => !task.archived).slice(0, 5).map(task => (
                      <div
                        key={task.id}
                        className="flex items-center space-x-3 sm:space-x-4 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                        onClick={() => openTaskDetailsModal(task)}
                      >
                        <button
                          onClick={e => { e.stopPropagation(); toggleTaskComplete(task.id); }}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            task.completed
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-400 hover:border-green-400'
                          }`}
                        >
                          {task.completed && <CheckCircle size={12} className="text-white" />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium truncate ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                          </p>
                          <div className="flex items-center space-x-2 sm:space-x-4 mt-1 flex-wrap">
                            {task.category && (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                categories.find(c => c.name === task.category)?.color || 'bg-gray-500'
                              } text-white`}>
                                {task.category}
                              </span>
                            )}
                            {task.dueDate && (
                              <span className="text-xs text-gray-400 flex items-center">
                                <Calendar size={12} className="mr-1" />
                                {new Date(task.dueDate).toLocaleDateString()}
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                      {filterBy === 'all' && 'All Tasks'}
                      {filterBy === 'today' && 'Today\'s Tasks'}
                      {filterBy === 'upcoming' && 'Upcoming Tasks'}
                      {filterBy === 'completed' && 'Completed Tasks'}
                      {categories.find(c => c.name === filterBy) && `${filterBy} Tasks`}
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base">{filteredTasks.length} tasks</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex rounded-lg overflow-hidden border border-gray-600">
                      <button
                        onClick={() => setViewMode('list')}
                        className={`px-3 py-2 text-sm font-medium transition-colors ${
                          viewMode === 'list' ? 'bg-blue-500 text-white' : 'hover:bg-gray-700'
                        }`}
                      >
                        <List size={16} />
                      </button>
                      <button
                        onClick={() => setViewMode('kanban')}
                        className={`px-3 py-2 text-sm font-medium transition-colors ${
                          viewMode === 'kanban' ? 'bg-blue-500 text-white' : 'hover:bg-gray-700'
                        }`}
                      >
                        <Grid size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => openTaskModal()}
                      className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center text-sm"
                    >
                      <Plus size={16} className="mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Add Task</span>
                      <span className="sm:hidden">Add</span>
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
                        <div
                          key={task.id}
                          className="bg-gray-900 rounded-lg border border-gray-800 p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() => openTaskDetailsModal(task)}
                        >
                          <div className="flex items-start space-x-3 sm:space-x-4">
                            <button
                              onClick={e => { e.stopPropagation(); toggleTaskComplete(task.id); }}
                              className={`w-5 sm:w-6 h-5 sm:h-6 rounded border-2 flex items-center justify-center transition-colors mt-1 ${
                                task.completed
                                  ? 'bg-green-500 border-green-500'
                                  : 'border-gray-400 hover:border-green-400'
                              }`}
                            >
                              {task.completed && <CheckCircle size={14} className="text-white" />}
                            </button>
                            <div className="flex-1 min-w-0">
                              <h3 className={`text-base sm:text-lg font-semibold mb-2 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                                {task.title}
                              </h3>
                              {task.description && (
                                <p className="text-gray-400 mb-3 text-sm sm:text-base line-clamp-2">{task.description}</p>
                              )}
                              <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap gap-2">
                                {task.category && (
                                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                                    categories.find(c => c.name === task.category)?.color || 'bg-gray-500'
                                  } text-white`}>
                                    {task.category}
                                  </span>
                                )}
                                {task.dueDate && (
                                  <span className="text-xs sm:text-sm text-gray-400 flex items-center">
                                    <Calendar size={12} className="mr-1" />
                                    {new Date(task.dueDate).toLocaleDateString()}
                                  </span>
                                )}
                                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${priorityColors[task.priority]}`}>
                                  {task.priority}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                              <button
                                onClick={e => { e.stopPropagation(); openTaskModal(task); }}
                                className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
                                aria-label="Edit task"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={e => { e.stopPropagation(); deleteTask(task.id); }}
                                className="p-1.5 sm:p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
                                aria-label="Delete task"
                              >
                                <Trash2 size={14} />
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
                  <div className="overflow-x-auto">
                    {filteredTasks.length === 0 ? (
                      <div className="text-center text-gray-400 py-8">No tasks found.</div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 min-w-full">
                        {['todo', 'in-progress', 'done'].map(status => {
                          const statusTasks = filteredTasks.filter(task => {
                            if (status === 'todo') return !task.completed && task.status !== 'in-progress';
                            if (status === 'in-progress') return task.status === 'in-progress';
                            if (status === 'done') return task.completed;
                            return false;
                          });
                          
                          return (
                            <div
                              key={status}
                              className="bg-gray-900 rounded-lg border border-gray-800 p-4 sm:p-6 flex flex-col min-h-[300px]"
                            >
                              <h3 className="font-semibold mb-4 capitalize text-sm sm:text-base">
                                {status === 'in-progress' ? 'In Progress' : status === 'todo' ? 'To Do' : 'Done'}
                                <span className="ml-2 text-sm text-gray-400">
                                  ({statusTasks.length})
                                </span>
                              </h3>
                              <div className="space-y-3 flex-1">
                                {statusTasks.length === 0 ? (
                                  <div className="text-gray-500 text-sm">No tasks</div>
                                ) : (
                                  statusTasks.map(task => (
                                    <div 
                                      key={task.id} 
                                      className="bg-gray-800 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow cursor-pointer"
                                      onClick={() => openTaskDetailsModal(task)}
                                    >
                                      <div className="flex items-start justify-between mb-2">
                                        <h4 className={`font-medium text-sm sm:text-base ${task.completed ? 'line-through text-gray-500' : ''} pr-2`}>
                                          {task.title}
                                        </h4>
                                        <div className="flex space-x-1 flex-shrink-0">
                                          <button
                                            onClick={e => { e.stopPropagation(); openTaskModal(task); }}
                                            className="p-1 text-gray-400 hover:text-blue-400 hover:bg-gray-900 transition-colors"
                                          >
                                            <Edit size={12} />
                                          </button>
                                          <button
                                            onClick={e => { e.stopPropagation(); deleteTask(task.id); }}
                                            className="p-1 text-gray-400 hover:text-red-400 hover:bg-gray-900 transition-colors"
                                          >
                                            <Trash2 size={12} />
                                          </button>
                                        </div>
                                      </div>
                                      {task.description && (
                                        <p className="text-xs sm:text-sm text-gray-400 mb-3 line-clamp-2">{task.description}</p>
                                      )}
                                      <div className="flex items-center justify-between flex-wrap gap-2">
                                        <div className="flex items-center space-x-2">
                                          {task.category && (
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                                              categories.find(c => c.name === task.category)?.color || 'bg-gray-500'
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
                                            <Calendar size={10} className="mr-1" />
                                            {new Date(task.dueDate).toLocaleDateString()}
                                          </span>
                                        )}
                                      </div>
                                      <div className="mt-3 flex items-center">
                                        <button
                                          onClick={e => { e.stopPropagation(); toggleTaskComplete(task.id); }}
                                          className={`flex items-center text-xs sm:text-sm font-medium transition-colors ${
                                            task.completed
                                              ? 'text-green-400 hover:text-green-300'
                                              : 'text-gray-400 hover:text-green-400'
                                          }`}
                                        >
                                          <CheckCircle size={14} className="mr-1" />
                                          {task.completed ? 'Completed' : 'Mark Complete'}
                                        </button>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Categories View */}
            {currentView === 'categories' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">Categories</h1>
                    <p className="text-gray-400 text-sm sm:text-base">Manage your task categories</p>
                  </div>

                  <button
                    onClick={() => openCategoryModal()}
                    className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center text-sm self-start sm:self-auto"
                  >
                    <Plus size={16} className="mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Add Category</span>
                    <span className="sm:hidden">Add</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {categories.map(category => (
                    <div key={category.id} className="bg-gray-900 rounded-lg border border-gray-800 p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center min-w-0 flex-1">
                          <div className={`w-3 sm:w-4 h-3 sm:h-4 rounded-full ${category.color} mr-2 sm:mr-3 flex-shrink-0`}></div>
                          <h3 className="text-base sm:text-lg font-semibold truncate">{category.name}</h3>
                        </div>
                        <div className="flex space-x-1 sm:space-x-2 flex-shrink-0 ml-2">
                          <button
                            onClick={() => openCategoryModal(category)}
                            className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
                            aria-label="Edit category"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => deleteCategory(category.id)}
                            className="p-1.5 sm:p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
                            aria-label="Delete category"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">{category.count}</p>
                        <p className="text-xs sm:text-sm text-gray-400">
                          {category.count === 1 ? 'task' : 'tasks'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-950 rounded-2xl w-full max-w-md max-h-[90vh]  shadow-2xl border border-blue-800">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 rounded-t-2xl bg-blue-800 border-b border-blue-700 sticky top-0 z-10">
              <h2 className="text-xl font-bold tracking-tight text-white">{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
              <button
                onClick={() => setShowTaskModal(false)}
                className="p-2 hover:bg-blue-900 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            <form className="p-6 space-y-6">
              {/* Title */}
              <div className="relative">
                <input
                  type="text"
                  value={taskForm.title}
                  onChange={e => setTaskForm({ ...taskForm, title: e.target.value })}
                  className="peer w-full px-4 pt-6 pb-2 border-2 border-blue-800 bg-blue-900 text-white rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 placeholder-transparent text-base transition-all"
                  placeholder="Title *"
                  required
                />
                <label className="absolute left-4 top-2 text-sm text-blue-200 font-medium pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-200">
                  Title *
                </label>
              </div>

              {/* Description */}
              <div className="relative">
                <textarea
                  value={taskForm.description}
                  onChange={e => setTaskForm({ ...taskForm, description: e.target.value })}
                  rows={3}
                  className="peer w-full px-4 pt-6 pb-2 border-2 border-blue-800 bg-blue-900 text-white rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 placeholder-transparent text-base resize-none transition-all"
                  placeholder="Description"
                />
                <label className="absolute left-4 top-2 text-sm text-blue-200 font-medium pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-200">
                  Description
                </label>
              </div>

              {/* Due Date */}
              <div className="relative">
                <input
                  type="date"
                  value={taskForm.dueDate}
                  onChange={e => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="peer w-full px-4 pt-6 pb-2 border-2 border-blue-800 bg-blue-900 text-white rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 placeholder-transparent text-base transition-all"
                  placeholder="Due Date"
                />
                <label className="absolute left-4 top-2 text-sm text-blue-200 font-medium pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-200">
                  Due Date
                </label>
              </div>

              {/* Priority */}
              <div className="relative">
                <select
                  value={taskForm.priority}
                  onChange={e => setTaskForm({ ...taskForm, priority: e.target.value })}
                  className="peer w-full px-4 pt-6 pb-2 border-2 border-blue-800 bg-blue-900 text-white rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-base transition-all appearance-none"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <label className="absolute left-4 top-2 text-sm text-blue-200 font-medium pointer-events-none transition-all peer-focus:text-blue-200">
                  Priority
                </label>
              </div>

              {/* Category */}
              <div className="relative">
                <select
                  value={taskForm.category}
                  onChange={e => setTaskForm({ ...taskForm, category: e.target.value })}
                  className="peer w-full px-4 pt-6 pb-2 border-2 border-blue-800 bg-blue-900 text-white rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-base transition-all appearance-none"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))}
                </select>
                <label className="absolute left-4 top-2 text-sm text-blue-200 font-medium pointer-events-none transition-all peer-focus:text-blue-200">
                  Category
                </label>
              </div>
            </form>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-2 sm:space-x-3 px-6 py-5 border-t border-blue-800 bg-blue-950 rounded-b-2xl">
              <button
                onClick={editingTask ? updateTask : addTask}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-base shadow-md"
              >
                {editingTask ? 'Update Task' : 'Add Task'}
              </button>
              <button
                onClick={() => setShowTaskModal(false)}
                className="px-4 py-2 border-2 border-blue-800 text-blue-200 rounded-xl font-semibold hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-base"
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
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-800">
              <h2 className="text-lg sm:text-xl font-semibold">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
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
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${color} border-2 transition-all ${
                        categoryForm.color === color ? 'border-white scale-110' : 'border-gray-800'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:space-x-3 p-4 sm:p-6 border-t border-gray-800">
              <button
                onClick={editingCategory ? updateCategory : addCategory}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
              >
                {editingCategory ? 'Update Category' : 'Add Category'}
              </button>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Details Modal */}
      {showTaskDetailsModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-800 sticky top-0 bg-gray-900">
              <h2 className="text-lg sm:text-xl font-semibold">Task Details</h2>
              <button
                onClick={() => setShowTaskDetailsModal(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <span className="block text-xs text-gray-400 mb-1">Title</span>
                <div className="text-base sm:text-lg font-bold mb-2">{selectedTask.title}</div>
              </div>
              <div>
                <span className="block text-xs text-gray-400 mb-1">Description</span>
                <div className="text-gray-300 mb-2 text-sm sm:text-base">{selectedTask.description || '—'}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs text-gray-400 mb-1">Due Date</span>
                  <div className="text-gray-300 text-sm">
                    {selectedTask.dueDate ? new Date(selectedTask.dueDate).toLocaleDateString() : '—'}
                  </div>
                </div>
                <div>
                  <span className="block text-xs text-gray-400 mb-1">Priority</span>
                  <div className={`inline-block px-2 py-1 rounded text-xs font-medium border ${priorityColors[selectedTask.priority]}`}>
                    {selectedTask.priority}
                  </div>
                </div>
              </div>
              <div>
                <span className="block text-xs text-gray-400 mb-1">Category</span>
                <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  categories.find(c => c.name === selectedTask.category)?.color || 'bg-gray-500'
                } text-white`}>
                  {selectedTask.category || '—'}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs text-gray-400 mb-1">Status</span>
                  <div className="text-gray-300 text-sm">{selectedTask.completed ? 'Completed' : 'Pending'}</div>
                </div>
                <div>
                  <span className="block text-xs text-gray-400 mb-1">Created</span>
                  <div className="text-gray-300 text-sm">
                    {selectedTask.createdAt ? new Date(selectedTask.createdAt).toLocaleDateString() : '—'}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex p-4 sm:p-6 border-t border-gray-800">
              <button
                onClick={() => setShowTaskDetailsModal(false)}
                className="flex-1 px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Add Task Button - Only visible on mobile when in tasks view */}
      {currentView === 'tasks' && (
        <button
          onClick={() => openTaskModal()}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center z-40 md:hidden"
          aria-label="Add new task"
        >
          <Plus size={24} />
        </button>
      )}

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`px-4 py-3 rounded-lg shadow-lg transition-all transform ${
              notification.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            <div className="flex items-center">
              {notification.type === 'success' ? (
                <CheckCircle size={16} className="mr-2 flex-shrink-0" />
              ) : (
                <AlertCircle size={16} className="mr-2 flex-shrink-0" />
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
