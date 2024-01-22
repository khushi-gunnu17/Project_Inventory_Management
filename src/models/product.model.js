
export default class ProductModel {
    constructor(_id, _name, _desc, _price, _imageUrl) {
        this.id = _id
        this.name = _name
        this.desc = _desc
        this.price = _price
        this.imageUrl = _imageUrl
    }

    // static methods do not use arrow functions
    // static methods are those methods which you do not need to initiate, you can directly call them using class names. 
    static get() {
        return products;
    }

    static update(productObj) {
        const index = products.findIndex((p) => p.id == productObj.id)
        products[index] = productObj;
    }

    static delete(id) {
        const index = products.findIndex((p) => p.id == id)
        products.splice(index, 1)
    }

    static add(name, desc, price, imageUrl) {
        let newProduct = new ProductModel(
            products.length + 1,
            name, 
            desc, 
            price, 
            imageUrl
        )
        products.push(newProduct)
    }

    static getById(id) {
        return products.find((p) => p.id == id)
    }

}

var products = [
    // calling the constructor of the ProductModel
    new ProductModel(1, 'Product 1', 'Description for Product 10', 19.99, 'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg'),
    new ProductModel(2, 'Product 2', 'Description for Product 2', 29.99, 'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg'),
    new ProductModel(3, 'Product 3', 'Description for Product 3', 39.99, 'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg'),
];