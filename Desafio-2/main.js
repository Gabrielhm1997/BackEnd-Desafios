import { promises as fs } from 'fs'

class ProductManager {
    constructor(path) {
        this.path = path
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        if (title && description && price && thumbnail && code && stock) {

            const inventory = JSON.parse(await fs.readFile(this.path, 'utf-8'))

            const productFound = inventory.find(item => item.code === code)

            if (!productFound) {

                const product = new Product(title, description, price, thumbnail, code, stock)

                inventory.push(product);

                await fs.writeFile(this.path, JSON.stringify(inventory))

                console.log("Producto agregado correctamente")

            } else {
                console.log("El producto ya existe en el array")
            }

        } else {
            console.log("Falta 1 o mas Valores del producto")
        }
    }

    getProducts = async () => {
        const inventory = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return inventory
    }

    getProductByID = async (id) => {
        const inventory = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const productFound = inventory.find(item => item.id === id)

        if (productFound) {
            return productFound
        } else {
            return "Not found"
        }
    }

    deleteProduct = async (id) => {
        const inventory = JSON.parse(await fs.readFile(this.path, 'utf-8'))

        if (inventory.find(item => item.id === id)) {
            const updatedInventory = inventory.filter(item => item.id != id)
            await fs.writeFile(this.path, JSON.stringify(updatedInventory))
            console.log("Producto eliminado correctamente")
        } else {
            console.log("El producto no se encuentra en el array")
        }
    }

    updateProduct = async (id, { title, description, price, thumbnail, code, stock }) => {

        const inventory = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const index = inventory.findIndex(item => item.id === id)

        if (index != -1) {

            inventory[index].title = title ?? inventory[index].title
            inventory[index].description = description ?? inventory[index].description
            inventory[index].price = price ?? inventory[index].price
            inventory[index].thumbnail = thumbnail ?? inventory[index].thumbnail
            inventory[index].code = code ?? inventory[index].code
            inventory[index].stock = stock ?? inventory[index].stock

            await fs.writeFile(this.path, JSON.stringify(inventory))

            console.log("Producto actualizado")
        } else {
            console.log("Producto no encontrado")
        }
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.setId()
    }

    static setId() {
        this.idIncrement ? this.idIncrement++ : this.idIncrement = 1
        return this.idIncrement
    }
}

//Hola tutor, el codigo comentado debajo es el que utilice para probar el programa

// // Ruta Desafio-2/inventario.txt

// const path = 'Desafio-2/inventory.txt' // Ruta

// await fs.writeFile(path, '[]') // Reset del documento

// // Instancia de ProductManager
// const manager = new ProductManager(path)

// // Prueba de getProducts
// await manager.getProducts()
//     .then(resolve => console.log(resolve))

// // Prueba de addProduct
// await manager.addProduct("Arroz", "Chino", "200", "imagen", "123asc", 250)

// await manager.addProduct("Arroz", "Chino", "200", "imagen", "123asc", 250) //Copia del producto de arriba

// await manager.addProduct("Pan", "Koreano", "300", "imagen", "123asd", 250)

// await manager.getProducts()
//     .then(resolve => console.log(resolve))

// // Prueba de getProductByID
// await manager.getProductByID(1)
//     .then(resolve => console.log(resolve))

// // Prueba de updateProduct
// await manager.updateProduct(1, { title: "Fideos", price: 300 })

// await manager.getProductByID(1)
//     .then(resolve => console.log(resolve))

// // Prueba de deleteProduct
// await manager.deleteProduct(3)
// await manager.deleteProduct(2)
// await manager.getProducts()
//     .then(resolve => console.log(resolve))