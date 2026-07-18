const isAdmin = (req, res, next) => {

    console.log("req.user:", req.user);

    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admins only."
        });
    }

    console.log("Admin verified!");

    next();
};

module.exports = isAdmin;