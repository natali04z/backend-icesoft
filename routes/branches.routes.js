import { Router } from 'express';
import { getBranches, getBranchesById, postBranches, updateBranches, deleteBranches } from '../controllers/branch.controller.js';

const router = Router();

router.get('/', getBranches);
router.get('/:id', getBranchesById);
router.post('/', postBranches);
router.put('/:id', updateBranches);
router.delete('/:id', deleteBranches);

export default router;