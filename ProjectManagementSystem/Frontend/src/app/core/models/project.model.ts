export interface Project {
  id?: number;                 // present when fetched from backend
  name: string;                // required
  description?: string;        // optional
  manager_id: number;          // required
  start_date?: string;         // ISO date string (YYYY-MM-DD)
  end_date?: string;           // ISO date string
  status?: 'active' | 'completed'; // optional (default handled by backend)
  created_at?: string;         // auto-generated
  updated_at?: string;         // auto-updated
}
