DROP TABLE IF EXISTS products;

CREATE TABLE products
(
    id    serial PRIMARY KEY,
    name  varchar(50),
    slug  varchar(50),
    image varchar(150)
);

DROP TABLE IF EXISTS categories;

CREATE TABLE categories
(
    id    serial PRIMARY KEY,
    name  varchar(50),
    slug  varchar(50),
    image varchar(150)
);

DROP TABLE IF EXISTS categories_products;

CREATE TABLE categories_products
(
    category_id int,
    FOREIGN KEY (category_id) REFERENCES categories (id),
    product_id  int,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);
