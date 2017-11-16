-- HW 10 --

--  Resets database when run --
DROP DATABASE IF EXISTS bamazon;

-- Creates a fresh bamazon database --
CREATE DATABASE bamazon;

-- Specifies what db is the table will go into --
USE bamazon;

--  Create table called 'Products' --
CREATE Table products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10, 2) NULL,
    stock_quantity INTEGER(10) NULL,
    PRIMARY KEY (id)
);

-- 10 Data items for Table --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lego", "Toys", 9.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tinker Toys", "Toys", 19.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lincoln Logs", "Toys", 14.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("K'nex", "Toys", 4.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bananas", "Grocery", 0.69, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apples", "Grocery", 0.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Carrots", "Grocery", 1.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toilet Paper", "Household", 12.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Broom", "Household", 7.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Soap", "Household", 2.99, 10);

SELECT * FROM products
