import { Router, Response } from 'express';
import db from '../db';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// Get all content
router.get('/api/content', (req: AuthRequest, res: Response) => {
  const allContent = db.prepare('SELECT * FROM site_content ORDER BY section, key').all();
  res.json(allContent);
});

// Get content by section
router.get('/api/content/section/:section', (req: AuthRequest, res: Response) => {
  const { section } = req.params;
  const content = db
    .prepare('SELECT * FROM site_content WHERE section = ? ORDER BY id ASC')
    .all(section);
  res.json(content);
});

// Update or create content (protected)
router.put('/api/content/:section/:key', authMiddleware, (req: AuthRequest, res: Response) => {
  const { section, key } = req.params;
  const { value } = req.body;

  if (value === undefined) {
    return res.status(400).json({ error: 'Value is required' });
  }

  const existing = db
    .prepare('SELECT * FROM site_content WHERE section = ? AND key = ?')
    .get(section, key);

  if (existing) {
    db.prepare('UPDATE site_content SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE section = ? AND key = ?')
      .run(value, section, key);
  } else {
    db.prepare('INSERT INTO site_content (section, key, value) VALUES (?, ?, ?)')
      .run(section, key, value);
  }

  const updated = db
    .prepare('SELECT * FROM site_content WHERE section = ? AND key = ?')
    .get(section, key);

  res.json(updated);
});

// Bulk update content for a section (protected)
router.put('/api/content/:section', authMiddleware, (req: AuthRequest, res: Response) => {
  const { section } = req.params;
  const entries = req.body;

  if (typeof entries !== 'object' || Array.isArray(entries)) {
    return res.status(400).json({ error: 'Key-value object is required' });
  }

  const upsertStmt = db.prepare(`
    INSERT INTO site_content (section, key, value) VALUES (?, ?, ?)
    ON CONFLICT(section, key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
  `);

  const upsertMany = db.transaction((items: { key: string; value: string }[]) => {
    for (const { key, value } of items) {
      upsertStmt.run(section, key, value);
    }
  });

  const items = Object.entries(entries).map(([key, value]) => ({
    key,
    value: typeof value === 'string' ? value : JSON.stringify(value),
  }));

  upsertMany(items);

  const updated = db
    .prepare('SELECT * FROM site_content WHERE section = ? ORDER BY id')
    .all(section);

  res.json(updated);
});

export default router;
