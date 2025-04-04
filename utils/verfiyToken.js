import jwt from "jsonwebtoken";
import { errorHandle } from "./errorHandle.js";

export const verfiyToken = (req, res, next) => {
  const token = req.cookie.access_token;
  if (!token)
    return next(errorHandle(401, "Sorry, you are not authenticated."));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandle(403, "Token is not valid, login again."));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verfiyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      return next();
    } else {
      return next(errorHandle(403, "You are not authorized."));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verfiyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      return next();
    } else {
      return next(errorHandle(403, "You are not authorized."));
    }
  });
};
