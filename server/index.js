const express = require('express')
const example = require('./example')
const app = express()

app.get('/nodeApi/test', example.test)

module.exports = app
