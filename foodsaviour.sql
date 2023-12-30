CREATE TABLE `users` (
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Roles` varchar(255) DEFAULT NULL,
  `Consent` varchar(50) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `Organization` varchar(255) DEFAULT NULL,
  `Approve` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tracker` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `Category` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Quantity` float DEFAULT NULL,
  `Qunits` varchar(255) NOT NULL,
  `amountToClients` float DEFAULT NULL,
  `amountToAFeed` float DEFAULT NULL,
  `amountToCompost` float DEFAULT NULL,
  `amountToPartNet` float DEFAULT NULL,
  `amountToLandfill` float DEFAULT NULL,
  `percentClients` float DEFAULT NULL,
  `percentAFeed` float DEFAULT NULL,
  `percentCompost` float DEFAULT NULL,
  `percentPartNet` float DEFAULT NULL,
  `percentLandfill` float DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Organization` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `posts` (
  `product` varchar(255) DEFAULT NULL,
  `Type` varchar(255) DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  `Units` varchar(3) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `date_time` timestamp NULL DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `shared_with` varchar(255) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `public_acess` varchar(255) DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `permissions` (
  `role` varchar(255) DEFAULT NULL,
  `metrics` varchar(255) DEFAULT NULL,
  `network` varchar(255) DEFAULT NULL,
  `readwrite` varchar(255) DEFAULT NULL,
  `Organization` varchar(255) DEFAULT NULL,
  `id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


