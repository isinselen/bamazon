DROP DATABASE IF EXISTS bamazonData;
CREATE DATABASE bamazonData;

USE bamazon;

CREATE TABLE products (
item_id INTEGER(100) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price BIGINT(250),
stock_quantity BIGINT(250),
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Skirt', 'Clothing', 35, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Belt', 'Accessories', 15, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Swimsuit', 'Activewear', 45, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Jeans', 'Clothing', 50, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Face Wash', 'Body', 18, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Tracksuit', 'Clothing', 80, 0);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Skirt', 'Clothing', 35, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Top', 'Clothing', 10, 18);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Sneakers', 'Shoes', 32, 6);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Boots', 'Shoes', 120, 3);

SELECT * FROM products;
