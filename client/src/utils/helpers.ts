export const isEmpty = (obj : Object) => Object.entries(obj).length === 0 && obj.constructor === Object;
export const sleep = (duration : number) => new Promise(r=>setTimeout(r, duration));