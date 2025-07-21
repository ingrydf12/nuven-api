import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email}, // Payload
    process.env.JWT_SECRET, 
    { expiresIn: '2h' } 
  );
};

export default generateToken;