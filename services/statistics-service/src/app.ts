import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import statisticsRouter from './routes/statistics';
import errorHandler from './middleware/errorHandler';

const app = new Koa();

app.use(errorHandler);
app.use(bodyParser());
app.use(statisticsRouter.routes());
app.use(statisticsRouter.allowedMethods());

export default app;