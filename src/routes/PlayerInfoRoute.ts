import express, { Request, Response } from 'express';
import { GetPlayerParty } from '../middlewares/GetPlayerParty';
import { PlayerDodgeQueue } from '../middlewares/PlayerDodgeQueue';
import { GetPlayerPreGameId } from '../middlewares/GetPlayerPreGameId';
import { DodgeQueueService } from '../services/DodgeQueueService';
import { AuthenticatePlayerService } from '../services/AuthenticatePlayerService';
import { ReauthCookiesService } from '../services/ReauthCookiesService';

export const player_router = express.Router();
const getPlayerParty = new GetPlayerParty();
const playerDodgeQueue = new PlayerDodgeQueue();
const playerPreGameId = new GetPlayerPreGameId();
const dodgeQueueService = new DodgeQueueService();
const authenticatePlayerService = new AuthenticatePlayerService();
const reauthCookiesService = new ReauthCookiesService();

player_router.post('/actions/player/pregame/leave', async (req: Request, res: Response) => {
    const response = await dodgeQueueService.handle(req.body.username, req.body.password);
    res.status(response.status).json(response.data);
});

player_router.post('/auth', async (req: Request, res: Response) => {
    const response = await authenticatePlayerService.handle(req.body.username, req.body.password);
    res.status(response.status).header('set-cookie', response.ssid).json(response);
})

player_router.get('/auth/reauth', async (req: Request, res: Response) => {
    const response = await reauthCookiesService.handle(req.headers.cookie || '');
    res.status(response.status).json({
        "status": response.status,
        "token": response.data
    });
})


player_router.post('/player/party', async (req: Request, res: Response) => {
    try {
        const response = await getPlayerParty.PlayerParty(req.body.token, req.body.puuid,
            req.body.entitlements, req.body.client_platform, req.body.client_version);
       res.status(response.status).json({
           "status": response.status,
           "party_id": response.data.CurrentPartyID,
       });
    } catch {
        res.status(400).json({
            "status": 400,
            "message": "Bad Request"
        });
    }
});

player_router.post('/player/pregame', async (req: Request, res: Response) => {
    try {
        const response = await playerPreGameId.PlayerPreGameId(req.body.token, req.body.puuid,
            req.body.entitlements, req.body.client_platform, req.body.client_version);
       res.status(response.status).json({
           "status": response.status,
           "pregame_id": response.data.MatchID,
       });
    } catch {
        res.status(400).json({
            "status": 400,
            "message": "Bad Request"
        });
    
    }
});

player_router.post('/player/pregame/leave', async (req: Request, res: Response) => {
    try {
        const response = await playerDodgeQueue.DodgeQueue(req.body.token, req.body.pregame_id,
            req.body.entitlements, req.body.client_platform, req.body.client_version);
       res.status(response.status).json({
           "status": response.status,
           "party_id": response.data.CurrentPartyID,
       })
    } catch {
        res.status(400).json({
            "status": 400,
            "message": "Bad Request"
        });
    }
});
