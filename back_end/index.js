const express = require('express')
const cors = require('cors')
const bearerToken = require('express-bearer-token')

const PORT = 3300
const app = express()

app.use(bearerToken())
app.use(cors())
app.use(express.json())

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.status(200).send('<h4>integrated with mysql</h4>')
})

const { userRouters, uploadRouter, adminRouter, cartRouter   } = require('./routers')

app.use('/user', userRouters)
app.use('/cart', cartRouter)
app.use('/upload', uploadRouter)
app.use('/admin', adminRouter)

app.listen(PORT, () => console.log('API running : ', PORT))