CREATE DATABASE groupomania;


--set extension
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_last_log TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--create table for posts
CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    author_id VARCHAR(255) NOT NULL,
    post_time TIMESTAMP NOT NULL,
    file_name VARCHAR(255)
);

--create table for comments      file_name VARCHAR(255) NOT NULL
CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    author_id VARCHAR(255) NOT NULL,
    post_id int NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    user_name VARCHAR(255) NOT NULL
);


--    user_id VARCHAR(255) NOT NULL     user_id uuid references users(user_id) NOT NULL