const isProvider = (req, res, next) => {

    if (req.user.role !== "provider") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Providers only."
        });
    }

    next();
};

module.exports = isProvider;