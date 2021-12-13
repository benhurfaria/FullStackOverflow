import express from 'express'; 
import * as questionsController from '../controllers/questionsController';

const router = express.Router();

router.post('/questions', questionsController.createQuestion);
router.get('/questions/:id', questionsController.getQuestion);
router.post('/questions/:id', questionsController.answerQuestion);

export default router;
