CREATE DATABASE contacts_for_me;

USE contacts_for_me;


CREATE TABLE contacts(
	contact_id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    email varchar(150) DEFAULT NULL,
    message varchar(150) DEFAULT NULL,
    primary key(contact_id)
)

