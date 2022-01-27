-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2022-01-02 20:26:30
-- 服务器版本： 10.4.17-MariaDB
-- PHP 版本： 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `hotel`
--

-- --------------------------------------------------------

--
-- 表的结构 `floor`
--

CREATE TABLE `floor` (
  `FID` int(20) NOT NULL,
  `Floor` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `floor`
--

INSERT INTO `floor` (`FID`, `Floor`) VALUES
(1, '1'),
(2, '2'),
(3, '3');

-- --------------------------------------------------------

--
-- 表的结构 `inventory`
--

CREATE TABLE `inventory` (
  `Inv_ID` int(255) NOT NULL,
  `inv_Name` varchar(25) NOT NULL,
  `Stock_num` int(255) NOT NULL,
  `Warning_num` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `inventory`
--

INSERT INTO `inventory` (`Inv_ID`, `inv_Name`, `Stock_num`, `Warning_num`) VALUES
(1, 'Toothpaste', 396, 450),
(2, 'Toothbrash', 394, 0);

-- --------------------------------------------------------

--
-- 表的结构 `kitchen`
--

CREATE TABLE `kitchen` (
  `Services_ID` int(255) NOT NULL,
  `Room_ID` varchar(5) NOT NULL,
  `Menu_ID` int(255) NOT NULL,
  `Staff_ID` varchar(25) NOT NULL,
  `Date` date NOT NULL,
  `Status` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `kitchen`
--

INSERT INTO `kitchen` (`Services_ID`, `Room_ID`, `Menu_ID`, `Staff_ID`, `Date`, `Status`) VALUES
(2, '1-04', 1, 'KIT001', '2022-01-03', 'Complete');

-- --------------------------------------------------------

--
-- 表的结构 `menu`
--

CREATE TABLE `menu` (
  `Menu_ID` int(255) NOT NULL,
  `Menu_name` varchar(25) NOT NULL,
  `cost` float(6,2) NOT NULL,
  `Descs` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `menu`
--

INSERT INTO `menu` (`Menu_ID`, `Menu_name`, `cost`, `Descs`) VALUES
(1, 'Steak', 20.00, 'A fresh beef sauce with black pepper'),
(2, 'Salad', 8.00, 'A fresh vegetable with sweet mayonnaise');

-- --------------------------------------------------------

--
-- 表的结构 `roles`
--

CREATE TABLE `roles` (
  `Roles_Name` varchar(25) NOT NULL,
  `Roles_prefix` varchar(5) NOT NULL,
  `Number` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `roles`
--

INSERT INTO `roles` (`Roles_Name`, `Roles_prefix`, `Number`) VALUES
('Admin', 'ADM', 1),
('Front_Desk', 'FRD', 1),
('Inventory', 'INT', 1),
('Kitchen', 'KIT', 2),
('Room_Services', 'RMS', 2);

-- --------------------------------------------------------

--
-- 表的结构 `room`
--

CREATE TABLE `room` (
  `Room_ID` varchar(5) NOT NULL,
  `Room_type` varchar(25) NOT NULL,
  `Room_status` varchar(25) NOT NULL,
  `FID` int(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `room`
--

INSERT INTO `room` (`Room_ID`, `Room_type`, `Room_status`, `FID`) VALUES
('1-01', 'Standard', 'booking', 1),
('1-02', 'Standard', 'Available', 1),
('1-03', 'Standard', 'Available', 1),
('1-04', 'Standard', 'Available', 1),
('1-05', 'Standard', 'Available', 1),
('2-01', 'Standard', 'Available', 2),
('2-02', 'Standard', 'Available', 2),
('2-03', 'Standard', 'Available', 2),
('2-04', '', '', 2),
('2-05', '', '', 2),
('3-01', '', '', 3),
('3-02', '', '', 3),
('3-03', '', '', 3),
('3-04', '', '', 3),
('3-05', '', '', 3);

-- --------------------------------------------------------

--
-- 表的结构 `room_record`
--

CREATE TABLE `room_record` (
  `Record_ID` int(255) NOT NULL,
  `Room_ID` varchar(5) NOT NULL,
  `Customer_Name` varchar(35) NOT NULL,
  `Gender` varchar(25) NOT NULL,
  `booking_date` date NOT NULL,
  `check_in_date` date NOT NULL,
  `check_out_date` date NOT NULL,
  `Duration` int(25) NOT NULL,
  `Final_payment` float(6,2) NOT NULL,
  `current_status` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `room_record`
--

INSERT INTO `room_record` (`Record_ID`, `Room_ID`, `Customer_Name`, `Gender`, `booking_date`, `check_in_date`, `check_out_date`, `Duration`, `Final_payment`, `current_status`) VALUES
(1, '1-01', 'Edward', 'Male', '2022-01-03', '0000-00-00', '0000-00-00', 3, 0.00, 'Booking'),
(2, '1-02', 'Hudson Emery', 'Male', '2022-01-04', '0000-00-00', '0000-00-00', 3, 0.00, 'Booking'),
(3, '1-03', 'Ike Cheyanne', 'Male', '2022-01-05', '0000-00-00', '0000-00-00', 3, 0.00, 'Booking'),
(4, '1-01', 'Shae Donovan', 'Male', '2022-01-06', '0000-00-00', '0000-00-00', 3, 0.00, 'Booking'),
(5, '1-04', 'Angelia Brant', 'Male', '0000-00-00', '2022-01-03', '2022-01-03', 1, 220.00, 'Finish'),
(6, '1-04', 'Angelia Brant', 'Male', '0000-00-00', '2021-12-23', '2021-12-23', 1, 220.00, 'Finish');

-- --------------------------------------------------------

--
-- 表的结构 `room_services`
--

CREATE TABLE `room_services` (
  `Services_ID` int(255) NOT NULL,
  `Room_ID` varchar(5) NOT NULL,
  `Record_ID` int(255) NOT NULL,
  `Services_type` varchar(25) NOT NULL,
  `Remark` text NOT NULL,
  `Date` date NOT NULL,
  `Status` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `room_services`
--

INSERT INTO `room_services` (`Services_ID`, `Room_ID`, `Record_ID`, `Services_type`, `Remark`, `Date`, `Status`) VALUES
(1, '1-04', 5, 'Room', '', '2022-01-03', 'Complete'),
(2, '1-04', 5, 'Kitchen', '', '2022-01-03', 'Complete'),
(3, '1-04', 5, 'Room', '', '2022-01-03', 'Complete'),
(4, '1-04', 5, 'Room', '', '2022-01-03', 'Complete');

-- --------------------------------------------------------

--
-- 表的结构 `staff`
--

CREATE TABLE `staff` (
  `Staff_ID` varchar(25) NOT NULL,
  `password` text NOT NULL,
  `Staff_name` varchar(35) NOT NULL,
  `Staff_position` varchar(25) NOT NULL,
  `Staff_status` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `staff`
--

INSERT INTO `staff` (`Staff_ID`, `password`, `Staff_name`, `Staff_position`, `Staff_status`) VALUES
('ADM001', '5da7369de8f02637e486a900cf65a0cd', 'Sindy Della', 'Admin', 'off'),
('FRD001', '27aa7f460ea136933c8ab52c953cf412', 'Amity Everitt', 'Front_Desk', 'Off'),
('INT001', '7259537170a743526de02e64cf424d70', 'Guendolen Staci', 'Inventory', 'Off'),
('KIT001', '736869df63d34635ff314117adad2555', 'Kacey Edna', 'Kitchen', 'Off'),
('KIT002', '068bccc159aa186ddaa9c9085810db8d', 'Elsabeth Tabitha', 'Kitchen', 'Off'),
('RMS001', '266f282b7fd21f43fbf674e56269969f', 'Zed Mansel', 'Room_Services', 'Off'),
('RMS002', '2607f4d4818ab20ae71f671ec98c93ff', 'Buck Caelan', 'Room_Services', 'On Duty');

-- --------------------------------------------------------

--
-- 表的结构 `task`
--

CREATE TABLE `task` (
  `Services_ID` int(255) NOT NULL,
  `Staff_ID` varchar(25) NOT NULL,
  `Room_ID` varchar(8) NOT NULL,
  `Task_type` text NOT NULL,
  `Date` date NOT NULL,
  `status` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `task`
--

INSERT INTO `task` (`Services_ID`, `Staff_ID`, `Room_ID`, `Task_type`, `Date`, `status`) VALUES
(1, 'RMS001', '1-04', 'Replace toothbrash', '2022-01-03', 'Complete'),
(2, 'RMS002', '1-04', 'Food Delivery', '2022-01-03', 'Complete'),
(3, 'RMS001', '1-04', 'Refill toothpaste', '2022-01-03', 'Complete'),
(4, 'RMS001', '1-04', 'Toothbrash', '2022-01-03', 'Complete');

-- --------------------------------------------------------

--
-- 表的结构 `type`
--

CREATE TABLE `type` (
  `Type_Name` varchar(25) NOT NULL,
  `Cost` float(6,2) NOT NULL,
  `Descs` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `type`
--

INSERT INTO `type` (`Type_Name`, `Cost`, `Descs`) VALUES
('DStandard', 230.00, 'A Standard room with double beds'),
('Luxury', 500.00, 'A luxury room gives you a luxury feels'),
('Standard', 200.00, 'A Standard suites for a little rest');

--
-- 转储表的索引
--

--
-- 表的索引 `floor`
--
ALTER TABLE `floor`
  ADD PRIMARY KEY (`FID`);

--
-- 表的索引 `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`Inv_ID`);

--
-- 表的索引 `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`Menu_ID`);

--
-- 表的索引 `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`Roles_Name`);

--
-- 表的索引 `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`Room_ID`);

--
-- 表的索引 `room_record`
--
ALTER TABLE `room_record`
  ADD PRIMARY KEY (`Record_ID`);

--
-- 表的索引 `room_services`
--
ALTER TABLE `room_services`
  ADD PRIMARY KEY (`Services_ID`);

--
-- 表的索引 `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`Staff_ID`);

--
-- 表的索引 `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`Type_Name`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `floor`
--
ALTER TABLE `floor`
  MODIFY `FID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `inventory`
--
ALTER TABLE `inventory`
  MODIFY `Inv_ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `menu`
--
ALTER TABLE `menu`
  MODIFY `Menu_ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `room_record`
--
ALTER TABLE `room_record`
  MODIFY `Record_ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用表AUTO_INCREMENT `room_services`
--
ALTER TABLE `room_services`
  MODIFY `Services_ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
