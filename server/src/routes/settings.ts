import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../db';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// Get current user profile
router.get('/api/settings/profile', authMiddleware, (req: AuthRequest, res: Response) => {
  const user = db.prepare('SELECT id, email, display_name, avatar_url, phone, address, role, created_at FROM users WHERE id = ?').get(req.user!.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// Update profile
router.put('/api/settings/profile', authMiddleware, (req: AuthRequest, res: Response) => {
  const { display_name, email, phone, address, avatar_url } = req.body;

  // Check if email is already taken by another user
  if (email) {
    const existing = db.prepare('SELECT id FROM users WHERE email = ? AND id != ?').get(email, req.user!.id);
    if (existing) {
      return res.status(409).json({ error: 'Email already in use' });
    }
  }

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user!.id) as any;
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  db.prepare(`
    UPDATE users
    SET display_name = ?, email = ?, phone = ?, address = ?, avatar_url = ?
    WHERE id = ?
  `).run(
    display_name !== undefined ? display_name : user.display_name,
    email !== undefined ? email : user.email,
    phone !== undefined ? phone : user.phone,
    address !== undefined ? address : user.address,
    avatar_url !== undefined ? avatar_url : user.avatar_url,
    req.user!.id
  );

  const updated = db.prepare('SELECT id, email, display_name, avatar_url, phone, address, role FROM users WHERE id = ?').get(req.user!.id);
  res.json(updated);
});

// Change password
router.post('/api/settings/change-password', authMiddleware, (req: AuthRequest, res: Response) => {
  const { current_password, new_password } = req.body;

  if (!current_password || !new_password) {
    return res.status(400).json({ error: 'Current password and new password are required' });
  }

  if (new_password.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters' });
  }

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user!.id) as any;
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const isValid = bcrypt.compareSync(current_password, user.password_hash);
  if (!isValid) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }

  const newHash = bcrypt.hashSync(new_password, 10);
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(newHash, req.user!.id);

  res.json({ message: 'Password changed successfully' });
});

export default router;
