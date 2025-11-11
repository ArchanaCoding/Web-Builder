export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => { //32 hex digits + 4 anddashes and Replaces each x or y with a random hexadecimal number (0–f).
    const r = (Math.random() * 16) | 0; // Random number 0–15
    const v = c === 'x' ? r : (r & 0x3) | 0x8; // UUID format rule fix in 4 part
    return v.toString(16); // Convert to hexadecimal
  });
};
