import express from 'express';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';
// import auth from '../middleware/auth.js'; // Uncomment to protect routes

const router = express.Router();

// Public or protected routes (add auth middleware if needed)
router.post('/', /*auth,*/ createCategory);
router.get('/', /*auth,*/ getCategories);
router.put('/:id', /*auth,*/ updateCategory);
router.delete('/:id', /*auth,*/ deleteCategory);

export default router;
