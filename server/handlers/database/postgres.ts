import {PrismaClient, AccountType, EquipmentType} from "@prisma/client";
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

const insertEquipment = async (accountId: number, name: string, notice: string, currentDistance: number, maxDistance: number, type: EquipmentType, isActive: boolean) => {
    return new Promise(async (resolve, reject) => {
        try {
            const equipmentEntry = await prisma.equipment.create({
                data: {
                    accountId: accountId,
                    name: name,
                    notice: notice,
                    distance: currentDistance,
                    maxDistance: maxDistance,
                    type: type,
                    isActive: isActive,
                }
            });
            resolve(equipmentEntry);
        } catch (error) {
            reject(error);
        }
    })
}

const getEquipment = async (accountId: number) => {
    return new Promise(async (resolve, reject) => {
        try {
            const equipment = await prisma.equipment.findMany({
                where: {
                    accountId: accountId,
                }
            });
            resolve(equipment);
        } catch (error) {
            reject(error);
        }
    })
}

const deleteEquipment = async (equipmentId: number) => {
    return new Promise(async (resolve, reject) => {
        try {
            const equipment = await prisma.equipment.delete({
                where: {
                    equipmentId: equipmentId,
                }
            });
            resolve(equipment);
        } catch (error) {
            reject(error);
        }
    })
}

const changeEquipmentStatus = async (equipmentId: number, isActive: boolean) => {
    return new Promise(async (resolve, reject) => {
        try {
            const equipment = await prisma.equipment.update({
                where: {
                    equipmentId: equipmentId,
                },
                data: {
                    isActive: isActive,
                }
            });
            resolve(equipment);
        } catch (error) {
            reject(error);
        }
    })
}

const updateEquipmentDistance = async (acountId: number, distance: number, activity: number) => {
    return new Promise(async (resolve, reject) => {
        try {
           const equipment = await prisma.equipment.findMany({
                where: {
                    accountId: acountId,
                    isActive: true,
                },
           });
           equipment.map(async (element) => {
                const newDistance = parseInt((distance/1000).toFixed(0));
                const update = await prisma.equipment.update({
                    where: { equipmentId: element.equipmentId },
                    data: { distance: element.distance + newDistance },
                })
               const relation = await prisma.equipmentToActivity.create({
                   data: {
                       equipmentId: element.equipmentId,
                       activity: activity,
                   }
               })
               console.log(relation);
            });
            resolve(equipment);
        } catch (error) {
            reject(error);
        }
    })
}

const mapEquipmentToActivity = async (equipmentId: number,activity: number) => {
    return new Promise(async (resolve, reject) =>{
        try{
            const relation = await prisma.equipmentToActivity.create({
                data: {
                    equipmentId: equipmentId,
                    activity: activity,
                }
            })
        }catch (error) {
            reject(error);
        }
    })
}

const removeActivityFromEquipment = async (activity: number, distance: number) => {
    return new Promise(async (resolve, reject) =>{
        try{
           const toBeUpdated = await prisma.equipmentToActivity.findMany({
                    where: {
                        activity: activity,
                    },
           });
           const equipment = await prisma.equipment.findMany({
                where: {
                    equipmentId: {
                        in: toBeUpdated.map((element) => element.equipmentId),
                    }
                }
           });
           equipment.map(async (element) => {
                const update = await prisma.equipment.update({
                    where: { equipmentId: element.equipmentId },
                    data: { distance: (element.distance - distance) },
                })

                const relation = await prisma.equipmentToActivity.deleteMany({
                    where: {
                        equipmentId: element.equipmentId,
                    }
                });
           });
            resolve(equipment);
        }catch (error) {
            reject(error);
        }
    })
}


export { prisma,
        findUser,
        insertUser,
        getUserAndCredentials,
        insertStravaToken,
        updateSetup,
        getStravaProps,
        setStravaConnection,
        removeStravaConnection,
        insertMailConfirmation,
        insertEquipment,
        getEquipment,
        deleteEquipment,
        changeEquipmentStatus,
        updateEquipmentDistance,
        removeActivityFromEquipment
};
