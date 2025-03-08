const checkRole = (role) => {
    return (req, res, next) => {
      // Get the user's role from the request object (set by auth middleware)
      const userRole = req.user.role;
  
      // Compare the user's role with the required role
      if (!role.includes(userRole)) {
        return res.status(403).json({
          message: "Access denied: Insufficient permissions",
          requiredRole: role,
          userRole: userRole,
          details: `This action requires ${role} privileges, but you are a ${userRole}`,
        });
      }
  
      // If roles match, allow the request to proceed
      next();
    };
  };
  
  module.exports = checkRole;
  