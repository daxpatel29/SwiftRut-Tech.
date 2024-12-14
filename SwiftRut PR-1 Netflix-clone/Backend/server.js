import express from 'express';
import cookieParser from 'cookie-parser';
import path from "path";

import authRoute from './routes/auth.Route.js';
import getMovie from './routes/Movie_routes.js';
import tvroutea from './routes/tv_route.js';
import searchroutes from './routes/serch_route.js';


import { ENV_VARS } from './config/config.js';
import { conectDB } from './config/db.js';
import { isAuthenticated } from './midleware/isAuth.js';

const app = express();
app.use(cookieParser());

const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/movie',isAuthenticated,getMovie);
app.use('/api/v1/tv',isAuthenticated,tvroutea);
app.use('/api/v1/search',isAuthenticated,searchroutes);

if (ENV_VARS.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}


app.listen(PORT ,()=>{
    console.log(`server is running on port http://localhost:${PORT}`);
    conectDB();
})

