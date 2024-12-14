import dotenv from 'dotenv';
dotenv.config();
export const ENV_VARS = {
    MONGO_URL :process.env.Mongo_url,
    PORT: process.env.PORT,
    JWT_SECRET : process.env.JWT_SECRET,
    MODE_ENV : process.env.MODE_ENV,
    TMDB_API_KEY:process.env.TMDB_API_KEY
}