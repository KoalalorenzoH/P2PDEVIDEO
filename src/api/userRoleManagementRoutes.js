// src/api/userRoleManagementRoutes.js
// API routes for user role management

const express = require('express');
const router = express.Router();

const userRoleManagementController = require('../controllers/userRoleManagementController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

/**
 * Route: GET /user-roles
 * Description: Get list of all user roles
 * Access: Admin only
 */
router.get(
  '/',
  authenticateToken,
  authorizeRoles('admin'),
  userRoleManagementController.getAllUserRoles
);

/**
 * Route: GET /user-roles/:id
 * Description: Get a specific user role by ID
 * Access: Admin only
 */
router.get(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  userRoleManagementController.getUserRoleById
);

/**
 * Route: POST /user-roles
 * Description: Create a new user role
 * Access: Admin only
 */
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin'),
  userRoleManagementController.createUserRole
);

/**
 * Route: PUT /user-roles/:id
 * Description: Update an existing user role by ID
 * Access: Admin only
 */
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  userRoleManagementController.updateUserRole
);

/**
 * Route: DELETE /user-roles/:id
 * Description: Delete a user role by ID
 * Access: Admin only
 */
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  userRoleManagementController.deleteUserRole
);

module.exports = router;
