import { Context } from 'koa';
import statisticsService from '../services/statisticsService';

const getStatisticById = async (ctx: Context): Promise<void> => {
    const { autoId } = ctx.params;
    const stats = await statisticsService.getStatisticById(autoId);

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

const handleStatistic = async (ctx: Context): Promise<void> => {
    const { autoId, type, fingerprint } = ctx.request.body as { autoId: string; type: 'page_view' | 'phone_view'; fingerprint: string };
    await statisticsService.handleStatistic(autoId, type, fingerprint);

    ctx.status = 202;
    ctx.body = {
        message: `Event type: ${type} for ${autoId} has been recorded successfully`
    };
};

const getStatistics = async (ctx: Context): Promise<void> => {
    const { sort = 'page_views', order, start, limit } = ctx.query as Record<string, string>;

    const startNum = start !== undefined ? Number(start) : undefined;
    const limitNum = limit !== undefined ? Number(limit) : undefined;

    try {
        const cars = await statisticsService.getStatistics(
            sort as 'page_views' | 'phone_views',
            order as 'asc' | 'desc' | undefined,
            startNum,
            limitNum
        );
        ctx.body = cars;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Failed to get filtered cars.' };
    }
};

export default {
    getStatisticById,
    handleStatistic,
    getStatistics
};