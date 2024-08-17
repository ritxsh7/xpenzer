
-- =============== ALL THE SCHEMAS =============
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    phone VARCHAR(10) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
SELECT * FROM users;
drop table users;


CREATE TABLE friends (
    user_id INT,
    friend_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	balance DECIMAL(10, 2),
    PRIMARY KEY (user_id, friend_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (friend_id) REFERENCES users(user_id)
);
SELECT * FROM friends;
drop table friends;

CREATE TABLE spendings (
    spending_id SERIAL PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10, 2),
    description TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
SELECT * FROM spendings;
drop table spendings;

CREATE TABLE contributions (
    contri_id SERIAL PRIMARY KEY,
    spending_id INT,
    user_id INT,
    amount DECIMAL(10, 2),
    FOREIGN KEY (spending_id) REFERENCES spendings(spending_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
SELECT * FROM contributions;
drop table contributions;


CREATE TABLE personal_expenses (
    expense_id SERIAL PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10, 2),
    description TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
SELECT * FROM personal_expenses;
drop table personal_expenses;


