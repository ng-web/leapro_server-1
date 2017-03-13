-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2017 at 05:50 AM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `leapro_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `areas`
--

CREATE TABLE `areas` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `desscription` text NOT NULL,
  `length` double DEFAULT NULL,
  `height` double DEFAULT NULL,
  `width` double DEFAULT NULL,
  `depth` double DEFAULT NULL,
  `area` double DEFAULT NULL,
  `volume` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` int(11) NOT NULL,
  `name` varchar(70) NOT NULL,
  `fk_company_id` int(11) NOT NULL,
  `type` enum('Main','Branch') NOT NULL DEFAULT 'Branch'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`id`, `name`, `fk_company_id`, `type`) VALUES
(1, 'Bascho Mandeville', 1, 'Main');

-- --------------------------------------------------------

--
-- Table structure for table `branch_areas`
--

CREATE TABLE `branch_areas` (
  `id` int(11) NOT NULL,
  `fk_area_id` int(11) NOT NULL,
  `fk_branch_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `branch_contacts`
--

CREATE TABLE `branch_contacts` (
  `id` int(11) NOT NULL,
  `fk_branch_id` int(11) NOT NULL,
  `fk_contact_person_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `branch_contacts`
--

INSERT INTO `branch_contacts` (`id`, `fk_branch_id`, `fk_contact_person_id`) VALUES
(1, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `branch_locations`
--

CREATE TABLE `branch_locations` (
  `id` int(11) NOT NULL,
  `street` varchar(40) NOT NULL,
  `city` varchar(50) NOT NULL,
  `province` varchar(40) NOT NULL,
  `fk_branch_id` int(11) DEFAULT NULL,
  `fk_country_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `branch_locations`
--

INSERT INTO `branch_locations` (`id`, `street`, `city`, `province`, `fk_branch_id`, `fk_country_id`) VALUES
(1, '43 Caledonia Road', 'Mandeville', 'Province', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `campaigns`
--

CREATE TABLE `campaigns` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `campaigns`
--

INSERT INTO `campaigns` (`id`, `name`) VALUES
(1, 'Phone');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`) VALUES
(1, 'General Purpose', 'General purposes'),
(3, 'Test-insert', 'test data');

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `logo_path` text,
  `established_date` date DEFAULT NULL,
  `fk_customer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `name`, `logo_path`, `established_date`, `fk_customer_id`) VALUES
(1, 'Bashco', NULL, '0000-00-00', 3);

-- --------------------------------------------------------

--
-- Table structure for table `contact_persons`
--

CREATE TABLE `contact_persons` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `gender` enum('M','F') NOT NULL,
  `fk_contact_id` int(11) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `fax` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contact_persons`
--

INSERT INTO `contact_persons` (`id`, `name`, `gender`, `fk_contact_id`, `telephone`, `mobile`, `fax`, `email`) VALUES
(1, 'Yanik Blake', 'M', 0, '18764568953', '', '', 'yanikblake@gmail.com'),
(2, 'Doron Williams', 'M', 0, '18763435533', '', '', 'doronwilliams@gmail.com'),
(3, 'Yanik Blake', 'M', 0, '18764568953', '', '', 'yanikblake@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `code` varchar(5) NOT NULL,
  `name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `other_name` varchar(20) DEFAULT NULL,
  `profile_img_path` text NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` enum('M','F') NOT NULL,
  `details` text,
  `fk_campaign_id` int(11) NOT NULL,
  `registration_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `customer_type` enum('R','C') NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `first_name`, `last_name`, `other_name`, `profile_img_path`, `date_of_birth`, `gender`, `details`, `fk_campaign_id`, `registration_date`, `customer_type`, `status`) VALUES
(2, 'Yanik', 'Blake', '', '', '1994-09-04', 'M', 'owners a mansion', 1, '2017-03-13 02:39:27', 'R', 'active'),
(3, 'Doron', 'Williams', '', '', '1988-09-04', 'M', 'CEO for Bashco', 1, '2017-03-13 03:01:33', 'C', 'active'),
(4, 'Yanik', 'Blake', '', '', '1994-09-04', 'M', 'owners a mansion', 1, '2017-03-13 03:09:15', 'R', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `customer_areas`
--

CREATE TABLE `customer_areas` (
  `id` int(11) NOT NULL,
  `fk_customer_id` int(11) NOT NULL,
  `fk_area_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_contacts`
--

CREATE TABLE `customer_contacts` (
  `id` int(11) NOT NULL,
  `fk_customer_id` int(11) NOT NULL,
  `fk_contact_person_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer_contacts`
--

INSERT INTO `customer_contacts` (`id`, `fk_customer_id`, `fk_contact_person_id`) VALUES
(1, 2, 1),
(2, 4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `customer_locations`
--

CREATE TABLE `customer_locations` (
  `id` int(11) NOT NULL,
  `street` varchar(40) NOT NULL,
  `city` varchar(50) NOT NULL,
  `province` varchar(40) NOT NULL,
  `fk_customer_id` int(11) DEFAULT NULL,
  `fk_country_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `type` enum('Job Order','Estimate') NOT NULL,
  `fk_job_status_id` int(11) NOT NULL,
  `received_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expiry_date` int(11) NOT NULL,
  `summary` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `job_areas`
--

CREATE TABLE `job_areas` (
  `id` int(11) NOT NULL,
  `fk_job_id` int(11) NOT NULL,
  `fk_area_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `job_confirmation_date`
--

CREATE TABLE `job_confirmation_date` (
  `id` int(11) NOT NULL,
  `fk_job_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `job_notes`
--

CREATE TABLE `job_notes` (
  `id` int(11) NOT NULL,
  `fk_job_id` int(11) NOT NULL,
  `details` text NOT NULL,
  `fk_note_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `job_schedules`
--

CREATE TABLE `job_schedules` (
  `id` int(11) NOT NULL,
  `fk_job_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `fk_schedule_frequency_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `job_services`
--

CREATE TABLE `job_services` (
  `id` int(11) NOT NULL,
  `unit_charge` double NOT NULL,
  `man_hours` double NOT NULL,
  `discount_type` enum('F','P') NOT NULL,
  `tax_type` enum('F','P') NOT NULL,
  `tax` double NOT NULL,
  `discount` double NOT NULL,
  `fk_job_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `job_status`
--

CREATE TABLE `job_status` (
  `id` int(11) NOT NULL,
  `status` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `note_types`
--

CREATE TABLE `note_types` (
  `id` int(11) NOT NULL,
  `type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(35) NOT NULL,
  `descripton` text,
  `unit_cost` double NOT NULL,
  `selling_cost` double NOT NULL,
  `discount` double NOT NULL,
  `discount_type` enum('F','P') NOT NULL,
  `tax_type` enum('F','P') NOT NULL,
  `tax` double NOT NULL,
  `quantity` double NOT NULL,
  `dilution` text NOT NULL,
  `application` text NOT NULL,
  `fk_unit_id` int(11) NOT NULL,
  `fk_category_id` int(11) NOT NULL,
  `usage_unit` enum('Volume','Area','None') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_area_usage`
--

CREATE TABLE `product_area_usage` (
  `id` int(11) NOT NULL,
  `discount` double NOT NULL,
  `discount_type` enum('F','P') NOT NULL,
  `tax` double NOT NULL,
  `tax_type` enum('F','P') NOT NULL,
  `selling_price` double NOT NULL,
  `fk_product_id` int(11) NOT NULL,
  `fk_job_area_id` int(11) NOT NULL,
  `quantity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `schedule_frequencies`
--

CREATE TABLE `schedule_frequencies` (
  `id` int(11) NOT NULL,
  `frequency` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schedule_frequencies`
--

INSERT INTO `schedule_frequencies` (`id`, `frequency`) VALUES
(1, 'MONTHLY'),
(2, 'WEEKLY'),
(3, 'DAYLY'),
(5, 'BI-WEEKLY'),
(7, 'ONE-SHOT');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` text NOT NULL,
  `man_hours` double NOT NULL,
  `unit_charge` double NOT NULL,
  `discount_type` enum('F','P') NOT NULL,
  `tax_type` enum('F','P') NOT NULL,
  `tax` double NOT NULL,
  `discount` double NOT NULL,
  `fk_category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `name`, `description`, `man_hours`, `unit_charge`, `discount_type`, `tax_type`, `tax`, `discount`, `fk_category_id`) VALUES
(1, 'Pest Control Service', 'Gets rid of rodents, termite and other crawling insect', 1, 3000, 'F', 'F', 500, 100, 1),
(2, 'Cleaning', 'Provides cleaning services for rugs, vehicle interior and household funitures', 1, 2500, 'F', 'F', 0, 0, 1),
(3, 'Test-update', 'test data', 1, 200, 'F', 'F', 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` int(11) NOT NULL,
  `name` varchar(15) NOT NULL,
  `code` varchar(7) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_active_customers`
--
CREATE TABLE `v_active_customers` (
`id` int(11)
,`first_name` varchar(20)
,`last_name` varchar(20)
,`other_name` varchar(20)
,`profile_img_path` text
,`date_of_birth` date
,`gender` enum('M','F')
,`details` text
,`fk_campaign_id` int(11)
,`registration_date` timestamp
,`customer_type` enum('R','C')
,`status` enum('active','inactive')
,`campaign` varchar(20)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_products`
--
CREATE TABLE `v_products` (
`id` int(11)
,`name` varchar(35)
,`descripton` text
,`unit_cost` double
,`selling_cost` double
,`discount` double
,`discount_type` enum('F','P')
,`tax_type` enum('F','P')
,`tax` double
,`quantity` double
,`dilution` text
,`application` text
,`fk_unit_id` int(11)
,`fk_category_id` int(11)
,`category` varchar(20)
,`unit` varchar(15)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_services`
--
CREATE TABLE `v_services` (
`id` int(11)
,`name` varchar(30)
,`description` text
,`man_hours` double
,`unit_charge` double
,`discount_type` enum('F','P')
,`tax_type` enum('F','P')
,`tax` double
,`discount` double
,`fk_category_id` int(11)
,`category` varchar(20)
);

-- --------------------------------------------------------

--
-- Structure for view `v_active_customers`
--
DROP TABLE IF EXISTS `v_active_customers`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_active_customers`  AS  select `customers`.`id` AS `id`,`customers`.`first_name` AS `first_name`,`customers`.`last_name` AS `last_name`,`customers`.`other_name` AS `other_name`,`customers`.`profile_img_path` AS `profile_img_path`,`customers`.`date_of_birth` AS `date_of_birth`,`customers`.`gender` AS `gender`,`customers`.`details` AS `details`,`customers`.`fk_campaign_id` AS `fk_campaign_id`,`customers`.`registration_date` AS `registration_date`,`customers`.`customer_type` AS `customer_type`,`customers`.`status` AS `status`,`campaigns`.`name` AS `campaign` from (`customers` join `campaigns` on((`campaigns`.`id` = `customers`.`fk_campaign_id`))) where (`customers`.`status` = 'active') ;

-- --------------------------------------------------------

--
-- Structure for view `v_products`
--
DROP TABLE IF EXISTS `v_products`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_products`  AS  select `products`.`id` AS `id`,`products`.`name` AS `name`,`products`.`descripton` AS `descripton`,`products`.`unit_cost` AS `unit_cost`,`products`.`selling_cost` AS `selling_cost`,`products`.`discount` AS `discount`,`products`.`discount_type` AS `discount_type`,`products`.`tax_type` AS `tax_type`,`products`.`tax` AS `tax`,`products`.`quantity` AS `quantity`,`products`.`dilution` AS `dilution`,`products`.`application` AS `application`,`products`.`fk_unit_id` AS `fk_unit_id`,`products`.`fk_category_id` AS `fk_category_id`,`categories`.`name` AS `category`,`units`.`name` AS `unit` from ((`products` join `categories` on((`categories`.`id` = `products`.`fk_category_id`))) join `units` on((`units`.`id` = `products`.`fk_unit_id`))) ;

-- --------------------------------------------------------

--
-- Structure for view `v_services`
--
DROP TABLE IF EXISTS `v_services`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_services`  AS  select `services`.`id` AS `id`,`services`.`name` AS `name`,`services`.`description` AS `description`,`services`.`man_hours` AS `man_hours`,`services`.`unit_charge` AS `unit_charge`,`services`.`discount_type` AS `discount_type`,`services`.`tax_type` AS `tax_type`,`services`.`tax` AS `tax`,`services`.`discount` AS `discount`,`services`.`fk_category_id` AS `fk_category_id`,`categories`.`name` AS `category` from (`services` join `categories` on((`categories`.`id` = `services`.`fk_category_id`))) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companyId` (`fk_company_id`);

--
-- Indexes for table `branch_areas`
--
ALTER TABLE `branch_areas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `areaId` (`fk_area_id`),
  ADD KEY `branchId` (`fk_branch_id`);

--
-- Indexes for table `branch_contacts`
--
ALTER TABLE `branch_contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `branchId` (`fk_branch_id`,`fk_contact_person_id`),
  ADD KEY `branchId_2` (`fk_branch_id`),
  ADD KEY `contactPersonId` (`fk_contact_person_id`);

--
-- Indexes for table `branch_locations`
--
ALTER TABLE `branch_locations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `countryId` (`fk_country_id`),
  ADD KEY `branchId` (`fk_branch_id`);

--
-- Indexes for table `campaigns`
--
ALTER TABLE `campaigns`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customerId` (`fk_customer_id`);

--
-- Indexes for table `contact_persons`
--
ALTER TABLE `contact_persons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addressId` (`fk_contact_id`),
  ADD KEY `contactId` (`fk_contact_id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `campaignId` (`fk_campaign_id`),
  ADD KEY `fk_campaign_id` (`fk_campaign_id`);

--
-- Indexes for table `customer_areas`
--
ALTER TABLE `customer_areas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customerId` (`fk_customer_id`),
  ADD KEY `areaId` (`fk_area_id`);

--
-- Indexes for table `customer_contacts`
--
ALTER TABLE `customer_contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customerId` (`fk_customer_id`,`fk_contact_person_id`),
  ADD KEY `customerId_2` (`fk_customer_id`),
  ADD KEY `contactPersonId` (`fk_contact_person_id`);

--
-- Indexes for table `customer_locations`
--
ALTER TABLE `customer_locations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `countryId` (`fk_country_id`),
  ADD KEY `customerId` (`fk_customer_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `statusId` (`fk_job_status_id`);

--
-- Indexes for table `job_areas`
--
ALTER TABLE `job_areas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobId` (`fk_job_id`,`fk_area_id`),
  ADD KEY `jobId_2` (`fk_job_id`),
  ADD KEY `jobAreaId` (`fk_area_id`);

--
-- Indexes for table `job_confirmation_date`
--
ALTER TABLE `job_confirmation_date`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_job_id` (`fk_job_id`);

--
-- Indexes for table `job_notes`
--
ALTER TABLE `job_notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_note_type_id` (`fk_note_type_id`),
  ADD KEY `fk_job_id` (`fk_job_id`);

--
-- Indexes for table `job_schedules`
--
ALTER TABLE `job_schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_id` (`fk_job_id`,`fk_schedule_frequency_id`),
  ADD KEY `job_id_2` (`fk_job_id`),
  ADD KEY `fk_schedule_frequency_id` (`fk_schedule_frequency_id`);

--
-- Indexes for table `job_services`
--
ALTER TABLE `job_services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `estimateId` (`fk_job_id`,`service_id`),
  ADD KEY `serviceId` (`service_id`),
  ADD KEY `estimateId_2` (`fk_job_id`);

--
-- Indexes for table `job_status`
--
ALTER TABLE `job_status`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `status` (`status`);

--
-- Indexes for table `note_types`
--
ALTER TABLE `note_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `unitId` (`fk_unit_id`,`fk_category_id`),
  ADD KEY `unitId_2` (`fk_unit_id`),
  ADD KEY `fk_category_id` (`fk_category_id`);

--
-- Indexes for table `product_area_usage`
--
ALTER TABLE `product_area_usage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`fk_product_id`,`fk_job_area_id`),
  ADD KEY `productId_2` (`fk_product_id`,`fk_job_area_id`),
  ADD KEY `jobAreaId` (`fk_job_area_id`);

--
-- Indexes for table `schedule_frequencies`
--
ALTER TABLE `schedule_frequencies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`fk_category_id`),
  ADD KEY `category_id` (`fk_category_id`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `areas`
--
ALTER TABLE `areas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `branch_areas`
--
ALTER TABLE `branch_areas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `branch_contacts`
--
ALTER TABLE `branch_contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `branch_locations`
--
ALTER TABLE `branch_locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `campaigns`
--
ALTER TABLE `campaigns`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `contact_persons`
--
ALTER TABLE `contact_persons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `customer_areas`
--
ALTER TABLE `customer_areas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `customer_contacts`
--
ALTER TABLE `customer_contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `customer_locations`
--
ALTER TABLE `customer_locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `job_areas`
--
ALTER TABLE `job_areas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `job_confirmation_date`
--
ALTER TABLE `job_confirmation_date`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `job_notes`
--
ALTER TABLE `job_notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `job_schedules`
--
ALTER TABLE `job_schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `job_services`
--
ALTER TABLE `job_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `job_status`
--
ALTER TABLE `job_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `note_types`
--
ALTER TABLE `note_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_area_usage`
--
ALTER TABLE `product_area_usage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `schedule_frequencies`
--
ALTER TABLE `schedule_frequencies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `branches`
--
ALTER TABLE `branches`
  ADD CONSTRAINT `branches_ibfk_1` FOREIGN KEY (`fk_company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `branch_areas`
--
ALTER TABLE `branch_areas`
  ADD CONSTRAINT `branch_areas_ibfk_1` FOREIGN KEY (`fk_area_id`) REFERENCES `areas` (`id`),
  ADD CONSTRAINT `branch_areas_ibfk_2` FOREIGN KEY (`fk_branch_id`) REFERENCES `branches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `branch_contacts`
--
ALTER TABLE `branch_contacts`
  ADD CONSTRAINT `branch_contacts_ibfk_1` FOREIGN KEY (`fk_branch_id`) REFERENCES `branches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `branch_contacts_ibfk_2` FOREIGN KEY (`fk_contact_person_id`) REFERENCES `contact_persons` (`id`);

--
-- Constraints for table `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`fk_customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`fk_campaign_id`) REFERENCES `campaigns` (`id`);

--
-- Constraints for table `customer_areas`
--
ALTER TABLE `customer_areas`
  ADD CONSTRAINT `customer_areas_ibfk_1` FOREIGN KEY (`fk_customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `customer_areas_ibfk_2` FOREIGN KEY (`fk_area_id`) REFERENCES `areas` (`id`);

--
-- Constraints for table `customer_contacts`
--
ALTER TABLE `customer_contacts`
  ADD CONSTRAINT `customer_contacts_ibfk_1` FOREIGN KEY (`fk_customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `customer_contacts_ibfk_2` FOREIGN KEY (`fk_contact_person_id`) REFERENCES `contact_persons` (`id`);

--
-- Constraints for table `customer_locations`
--
ALTER TABLE `customer_locations`
  ADD CONSTRAINT `customer_locations_ibfk_1` FOREIGN KEY (`fk_customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`fk_job_status_id`) REFERENCES `job_status` (`id`);

--
-- Constraints for table `job_areas`
--
ALTER TABLE `job_areas`
  ADD CONSTRAINT `job_areas_ibfk_1` FOREIGN KEY (`fk_job_id`) REFERENCES `jobs` (`id`),
  ADD CONSTRAINT `job_areas_ibfk_2` FOREIGN KEY (`fk_area_id`) REFERENCES `areas` (`id`);

--
-- Constraints for table `job_confirmation_date`
--
ALTER TABLE `job_confirmation_date`
  ADD CONSTRAINT `job_confirmation_date_ibfk_1` FOREIGN KEY (`fk_job_id`) REFERENCES `jobs` (`id`);

--
-- Constraints for table `job_notes`
--
ALTER TABLE `job_notes`
  ADD CONSTRAINT `job_notes_ibfk_1` FOREIGN KEY (`fk_job_id`) REFERENCES `jobs` (`id`),
  ADD CONSTRAINT `job_notes_ibfk_2` FOREIGN KEY (`fk_note_type_id`) REFERENCES `note_types` (`id`);

--
-- Constraints for table `job_schedules`
--
ALTER TABLE `job_schedules`
  ADD CONSTRAINT `job_schedules_ibfk_1` FOREIGN KEY (`fk_job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `job_schedules_ibfk_2` FOREIGN KEY (`fk_schedule_frequency_id`) REFERENCES `schedule_frequencies` (`id`);

--
-- Constraints for table `job_services`
--
ALTER TABLE `job_services`
  ADD CONSTRAINT `job_services_ibfk_1` FOREIGN KEY (`fk_job_id`) REFERENCES `jobs` (`id`),
  ADD CONSTRAINT `job_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`fk_unit_id`) REFERENCES `units` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`fk_category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `product_area_usage`
--
ALTER TABLE `product_area_usage`
  ADD CONSTRAINT `product_area_usage_ibfk_1` FOREIGN KEY (`fk_product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `product_area_usage_ibfk_2` FOREIGN KEY (`fk_job_area_id`) REFERENCES `job_areas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_ibfk_1` FOREIGN KEY (`fk_category_id`) REFERENCES `categories` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
