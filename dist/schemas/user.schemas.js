"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const UserSchema = (0, zod_1.object)({
    name: (0, zod_1.string)({ required_error: "Name is required" }),
    email: (0, zod_1.string)({ required_error: "Email is required" }).email({ message: "Invalid email" }),
    password: (0, zod_1.string)({ required_error: "Password is required" }).min(8, "Password must be at least 6 characters"),
    role: zod_1.z.enum(["asistente", "organizador"], { required_error: "role is required" })
});
exports.default = UserSchema;
