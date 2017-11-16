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
  connection.end();
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
    shopping()
};

function shopping() {
    inquirer.prompt([
        {
            type: "input",
            message: "Choose an id",
            name: "id"
        },{
            type: "input",
            message: "Select quantity:",
            name: "qty"
        }
    
    ]).then(function(ans) {
        console.log(results(ans.id)); 
        // 1 - fix scope error "cannot identify results"
        // 2 - compare qty selected with qty avail
        // 3 - use conditional statement to determine further action
            // - if qty NOT available, notify user and restart shopping()
            // if available, subtract qty from database and restart shopping()
    });
};

