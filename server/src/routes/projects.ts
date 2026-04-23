import { Router, Response } from 'express';
import db from '../db';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// Get all projects
router.get('/api/projects', (req: AuthRequest, res: Response) => {
  const projects = db.prepare('SELECT * FROM projects ORDER BY display_order ASC, created_at DESC').all();
  res.json(projects);
});

// Get single project
router.get('/api/projects/:id', (req: AuthRequest, res: Response) => {
  const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

// Create project (protected)
router.post('/api/projects', authMiddleware, (req: AuthRequest, res: Response) => {
  const { title, category, location, description, image_url, is_featured, display_order } = req.body;

  if (!title || !category) {
    return res.status(400).json({ error: 'Title and category are required' });
  }

  const stmt = db.prepare(`
    INSERT INTO projects (title, category, location, description, image_url, is_featured, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    title,
    category,
    location || null,
    description || null,
    image_url || null,
    is_featured ? 1 : 0,
    display_order || 0
  );

  const newProject = db.prepare('SELECT * FROM projects WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(newProject);
});

// Update project (protected)
router.put('/api/projects/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  const { title, category, location, description, image_url, is_featured, display_order } = req.body;

  const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const stmt = db.prepare(`
    UPDATE projects
    SET title = ?, category = ?, location = ?, description = ?,
        image_url = ?, is_featured = ?, display_order = ?
    WHERE id = ?
  `);

  stmt.run(
    title || (existing as any).title,
    category || (existing as any).category,
    location !== undefined ? location : (existing as any).location,
    description !== undefined ? description : (existing as any).description,
    image_url !== undefined ? image_url : (existing as any).image_url,
    is_featured !== undefined ? (is_featured ? 1 : 0) : (existing as any).is_featured,
    display_order !== undefined ? display_order : (existing as any).display_order,
    req.params.id
  );

  const updatedProject = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  res.json(updatedProject);
});

// Delete project (protected)
router.delete('/api/projects/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Project not found' });
  }

  db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
  res.json({ message: 'Project deleted' });
});

// Reorder projects (protected)
router.put('/api/projects/reorder', authMiddleware, (req: AuthRequest, res: Response) => {
  const { orders } = req.body;

  if (!Array.isArray(orders)) {
    return res.status(400).json({ error: 'Orders array is required' });
  }

  const updateStmt = db.prepare('UPDATE projects SET display_order = ? WHERE id = ?');
  const updateMany = db.transaction((ordersList: { id: number; order: number }[]) => {
    for (const { id, order } of ordersList) {
      updateStmt.run(order, id);
    }
  });

  updateMany(orders);
  res.json({ message: 'Projects reordered' });
});

export default router;
