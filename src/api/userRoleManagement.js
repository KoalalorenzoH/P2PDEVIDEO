// src/api/userRoleManagement.js

import express from 'express';
import userRoleManagementController from '../controllers/userRoleManagementController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleValidationMiddleware from '../middleware/roleValidationMiddleware.js';

const router = express.Router();

/**
 * @route   GET /api/user-roles
 * @desc    Get all user roles
 * @access  Protected (admin or authorized roles)
 */
router.get(
  '/',
  authMiddleware.verifyToken,
  roleValidationMiddleware.ensureAdmin,
  userRoleManagementController.getAllUserRoles
);

/**
 * @route   GET /api/user-roles/:id
 * @desc    Get user role by ID
 * @access  Protected (admin or authorized roles)
 */
router.get(
  '/:id',
  authMiddleware.verifyToken,
  roleValidationMiddleware.ensureAdmin,
  userRoleManagementController.getUserRoleById
);

/**
 * @route   POST /api/user-roles
 * @desc    Create a new user role
 * @access  Protected (admin only)
 */
router.post(
  '/',
  authMiddleware.verifyToken,
  roleValidationMiddleware.ensureAdmin,
  roleValidationMiddleware.validateRoleCreation,
  userRoleManagementController.createUserRole
);

/**
 * @route   PUT /api/user-roles/:id
 * @desc    Update an existing user role
 * @access  Protected (admin only)
 */
router.put(
  '/:id',
  authMiddleware.verifyToken,
  roleValidationMiddleware.ensureAdmin,
  roleValidationMiddleware.validateRoleUpdate,
  userRoleManagementController.updateUserRole
);

/**
 * @route   DELETE /api/user-roles/:id
 * @desc    Delete a user role
 * @access  Protected (admin only)
 */
router.delete(
  '/:id',
  authMiddleware.verifyToken,
  roleValidationMiddleware.ensureAdmin,
  userRoleManagementController.deleteUserRole
);

export default router;
