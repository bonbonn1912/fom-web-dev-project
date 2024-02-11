import {prisma} from "../database/postgres";


// get access token expires_at and refresh token
export const getStravaTokenForOwnerId = (ownerId: number) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await prisma.strava.findFirst({
                where: {
                    ownerId: ownerId,
                },
            });
            resolve(user);
        } catch (error) {
            console.error("Something went wrong searching for user", error);
            reject(error);
        }
    });
}

export const removeAccountFromPostgres = async (accountId: number) => {
    try {


        await prisma.equipment.deleteMany({
            where: {
                accountId: accountId
            }
        });

        // Lösche Daten aus der Tabelle "Strava"
        await prisma.strava.deleteMany({
            where: {
                accountId: accountId
            }
        });

        await prisma.credentials.deleteMany({
            where: {
                accountId: accountId
            }
        });

        await prisma.account.delete({
            where: {
                accountId: accountId
            }
        });
    } catch (error) {
        console.error("Something went wrong deleting user", error);
    }

}


export const updateStravaTokenForOwnerId = (ownerId: number, accessToken: string, expiresAt: number, refreshToken: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await prisma.strava.updateMany({
                where: {
                    ownerId: ownerId,
                },
                data: {
                    access_token: accessToken,
                    expires_at: expiresAt,
                    refresh_token: refreshToken
                }
            });
            resolve(user);
        } catch (error) {
            console.error("Something went wrong searching for user", error);
            reject(error);
        }
    });
}