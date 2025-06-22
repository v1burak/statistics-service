interface EventSchema {
    autoId: (value: any) => boolean;
    type: (value: any) => boolean;
    fingerprint: (value: any) => boolean;
}

const eventSchema: EventSchema = {
    autoId: (value: any): value is string => typeof value === 'string' && value.length > 0,
    type: (value: any): value is 'page_view' | 'phone_view' => value === 'page_view' || value === 'phone_view',
    fingerprint: (value: any): value is string => typeof value === 'string' && value.length > 0 && value.startsWith('fingerprint-auto'),
};

export default eventSchema;