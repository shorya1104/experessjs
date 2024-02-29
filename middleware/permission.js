const ac = require("./role.js")

const grantAccess = (action, resource) => {
    return async (req, res, next) => {
        try {
            // Permission to perform the specified action of the provided resource
            console.log(req.user.role);
            console.log(action);
            console.log(resource);
            const permission = ac.can(req.user.role)[action](resource)
            // No permission => 401
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {
    grantAccess,
}