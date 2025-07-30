import Category from '../models/category.models.js';

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, color } = req.body;
    const userId = req.user?._id || req.body.userId; // Try to get from auth, fallback to body
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    if (!userId) {
      return res.status(400).json({ message: 'User Id is required' });
    }
    const category = new Category({ name, color, userId });
    await category.save();
    res.status(201).json({ success: true, data: { category } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, data: { categories } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, color },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ success: true, data: { category } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
