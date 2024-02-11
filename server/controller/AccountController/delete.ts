import { Request, Response} from "express";
import {getCredentialsById} from "../../handlers/database/postgres";
import {deleteAllBasicEntriesForAccount} from "../../handlers/database/activitySchema";
import {deleteAllStreamEntriesForAccount} from "../../handlers/database/activityStreamSchema";
import {removeAccountFromPostgres} from "../../handlers/shared/strava.postgres";

const deleteAccount = async (req: Request, res: Response) => {
    console.log("Deleting account");
    const { id } = req.user as any;
    try{
            await deleteAllBasicEntriesForAccount(id);
            await deleteAllStreamEntriesForAccount(id);
            await removeAccountFromPostgres(id);
            res.status(200).send("Benutzer erfolgreich gelöscht.");
        } catch (error) {
            console.error("Fehler beim Löschen des Benutzers:", error);
            res.status(500).send("Interner Serverfehler");
        }
}

export {
    deleteAccount
}