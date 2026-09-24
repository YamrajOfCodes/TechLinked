import express from "express";

import {getLeaderboard} from "../../Controllers/spaceController/spaceController.js"
import { optionalAuthenticate } from "../../Middleware/Auth/optionalAuthenticate.js";

const router = express.Router();

router.get("/getranks",optionalAuthenticate,getLeaderboard);


export default router;