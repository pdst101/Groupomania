CREATE DATABASE groupomania;


--set extension
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_admin BOOLEAN NOT NULL
);

--insert fake users
INSERT INTO users (user_name, user_email, user_password, user_admin) VALUES ('natalia', 'natalia@email.com', '123', 'false');


--create table for posts
CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    author_id VARCHAR(255) NOT NULL
);

--create table for comments
CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    author_id VARCHAR(255) NOT NULL,
    post_id int NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    user_name VARCHAR(255) NOT NULL
);


--    user_id VARCHAR(255) NOT NULL     user_id uuid references users(user_id) NOT NULL