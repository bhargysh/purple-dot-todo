CREATE TABLE todos
(
    id text NOT NULL,
    description text,
    completed boolean,
    CONSTRAINT todos_pkey PRIMARY KEY (id)
);

INSERT INTO todos(id, description, completed) VALUES
 ('83y98rhiopbgfb8t0uobqw', 'Go for a run', false),
 ('38ur9t80937t997353yrhi', 'Send care package to the rents', false),
 ('mocr0it883ohirwnnelfsk', 'Learn how to make healthy banana bread', true);
