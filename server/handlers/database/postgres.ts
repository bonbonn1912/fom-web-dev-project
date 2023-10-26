import { PrismaClient, AccountType } from "@prisma/client";
const prisma = new PrismaClient();
import { IAccount, ICredentials } from "../../types/user";
import { ITokenResponse } from "../../types/strava";

const findUser = (username: string, email: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await prisma.account.findFirst({
        where: {
          OR: [
            {
              username: username,
            },
            {
              email: email,
            },
          ],
        },
      });
      resolve(user);
    } catch (error) {
      console.error("Something went wrong searching for user", error);
      reject(error);
    }
  });
};

const updateSetup = (accountId: number) => {
    return new Promise(async (resolve, reject) => {
        try {
        const user = await prisma.account.update({
            where: {
            accountId: accountId,
            },
            data: {
            setup: true,
            },
        });
        resolve(user);
        } catch (error) {
        console.error("Something went wrong searching for user", error);
        reject(error);
        }
    });
}

const getStravaProps = (accountId: number) => {
    return new Promise(async (resolve, reject) => {
        try {
        const user = await prisma.strava.findFirst({
            where: {
            accountId: accountId,
            },
        });
        resolve(user);
        } catch (error) {
        console.error("Something went wrong searching for user", error);
        reject(error);
        }
    });
}

const setStravaConnection = (accountId: number, value: boolean) => {
    return new Promise(async (resolve, reject) => {
        try {
        const user = await prisma.account.update({
            where: {
            accountId: accountId,
            },
            data: {
            isConnectedWithStrava: value,
            },
        });
        resolve(user);
        } catch (error) {
        console.error("Something went wrong searching for user", error);
        reject(error);
        }
    });
}

const removeStravaConnection = (accountId: number) => {
    return new Promise(async (resolve, reject) => {
        try {
        const user = await prisma.strava.delete({
            where: {
            accountId: accountId,
            },
        });
        resolve(user);
        } catch (error) {
        console.error("Something went wrong searching for user", error);
        reject(error);
        }
    });
}

const getUserAndCredentials = (email: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = prisma.account.findFirst({
        where: {
          email: email,
        },
        include: {
          credentials: true,
        },
      });
      resolve(user);
    } catch (error) {
      console.error("Something went wrong searching for user", error);
      reject(error);
    }
  });
};

const insertUser = (
  username: string,
  display_name: string,
  email: string,
  password: string,
  accountType: AccountType
) => {
  let connectedWithStrava = false;
  if(accountType == AccountType.STRAVA ){
    connectedWithStrava = true;
  }
  let isMailConfirmed = AccountType.LOCAL ? false : true;
  return new Promise(async (resolve, reject) => {
    try {
      const createdAccount = (await prisma.account.create({
        data: {
          username: username,
          email: email,
          displayName: display_name,
          setup: false, // -> werte müssen noch in die config
          isAdmin: false, // -> ebenfalls,
          isConnectedWithStrava: connectedWithStrava,
          isMailConfirmed: isMailConfirmed,
          accountType: accountType,
        },
      })) as IAccount;
      const credentials = (await prisma.credentials.create({
        data: {
          password: password,
          accountId: createdAccount.accountId, // FK auf acc
        },
      })) as ICredentials;
      resolve(createdAccount);
    } catch (error) {
      reject(error);
    }
  });
};

const insertStravaToken = async (
  accountId: number,
  ownerId: number,
  tokenData: ITokenResponse
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const stravaEntry = await prisma.strava.create({
        data: {
          accountId: accountId,
          ownerId: ownerId,
          ...tokenData,
        },
      });
      resolve(stravaEntry);
    } catch (error) {
      reject(error);
    }
  });
};

const insertMailConfirmation = async (uuid: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const mailEntry = await prisma.confirmation.create({
                data: {
                    code: uuid,
                    isActive: true,
                }
            });
            resolve(mailEntry);
        } catch (error) {
            reject(error);
        }
    })

}

export { prisma,findUser, insertUser, getUserAndCredentials, insertStravaToken, updateSetup, getStravaProps, setStravaConnection, removeStravaConnection, insertMailConfirmation };
