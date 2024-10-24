const Sequelize = require("sequelize");
const db = require("./db.js");

const Item = db.define("item", {
    name: {
        type: Sequelize.STRING
    },
    height: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.FLOAT
    },
    material: {
        type: Sequelize.STRING
    }
});

Item.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

module.exports = Item;
