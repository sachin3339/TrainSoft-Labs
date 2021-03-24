#--=================  appusers   ==================--
DROP TABLE IF EXISTS appusers;

CREATE TABLE `appusers` (
                            `id` int(11) NOT NULL,
                            `sid` binary(32) NOT NULL,
                            `name` varchar(255) NOT NULL,
                            `email` varchar(45) NOT NULL,
                            `phone_number` varchar(15) NOT NULL,
                            `is_superadmin` tinyint(1) NOT NULL,
                            `status` enum('ENABLED','DISABLED','DELETED') DEFAULT NULL,
                            PRIMARY KEY (`id`),
                            UNIQUE KEY `email_UNIQUE` (`email`)
);

#--=================  company   ==================--

DROP TABLE IF EXISTS company;

CREATE TABLE `company` (
                           `id` int NOT NULL,
                           `sid` binary(32) NOT NULL,
                           `name` varchar(255) NOT NULL,
                           `email` varchar(45) NOT NULL,
                           `phone_number` varchar(45) DEFAULT NULL,
                           `created_by` int DEFAULT NULL,
                           `updated_by` int DEFAULT NULL,
                           `created_on` datetime DEFAULT NULL,
                           `updated_on` datetime DEFAULT NULL,
                           PRIMARY KEY (`id`),
                           UNIQUE KEY `email_UNIQUE` (`email`),
                           KEY `fk_company_1_idx` (`created_by`),
                           KEY `fk_company_2_idx` (`updated_by`),
                           CONSTRAINT `fk_company_1` FOREIGN KEY (`created_by`) REFERENCES `virtual_account` (`id`),
                           CONSTRAINT `fk_company_2` FOREIGN KEY (`updated_by`) REFERENCES `virtual_account` (`id`)
);

#--=================  virtual_account   ==================--

DROP TABLE IF EXISTS virtual_account;

CREATE TABLE `virtual_account` (
                                   `id` int NOT NULL,
                                   `sid` binary(32) NOT NULL,
                                   `roles` enum('ADMIN','USER') NOT NULL,
                                   `company_id` int NOT NULL,
                                   `appuser_id` int NOT NULL,
                                   `status` enum('ENABLED','DISABLED','DELETED') DEFAULT NULL,
                                   `designation` varchar(255) NOT NULL,
                                   PRIMARY KEY (`id`),
                                   KEY `fk_virtual_account_1_idx` (`company_id`),
                                   KEY `fk_virtual_account_2_idx` (`appuser_id`),
                                   CONSTRAINT `fk_virtual_account_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
                                   CONSTRAINT `fk_virtual_account_2` FOREIGN KEY (`appuser_id`) REFERENCES `appusers` (`id`)
) ;

#--=================  batch   ==================--

DROP TABLE IF EXISTS batch;

CREATE TABLE `batch` (
                         `id` int NOT NULL,
                         `sid` binary(32) DEFAULT NULL,
                         `name` varchar(255) NOT NULL,
                         `status` enum('ACTIVE','PENDING','INACTIVE') NOT NULL,
                         `training_type` enum('INSTRUCTOR_LED','SELF_PACED','LAB_ONLY') NOT NULL,
                         `start_date` datetime NOT NULL,
                         `end_date` datetime NOT NULL,
                         `created_by` int NOT NULL,
                         `created_on` datetime DEFAULT NULL,
                         PRIMARY KEY (`id`),
                         UNIQUE KEY `name_UNIQUE` (`name`),
                         KEY `fk_batch_3_idx` (`created_by`),
                         CONSTRAINT `fk_batch_1` FOREIGN KEY (`created_by`) REFERENCES `virtual_account` (`id`)
);

#--=================  batch_has_participants   ==================--
DROP TABLE IF EXISTS batch_has_participants;

CREATE TABLE `batch_has_participants` (
                                          `id` int NOT NULL,
                                          `sid` binary(32) NOT NULL,
                                          `batch_id` int NOT NULL,
                                          `virtual_account_id` int NOT NULL,
                                          PRIMARY KEY (`id`),
                                          KEY `fk_batch_participants_1_idx` (`batch_id`),
                                          KEY `fk_batch_participants_2_idx` (`virtual_account_id`),
                                          CONSTRAINT `fk_batch_participants_1` FOREIGN KEY (`batch_id`) REFERENCES `batch` (`id`),
                                          CONSTRAINT `fk_batch_participants_2` FOREIGN KEY (`virtual_account_id`) REFERENCES `virtual_account` (`id`)
);

#--=================  course   ==================--
DROP TABLE IF EXISTS course;

CREATE TABLE `course` (
                          `id` int NOT NULL,
                          `sid` binary(32) NOT NULL,
                          `name` varchar(255) NOT NULL,
                          `start_date` datetime NOT NULL,
                          `end_date` datetime NOT NULL,
                          `is_lab` tinyint(1) NOT NULL,
                          `status` enum('ASSINGED','IN_PROGRESS','COMPLETED') NOT NULL,
                          `created_by` int NOT NULL,
                          `created_on` datetime NOT NULL,
                          PRIMARY KEY (`id`),
                          UNIQUE KEY `name_UNIQUE` (`name`),
                          KEY `fk_course_1_idx` (`created_by`),
                          CONSTRAINT `fk_course_1` FOREIGN KEY (`created_by`) REFERENCES `virtual_account` (`id`)
);

#--=================  course_has_batch   ==================--

DROP TABLE IF EXISTS course_has_batch;

CREATE TABLE `course_has_batch` (
                                    `id` int NOT NULL,
                                    `sid` binary(32) NOT NULL,
                                    `course_id` int NOT NULL,
                                    `batch_id` int NOT NULL,
                                    `created_on` datetime DEFAULT NULL,
                                    PRIMARY KEY (`id`),
                                    KEY `fk_course_has_batch_1_idx` (`course_id`),
                                    KEY `fk_course_has_batch_2_idx` (`batch_id`),
                                    CONSTRAINT `fk_course_has_batch_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
                                    CONSTRAINT `fk_course_has_batch_2` FOREIGN KEY (`batch_id`) REFERENCES `batch` (`id`)
);

#--=================  department   ==================--

DROP TABLE IF EXISTS department;

CREATE TABLE `department` (
                              `id` int NOT NULL,
                              `sid` binary(32) NOT NULL,
                              `name` varchar(255) NOT NULL,
                              `description` varchar(255) DEFAULT NULL,
                              `email` varchar(255) DEFAULT NULL,
                              `location` varchar(255) DEFAULT NULL,
                              `company_id` int DEFAULT NULL,
                              `is_active` tinyint(1) DEFAULT NULL,
                              `created_by` int NOT NULL,
                              `created_on` timestamp NULL DEFAULT NULL,
                              `updated_by` int NOT NULL,
                              `updated_on` timestamp NULL DEFAULT NULL,
                              PRIMARY KEY (`id`),
                              KEY `fk_department_1_idx` (`company_id`),
                              KEY `fk_department_2_idx` (`created_by`),
                              KEY `fk_department_3_idx` (`updated_by`),
                              CONSTRAINT `fk_department_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
                              CONSTRAINT `fk_department_2` FOREIGN KEY (`created_by`) REFERENCES `department_has_virtual_account` (`id`),
                              CONSTRAINT `fk_department_3` FOREIGN KEY (`updated_by`) REFERENCES `department_has_virtual_account` (`id`)
) ;

#--=================  department_has_virtual_account   ==================--

DROP TABLE IF EXISTS department_has_virtual_account;

CREATE TABLE `department_has_virtual_account` (
                                                  `id` int NOT NULL,
                                                  `sid` binary(32) NOT NULL,
                                                  `virtual_acoount_id` int NOT NULL,
                                                  `department_id` int NOT NULL,
                                                  `department_role` enum('PROJECT_ADMIN','INSTRUCTOR','PARTICIPANT') DEFAULT NULL,
                                                  PRIMARY KEY (`id`),
                                                  KEY `fk_department_virtual_account_1_idx` (`virtual_acoount_id`),
                                                  KEY `fk_department_virtual_account_2_idx` (`department_id`),
                                                  CONSTRAINT `fk_department_virtual_account_1` FOREIGN KEY (`virtual_acoount_id`) REFERENCES `virtual_account` (`id`),
                                                  CONSTRAINT `fk_department_virtual_account_2` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
);
#--=================  technology   ==================--

DROP TABLE IF EXISTS technology;

CREATE TABLE `technology` (
                              `id` int(11) NOT NULL,
                              `sid` binary(32) NOT NULL,
                              `name` varchar(255) NOT NULL,
                              `description` varchar(255) DEFAULT NULL,
                              `created_by` int(11) NOT NULL,
                              `created_on` datetime DEFAULT NULL,
                              PRIMARY KEY (`id`),
                              UNIQUE KEY `name_UNIQUE` (`name`),
                              KEY `fk_technology_1_idx` (`created_by`),
                              CONSTRAINT `fk_technology_1` FOREIGN KEY (`created_by`) REFERENCES `virtual_account` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

#--=================  course_has_technology   ==================--

DROP TABLE IF EXISTS course_has_technology;

CREATE TABLE `course_has_technology` (
                                         `id` int NOT NULL,
                                         `sid` binary(32) NOT NULL,
                                         `course_id` int NOT NULL,
                                         `technology_id` int NOT NULL,
                                         PRIMARY KEY (`id`),
                                         KEY `fk_course_has_technology_1_idx` (`course_id`),
                                         KEY `fk_course_has_technology_2_idx` (`technology_id`),
                                         CONSTRAINT `fk_course_has_technology_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
                                         CONSTRAINT `fk_course_has_technology_2` FOREIGN KEY (`technology_id`) REFERENCES `technology` (`id`)
);

#--=================  course_session   ==================--

DROP TABLE IF EXISTS course_session;

CREATE TABLE `course_session` (
                                  `id` int NOT NULL,
                                  `sid` binary(32) NOT NULL,
                                  `agenda_name` varchar(1000) NOT NULL,
                                  `agenda_description` varchar(1000) NOT NULL,
                                  `start_time` time NOT NULL,
                                  `end_time` time NOT NULL,
                                  `session_date` date NOT NULL,
                                  `assets` varchar(1000) DEFAULT NULL,
                                  `recording` varchar(1000) DEFAULT NULL,
                                  `course_id` int DEFAULT NULL,
                                  `created_by` int DEFAULT NULL,
                                  `created_on` datetime DEFAULT NULL,
                                  PRIMARY KEY (`id`),
                                  KEY `fk_course_session_1_idx` (`course_id`),
                                  KEY `fk_course_session_2_idx` (`created_by`),
                                  CONSTRAINT `fk_course_session_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
                                  CONSTRAINT `fk_course_session_2` FOREIGN KEY (`created_by`) REFERENCES `virtual_account` (`id`)
);

#--================= vw_training ==================--

DROP VIEW IF EXISTS vw_training;
create view vw_training
as
select tr.id,tr.sid,tr.name,count(trbh.sid) as no_of_batches,cr.name as course_name,
       tr.instructor_name,tr.start_date,tr.end_date,tr.status,tr.created_by,tr.updated_by from training tr
                                                                                                   inner join training_has_course thc on thc.training_id=tr.id
                                                                                                   inner join course cr on thc.course_id=cr.id
                                                                                                   inner join training_has_batch trbh on tr.id=trbh.training_id group by tr.id

#--================= vw_batch ==================--

DROP VIEW IF EXISTS vw_batch;
create view vw_batch
as
select bt.id,bt.sid, bt.name,count(bhp.virtual_account_id) as no_of_learners,bt.status,bt.created_on,
       bt.created_by,bt.updated_by,bt.updated_on from batch bt left  join batch_has_participants bhp on bt.id=bhp.batch_id
group by bt.id order by no_of_learners desc

 #--================= vw_course ==================--

DROP VIEW IF EXISTS vw_course ;
create view vw_course
as
select cr.id,cr.sid,cr.name,cr.status,cr.created_on,
       cr.created_by,cr.updated_by,cr.updated_on,count(tr.id) as no_of_trainings,
       count(bhp.virtual_account_id) as learners from course cr
                                                          inner join training_has_course thc on cr.id=thc.course_id
                                                          inner join training tr on tr.id=thc.training_id
                                                          inner join training_has_batch thb on thb.training_id=tr.id
                                                          inner join batch bt on thb.batch_id=bt.id
                                                          inner join batch_has_participants bhp on bt.id=bhp.batch_id group by cr.id;