const express = require('express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const app = express()
let port = 3000
const routes = require('./routes/route')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
if(process.env.NODE_ENV === 'test'){
  port = 3001
}
app.use(function(err, req, res, next) {
  if(err)res.status(500).json({"success":false,"message":err.type,"body":err.body});
});
app.use(expressValidator())

app.use('/v1',routes)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

module.exports = app