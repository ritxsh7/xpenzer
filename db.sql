
-- =======USER TABLE========

CREATE TABLE exp_user(
	user_id SERIAL PRIMARY KEY,
	handlename VARCHAR(100) UNIQUE,
	username VARCHAR(100) NOT NULL,
	user_pass VARCHAR(100),
	joined_date DATE
);

ALTER TABLE exp_user ALTER COLUMN joined_date DROP NOT NULL;
SELECT * FROM exp_user;
SELECT * FROM exp_user WHERE LOWER(username) LIKE LOWER('ri%');
DELETE FROM exp_user WHERE user_id in (15,16);
DROP TABLE exp_user;

-- ======SPENDING TABLE=======

CREATE TABLE user_spendings(
    spending_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    total_exp NUMERIC(10, 2) NOT NULL,
	is_shared_expense BOOLEAN DEFAULT FALSE,
    spending_date DATE NOT NULL,
    spending_time TIME NOT NULL,
    description TEXT,
	CONSTRAINT fk_spending_user FOREIGN KEY(user_id) REFERENCES exp_user(user_id)
);

SELECT * FROM user_spendings;
DROP TABLE user_spendings;
TRUNCATE TABLE user_spendings;
DELETE FROM user_spendings WHERE spending_id = 37;
 
-- =======USER_EXPENSES TABLE====

CREATE TABLE user_expenses(
	exp_id SERIAL PRIMARY KEY,
	spending_id INT REFERENCES user_spendings(spending_id),
	amount NUMERIC(10,2) NOT NULL
);

SELECT * FROM user_expenses;
SELECT * FROM user_expenses JOIN user_spendings USING(spending_id);	
TRUNCATE TABLE user_expenses;
DELETE FROM user_expenses WHERE spending_id = 37;


-- =======FRIENDS TABLE======

CREATE TABLE friends(
	user_id INT,
	friend_id INT,
	friend_name VARCHAR(50),
	created_on DATE NOT NULL,
	balance NUMERIC(10, 2) DEFAULT 0,
	CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES exp_user(user_id),
	CONSTRAINT fk_friend FOREIGN KEY(friend_id) REFERENCES exp_user(user_id)
);

SELECT * FROM friends;
DROP TABLE friends;
UPDATE friends SET balance = 30 WHERE friend_id = 1;
ALTER TABLE friends DROP COLUMN friend_name;
DELETE FROM friends WHERE user_id = 1;

-- =======CONTRIBUTERS TABLE=====

CREATE TABLE contributors(
	contr_id SERIAL PRIMARY KEY,
	spending_id INT references user_spendings(spending_id) ON DELETE CASCADE,
	user_id INT references exp_user(user_id) ON DELETE CASCADE,
	amount NUMERIC(10, 2)
);

SELECT * FROM contributors;
DELETE FROM contributors WHERE spending_id = 37;
DROP TABLE contributors;
TRUNCATE TABLE contributors;

-- ================ GENERAL QUERIES=============
SELECT * FROM FRIENDS F JOIN EXP_USER U ON F.FRIEND_ID = U.USER_ID WHERE F.USER_ID = 1 AND U.USERNAME = 'Sanket Pawar' ;
SELECT * FROM FRIENDS WHERE USER_ID = 1 AND FRIEND_ID = 17

-- =============== VIEWS =====================

-- 1. USER - FRIEND - CONTRBUTION - SPENDING

CREATE VIEW user_friend_contri AS 
SELECT f.user_id, f.friend_id, u.username, c.amount , s.description, s.spending_date, s.spending_time
FROM 
friends f JOIN contributors c ON f.friend_id = c.user_id
JOIN user_spendings s ON s.spending_id = c.spending_id
JOIN exp_user u ON f.friend_id = u.user_id;


DROP VIEW user_friend_contri;
SELECT * FROM user_friend_contri;

SELECT username, SUM(amount) FROM user_friend_contri
GROUP BY username;

