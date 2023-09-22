const app = require("../src/app")
const { conn } = require("./DB_connection")
const PORT = 3001;

conn.sync({ force: true })

app.listen(PORT, () => {
    console.log(`Server raised in port: ${PORT}`);
})

