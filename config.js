module.exports = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    dbUrl: process.env.MONGO_DB_URL,
}