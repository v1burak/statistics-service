import { db, redis } from '../db';
import { ApiError } from '../errors/ApiError';
import escape from 'pg-escape';

interface IStatistics {
    autoid: string;
    page_views: number;
    phone_views: number;
}

type EventType = 'page_view' | 'phone_view';

const FINGERPRINT_TTL_SECONDS = 60 * 60 * 24; // 24 hours

const getStatisticById = async (autoId: string): Promise<IStatistics | undefined> => {
    try {
        const autoIdEscaped = escape.literal(autoId);

        const { rows } = await db.query<IStatistics>('SELECT * FROM statistics WHERE autoId = $1', [autoIdEscaped]);

        return rows[0];
    } catch (error) {
        console.error(`Error getting statistics for autoId ${autoId}:`, error);

        throw new ApiError(500, 'Database error while getting statistics.');
    }
};

const handleStatistic = async (autoId: string, type: EventType, fingerprint: string): Promise<void> => {
    const autoIdEscaped = escape.literal(autoId);
    const column = type === 'page_view' ? 'page_views' : 'phone_views';
    const redisKey = `event:${autoId}:${column}:${fingerprint}`;
    const alreadyTriggered = await redis.get(redisKey);
    
    if (alreadyTriggered) {
        return;
    }

    const query = `
        INSERT INTO statistics (autoId, ${column})
        VALUES ($1, 1)
        ON CONFLICT (autoId)
        DO UPDATE SET ${column} = statistics.${column} + 1;
    `;

    try {
        await db.query(query, [autoIdEscaped]);

        await redis.set(redisKey, '1', 'EX', FINGERPRINT_TTL_SECONDS);
    } catch (error) {
        console.error(`Error recording event for autoId ${autoId}:`, error);
        throw new ApiError(500, 'Database error while recording event.');
    }
};

const getStatistics = async (
    sort: 'page_views' | 'phone_views' = 'page_views',
    order?: 'asc' | 'desc',
    start?: number,
    limit?: number
): Promise<IStatistics[]> => {
    const rowOrder = (order || 'desc').toUpperCase()
    const offset = typeof start === 'number' ? start : 0;
    const rowLimit = typeof limit === 'number' ? limit : 10;
    try {
        const query = `SELECT * FROM statistics ORDER BY ${sort} ${rowOrder} OFFSET $1 LIMIT $2`;
        const { rows } = await db.query<IStatistics>(
            query,
            [offset, rowLimit]
        );

        return rows;
    } catch (error) {
        console.error(`Error getting car statistics by ${sort}:`, error);

        throw new ApiError(500, `Database error while getting car statistics by ${sort}.`);
    }
};

export default {
    getStatisticById,
    handleStatistic,
    getStatistics
};