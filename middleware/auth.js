exports.isVerified = async (req, res, next) => {
    if (!req.user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Access Denied! :("
      });
    }
    next();
  };
