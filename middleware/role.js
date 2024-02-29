// server/roles.js
const AccessControl = require("accesscontrol");
const ac = new AccessControl();


ac.grant("student")
    .readOwn("profile")
    .updateOwn("profile")
    .deleteOwn("profile")
    .grant("teacher")
    .extend("student")
    .readAny(["profile"])
    .grant("admin")
    .extend(["student", "teacher"])
    .updateAny("profile")
    .deleteAny("profile")

module.exports = ac;