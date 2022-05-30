INSERT INTO products(name, slug, image)
VALUES ('Кардан', 'кардан', './.'),
       ('Бампер', 'бампер', './.'),
       ('Колесо', 'колесо', './.');

INSERT INTO categories(name, slug, image)
VALUES ('Карданы', 'карданы', './.'),
       ('Кузовные части', 'кузовные_части', './.');

INSERT INTO categories_products(category_id, product_id)
VALUES (1, 1),
       (2, 2),
       (2, 3);
