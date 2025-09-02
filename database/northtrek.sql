CREATE DATABASE  IF NOT EXISTS `northtrek` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `northtrek`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: northtrek
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `activity_id` int NOT NULL AUTO_INCREMENT,
  `plan_id` int DEFAULT NULL,
  `activity_name` text,
  `activity_start` time DEFAULT NULL,
  `activity_end` time DEFAULT NULL,
  PRIMARY KEY (`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,385141,'asd','19:15:00','19:15:00'),(2,385141,'asd','19:16:00','19:16:00'),(3,385141,'asd','19:16:00','19:16:00'),(4,925456,'asd','19:15:00','19:15:00'),(5,925456,'asd','19:16:00','19:16:00'),(6,925456,'asd','19:16:00','19:16:00'),(7,138467,'asd','19:15:00','19:15:00'),(8,138467,'asd','19:16:00','19:16:00'),(9,138467,'asd','19:16:00','19:16:00'),(10,187050,'กินเบียร์','18:00:00','21:00:00'),(11,187050,'กินเหล้า','21:00:00','22:00:00'),(12,187050,'หม่าล่า','22:00:00','22:55:00'),(13,109308,'8;p','13:00:00','13:00:00'),(14,109308,'su','13:00:00','14:00:00'),(15,944169,'',NULL,NULL),(16,267251,'',NULL,NULL),(17,655680,'asd',NULL,NULL),(18,653192,'แกะถุง (แกง)','20:00:00','21:00:00'),(19,653192,'เสียบ (ชาร์จ ทรศ จากแบตสำรอง)','21:00:00','22:00:00'),(20,653192,'แตก (หัว)','22:00:00','22:00:00'),(21,664673,'ฟไก',NULL,'13:00:00'),(22,664673,'ฟหก','13:00:00','13:00:00'),(23,296122,'ๆไำ',NULL,NULL),(24,849197,'ๆไำ',NULL,NULL);
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `favorite_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `plan_id` int DEFAULT NULL,
  `favorite_timeStamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`favorite_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int DEFAULT NULL,
  `receiver_id` int DEFAULT NULL,
  `message_text` text,
  `message_timeStamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parkactivity`
--

DROP TABLE IF EXISTS `parkactivity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parkactivity` (
  `parkActivity_id` int DEFAULT NULL,
  `park_id` int DEFAULT NULL,
  `parkActivity_name` text,
  `parkActivity_duration` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parkactivity`
--

LOCK TABLES `parkactivity` WRITE;
/*!40000 ALTER TABLE `parkactivity` DISABLE KEYS */;
/*!40000 ALTER TABLE `parkactivity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parkimg`
--

DROP TABLE IF EXISTS `parkimg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parkimg` (
  `parkImg_id` int DEFAULT NULL,
  `park_id` int DEFAULT NULL,
  `parkImg_src` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parkimg`
--

LOCK TABLES `parkimg` WRITE;
/*!40000 ALTER TABLE `parkimg` DISABLE KEYS */;
/*!40000 ALTER TABLE `parkimg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parks`
--

DROP TABLE IF EXISTS `parks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parks` (
  `park_id` int DEFAULT NULL,
  `park_name` varchar(255) DEFAULT NULL,
  `park_phone` text,
  `park_location` text,
  `park_email` text,
  `park_activity` text,
  `park_biome` text,
  `park_animal` text,
  `park_fee` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parks`
--

LOCK TABLES `parks` WRITE;
/*!40000 ALTER TABLE `parks` DISABLE KEYS */;
/*!40000 ALTER TABLE `parks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planimg`
--

DROP TABLE IF EXISTS `planimg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planimg` (
  `planImg_id` int NOT NULL AUTO_INCREMENT,
  `plan_id` int DEFAULT NULL,
  `planImg_src` text,
  PRIMARY KEY (`planImg_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planimg`
--

LOCK TABLES `planimg` WRITE;
/*!40000 ALTER TABLE `planimg` DISABLE KEYS */;
/*!40000 ALTER TABLE `planimg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans`
--

DROP TABLE IF EXISTS `plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plans` (
  `plan_id` int NOT NULL AUTO_INCREMENT,
  `park_id` int NOT NULL,
  `user_id` int NOT NULL,
  `plan_name` varchar(255) DEFAULT NULL,
  `plan_start` date DEFAULT NULL,
  `plan_end` date DEFAULT NULL,
  `plan_timeStamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `plan_isPrivate` tinyint(1) NOT NULL,
  PRIMARY KEY (`plan_id`)
) ENGINE=InnoDB AUTO_INCREMENT=944170 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans`
--

LOCK TABLES `plans` WRITE;
/*!40000 ALTER TABLE `plans` DISABLE KEYS */;
INSERT INTO `plans` VALUES (109308,1,5,'gmujp;','2025-09-02','2025-09-02','2025-09-02 13:49:53',0),(187050,1,5,'เที่ยวผับ','2025-09-02','2025-09-02','2025-09-02 13:43:14',0),(296122,1,5,'ๆไำ','2025-09-02','2025-09-03','2025-09-02 21:27:52',1),(653192,1,5,'เดินป่ากลางคืนกับสาวๆ','2025-09-02','2025-09-02','2025-09-02 19:52:17',0),(664673,2,5,'ฟหก','2025-09-02','2025-09-03','2025-09-02 21:01:07',0),(849197,1,5,'ๆไำ','2025-09-02','2025-09-02','2025-09-02 21:28:09',0);
/*!40000 ALTER TABLE `plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `user_firstName` varchar(50) DEFAULT NULL,
  `user_lastName` varchar(50) DEFAULT NULL,
  `user_level` varchar(15) DEFAULT NULL,
  `user_gender` varchar(8) DEFAULT NULL,
  `user_income` int DEFAULT NULL,
  `user_age` int DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_phone` varchar(10) DEFAULT NULL,
  `user_pfp` text,
  `user_timeStamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'fahaph','$2b$10$DK4973aHGlLk6.25LqWlVuK8Kz7WwR62aBqurujjK39i1WLMTGja2','Aphidech','Phonwen','Beginner','Male',10000,21,'F_Phonwen@hotmail.com',NULL,NULL,'2025-09-02 06:40:42');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-02 21:38:24
