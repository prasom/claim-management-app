-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: claim_db
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `claim_info`
--

DROP TABLE IF EXISTS `claim_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `claim_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_date` datetime NOT NULL,
  `insure_ref_key` varchar(50) NOT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `car_number` varchar(100) DEFAULT NULL,
  `customer_type` varchar(100) DEFAULT NULL,
  `service_level` varchar(100) DEFAULT NULL,
  `is_parking` varchar(50) DEFAULT NULL,
  `parking_date` datetime DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `create_by` varchar(100) DEFAULT NULL,
  `car_type_id` int(11) DEFAULT '0',
  `contact_tel` varchar(45) DEFAULT NULL,
  `car_type_other` varchar(100) DEFAULT NULL,
  `bill_status` int(11) DEFAULT '0',
  `parking_status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `claim_info`
--

LOCK TABLES `claim_info` WRITE;
/*!40000 ALTER TABLE `claim_info` DISABLE KEYS */;
INSERT INTO `claim_info` VALUES (10,'2018-07-15 00:00:00','8','TOYOTA','1111','1','A','1','2018-07-23 00:00:00','2018-07-15 17:53:00','2018-07-15 17:53:00','demo',11,'0123123123','',1,1);
/*!40000 ALTER TABLE `claim_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-16  0:12:21
