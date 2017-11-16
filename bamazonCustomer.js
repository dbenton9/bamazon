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
  // shopping();    // shopping function uses inquirer to take customer inputs
  // connection.end();
});

// Upon query display products and initiate shopping function
function queryResults(err, results) {
    if(err) {
        console.log(err);
    };
    // console.log("Id: " +  results[0].id + " | Product: " + results[0].product_name + " | Price: $" + results[0].price);
    
    // Loop displays products
    console.log("Product Catalog \n");
    for (i = 0; i < 10; i++) {
        console.log("Id: " +  results[i].id + " | Product: " + results[i].product_name + " | Price: $" + results[i].price);
    };

    // Start shopping
    shopping(results);
};

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
    
    ]).then(function(ans) {
        
        console.log("database product: " + results[ans.id-1].product_name); // testing database
        console.log("database avail qty: " + results[ans.id-1].stock_quantity); // testing database
        console.log("inquirer qty request: " + ans.qty); // testing user input

        

        //Testing update
       
        if (ans.qty > results[ans.id-1].stock_quantity) {
            console.log("Not enough in stock");
            connection.end();
        }
        else if (ans.qty <= results[ans.id-1].stock_quantity) {
            console.log("Order placed");

            connection.query(
                'UPDATE products SET ? WHERE ?',
                [ {stock_quantity: results[ans.id-1].stock_quantity -= ans.qty}, {id: 1}],
                function(err, res) {
                    if (err) throw err;
                    console.log("new amount: " + results[ans.id-1].stock_quantity);
                    
                    connection.end();
            });
        };

    });
    
};

// !!! USE THIS CODE WHEN QTY IS AVAILABLE !!!
// function updateProduct() {
//     console.log('updating');

//     connection.query(
//         'UPDATE products SET ? WHERE ?',
//         [ {quantity: 100}, {flavor: 'Rocky Road'}
//     ],
//     function(err, result) {
//         if (err) throw err;
//         console.log(result);
//     });
// };