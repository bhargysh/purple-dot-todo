CREATE TABLE todos
(
    id SERIAL,
    description text,
    completed boolean,
    CONSTRAINT todos_pkey PRIMARY KEY (id)
);

INSERT INTO todos(description, completed) VALUES
 ('Go for a run', false),
 ('Send care package to the rents', false),
 ('Learn how to make healthy banana bread', true);
