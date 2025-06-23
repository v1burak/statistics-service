export const handleStatisticSchema: Record<string, (value: any) => boolean> = {
    autoId: (value: any): value is string => typeof value === 'string' && value.length > 0,
    type: (value: any): value is 'page_view' | 'phone_view' => value === 'page_view' || value === 'phone_view',
    fingerprint: (value: any): value is string => typeof value === 'string' && value.length > 0,
};

export const getStatisticsSchema = {
    sort: (value: any) => value === undefined || value === 'page_views' || value === 'phone_views',
    order: (value: any) => value === undefined || value === 'asc' || value === 'desc',
    start: (value: any) => value === undefined || (!isNaN(Number(value)) && Number(value) >= 0),
    limit: (value: any) => value === undefined || (!isNaN(Number(value)) && Number(value) > 0),
};

export const getStatisticByIDSchema = {
    autoId: (value: any): value is string => typeof value === 'string' && value.length > 0,
};