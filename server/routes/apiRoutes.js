import express from 'express'
import userRoutes from './userRoutes.js'
import productRoutes from './productRoutes.js'
import configRoutes from './configRoutes.js'

const apiRoutes = express.Router()

apiRoutes.use('/users', userRoutes)
apiRoutes.use('/products', productRoutes)
apiRoutes.use('/config', configRoutes)

export default apiRoutes