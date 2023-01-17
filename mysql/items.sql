use herbatica;

create table items (
	commonName varchar(40) not null,
    scientistName varchar(40) not null,
    description varchar(500) not null,
    price decimal(6,2) not null,
    photos varchar(200) not null,
    type varchar(15) not null,
    id int not null auto_increment,
    createdBy int not null,
    foreign key (createdBy) references usersTable(id),
    primary key (id)
);


insert into items (commonName,scientistName,description,price,photos,type,createdBy) values
('Costilla de Adam', 'Monstera deliciosa','La Costilla de Adán es una planta de hojas grandes muy fácil de cuidar que cada vez está consiguiendo más adeptos en los hogares. ¡Su poder decorativo es enorme!', 15,'https://media.admagazine.com/photos/618a611d4b3f9152d1b42033/16:9/w_1280,c_limit/76290.jpg','Interior',1),
('Loteria','Dieffenbachia amoena','Dieffenbachia amoena es una monocotiledónea que se cultiva comúnmente como planta de interior, por sus hojas decorativas. Es una planta amante de la sombra muy popular y resistente',30,'https://www.elmueble.com/medio/2021/08/04/planta-para-el-bano-dieffenbachia_cc24c3d6_563x680.jpg','Interior',1),
('Filodendro','Monstera adansonii','La Monstera Adansonii procede de América central. En su hábitat natural crece bajo árboles de mayor tamaño, apoyada sobre otros troncos o raíces. Es una planta trepadora de raíces aéreas. Igual que el Potos, puede crecer anclada a un tutor o en cascada en alguna maceta elevada.',10,'https://thumbs.dreamstime.com/b/monstera-adansonii-sobre-fondo-blanco-160120146.jpg','Interior',3),
('Singonio', 'Syngonium podophyllum', 'El Syngonium podophyllum, también conocido como planta punta de flecha o Singonio, es una planta rastrera emparentada con el Philodendron. Es muy apreciada por su fácil cuidado y sus grandes hojas, que pueden variar desde el verde brillante hasta una encantadora mezcla de manchas.',7,'https://www.infoagro.com/documentos/images/4_170_singonio.jpg','Interior',2),
('Palma Chamadorea','Chamaedorea elegans','La camadorea (Chamaedorea Elegans) es una pequeña palmera originaria de México y Guatemala que resulta muy fácil de cultivar.',12,'https://i.pinimg.com/originals/ba/6c/5a/ba6c5adc399e4fac7ad5e48d4f562781.jpg','Interior',3),
('Calatea','Calathea stromanthe triostar','La Calathea Triostar o Stromanthe tiene su origen en las regiones tropicales de México, Brásil y Argentina. Pertenecen a la familia de las Marantaceae y son comúnmente conocidas como «Plantas del predicador» ¿Sabes por qué se les llama así? Por que las hojas pertenecientes a las plantas de esta familia se mueven a lo largo del día',35,'https://i.ytimg.com/vi/_NQdOPep4mA/maxresdefault.jpg','Interior',2),
('Pensamientos','Viola × wittrockiana','Los pensamientos son plantas híbridas ornamentales, cultivadas por sus vistosas flores, obtenidas de la especie silvestre Viola tricolor;',5,'https://www.pharysol.es/wp-content/uploads/2020/04/viola-tricolor-flor-de-pensamiento.png','Exterior',3),
('Violeta iMPERIAL','Cyclamen Persicum','La violeta imperial o como su nombre científico lo indica Cyclamen Persicum, son flores que tienden a disminuir de su tamaño cada vez que la planta aumenta de edad; pueden ser cultivadas en las regiones con climas templados aunque muchos especulan que es mejor hacerlo en climas fríos o bajas temperaturas.',10,'https://1.bp.blogspot.com/-D4Cnlh3zSk8/XjQnsmm_LBI/AAAAAAAA5eI/gEu7Of8We-AFDJI4PyuK6FUaBFgB2P53ACLcBGAsYHQ/s900/cyclamen%2Bo%2Bvioleta%2Bde%2Blos%2Balpes.jpg','Exterior',1),
('Margarita','Bellis perennis',' es una planta herbácea de la familia de las asteráceas muy utilizada a efectos decorativos mezclada con el césped, por sus colores y su resistencia a la siega.',5,'https://i0.wp.com/www.florestore.com/flores-a-domicilio/wp-content/uploads/2018/07/cuidados-de-las-margaritas-florestore-portada.jpg?fit=1024%2C768&ssl=1','Exterior',3),
('Clavel','Dianthus caryophyllus','El clavel es una flor muy utiliza para ramos y, sobre todo, es todo un icono de la cultura española. Vamos a conocer un poco más sobre sus características y cuidados.',8,'https://www.hogarmania.com/archivos/202004/cuidados-principales-de-los-claveles-668x400x80xX-1.jpg','Exterior',3);


insert into items (commonName,scientistName,description,price,photos,type,createdBy) values 
('Lavanda','Lavandula','La Lavanda es una de las plantas aromáticas por excelencia, perfecta para tener en casa. Los cuidados de la lavanda no son demasiado complicados',5,'https://www.tododisca.com/wp-content/uploads/2022/06/cuidados-riego-planta-lavanda.jpg','Exterior',2);


insert into items (commonName,scientistName,description,price,photos,type,createdBy) values ('Rosa','Rosa spp','Los rosales florecen continuamente durante todo el año desde primavera hasta principios de invierno, sobre todo en climas cálidos.',12,'https://www.jardineriaon.com/wp-content/uploads/2020/06/rosal-rojo.jpg','Exterior',2),
('Peperomia','Peperomia obtusifolia','La peperomia es una planta de interior fuerte y resistente que forma una pequeña mata arbustiva erguida que se cubre de suaves hojas redondeadas ',14,'https://images.hola.com/imagenes/decoracion/20220428208836/peperomia-plantas-interior-mc/1-80-847/peperomia-planta-1-a.jpg','Interior',1),
('PotusLimon','Epipremnum aureum','Planta purificadora del aire, perfecta para principiantes (de fácil cuidado). Es una de las variedades más divertidas y distintivas de la familia de los potus.',17,'https://d2r9epyceweg5n.cloudfront.net/stores/566/083/products/20200831_1124391-72f4559ca88bb5453716025963048654-1024-1024.jpg','Interior',1);

insert into items (commonName,scientistName,description,price,photos,type,createdBy) values 
('Peonia','Paeoniaceae','Es una de las plantas más rústicas que hay y, también, con una de las floraciones más hermosas.',40,'https://t2.ev.ltmcdn.com/es/posts/3/6/1/como_sembrar_y_plantar_peonias_2163_0_600.jpg','Exterior',3);

 DROP TABLE items;

