/*
    Rutas de ususarios /Auth
    host + /api/auth
*/
const express = require("express");
require("dotenv").config();
const sequelize = require("./database/config");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
// const xlsx = require('node-xlsx')

const AdminC = require("./models/AdminCentral");
const AdminL = require("./models/AdminLab");
const Categoria = require("./models/Categoria");
const ElementoG = require("./models/ElementoGrupal");
const Elemento = require("./models/ElementoIndividual");
const Laboratorio = require("./models/Laboratorio");
const Proyecto = require("./models/Proyecto");
const Usuario = require("./models/User");
const Grupo = require("./models/Grupo");
const Prestamo = require("./models/Prestamo");
const ElementosPrestamo = require("./models/GrupoPrestamo");
const SolicitudUsuario = require("./models/SolicitudesUsuario");

const app = express();

// Directorio público
app.use(express.static("public"));

//CORS (restringe peticiones desde ciertas regiones)
app.use(cors());

// const keysDir = "keys/";
// const options = {
//   key  : fs.readFileSync(keysDir + "privatekey.pem"),
//   ca   : fs.readFileSync(keysDir + "certrequest.csr"),
//   cert : fs.readFileSync(keysDir + "certificate.pem")
// };

//Lectura y parseo del body
app.use(express.json());
//Rutas

app.use("/api/auth", require("./routes/auth"));
app.use("/api/usuarios", require("./routes/users"));
app.use("/api/laboratorios", require("./routes/labs"));
app.use("/api/proyectos", require("./routes/projects"));
app.use("/api/categorias", require("./routes/categorias"));
app.use("/api/elementos", require("./routes/elements"));
app.use("/api/prestamos", require("./routes/prestamos"));
app.use("/api/solicitudes-registro", require("./routes/solicitudesUsuario"));
app.use("/api/grupos-elementos", require("./routes/gruposElementos"));
app.use("/api/importar", require("./routes/manejoDocs"));
//TODO: auth // crear, login, renew
//TODO: CURD

// AdminC.hasOne(Usuario);
Usuario.hasOne(AdminC);
AdminC.belongsTo(Usuario);
Usuario.belongsTo(Laboratorio, {
  foreignKey: {
    allowNull: false,
    defaultValue: 0,
  },
});

Usuario.belongsToMany(Laboratorio, { through: AdminL });
Laboratorio.belongsToMany(Usuario, { through: AdminL });
Grupo.belongsTo(Laboratorio);
Laboratorio.hasMany(Proyecto);
Elemento.belongsTo(Proyecto);
Elemento.belongsTo(Categoria);
Elemento.belongsTo(Grupo);
Prestamo.belongsToMany(Elemento, { through: ElementosPrestamo });
Elemento.belongsToMany(Prestamo, { through: ElementosPrestamo });
Prestamo.belongsTo(Usuario);
SolicitudUsuario.belongsTo(Laboratorio);

sequelize
  // .sync({ force: true })
  .sync()
  .then((info) => {
    // Escuchar peticiones
    // https.createServer(options, app).listen(process.env.PORT);
    const server = new Server(app);
    server.listen();
    // console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
  })
  .catch((err) => console.log(err));
