// HW #10 - Bamazon

// Requirements
var mysql = require('mysql')
var inquirer = require("inquirer");

// Establishing connection with MySQL databases
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

// Upon connection initiate query
connection.connect(function(err) {
  if (err) throw err;
  connection.query("SELECT * FROM products", queryResults);  // queryResults callback function that displays products
});

// Upon query display products and initiate shopping function
function queryResults(err, results) {
    if(err) {
        console.log(err);
    };
    
    // Loop displays products
    console.log("Product Catalog \n");
    for (i = 0; i < 10; i++) {
        console.log("Id: " +  results[i].id + "\t" + "Product: " + results[i].product_name  + " (Price: $" + results[i].price + ")");

    };

    // Start shopping
    shopping(results);
};

// shopping take users inputs for id and quantity
function shopping(results) {
    inquirer.prompt([
        {
            type: "input",
            message: "Choose an id:",
            name: "id"
        },{
            type: "input",
            message: "Select quantity:",
            name: "qty"
        }
    // promise ".then" runs condition statement to check available quantity
    ]).then(function(ans) {
        
        console.log("database product: " + results[ans.id-1].product_name); // testing database
        console.log("database avail qty: " + results[ans.id-1].stock_quantity); // testing database
       
       // console.log("type of" + typeof(results[ans.id-1]));
        // IF requested qty unavailable
        if (ans.qty > results[ans.id-1].stock_quantity) { 
            console.log("Not enough in stock");
            connection.end();
        }
        // IF requested qty available
        else if (ans.qty <= results[ans.id-1].stock_quantity) {
            console.log("Order placed");

            connection.query(
                'UPDATE products SET ? WHERE ?',
                [ {stock_quantity: results[ans.id-1].stock_quantity -= ans.qty}, {id: ans.id}], // mysql database updated  parseInt(results[ans.id-1])
                function(err, res) {
                    if (err) throw err;
                    console.log("remaining amount: " + results[ans.id-1].stock_quantity);
                    
                    connection.end();
            });
        };

    });
    
};
