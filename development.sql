
-- =============== ALL THE SCHEMAS =============
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    phone VARCHAR(10) UNIQUE,
	is_registered BOOLEAN DEFAULT TRUE,
    password VARCHAR(255)
);

SELECT * FROM users;
drop table users;
alter table 
delete from users where phone is null;

CREATE TABLE friends (
    user_id INT,
    friend_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	balance DECIMAL(10,2) DEFAULT 0,
    PRIMARY KEY (user_id, friend_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (friend_id) REFERENCES users(user_id)
);
SELECT * FROM friends;
drop table friends;

INSERT INTO friends(user_id, friend_id) VALUES
(11, 12),
(12, 11);

CREATE TABLE spendings (
    spending_id SERIAL PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10, 2),
    description TEXT,
    date date DEFAULT CURRENT_DATE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
SELECT * FROM spendings;
drop table spendings;

INSERT INTO spendings(user_id, amount, description) VALUES
(1, 500, 'Exam form fees');

CREATE TABLE contributions (
    contri_id SERIAL PRIMARY KEY,
    spending_id INT,
    user_id INT,
    amount DECIMAL(10, 2),
    FOREIGN KEY (spending_id) REFERENCES spendings(spending_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
SELECT * FROM contributions WHERE spending_id = 1;
drop table contributions;



CREATE TABLE personal_expenses (
    expense_id SERIAL PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10, 2),
    description TEXT,
     date date DEFAULT CURRENT_DATE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
SELECT * FROM personal_expenses;
delete from personal_expenses where true;
drop table personal_expenses;

-- =========== VIEWS ============

CREATE OR REPLACE VIEW user_contributions AS 
SELECT
s.spending_id,
s.user_id as spending_user, 
c.contri_id , 
c.user_id as contri_user, 
u.username as contri_username, 
c.amount as contri_amount, 
s.amount as spending_amount ,
s.description
FROM 
contributions c
JOIN 
spendings s
USING(spending_id)
JOIN
users u
ON u.user_id = c.user_id;

SELECT * FROM user_contributions
drop view user_contributions


-- ============ INDEXES =============
CREATE INDEX idx_friends_user_id ON friends(user_id);
CREATE INDEX idx_friends_friend_id ON friends(friend_id);
CREATE INDEX idx_spendings_user_id ON spendings(user_id);
CREATE INDEX idx_contributions_spending_id ON contributions(spending_id);
CREATE INDEX idx_contributions_user_id ON contributions(user_id);
CREATE INDEX idx_personal_expenses_user_id ON personal_expenses(user_id);
CREATE INDEX idx_friends_user_friend ON friends(user_id, friend_id);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_spending_description ON spendings(description);
CREATE INDEX idx_expense_description ON personal_expenses(description);


-- =========TRIGGERS============

CREATE OR REPLACE FUNCTION fn_create_contri_expense()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
AS
$$
DECLARE 
	description TEXT;
	curr_user INT;
	checK_user BOOLEAN;
	friend_balance DECIMAL(10,2);
BEGIN
	SELECT s.description, s.user_id INTO description, curr_user 
	FROM spendings s 
	WHERE spending_id = NEW.spending_id;
	
	SELECT is_registered INTO check_user 
	FROM users WHERE user_id = NEW.user_id;
	
	IF is_registered = true
	THEN
	INSERT INTO personal_expenses(user_id, amount, description) 
	VALUES
	( NEW.user_id, NEW.amount, description);
	END IF;
	
	UPDATE friends
	SET balance = balance + NEW.amount
	WHERE user_id = curr_user AND friend_id = NEW.user_id;
	
	RETURN NEW;
END;
$$


CREATE TRIGGER insert_contri_as_expense
AFTER INSERT 
ON contributions
FOR EACH ROW 	
EXECUTE PROCEDURE fn_create_contri_expense();


