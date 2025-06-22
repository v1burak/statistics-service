import Router from 'koa-router';
import statisticsController from '../controllers/statisticsController';
import validate from '../middleware/validate';
import eventSchema from '../validation/eventSchema';

const router = new Router();

// POST /api/statistics/
router.post('/', validate(eventSchema), statisticsController.recordEvent);

// GET /api/statistics/:autoId
router.get('/:autoId', statisticsController.getStatistics);

export default router; 