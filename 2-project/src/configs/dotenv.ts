import { config } from 'dotenv';

config();

export const { MONGOOSE_URI } = process.env;
