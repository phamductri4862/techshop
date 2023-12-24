import express from 'express'
import userRoutes from './userRoutes.js'
import productRoutes from './productRoutes.js'

const apiRoutes = express.Router()

apiRoutes.use('/users', userRoutes)
apiRoutes.use('/products', productRoutes)

export default apiRoutes