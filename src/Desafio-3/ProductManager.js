import { promises as fs } from 'fs'

export class ProductManager {
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

export class Product {
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