# Host: 127.0.0.1  (Version 5.5.62)
# Date: 2019-05-27 15:45:00
# Generator: MySQL-Front 6.1  (Build 1.26)

create database xdq;
#
# Structure for table "kaoqin"
#

DROP TABLE IF EXISTS `kaoqin`;
CREATE TABLE `kaoqin` (
  `keyid` int(6) NOT NULL,
  `lessonid` int(6) NOT NULL,
  `openid` varchar(50) NOT NULL,
  `state` int(11) DEFAULT '0',
  `time` datetime NOT NULL,
  PRIMARY KEY (`keyid`,`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

#
# Data for table "kaoqin"
#

INSERT INTO `kaoqin` VALUES (51,43,'1',2,'2019-05-24 09:39:05'),(51,43,'2',0,'2019-05-24 09:39:05'),(51,43,'3',0,'2019-05-24 09:39:05'),(51,43,'4',0,'2019-05-24 09:39:05'),(51,43,'5',0,'2019-05-24 09:39:05'),(51,43,'6',0,'2019-05-24 09:39:05'),(52,43,'1',0,'2019-05-24 09:41:49'),(52,43,'2',2,'2019-05-24 09:41:49'),(52,43,'3',0,'2019-05-24 09:41:49'),(52,43,'4',0,'2019-05-24 09:41:49'),(52,43,'5',0,'2019-05-24 09:41:49'),(52,43,'6',0,'2019-05-24 09:41:49'),(52,43,'oJmjm1AYwcput7SOvnllmAKPGYBw',1,'2019-05-24 09:41:49'),(53,43,'1',0,'2019-05-24 09:48:36'),(53,43,'2',0,'2019-05-24 09:48:36'),(53,43,'3',2,'2019-05-24 09:48:36'),(53,43,'4',0,'2019-05-24 09:48:36'),(53,43,'5',0,'2019-05-24 09:48:36'),(53,43,'6',0,'2019-05-24 09:48:36'),(53,43,'oJmjm1AYwcput7SOvnllmAKPGYBw',0,'2019-05-24 09:48:36');

#
# Structure for table "lesson"
#

DROP TABLE IF EXISTS `lesson`;
CREATE TABLE `lesson` (
  `lessonId` int(5) NOT NULL AUTO_INCREMENT,
  `openid` varchar(50) NOT NULL,
  `slesson` varchar(20) NOT NULL,
  `sclass` varchar(20) NOT NULL,
  `setTime` datetime NOT NULL,
  PRIMARY KEY (`lessonId`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4;

#
# Data for table "lesson"
#

INSERT INTO `lesson` VALUES (43,'oJmjm1AYwcput7SOvnllmAKPGYBw','软件工程测试','班级测试','2019-05-23 09:37:46'),(49,'oJmjm1AYwcput7SOvnllmAKPGYBw','测试','我的','2019-05-24 09:37:59');

#
# Structure for table "lessonkey"
#

DROP TABLE IF EXISTS `lessonkey`;
CREATE TABLE `lessonkey` (
  `keyid` int(11) NOT NULL AUTO_INCREMENT,
  `lessonid` int(5) NOT NULL,
  `lessonkey` varchar(20) NOT NULL,
  `state` varchar(5) NOT NULL,
  `time` datetime NOT NULL,
  `latitude` double DEFAULT '0',
  `longitude` double DEFAULT '0',
  PRIMARY KEY (`keyid`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4;

#
# Data for table "lessonkey"
#

INSERT INTO `lessonkey` VALUES (51,43,'1234','false','2019-05-24 09:39:05',34.76571,113.75322),(52,43,'234','false','2019-05-24 09:41:49',34.76571,113.75322),(53,43,'23','false','2019-05-24 09:48:36',34.76571,113.75322);

#
# Structure for table "sc"
#

DROP TABLE IF EXISTS `sc`;
CREATE TABLE `sc` (
  `openid` varchar(200) NOT NULL DEFAULT '',
  `lessonid` int(11) NOT NULL DEFAULT '0',
  `lessonname` varchar(255) NOT NULL DEFAULT '',
  `settime` date DEFAULT '0000-00-00',
  PRIMARY KEY (`lessonid`,`openid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

#
# Data for table "sc"
#

/*!40000 ALTER TABLE `sc` DISABLE KEYS */;
INSERT INTO `sc` VALUES ('1',43,'软件工程测试','2019-05-23'),('2',43,'软件工程测试','2019-05-23'),('3',43,'软件工程测试','2019-05-23'),('4',43,'软件工程测试','2019-05-23'),('5',43,'软件工程测试','2019-05-23'),('6',43,'软件工程测试','2019-05-23'),('oJmjm1AYwcput7SOvnllmAKPGYBw',43,'软件工程测试','2019-05-23');
/*!40000 ALTER TABLE `sc` ENABLE KEYS */;

#
# Structure for table "user"
#

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `openid` varchar(50) NOT NULL,
  `name` varchar(10) NOT NULL,
  `xuehao` bigint(12) NOT NULL DEFAULT '0',
  PRIMARY KEY (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

#
# Data for table "user"
#

INSERT INTO `user` VALUES ('1','测试1',123458),('2','测试2',123456),('3','测试3',123789),('4','测试4',123478),('5','测试5',123125),('6','测试6',123456789000),('7','测试7',201512211),('8','测试8',2015122112),('oJmjm1AYwcput7SOvnllmAKPGYBw','欧阳',123456789012);
