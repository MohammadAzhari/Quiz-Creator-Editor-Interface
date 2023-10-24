export const getCurrentTime = () => new Date().toISOString().replace('T', ' ').slice(0, 19)
