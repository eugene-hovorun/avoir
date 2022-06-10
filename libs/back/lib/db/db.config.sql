DROP TABLE IF EXISTS categories_products;

CREATE TABLE categories_products
(
    category_id int not null,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE,

    product_id  int not null,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS products;

CREATE TABLE products
(
    id    serial PRIMARY KEY unique not null,
    name  varchar(50),
    slug  varchar(50) unique not null,
    image varchar
);

DROP TABLE IF EXISTS categories;

CREATE TABLE categories
(
    id    serial PRIMARY KEY unique not null,
    name  varchar(50),
    slug  varchar(50) unique not null,
    image varchar
);
