import jwt from 'jsonwebtoken';

export const adminOnly = (req, res, next) => {
  const admin = req.cookies?.admin;

  if (!admin) {
    return res.status(401).json({ authentication: false });
  }

  try {
    const verified = jwt.verify(admin, process.env.jwtsecret);
    req.admin = verified;
    next();
  } catch (error) {
    return res.status(401).json({ authentication: false });
  }
};

export const userOnly = (req, res, next) => {
  const token = req.cookies?.user;

  if (!token) {
    return res.status(401).json({ success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtsecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false });
  }
};
