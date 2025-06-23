import Router from 'koa-router';
import statisticsController from '../controllers/statisticsController';
import validate from '../middleware/validate';
import {handleStatisticSchema, getStatisticsSchema, getStatisticByIDSchema} from '../validation/validationSchema';

const router = new Router();

// GET /api/statistics/
router.get('/', validate(getStatisticsSchema, 'query'), statisticsController.getStatistics);

// POST /api/statistics/
router.post('/', validate(handleStatisticSchema, 'body'), statisticsController.handleStatistic);

// GET /api/statistics/:autoId
router.get('/:autoId', validate(getStatisticByIDSchema, 'params'),  statisticsController.getStatisticById);

export default router; 