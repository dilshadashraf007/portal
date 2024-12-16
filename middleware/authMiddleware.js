const jwt = require('jsonwebtoken');
const express=require('express');


const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;