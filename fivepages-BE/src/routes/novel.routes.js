import { createNovel, deleteNovel, getLatestNovels, getNovelByID, getNovels, getRecommendedNovels, searchNovels, updateNovel, } from '../controllers/novel.controllers.js';
import { verifyAdmin, verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import Novel from '../models/novel.models.js';
import Router from 'express';

const router = Router();

// Get all novels
router.get('/', getNovels);

//latest novels, recent updates
router.get('/latest', getLatestNovels);

//search novels
router.get('/search/:param', searchNovels);

// Get a single novel by ID
router.get('/:id', getNovelByID);

// router.get("/:id/:count", getRecommendedNovels);
router.get('/', getRecommendedNovels); // Accepts query parameters now

// Create a new novel
router.post('/', upload.single('thumbnail'), verifyJWT, verifyAdmin, createNovel);

// Update a novel by ID
router.put('/:id', upload.single('thumbnail') , verifyJWT, verifyAdmin, updateNovel);

// Delete a novel by ID
router.delete('/:id', verifyJWT, deleteNovel);

export default router;