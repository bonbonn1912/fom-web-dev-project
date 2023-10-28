interface IParts {
    equipmentId: number,
    name: string,
    notice: string,
    distance: number,
    maxDistance: number,
    isActive: boolean,
    type: 'BIKE' | 'EQUIPMENT' | 'ACCESSORY',
}

export type {
    IParts,
}