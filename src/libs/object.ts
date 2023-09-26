export const keyMapping = <T extends { [K in string]: unknown }>(object: T): (keyof T)[] => Object.keys(object);
