const router = require("express").Router()
const api = require("./api")
const view = require("./view")
const swaggerJSON = require("../swagger.json")
const swaggerUI = require("swagger-ui-express")

router.use("/api", api)
router.use("/views", view)
router.use("/" || "/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON))

module.exports = router