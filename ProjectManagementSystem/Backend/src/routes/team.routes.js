import express from 'express';
import {
    addTeamMember,
    removeTeamMember,
    getProjectTeam
} from '../controllers/team.controller.js';
import authorize from '../middleware/authorize.middleware.js';
import { canAccessTask } from '../middleware/taskAccess.middleware.js';

const router = express.Router();

router.post('/addMember', authorize('admin', 'manager'), addTeamMember);
router.get('/team/:projectId', getProjectTeam);
router.delete('/deleteMember/:id', authorize('admin', 'manager'),   removeTeamMember);

export default router;
