import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['attendee', 'organizer', 'admin'], default: 'attendee' },
  createdEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
}, { timestamps: true });

// FIXED: Removed 'next' from the async function
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;

  // Hash the password only if it has been modified (or is new)
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

export const User = mongoose.model('User', userSchema);