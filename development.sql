
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
delete from users where username = 'Upendra';

SELECT * FROM users WHERE phone LIKE '84%';

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
delete from friends where true;
drop table friends;
update friends set balance = 0 where user_id = 1;
UPDATE friends SET balance = 0.00 WHERE user_id = 1 AND friend_id IN (2,3,7)
alter column friends alter column balance tye float

INSERT INTO friends(user_id, friend_id) VALUES
(1, 2),
(2, 1);	

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
delete from spendings where spending_id = 14;


INSERT INTO spendings(user_id, amount, description) VALUES
(1, 500, 'Exam form fees');

CREATE TABLE contributions (
    contri_id SERIAL PRIMARY KEY,
    spending_id INT,
	spending_user INT,
    user_id INT,
    amount DECIMAL(10, 2),
    FOREIGN KEY (spending_id) REFERENCES spendings(spending_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (spending_user) REFERENCES users(user_id)
);
ALTER TABLE contributions ADD COLUMN settled BOOLEAN DEFAULT false
ALTER TABLE contributions ALTER COLUMN spending_user SET NOT NULL
UPDATE contributions SET settled = true WHERE contri_id = 7

SELECT * FROM contributions;
delete from contributions where spending_id = 14;
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

create table groups (
	group_id SERIAL PRIMARY KEY,
	group_name VARCHAR(100) NOT NULL,
	group_profile VARCHAR(8) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
SELECT * from groups;
delete from groups where true;
drop table groups;


create table group_members(
	group_id INT,
	user_id INT, 
	joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(group_id, user_id),
	FOREIGN KEY(group_id) REFERENCES groups(group_id),
	FOREIGN KEY(user_id) REFERENCES users(user_id)
)
SELECT * from group_members;
delete from group_members where true;
drop table group_members;

create table group_spendings(
	group_id INT,
	spending_id INT,
	PRIMARY KEY(group_id, spending_id),
	FOREIGN KEY(group_id) REFERENCES groups(group_id),
	FOREIGN KEY(spending_id) REFERENCES spendings(spending_id)
)
SELECT * from group_spendings;
drop table group_spendings

-- =========== VIEWS ============

-- ==========USER GROUPS =====

CREATE OR REPLACE VIEW user_groups AS
SELECT 
	g.group_id,
	g.group_name,
	g.group_profile,
	gm.user_id as user_id,
	u.username as username,
	u.profile_color
FROM
groups g JOIN group_members gm
USING(group_id)
JOIN users u USING(user_id)


SELECT user_id, username, profile_color FROM user_groups WHERE group_id =2 AND user_id != 1;
drop view user_groups;

-- -============GROUP SPENDINGS========

CREATE OR REPLACE VIEW group_spendings_details
as
SELECT 
	g.group_id,
	s.spending_id,
	s.description,
	s.date,
	s.amount,
	u.user_id,
	u.username,
	u.profile_color
FROM group_spendings g JOIN spendings s
USING (spending_id)
JOIN users u
USING(user_id);
		
SELECT * FROM group_spendings_details;
SELECT spending_id, description, amount, user_id, username, profile_color
      FROM group_spendings_details WHERE group_id = 2
	
-- ======= USER FRIENDS VIEW =========
CREATE OR REPLACE VIEW user_friends AS 
SELECT 
    u1.user_id,
    u2.user_id as friend_id,
	u2.username as friend_name,
	COALESCE(f2.balance, 0) - f1.balance AS net_balance
FROM 
    friends f1
LEFT JOIN 
    friends f2 
    ON f1.user_id = f2.friend_id 
    AND f1.friend_id = f2.user_id
JOIN 
    users u1 
    ON f1.user_id = u1.user_id
JOIN 
    users u2 
    ON f1.friend_id = u2.user_id
	
SELECT * FROM user_friends;
SELECT SUM(net_balance) FROM user_friends WHERE user_id = 1 AND net_balance < 0
	
drop view user_friends;
		
-- ======= USER CONTRIBUTIONS VIEW =========
CREATE OR REPLACE VIEW user_contributions AS 
SELECT
s.spending_id,
s.user_id as spending_user,
s.date as spending_date,
c.contri_id, 
c.user_id as contri_user,
c.settled as settled,
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
	
	IF check_user = true
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
