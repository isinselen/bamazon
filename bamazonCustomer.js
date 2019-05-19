var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({

host: "localhost",
port: 8889,
user: "root",
password: "root",
database: "bamazonData"

})

// connects to the database
connection.connect(function(error){

    if (error) throw error;
    console.log("connected as id " + connection.threadId + "\n");
    queryAllProducts()
})


//displays all items availiabe for sale
function queryAllProducts() {
  
  console.table("\nLatest Clothes & Fashion: \n");
    connection.query("SELECT * FROM products", function(error, response) {
      if (error) throw error;
      for (var i = 0; i < response.length; i++) {
        console.table(response[i].item_id  + " | " + response[i].product_name + " | " + response[i].department_name + " | " + response[i].price + " | " + response[i].stock_quantity);
      }
      console.table("-----------------------------------");
      startShopping();
    });
  }
  
// asks what the customer would like to do next
function continueShopping () {
  inquirer.prompt([
      {
          name: "tryAgain",
          type: "confirm",
          message: "Would you like to continue shopping? "
      }
  ]).then(function (answer) {
      if (answer.tryAgain) {
        queryAllProducts();
      } else {
          // connection.query("SELECT * FROM products", function(error, results) {
          //     if (error) throw error;
          //     console.table(results);
          // });
          console.log("Ok! Thank you for shopping at the Latest Clothes & Fashion!");
      }
  })
}

  // This part prompts users with two messages:

function startShopping() {
    inquirer.prompt([
        {
            name: "itemID", //'label' for the answer
            type: "input",
            message: "What is the ID of the product you would like to buy: "
        },
        {
            name: "quantity",
            type: "input",
            message: "Please enter the amount of items you would like to buy: "
        }

        //this part checks if the store has enough of the product to meet the customer's request
    ]).then(function(answer) {
        connection.query("SELECT item_id, product_name, stock_quantity, price FROM products WHERE ?", { item_id: answer.itemID }, function(error, results) {
            if (error) throw error;
            if (results[0].stock_quantity >= answer.quantity) {
              // this updating the SQL database to reflect the remaining quantity.
                var itemsRemaining = results[0].stock_quantity - answer.quantity;
                var purchaseTotal = answer.quantity * results[0].price;
                connection.query(`UPDATE products SET stock_quantity=${itemsRemaining} WHERE item_id=${answer.itemID}`, function(error, results) {
                    if (error) throw error;
                    console.table(`Your total is: ${purchaseTotal}`);
                    continueShopping();
                });
            } 
            else {
                console.log("The amount you requested exceeds the product amount in the inventory. :( Sorry!");
                continueShopping();
            }
        })
    })
}

