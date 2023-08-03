import { ProductManager } from './ProductManager.js'
import express from 'express'

export const Desafio_3 = async () => {

    const path = 'src/Desafio-3/inventory.txt'

    const manager = new ProductManager(path)

    const server = express()

    const PORT = 8080

    server.use(express.urlencoded({extended:true}))

    server.get('/', (req, res) => {
        res.send("Inicio")
    })

    server.get('/products', (req, res) => {

        const { limit } = req.query
        console.log(limit)

        manager.getProducts()
            .then(response => {
                if(limit && limit > 0){
                    res.send(response.slice(0,limit))
                }else{
                    res.send(response)
                }
            })
            .catch(error => console.log(error))
    })

    server.get('/products/:id', (req, res) => {
        manager.getProductByID(parseInt(req.params.id))
            .then(response => res.send(response))
            .catch(error => console.log(error))
    })

    server.get('*', (req, res) => {
        res.send("Error 404")
    })

    server.listen(PORT, () => {
        console.log(`Server on port ${PORT}`)
    })
}
 