import { Context } from 'koa';
import statisticsService from '../services/statisticsService';

const getStatistics = async (ctx: Context): Promise<void> => {
    const { autoId } = ctx.params;
    const stats = await statisticsService.getStatistics(autoId);

    if (stats) {
        ctx.body = stats;
    } else {
        ctx.status = 404;
        ctx.body = {
            error: {
                message: 'Statistics not found',
            },
        };
    }
};

const recordEvent = async (ctx: Context): Promise<void> => {
    const { autoId, type, fingerprint } = ctx.request.body as { autoId: number; type: 'page_view' | 'phone_view'; fingerprint: string };
    await statisticsService.recordEvent(autoId, type, fingerprint);

    ctx.status = 201;
    ctx.body = {
        message: `Event type: ${type} for ${autoId} has been recorded successfully`
    };
};

export default {
    getStatistics,
    recordEvent,
};