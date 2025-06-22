import db from '../db';
import { redis } from '../db';
import { ApiError } from '../errors/ApiError';

interface Statistics {
    autoid: string;
    page_views: number;
    phone_views: number;
}

type EventType = 'page_view' | 'phone_view';

const FINGERPRINT_TTL_SECONDS = 60 * 60 * 24; // 24 hours

const getStatistics = async (autoId: string): Promise<Statistics | undefined> => {
    try {
        const { rows } = await db.query<Statistics>('SELECT * FROM statistics WHERE autoId = $1', [autoId]);

        return rows[0];
    } catch (error) {
        console.error(`Error getting statistics for autoId ${autoId}:`, error);

        throw new ApiError(500, 'Database error while getting statistics.');
    }
};

const recordEvent = async (autoId: number, type: EventType, fingerprint: string): Promise<void> => {
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
        await db.query(query, [autoId]);

        await redis.set(redisKey, '1', 'EX', FINGERPRINT_TTL_SECONDS);
    } catch (error) {
        console.error(`Error recording event for autoId ${autoId}:`, error);
        throw new ApiError(500, 'Database error while recording event.');
    }
};

export default {
    getStatistics,
    recordEvent,
};