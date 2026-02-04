export interface Task {
  id: number;
  project_id: number;
  assigned_to: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'completed';
  due_date: string;      // ISO date string (YYYY-MM-DD)
}
