import cookie from 'cookie';
import { CreateCookie } from "./CreateCookie";
import { GetClientVersion } from "../middlewares/GetClientVersionService";
import { AuthAccount } from "../middlewares/authAccount";
import { GetEntitlements } from "../middlewares/getEntitlements";
import { GetPlayerInfo } from "../middlewares/PlayerInfo";

const createCookie = new CreateCookie();
const getClientVersion = new GetClientVersion();
const authAccount = new AuthAccount();
const getEntitlements = new GetEntitlements();
const getPlayerInfo = new GetPlayerInfo();

export class AuthenticatePlayerService {
    handle = async (username: string, password: string) => {
        try {
            const cookiesValue = await createCookie.handle();
            const version = await getClientVersion.ClientVersion();
            const clientversion = version.data.data.version;
            const response = await authAccount.AuthCookies(
                clientversion , username, password, cookiesValue || '').catch(err => {
                    return err.response;
                });
            const uri = response.response.data.response.parameters.uri;
            const url = new URL(uri);
            const params = new URLSearchParams(url.search);
            const token = params.get('access_token');
            const expires = params.get('expires_in');
            const id_token = params.get('id_token');
        
            const ent = await getEntitlements.Entitlements(token || '').catch(err => {
                return err.response;
            });
            const entitlements_token = ent.data.entitlements_token;
        
            const info = await getPlayerInfo.PlayerInfo(token || '').catch(err => {
                return err.response;
            });
            const ssid = response.ssid_cookie
            const ssidCookie = cookie.parse(ssid);
            const ssidValue = ssidCookie.ssid;
            const ssidExpiry = new Date();
            ssidExpiry.setDate(ssidExpiry.getDate() + 7);

            console.log(ssidValue)
            const puuid = info.data.sub;
            const riotid = info.data.acct.game_name + '#' + info.data.acct.tag_line;
            const expiry = new Date();
            expiry.setDate (expiry.getDate() + 7)
            response.puuid = [
                {
                    name: 'puuid',
                    value: puuid,
                    options: {
                        httpOnly: true,
                        expires: expiry,
                    }
                }
            ];
            response.ssid = [
                {
                    name: 'ssid',
                    value: ssidValue,
                    options: {
                        httpOnly: true,
                        expires: ssidExpiry,
                        path: '/',
                    }
                }
            ];

            return { status: response.response.status,
                 cookie: response.puuid, ssid: response.ssid, riotid, puuid, token, expires, id_token, entitlements_token };
        }
        catch (err) {
            return { status: 400, message: 'Bad Request', };
        }

    }
}

