import { Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response) => {
  try {
    console.log('📝 Registering user:', req.body.email); // Check if this shows in terminal
    const { name, email, password, role } = req.body;

    // 1. Basic Validation
    if (!name || !email || !password) {
      return res.status(400).send({ error: 'Please provide name, email, and password' });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ User already exists:', email);
      return res.status(400).send({ error: 'User already exists' });
    }

    // 3. Create User (password hashing is handled in User model)
    const user = new User({ name, email, password, role });
    await user.save();

    // 4. Generate Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret'
    );

    console.log('✅ User registered successfully:', email);
    res.status(201).send({ user, token });
  } catch (error: any) {
    console.error('❌ Registration Error:', error);
    res.status(500).send({ error: error.message || 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret'
    );

    console.log('🔑 User logged in:', email);
    res.send({ user, token });
  } catch (error: any) {
    console.error('❌ Login Error:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};
