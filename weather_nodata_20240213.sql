-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: weather
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookmarks`
--

DROP TABLE IF EXISTS `bookmarks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmarks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `feedId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_6e74b0552df12d4c0d83a940859` (`feedId`),
  KEY `FK_c6065536f2f6de3a0163e19a584` (`userId`),
  CONSTRAINT `FK_6e74b0552df12d4c0d83a940859` FOREIGN KEY (`feedId`) REFERENCES `feeds` (`id`),
  CONSTRAINT `FK_c6065536f2f6de3a0163e19a584` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cityName` varchar(100) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clothes`
--

DROP TABLE IF EXISTS `clothes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `lowPerceivedTemperature` int NOT NULL,
  `highPerceivedTemperature` int NOT NULL,
  `clothesTopId` int DEFAULT NULL,
  `clothesBottomId` int DEFAULT NULL,
  `clothesCoatId` int DEFAULT NULL,
  `clothesAccessoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_66bdadb5178a8bb236f381c89de` (`clothesTopId`),
  KEY `FK_2bd9b505d0821fa2f3b63def648` (`clothesBottomId`),
  KEY `FK_4619579aa3b3a46a43610798885` (`clothesCoatId`),
  KEY `FK_b8b0461f1053d832686f8e5965a` (`clothesAccessoryId`),
  CONSTRAINT `FK_2bd9b505d0821fa2f3b63def648` FOREIGN KEY (`clothesBottomId`) REFERENCES `clothes_bottom` (`id`),
  CONSTRAINT `FK_4619579aa3b3a46a43610798885` FOREIGN KEY (`clothesCoatId`) REFERENCES `clothes_coat` (`id`),
  CONSTRAINT `FK_66bdadb5178a8bb236f381c89de` FOREIGN KEY (`clothesTopId`) REFERENCES `clothes_top` (`id`),
  CONSTRAINT `FK_b8b0461f1053d832686f8e5965a` FOREIGN KEY (`clothesAccessoryId`) REFERENCES `clothes_accessory` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clothes_accessory`
--

DROP TABLE IF EXISTS `clothes_accessory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes_accessory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `image` varchar(2000) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clothes_bottom`
--

DROP TABLE IF EXISTS `clothes_bottom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes_bottom` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `image` varchar(2000) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clothes_coat`
--

DROP TABLE IF EXISTS `clothes_coat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes_coat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `image` varchar(2000) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clothes_set`
--

DROP TABLE IF EXISTS `clothes_set`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes_set` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `clothesTopId` int DEFAULT NULL,
  `clothesBottomId` int DEFAULT NULL,
  `clothesCoatId` int DEFAULT NULL,
  `clothesAccessoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_735dd4413642a4d0f1073a09aa5` (`clothesTopId`),
  KEY `FK_e318cc6aa8d4f57e5d563233f36` (`clothesBottomId`),
  KEY `FK_827549c191807578a2bac2510b2` (`clothesCoatId`),
  KEY `FK_f57173cd29e6c6cd16c69cfce3e` (`clothesAccessoryId`),
  CONSTRAINT `FK_735dd4413642a4d0f1073a09aa5` FOREIGN KEY (`clothesTopId`) REFERENCES `clothes_top` (`id`),
  CONSTRAINT `FK_827549c191807578a2bac2510b2` FOREIGN KEY (`clothesCoatId`) REFERENCES `clothes_coat` (`id`),
  CONSTRAINT `FK_e318cc6aa8d4f57e5d563233f36` FOREIGN KEY (`clothesBottomId`) REFERENCES `clothes_bottom` (`id`),
  CONSTRAINT `FK_f57173cd29e6c6cd16c69cfce3e` FOREIGN KEY (`clothesAccessoryId`) REFERENCES `clothes_accessory` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clothes_top`
--

DROP TABLE IF EXISTS `clothes_top`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes_top` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `image` varchar(2000) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `feed_comments`
--

DROP TABLE IF EXISTS `feed_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feed_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` timestamp(6) NULL DEFAULT NULL,
  `feedId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7366375187a416a2b39ad58af39` (`feedId`),
  KEY `FK_27e2eb01420dc13e34017f59599` (`userId`),
  CONSTRAINT `FK_27e2eb01420dc13e34017f59599` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_7366375187a416a2b39ad58af39` FOREIGN KEY (`feedId`) REFERENCES `feeds` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `feed_images`
--

DROP TABLE IF EXISTS `feed_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feed_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imageUrl` varchar(2000) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` timestamp(6) NULL DEFAULT NULL,
  `feedId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_54658933b6e0f091a3ae300ce75` (`feedId`),
  CONSTRAINT `FK_54658933b6e0f091a3ae300ce75` FOREIGN KEY (`feedId`) REFERENCES `feeds` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `feed_likes`
--

DROP TABLE IF EXISTS `feed_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feed_likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `feedId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_93ba7785c4d8890d4afe47f4b9e` (`feedId`),
  KEY `FK_68bf28fd8c16bdcc9f8b8b1390e` (`userId`),
  CONSTRAINT `FK_68bf28fd8c16bdcc9f8b8b1390e` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_93ba7785c4d8890d4afe47f4b9e` FOREIGN KEY (`feedId`) REFERENCES `feeds` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `feed_tags`
--

DROP TABLE IF EXISTS `feed_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feed_tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `feedId` int DEFAULT NULL,
  `tagId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_bfed6c23d82a720ae4605d7e7ed` (`feedId`),
  KEY `FK_4939e6d257c385ea8fc5b476850` (`tagId`),
  CONSTRAINT `FK_4939e6d257c385ea8fc5b476850` FOREIGN KEY (`tagId`) REFERENCES `tags` (`id`),
  CONSTRAINT `FK_bfed6c23d82a720ae4605d7e7ed` FOREIGN KEY (`feedId`) REFERENCES `feeds` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `feeds`
--

DROP TABLE IF EXISTS `feeds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feeds` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(2000) NOT NULL,
  `lowTemperature` int NOT NULL,
  `highTemperature` int NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` timestamp(6) NULL DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `weatherConditionId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1dc57d1b6372d3089fce2848191` (`userId`),
  KEY `FK_d7b03b8af0e464f1366cd657433` (`weatherConditionId`),
  CONSTRAINT `FK_1dc57d1b6372d3089fce2848191` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_d7b03b8af0e464f1366cd657433` FOREIGN KEY (`weatherConditionId`) REFERENCES `weatherCondition` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `query-result-cache`
--

DROP TABLE IF EXISTS `query-result-cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `query-result-cache` (
  `id` int NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) DEFAULT NULL,
  `time` bigint NOT NULL,
  `duration` int NOT NULL,
  `query` text NOT NULL,
  `result` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `socialAccountProviders`
--

DROP TABLE IF EXISTS `socialAccountProviders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialAccountProviders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(100) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userBlocks`
--

DROP TABLE IF EXISTS `userBlocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userBlocks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userId` int DEFAULT NULL,
  `blockUserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_dc964badd00bdb1f7db17b13ad8` (`userId`),
  KEY `FK_a07a4232feb3337e380d5ed26e5` (`blockUserId`),
  CONSTRAINT `FK_a07a4232feb3337e380d5ed26e5` FOREIGN KEY (`blockUserId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_dc964badd00bdb1f7db17b13ad8` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userFollows`
--

DROP TABLE IF EXISTS `userFollows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userFollows` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userId` int DEFAULT NULL,
  `followUserId` int DEFAULT NULL,
  `isFollowingBack` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_a600e5256c17053a069d3391087` (`userId`),
  KEY `FK_4d6166d3950d79986234ce9b1f4` (`followUserId`),
  CONSTRAINT `FK_4d6166d3950d79986234ce9b1f4` FOREIGN KEY (`followUserId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_a600e5256c17053a069d3391087` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `gender` tinyint DEFAULT '0',
  `locationInformationAgree` tinyint DEFAULT '0',
  `socialAccountProviderId` int DEFAULT NULL,
  `socialAccountUid` varchar(100) DEFAULT NULL,
  `profileImage` varchar(2000) DEFAULT 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
  `temperatureSensitivity` tinyint DEFAULT '0',
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` timestamp(6) NULL DEFAULT NULL,
  `cityId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3785318df310caf8cb8e1e37d85` (`cityId`),
  KEY `FK_c8bd3c07ec4be7af2512e9501fe` (`socialAccountProviderId`),
  CONSTRAINT `FK_3785318df310caf8cb8e1e37d85` FOREIGN KEY (`cityId`) REFERENCES `cities` (`id`),
  CONSTRAINT `FK_c8bd3c07ec4be7af2512e9501fe` FOREIGN KEY (`socialAccountProviderId`) REFERENCES `socialAccountProviders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `weather`
--

DROP TABLE IF EXISTS `weather`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weather` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `temperature` int NOT NULL,
  `tempetatureSensitivity` tinyint NOT NULL DEFAULT '0',
  `weatherConditionId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_d8a087cdaa2aab7e878f7c5c31a` (`weatherConditionId`),
  CONSTRAINT `FK_d8a087cdaa2aab7e878f7c5c31a` FOREIGN KEY (`weatherConditionId`) REFERENCES `weatherCondition` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `weatherCondition`
--

DROP TABLE IF EXISTS `weatherCondition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weatherCondition` (
  `id` int NOT NULL AUTO_INCREMENT,
  `condition` varchar(100) NOT NULL,
  `image` varchar(2000) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-13 13:16:42
