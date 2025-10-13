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
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (46,160054,'ขับรถ',NULL,'15:00:00'),(47,160054,'พักแรม','19:00:00','23:55:00'),(48,160054,'พักแรม','00:00:00','06:00:00'),(49,160054,'เดินเล่น','07:00:00','09:00:00'),(50,160054,'ขับรถกลับบ้าน','09:00:00','15:00:00'),(51,770537,'ควย','15:25:00','15:26:00'),(52,770537,'ควย','15:25:00','16:26:00'),(53,814027,'asdasdada','12:00:00',NULL),(54,814027,'asdasdasdwww','13:00:00',NULL),(55,814027,'asdasdawdawda','16:00:00','16:45:00'),(56,345760,'asdasd',NULL,NULL),(57,345760,'asdasda',NULL,NULL),(58,808168,'asdasdasd','13:00:00','16:00:00'),(59,808168,'asdasda','23:00:00','23:00:00'),(60,393278,'asdasda','13:00:00','15:00:00'),(61,393278,'asdasdasd','15:00:00','18:00:00'),(62,832401,'asdasda',NULL,NULL),(63,513906,'เดินเล่น','07:00:00','09:00:00'),(64,513906,'พักแรม','00:00:00','08:00:00'),(65,444715,'เดินเล่น','12:00:00','13:00:00'),(66,444715,'วิ่งบ้าง','08:00:00','10:00:00'),(67,715496,'test','11:00:00','12:00:00'),(68,715496,'test','17:00:00','21:00:00');
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
  `user_id` int NOT NULL,
  `plan_id` int NOT NULL,
  `favorite_timeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`favorite_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (40,5,444715,'2025-10-09 09:49:50'),(41,5,513906,'2025-10-09 09:49:51'),(43,6,160054,'2025-10-12 05:43:22'),(44,6,770537,'2025-10-12 05:43:23'),(45,6,808168,'2025-10-12 05:43:28'),(46,6,444715,'2025-10-12 05:43:30');
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
  `parkImg_id` int NOT NULL AUTO_INCREMENT,
  `park_id` int NOT NULL,
  `parkImg_src` text NOT NULL,
  PRIMARY KEY (`parkImg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parkimg`
--

LOCK TABLES `parkimg` WRITE;
/*!40000 ALTER TABLE `parkimg` DISABLE KEYS */;
INSERT INTO `parkimg` VALUES (1,1,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=41721e49-f459-4bb9-b482-3777bab74b58.jpg'),(2,1,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=27ef72e3-cd4e-451f-8e46-b28d470f5c57.jpg'),(3,1,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=c3f296bb-dd6c-46d0-a1ec-fb4e53d5f3f2.jpg'),(4,2,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=5462b2c6-8b5f-45fd-9c9a-9454484b9b69.jpg'),(5,2,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=b7d9d4f5-4f60-4e9e-941d-4a8465342516.jpg'),(6,2,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=42a117f5-80af-434f-8761-cff3a08002c9.jpg'),(7,3,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=4270208a-3538-46ef-b422-a91eb153a5a6.jpg'),(8,3,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=0415b500-3675-42bf-9882-c254caf6a6eb.jpg'),(9,3,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=499d5cae-2cab-4c82-9f9d-5a6ddac063a6.jpg'),(10,4,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=0d35c2d7-1b0e-453d-af9c-e6e233b13da1.jpg'),(11,4,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=263655b1-dd3b-41f1-a7bf-afc1bc261fc4.jpg'),(12,4,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=ecfc5065-edc4-4839-9c61-74e5d8c2be5c.jpg'),(13,5,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=e13b0110-31e0-4966-aecf-436fcbf3c59c.jpg'),(14,5,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=13ad6755-fcbd-45c1-8c34-7aa6e6b49299.jpg'),(15,5,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=24ea21f5-2d48-45c3-bf23-f5c3456bb5a6.jpg'),(16,6,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=0f3acb05-176d-442d-8ac2-f1748e88152e.jpg'),(17,6,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=81cc4c54-ee71-4547-8299-465a38600c59.jpg'),(18,6,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=c57922b5-bfc4-4fdb-8bdf-d0f7603cb43f.jpg'),(19,7,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=045a304f-f7d6-48a7-842a-468bf27f5827.jpg'),(20,7,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=3ea6dd66-330b-4230-8190-af1235f8b3bd.jpg'),(21,7,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=b9bdc50f-62cd-452f-a5ee-de076664682b.jpg'),(22,8,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=1e6261a4-87ea-4a55-a362-2c66dc0030c7.jpg'),(23,8,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=f722c919-01a0-4da2-acdf-463f985d843a.jpg'),(24,8,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=5b0e4ec7-5568-43ac-a49c-807b8ba1ed6c.jpg'),(25,9,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=b28c472c-ec0a-4e54-958d-942e869b67f5.jpg'),(26,9,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=6fb5c4ff-8927-4906-a7a4-cde944695e0f.jpg'),(27,9,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=1e468ea6-fe3b-4d9e-88c5-d0e55f4ae73c.jpg'),(28,10,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=106cc67e-edb1-46fa-82e4-92891324806b.jpg'),(29,10,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=a2c753b7-5e14-4875-95b0-1e93f799e93f.jpg'),(30,10,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=bab7a3c9-b782-45cf-b1c5-e985befcbcb1.jpg'),(31,11,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=cf099734-9340-4bc8-98fa-7f7e7fc64db9.jpg'),(32,11,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=deb52f25-8f69-43e5-877d-93296553c972.jpg'),(33,11,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=0b4c4f04-8325-4a09-9ca8-8d0e809f803e.jpg'),(34,12,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=ce714aae-c220-451a-8ee8-ed238d5ee18b.jpg'),(35,12,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=c5ac67a1-2343-40b5-b4f5-d6a008939530.jpg'),(36,12,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=03c9a4bb-864f-429a-9c86-70a4bcce47a3.jpg'),(37,13,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=f3b4646b-9d9a-450c-9750-f4d59c6a607f.jpg'),(38,13,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=da6c1f95-2853-4195-9f7f-deb1a1bb71d7.jpg'),(39,13,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=6827db6b-29fd-45c3-82de-8c9a55f8b7d4.jpg'),(40,14,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=630db17a-e063-48c6-9776-f4ca66a261ce.jpg'),(41,14,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=4516ff24-453f-456c-b9c4-3a6c99a08f9e.jpg'),(42,14,'https://portal.dnp.go.th/DNP/FileSystem/download?uuid=2a44a126-09aa-4bf9-a920-41270c935cf6.png');
/*!40000 ALTER TABLE `parkimg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parkplaces`
--

DROP TABLE IF EXISTS `parkplaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parkplaces` (
  `parkplace_id` int NOT NULL AUTO_INCREMENT,
  `park_id` int NOT NULL,
  `parkplace_lat` double DEFAULT NULL,
  `parkplace_lng` double DEFAULT NULL,
  `parkplace_name` text,
  `parkplace_description` text,
  `parkplaces_center` json DEFAULT NULL,
  PRIMARY KEY (`parkplace_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parkplaces`
--

LOCK TABLES `parkplaces` WRITE;
/*!40000 ALTER TABLE `parkplaces` DISABLE KEYS */;
INSERT INTO `parkplaces` VALUES (3,1,18.87729978456502,98.78271170569523,'จุดชมวิวทัศน์ป่าสะเมิง','จุดชมทิวทัศน์ป่าสะเมิง บริเวณริมถนนสายแม่ริม-สะเมิง ช่วงหลักกิโลเมตรที่ 24 – 25 ท้องที่ตำบลสะเมิงใต้ อำเภอสะเมิง จังหวัดเชียงใหม่ เป็นจุดทิวทัศน์ที่มองเห็นเทือกเขาอันสลับซับซ้อนของป่าสะเมิง ตอนเช้าในฤดูหนาวจะมีทะเลหมอก และเป็นจุดชมพระอาทิตย์ตกที่สวยงามอีกแห่งหนึ่ง','{\"lat\": 18.862190709828056, \"lng\": 98.71318252637404}'),(4,1,18.855160002608216,98.62173342541654,'บ่อน้ำอุ่นธรรมชาติ','บริเวณที่ทำการอุทยานแห่งชาติ ริมถนนสายสะเมิง-วัดจันทร์ หลักกิโลเมตรที่ 18 ท้องที่บ้านแม่ขาน หมู่ที่ 1 ตำบลแม่สาบ อำเภอสะเมิง จังหวัดเชียงใหม่ มีลานกางเต็นท์ขนาดกว้าง 3 ไร่ พร้อมห้องน้ำ-ห้องสุขา(ชาย-หญิง)ขนาด 10 ห้อง ใกล้ลานกางเต็นท์มีบ่อน้ำอุ่นธรรมชาติที่ผุดจากใต้ดินอยู่กลางลำน้ำแม่โต๋ เป็นน้ำอุ่นที่เกิดจากความร้อนใต้พิภพจะผุดขึ้นมาตลอดเวลาในอัตราเฉลี่ย 6 ลิตรต่อนาที อุณหภูมิของน้ำ 38 องศาเซลเซียส สามารถใช้อาบได้ และมีเส้นทางเดินเท้าศึกษาธรรมชาติ จำนวน 1 เส้นทาง ระยะทาง 3,420 กิโลเมตร ตัดผ่านสภาพป่าถึง 4 ชนิดคือ ป่าเต็งรัง ป่าเบญจพรรณ ป่าดิบแล้งและป่าสนสองใบ ผ่านแก่งหินตามลำน้ำ และต้นตะเคียนทอง ขนาดโต 4.10 และ 4.70 เมตร อยู่สองต้นีกแห่งหนึ่ง','{\"lat\": 18.862190709828056, \"lng\": 98.71318252637404}'),(5,1,18.862190709828056,98.71318252637404,'ถ้ำหลวงแม่สาบ','ถ้ำหลวงแม่สาบ อุทยานแห่งชาติขุนขาน ตั้งอยู่ที่บ้านแม่สาบ ต.สะเมิงใต้ อ.สะเมิง จ.เชียงใหม่ อยู่ห่างจากตัวเมืองเชียงใหม่ประมาณ 52 กิโลเมตร ลักษณะเป็นถ้ำหินปูน ความยาวจากปากถ้ำถึงโถงหลักประมาณ 144 เมตร เป็นถ้ำแห้ง ภายในมีหินงอก หินย้อย เสาหิน หินน้ำไหล และทำนบหินปูน  จุดเด่นอยู่ที่เนื้อหินปูนโถงหลักมีริ้วแถบสีเทาขาวสลับเหลือง ซึ่งเกิดจากองค์ประกอบทางเคมีในเนื้อหินที่แตกต่างกัน กลายเป็นริ้วสีสวยงามแปลกตาเป็นอย่างมากจนได้รับการขนานนามว่า “ถ้ำสีรุ้ง”','{\"lat\": 18.862190709828056, \"lng\": 98.71318252637404}');
/*!40000 ALTER TABLE `parkplaces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parks`
--

DROP TABLE IF EXISTS `parks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parks` (
  `park_id` int NOT NULL AUTO_INCREMENT,
  `park_name` varchar(255) DEFAULT NULL,
  `park_phone` text,
  `park_location` text,
  `park_email` text,
  `park_activity` text,
  `park_biome` text,
  `park_animal` text,
  `park_fee` text,
  `lat` int DEFAULT NULL,
  `lng` int DEFAULT NULL,
  PRIMARY KEY (`park_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parks`
--

LOCK TABLES `parks` WRITE;
/*!40000 ALTER TABLE `parks` DISABLE KEYS */;
INSERT INTO `parks` VALUES (1,'อุทยานแห่งชาติขุนขาน (Khun Khan)','ไม่พบโทรศัพท์ (ท้ายสุด)','หมู่ 1 ต.แม่สาบ อ.สะเมิง จ.เชียงใหม่ 50250 โทร','Khunkhan_np@hotmail.com','ทางเดินศึกษาธรรมชาติ, เที่ยวถ้ำ/ศึกษาสภาพธรณี, ชมพรรณไม้, ดูนก/ดูผีเสื้อ, ดูดาว, ตั้งแคมป์พักแรม',NULL,NULL,NULL,NULL,NULL),(2,'อุทยานแห่งชาติดอยผ้าห่มปก (Doi Pha Hom Pok)','0 5208 0801, 084 483 4689','224 ม.6 ต.โป่งน้ำร้อน อ.ฝาง จ.เชียงใหม่ 50110','doiphahompok.np@hotmail.com','ทางเดินศึกษาธรรมชาติ, เที่ยวน้ำตก, เที่ยวถ้ำ/ศึกษาสภาพธรณี, ชมพรรณไม้, ดูนก/ดูผีเสื้อ, ดูดาว, อาบน้ำแร่/อบไอน้ำ, ตั้งแคมป์พักแรม',NULL,NULL,NULL,NULL,NULL),(3,'อุทยานแห่งชาติดอยเวียงผา (เตรียมการ) (Doi Wiang Pha)','087 186 2118, 0 5331 7535 โทรศัพท์ 0 5200 1362','หมู่ที่ 8 ต.ศรีดงเย็น อ.ไชยปราการ จ.เชียงใหม่','doiwiangpha@hotmail.com','ทางเดินศึกษาธรรมชาติ, ทางเดินป่า, เที่ยวน้ำตก, เที่ยวน้ำตก, ชมพรรณไม้, ดูนก/ดูผีเสื้อ ร้านสวัสดิการ (กาแฟ น้ำดื่ม ขนม ) เปิดบริการทุกวันเวลา 08.00 - 16.00 น.',NULL,NULL,NULL,NULL,NULL),(4,'อุทยานแห่งชาติดอยสุเทพ-ปุย (Doi Suthep - Pui)','0 5321 0244 (ที่ทำการฯ) 0 5329 5041 (บ้านพักนักท่องเที่ยวสวนสน)','ถนนศรีวิชัย ตำบลสุเทพ อำเภอเมือง จังหวัดเชียงใหม่ 50200','doisutheppui@gmail.com Facebook อุทยานแห่งชาติดอยสุเทพ-ปุย','ทางเดินศึกษาธรรมชาติ, เที่ยวน้ำตก, ชมพรรณไม้, ดูนก/ดูผีเสื้อ, ส่องสัตว์, จักรยาน/จักรยานเสือภูเขา, ตั้งแคมป์พักแรม',NULL,NULL,NULL,NULL,NULL),(5,'อุทยานแห่งชาติดอยอินทนนท์ (Doi Inthanon)','0 5328 6729 (บริการข้อมูลท่องเที่ยว,จองที่พัก), 0 5328 6728 (ศูนย์กู้ภัย)','119 หมู่7 ต.บ้านหลวง อ.จอมทอง จ.เชียงใหม่ 50160','inthanon98dnp@hotmail.com Facebook','ทางเดินศึกษาธรรมชาติ, เที่ยวน้ำตก, ชมพรรณไม้, ดูนก/ดูผีเสื้อ, ส่องสัตว์, ดูดาว, จักรยาน/จักรยานเสือภูเขา, ชมประวัติศาสตร์/วัฒนธรรม, ตั้งแคมป์พักแรม',NULL,NULL,NULL,NULL,NULL),(6,'อุทยานแห่งชาติน้ำตกบัวตอง - น้ำพุเจ็ดสี (เตรียมการ)','ไม่พบโทรศัพท์ (ไม่มี .greentext)','ไม่พบที่อยู่','ไม่พบอีเมล (ไม่มี .greentext)','ไม่พบข้อมูลกิจกรรม (ไม่มี .greentext)',NULL,NULL,NULL,NULL,NULL),(7,'อุทยานแห่งชาติผาแดง (Pha Daeng)','0 5304 6370','หมู่ 3 บ้านนาหวาย ตำบลเมืองนะ อำเภอเชียงดาว จังหวัดเชียงใหม่ 50170','ไม่พบอีเมล (ท้ายสุด)','ทางเดินศึกษาธรรมชาติ, เที่ยวน้ำตก, ชมพรรณไม้, ดูนก/ดูผีเสื้อ, ตั้งแคมป์พักแรม',NULL,NULL,NULL,NULL,NULL),(8,'อุทยานแห่งชาติแม่ตะไคร้ (Mae Takhrai)','0 5200 0832 , 09 5694 5052','อุทยานแห่งชาติแม่ตะไคร้ 36 หมู่ 3 บ้านแม่หวาน ต.ป่าเมี่ยง อ.ดอยสะเก็ด จ.เชียงใหม่ 50220','ไม่พบอีเมล (ท้ายสุด)','ไม่พบข้อมูลกิจกรรม (ไม่มี ⇔)',NULL,NULL,NULL,NULL,NULL),(9,'อุทยานแห่งชาติแม่โถ (เตรียมการ) (Mae Tho)','ไม่พบโทรศัพท์ (ท้ายสุด)','อุทยานแห่งชาติแม่โถ ตู้ ปณ.10 ปณจ.ฮอด อ.ฮอด จ.เชียงใหม่ 50240','maetho41@gmail.com Facebook','ทางเดินศึกษาธรรมชาติ, ชมพรรณไม้, เที่ยวน้ำตก, ดูนก/ดูผีเสื้อ, ดูดาว, ล่องแก่ง, ตั้งแคมป์พักแรม',NULL,NULL,NULL,NULL,NULL),(10,'อุทยานแห่งชาติแม่วาง (Mae Wang)','053 106 759 อีเมล','อุทยานแห่งชาติแม่วาง ต.สันติสุข อำเภอดอยหล่อ จ.เชียงใหม่ เบอร์','ไม่พบอีเมล (ท้ายสุด)','ทางเดินศึกษาธรรมชาติ, เที่ยวถ้ำ/ศึกษาสภาพธรณี, ดูนก/ดูผีเสื้อ, ดูดาว, ตั้งแคมป์พักแรม',NULL,NULL,NULL,NULL,NULL),(11,'อุทยานแห่งชาติศรีลานนา (Si Lanna)','0 5347 9079, 0 5331 7495, 0 5347 9090','ต.บ้านเป้า อ.แม่แตง จ.เชียงใหม่ 50150','npsrilanna2566@gmail.com Facebook','ทางเดินศึกษาธรรมชาติ, เที่ยวน้ำตก, ตั้งแคมป์พักแรม',NULL,NULL,NULL,NULL,NULL),(12,'อุทยานแห่งชาติห้วยน้ำดัง (Huai Nam Dang)','082 187 7834 (ที่ทำการฯ) 084 908 1531 (ศูนย์บริการนักท่องเที่ยว) 093 632 1601 (ศูนย์บริการลานกางเต็นท์เอื้องเงิน)','อุทยานแห่งชาติห้วยน้ำดัง หมู่ 5 ต.กึ๊ดช้าง อ.แม่แตง จ.เชียงใหม่ 50150','namdangnp@hotmail.co.th Facebook','ทางเดินศึกษาธรรมชาติ, เที่ยวน้ำตก, ชมพรรณไม้, ดูนก/ดูผีเสื้อ, ดูดาว, อาบน้ำแร่/อบไอน้ำ, ตั้งแคมป์พักแรม',NULL,NULL,NULL,NULL,NULL),(13,'อุทยานแห่งชาติออบขาน (เตรียมการ) (Ob Khan)','08 6181 1068 อีเมล obkhanpark@gmail.com Facebook','อุทยานแห่งชาติออบขาน ต.น้ำแพร่ อ.หางดง จ.เชียงใหม่ 50230','obkhanpark@gmail.com Facebook','ทางเดินศึกษาธรรมชาติ, ทางเดินป่า, ชมประวัติศาสตร์/วัฒนธรรม, ชมพรรณไม้, ดูนก/ดูผีเสื้อ, ดูดาว, ตั้งแคมป์พักแรม',NULL,NULL,NULL,NULL,NULL),(14,'อุทยานแห่งชาติออบหลวง (Op Luang)','081 602 1290','ตู้ ปณ.2 ต.หางดง อ.ฮอด จ.เชียงใหม่ 50240','opluang68@gmail.com Facebook','ทางเดินศึกษาธรรมชาติ, ชมพรรณไม้, เที่ยวน้ำตก, ดูนก/ดูผีเสื้อ, อาบน้ำแร่/อบไอน้ำ, ชมประวัติศาสตร์/วัฒนธรรม, ตั้งแคมป์พักแรม',NULL,NULL,NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=995932 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans`
--

LOCK TABLES `plans` WRITE;
/*!40000 ALTER TABLE `plans` DISABLE KEYS */;
INSERT INTO `plans` VALUES (160054,4,6,'ขับรถเล่นที่ดอยสุเทพ','2025-09-04','2025-09-05','2025-09-04 19:21:41',0),(345760,4,5,'sfsdfsdfs','2025-09-08','2025-09-09','2025-09-08 16:02:41',0),(393278,11,5,'asdasdad','2025-09-16','2025-09-18','2025-09-08 16:11:32',0),(444715,14,6,'เที่ยวเล่นๆอะ งั้นๆ','2025-10-09','2025-10-10','2025-10-09 11:33:32',0),(513906,1,5,'เที่ยวอุทยานขุนขาน','2025-09-10','2025-09-11','2025-09-10 14:40:19',0),(715496,8,6,'vbvb','2025-10-10','2025-10-11','2025-10-10 12:35:50',1),(770537,4,5,'หีเหม็น','2025-09-08','2025-09-09','2025-09-08 15:25:41',0),(808168,10,5,'asdasdasd','2025-09-10','2025-09-12','2025-09-08 16:05:45',0),(814027,2,5,'asdaddawdatest','2025-09-12','2025-09-14','2025-09-08 16:01:08',0),(832401,2,5,'asadsasd','2025-09-10','2025-09-11','2025-09-08 16:12:07',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'fahaphkuy','$2b$10$DK4973aHGlLk6.25LqWlVuK8Kz7WwR62aBqurujjK39i1WLMTGja2','Aphidechza','Phonwen','Experienced','Female',88,10,'F_Phonwen@hotmail.com',NULL,NULL,'2025-09-02 06:40:42'),(6,'fahaph','$2b$10$xQ5qjf9DCgjPLcYNQ/bdB.dZxJTG4ni2PMqSbP8mLUPSYJziIH4WW','Aphidet','Phonwen','Intermediate','Male',10000,17,'boombasugar@gmail.com',NULL,NULL,'2025-09-04 12:17:14');
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

-- Dump completed on 2025-10-12 18:15:22
