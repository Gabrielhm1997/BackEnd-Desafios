class ProductManager {
    constructor() {
        this.products = [],
            this.idCount = 1
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {

        const product = new Product(title, description, price, thumbnail, code, stock);

        if (product.title && product.description && product.price && product.thumbnail && product.code && product.stock) {

            const productFound = this.products.find(item => item.code === product.code);

            if (!productFound) {

                product.setId(this.idCount);

                this.idCount++;

                this.products.push(product);
            } else {
                console.log("El producto ya existe en el array");
            }

        } else {
            console.log("Falta 1 o mas Valores del producto");
        }

    }

    getProducts = () => {
        return this.products;
    }

    getProductById = (id) => {

        const productFound = this.products.find(product => product.id === id);

        if (productFound) {
            return productFound
        } else {
            return "Not found"
        }
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title,
            this.description = description,
            this.price = price,
            this.thumbnail = thumbnail,
            this.code = code,
            this.stock = stock,
            this.id = null
    }

    setId(id) {
        this.id = id
    }
}