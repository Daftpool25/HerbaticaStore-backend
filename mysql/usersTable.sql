use herbatica;
drop table userstable;

create table usersTable (
-- details
	name varchar(100) not null,
    lastName varchar(100) not null,
    phone varchar(20) not null,
    email varchar(50) not null,
    password varchar(20) not null,
    profilePhoto varchar(100) not null,
-- direction
    country varchar(50) not null,
    state varchar(50) not null,
    address varchar(50) not null,
-- Shooping
    myCar varchar(100),
    buysHistorial varchar(100),
    id int not null auto_increment,
    primary key(id)
);

insert into usersTable (name,lastName,phone,email,password,profilePhoto,country,state,address) values 
('Acacia', 'Fritz', '03855678901', 'acacia@gmail.com', 'casacasa','https://img.freepik.com/free-vector/profile-interface-concept-illustration_114360-3329.jpg','Argentina','Rosario','Bach 1789 Piso 1'),
('Artemisa', 'Fritz', '03855678901','artemisa@gmail.com', 'casacasa', 'https://img.freepik.com/free-vector/call-center-concept-illustration_114360-2045.jpg','Argentina','Cordoba','Amadeus 1789 Piso 1'),
('Frederika', 'Fritz', '03859902901','frederika@gmail.com', 'casacasa', 'https://img.freepik.com/free-vector/creative-thinking-concept-illustration_114360-2603.jpg','Argentina','Mendoza','Salieri 98');

select * from userstable;
