import {carsDB, ICar} from '@/mock/cars.ts';

export default defineEventHandler(async (event): Promise<ICar[]> => {
    return carsDB;
});
