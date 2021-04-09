#--=================  answer   ==================--
DROP TABLE IF EXISTS answer;

CREATE TABLE `answer` (
                          `id` int NOT NULL AUTO_INCREMENT,
                          `sid` binary(32) NOT NULL,
                          `answer_option` varchar(255) NOT NULL,
                          `answer_option_value` varchar(255) DEFAULT NULL,
                          `status` enum('ENABLED','DISABLED','DELETED') DEFAULT NULL,
                          `created_by` int NOT NULL,
                          `created_on` datetime NOT NULL,
                          `question_id` int NOT NULL,
                          `is_correct` tinyint(1) DEFAULT NULL,
                          PRIMARY KEY (`id`),
                          KEY `fk_answer_2_idx` (`created_by`),
                          CONSTRAINT `fk_answer_2` FOREIGN KEY (`created_by`) REFERENCES `virtual_account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#--=================  question_point   ==================--
DROP TABLE IF EXISTS question_point;

CREATE TABLE `question_point` (
                                  `id` int NOT NULL AUTO_INCREMENT,
                                  `sid` binary(32) NOT NULL,
                                  `name` varchar(255) NOT NULL,
                                  `description` varchar(255) DEFAULT NULL,
                                  `created_on` datetime NOT NULL,
                                  `created_by` int NOT NULL,
                                  `technology_name` varchar(255) NOT NULL,
                                  `status` enum('ENABLED','DISABLED','DELETED','APPROVAL_RECIEVED') DEFAULT NULL,
                                  `question_type` enum('MCQ','SINGLE_VALUE','DESCRIPTIVE','FILL_IN_THE_BLANKS') DEFAULT NULL,
                                  `company_id` int NOT NULL,
                                  PRIMARY KEY (`id`),
                                  KEY `fk_question_point_1_idx` (`company_id`),
                                  KEY `fk_question_point_2_idx` (`created_by`),
                                  CONSTRAINT `fk__question_point_2_` FOREIGN KEY (`created_by`) REFERENCES `virtual_account` (`id`),
                                  CONSTRAINT `fk_question_point_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


#--=================  question_type   ==================--
DROP TABLE IF EXISTS question_type;

CREATE TABLE `question_type` (
                                 `id` int NOT NULL AUTO_INCREMENT,
                                 `sid` binary(32) NOT NULL,
                                 `name` varchar(255) DEFAULT NULL,
                                 `status` enum('ENABLED','DISABLED','DELETED') DEFAULT NULL,
                                 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `quiz` (
                        `id` int NOT NULL AUTO_INCREMENT,
                        `sid` binary(32) NOT NULL,
                        `name` varchar(255) NOT NULL,
                        `description` varchar(255) DEFAULT NULL,
                        `status` enum('ENABLED','DISABLED','DELETED') DEFAULT NULL,
                        `created_by` int NOT NULL,
                        `created_on` datetime NOT NULL,
                        `updated_by` int NOT NULL,
                        `updated_on` datetime NOT NULL,
                        `company_id` int NOT NULL,
                        `is_payment_recieved` tinyint(1) DEFAULT NULL,
                        `price` decimal(15,2) DEFAULT NULL,
                        PRIMARY KEY (`id`),
                        KEY `fk_quiz_1_idx` (`company_id`),
                        KEY `fk_quiz_2_idx` (`created_by`),
                        KEY `fk_quiz_3_idx` (`updated_by`),
                        CONSTRAINT `fk_quiz_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
                        CONSTRAINT `fk_quiz_2` FOREIGN KEY (`created_by`) REFERENCES `virtual_account` (`id`),
                        CONSTRAINT `fk_quiz_3` FOREIGN KEY (`updated_by`) REFERENCES `virtual_account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


#--=================  quiz_has_batch   ==================--
DROP TABLE IF EXISTS quiz_has_batch;

CREATE TABLE `quiz_has_batch` (
                                  `id` int NOT NULL AUTO_INCREMENT,
                                  `sid` binary(32) NOT NULL,
                                  `quiz_id` int NOT NULL,
                                  `batch_id` int NOT NULL,
                                  `created_by` int DEFAULT NULL,
                                  `created_on` datetime DEFAULT NULL,
                                  `status` varchar(45) DEFAULT NULL,
                                  `company_id` int NOT NULL,
                                  PRIMARY KEY (`id`),
                                  KEY `fk_ quiz_has_batch_1_idx` (`quiz_id`),
                                  KEY `fk_ quiz_has_batch_2_idx` (`batch_id`),
                                  KEY `fk_ quiz_has_batch_3_idx` (`created_by`),
                                  KEY `fk_ quiz_has_batch_4_idx` (`company_id`),
                                  CONSTRAINT `fk_ quiz_has_batch_1` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`),
                                  CONSTRAINT `fk_ quiz_has_batch_2` FOREIGN KEY (`batch_id`) REFERENCES `batch` (`id`),
                                  CONSTRAINT `fk_ quiz_has_batch_3` FOREIGN KEY (`created_by`) REFERENCES `virtual_account` (`id`),
                                  CONSTRAINT `fk_ quiz_has_batch_4` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



#--=================  quiz_has_training   ==================--
DROP TABLE IF EXISTS quiz_has_training;

CREATE TABLE `quiz_has_training` (
                                     `id` int NOT NULL AUTO_INCREMENT,
                                     `sid` binary(32) NOT NULL,
                                     `quiz_id` int NOT NULL,
                                     `training_id` int NOT NULL,
                                     `created_by` int DEFAULT NULL,
                                     `created_on` datetime DEFAULT NULL,
                                     `status` varchar(45) DEFAULT NULL,
                                     `company_id` int NOT NULL,
                                     PRIMARY KEY (`id`),
                                     KEY `fk_ quiz_has_training_1_idx` (`quiz_id`),
                                     KEY `fk_ quiz_has_training_2_idx` (`training_id`),
                                     KEY `fk_ quiz_has_training_3_idx` (`created_by`),
                                     KEY `fk_ quiz_has_training_4_idx` (`company_id`),
                                     CONSTRAINT `fk_ quiz_has_training_1` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`),
                                     CONSTRAINT `fk_ quiz_has_training_2` FOREIGN KEY (`training_id`) REFERENCES `training` (`id`),
                                     CONSTRAINT `fk_ quiz_has_training_3` FOREIGN KEY (`created_by`) REFERENCES `virtual_account` (`id`),
                                     CONSTRAINT `fk_ quiz_has_training_4` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


#--=================  quiz_set   ==================--
DROP TABLE IF EXISTS quiz_set;

CREATE TABLE `quiz_set` (
                            `id` int NOT NULL AUTO_INCREMENT,
                            `sid` binary(32) NOT NULL,
                            `name` varchar(255) NOT NULL,
                            `description` varchar(255) DEFAULT NULL,
                            `status` enum('ENABLED','DISABLED','DELETED') DEFAULT NULL,
                            `created_by` int NOT NULL,
                            `created_on` datetime NOT NULL,
                            `updated_by` int NOT NULL,
                            `updated_on` datetime NOT NULL,
                            `company_id` int NOT NULL,
                            `quiz_id` int NOT NULL,
                            `is_question_randomize` tinyint(1) DEFAULT NULL,
                            `duration` int DEFAULT NULL,
                            `is_pause_enable` tinyint(1) DEFAULT NULL,
                            `is_payment_recieved` tinyint(1) DEFAULT NULL,
                            `price` decimal(15,2) DEFAULT NULL,
                            `is_negative` tinyint(1) DEFAULT NULL,
                            `reduce_marks` tinyint(1) DEFAULT NULL,
                            `is_previous_enabled` tinyint(1) DEFAULT NULL,
                            `is_multiple_attempts` tinyint(1) DEFAULT NULL,
                            `is_auto_submitted` tinyint(1) DEFAULT NULL,
                            `is_next_enabled` tinyint(1) DEFAULT NULL,
                            PRIMARY KEY (`id`),
                            KEY `fk_quiz_set_1_idx` (`company_id`),
                            KEY `fk_quiz_set_2_idx` (`created_by`),
                            KEY `fk_quiz_set_3_idx` (`updated_by`),
                            KEY `fk_quiz_set_4_idx` (`quiz_id`),
                            CONSTRAINT `fk_quiz_set_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
                            CONSTRAINT `fk_quiz_set_2` FOREIGN KEY (`created_by`) REFERENCES `virtual_account` (`id`),
                            CONSTRAINT `fk_quiz_set_3` FOREIGN KEY (`updated_by`) REFERENCES `virtual_account` (`id`),
                            CONSTRAINT `fk_quiz_set_4` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


#--=================  quiz_set_has_question   ==================--
DROP TABLE IF EXISTS quiz_set_has_question;

CREATE TABLE `quiz_set_has_question` (
                                         `id` int NOT NULL AUTO_INCREMENT,
                                         `sid` binary(32) NOT NULL,
                                         `question_id` int NOT NULL,
                                         `created_by` int DEFAULT NULL,
                                         `created_on` datetime DEFAULT NULL,
                                         `updated_by` int DEFAULT NULL,
                                         `updated_on` datetime DEFAULT NULL,
                                         `status` varchar(45) DEFAULT NULL,
                                         `company_id` int NOT NULL,
                                         `question_number` int NOT NULL,
                                         `is_answer_randomize` tinyint DEFAULT NULL,
                                         `question_point` int NOT NULL,
                                         `quiz_set_id` int NOT NULL,
                                         PRIMARY KEY (`id`),
                                         KEY `fk_quiz_set_has_question_2_idx` (`quiz_set_id`),
                                         CONSTRAINT `fk_quiz_set_has_question_2` FOREIGN KEY (`quiz_set_id`) REFERENCES `quiz_set` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


#--=================  tags   ==================--
DROP TABLE IF EXISTS tags;

CREATE TABLE `tags` (
                        `id` int NOT NULL AUTO_INCREMENT,
                        `sid` binary(32) NOT NULL,
                        `name` varchar(255) NOT NULL,
                        `status` enum('ENABLED','DISABLED','DELETED') DEFAULT NULL,
                        PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


#--=================  training_has_batch   ==================--
DROP TABLE IF EXISTS training_has_batch;

CREATE TABLE `training_has_batch` (
                                      `id` int NOT NULL AUTO_INCREMENT,
                                      `sid` binary(32) NOT NULL,
                                      `training_id` int NOT NULL,
                                      `batch_id` int NOT NULL,
                                      `created_on` datetime DEFAULT NULL,
                                      PRIMARY KEY (`id`),
                                      KEY `fk_course_has_batch_2_idx` (`batch_id`),
                                      KEY `fk_course_has_batch_1_idx` (`training_id`),
                                      CONSTRAINT `fk_course_has_batch_1` FOREIGN KEY (`training_id`) REFERENCES `training` (`id`),
                                      CONSTRAINT `fk_course_has_batch_2` FOREIGN KEY (`batch_id`) REFERENCES `batch` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=205 DEFAULT CHARSET=latin1;


#--=================  training_session_has_quiz   ==================--
DROP TABLE IF EXISTS training_session_has_quiz;

CREATE TABLE `training_session_has_quiz` (
                                             `id` int NOT NULL AUTO_INCREMENT,
                                             `sid` binary(32) NOT NULL,
                                             `quiz_id` int NOT NULL,
                                             `training_session_id` int NOT NULL,
                                             `training_id` int NOT NULL,
                                             `status` enum('ENABLED','DISABLED','DELETED') DEFAULT NULL,
                                             `company_id` int NOT NULL,
                                             ` created_by` int DEFAULT NULL,
                                             `created_on` datetime DEFAULT NULL,
                                             PRIMARY KEY (`id`),
                                             KEY `fk_ training_session_has_quiz_1_idx` (`quiz_id`),
                                             KEY `fk_ training_session_has_quiz_2_idx` (`training_session_id`),
                                             KEY `fk_ training_session_has_quiz_3_idx` (`training_id`),
                                             KEY `fk_ training_session_has_quiz_5_idx` (` created_by`),
                                             CONSTRAINT `fk_ training_session_has_quiz_1` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`),
                                             CONSTRAINT `fk_ training_session_has_quiz_2` FOREIGN KEY (`training_session_id`) REFERENCES `training_session` (`id`),
                                             CONSTRAINT `fk_ training_session_has_quiz_3` FOREIGN KEY (`training_id`) REFERENCES `training` (`id`),
                                             CONSTRAINT `fk_ training_session_has_quiz_4` FOREIGN KEY (`id`) REFERENCES `company` (`id`),
                                             CONSTRAINT `fk_ training_session_has_quiz_5` FOREIGN KEY (` created_by`) REFERENCES `virtual_account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



#--=================  transaction_details   ==================--
DROP TABLE IF EXISTS transaction_details;

CREATE TABLE `transaction_details` (
                                       `id` int NOT NULL AUTO_INCREMENT,
                                       `sid` binary(32) NOT NULL,
                                       `status` enum('FAILED','SUCESS','PROCESS') DEFAULT NULL,
                                       `vitrual_account_id` int NOT NULL,
                                       `company_id` int NOT NULL,
                                       `created_by` int DEFAULT NULL,
                                       `created_on` datetime DEFAULT NULL,
                                       `virtual_account_has_invoice_id` int NOT NULL,
                                       `transaction_generated_id` varchar(255) NOT NULL,
                                       `mode_of_transaction` enum('CREDIT','DEBIT','NETBANKING') NOT NULL,
                                       PRIMARY KEY (`id`),
                                       KEY `fk_ transaction_details_1_idx` (`vitrual_account_id`),
                                       KEY `fk_ transaction_details_2_idx` (`company_id`),
                                       KEY `fk_ transaction_details_3_idx` (`created_by`),
                                       KEY `fk_ transaction_details_4_idx` (`virtual_account_has_invoice_id`),
                                       CONSTRAINT `fk_ transaction_details_1` FOREIGN KEY (`vitrual_account_id`) REFERENCES `virtual_account` (`id`),
                                       CONSTRAINT `fk_ transaction_details_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
                                       CONSTRAINT `fk_ transaction_details_3` FOREIGN KEY (`created_by`) REFERENCES `virtual_account` (`id`),
                                       CONSTRAINT `fk_ transaction_details_4` FOREIGN KEY (`virtual_account_has_invoice_id`) REFERENCES `virtual_account_has_invoice` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


#--=================  virtual_account_has_invoice   ==================--
DROP TABLE IF EXISTS virtual_account_has_invoice;

CREATE TABLE `virtual_account_has_invoice` (
                                               `id` int NOT NULL AUTO_INCREMENT,
                                               `sid` binary(32) NOT NULL,
                                               `virtual_account_id` int NOT NULL,
                                               `invoice_id` int NOT NULL,
                                               `company_id` int NOT NULL,
                                               `created_by` int NOT NULL,
                                               `created_on` datetime NOT NULL,
                                               `quiz_set_id` int NOT NULL,
                                               `quiz_id` int NOT NULL,
                                               `amount` decimal(15,2) NOT NULL,
                                               `generated_invoice_id` int NOT NULL,
                                               PRIMARY KEY (`id`),
                                               KEY `fk_ virtual_account_has_invoice_1_idx` (`virtual_account_id`),
                                               KEY `fk_ virtual_account_has_invoice_2_idx` (`company_id`),
                                               KEY `fk_ virtual_account_has_invoice_3_idx` (`created_by`),
                                               KEY `fk_ virtual_account_has_invoice_4_idx` (`quiz_id`),
                                               KEY `fk_ virtual_account_has_invoice_5_idx` (`quiz_set_id`),
                                               CONSTRAINT `fk_ virtual_account_has_invoice_1` FOREIGN KEY (`virtual_account_id`) REFERENCES `virtual_account` (`id`),
                                               CONSTRAINT `fk_ virtual_account_has_invoice_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
                                               CONSTRAINT `fk_ virtual_account_has_invoice_3` FOREIGN KEY (`created_by`) REFERENCES `virtual_account` (`id`),
                                               CONSTRAINT `fk_ virtual_account_has_invoice_4` FOREIGN KEY (`quiz_set_id`) REFERENCES `quiz_set` (`id`),
                                               CONSTRAINT `fk_ virtual_account_has_invoice_5` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


#--=================  virtual_account_has_question_answer_details   ==================--
DROP TABLE IF EXISTS virtual_account_has_question_answer_details;

CREATE TABLE `virtual_account_has_question_answer_details` (
                                                               `id` int NOT NULL AUTO_INCREMENT,
                                                               `sid` binary(32) NOT NULL,
                                                               `virtual_account_id` int NOT NULL,
                                                               `question_id` int NOT NULL,
                                                               `answer` json NOT NULL,
                                                               `is_correct` tinyint NOT NULL,
                                                               `company_id` int NOT NULL,
                                                               `created_by` int NOT NULL,
                                                               `created_on` datetime NOT NULL,
                                                               PRIMARY KEY (`id`),
                                                               KEY `fk_ virtual_account_has_question_answer_details_1_idx` (`virtual_account_id`),
                                                               KEY `fk_ virtual_account_has_question_answer_details_2_idx` (`question_id`),
                                                               KEY `fk_ virtual_account_has_question_answer_details_3_idx` (`company_id`),
                                                               KEY `fk_ virtual_account_has_question_answer_details_4_idx` (`created_by`),
                                                               CONSTRAINT `fk_ virtual_account_has_question_answer_details_1` FOREIGN KEY (`virtual_account_id`) REFERENCES `virtual_account` (`id`),
                                                               CONSTRAINT `fk_ virtual_account_has_question_answer_details_2` FOREIGN KEY (`question_id`) REFERENCES `question_point` (`id`),
                                                               CONSTRAINT `fk_ virtual_account_has_question_answer_details_3` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
                                                               CONSTRAINT `fk_ virtual_account_has_question_answer_details_4` FOREIGN KEY (`created_by`) REFERENCES `virtual_account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#--=================  virtual_account_has_quiz_set_assesment   ==================--
DROP TABLE IF EXISTS virtual_account_has_quiz_set_assesment;

CREATE TABLE `virtual_account_has_quiz_set_assesment` (
                                                          `id` int NOT NULL AUTO_INCREMENT,
                                                          `sid` binary(32) NOT NULL,
                                                          `quiz_id` int NOT NULL,
                                                          `quiz_set_id` int NOT NULL,
                                                          `total_marks` int NOT NULL,
                                                          `gain_marks` int NOT NULL,
                                                          `total_no_of_correct_answer` int NOT NULL,
                                                          `total_no_of_wrong_answer` int NOT NULL,
                                                          `no_of_attempted_question` int NOT NULL,
                                                          `company_id` int NOT NULL,
                                                          `created_by` int DEFAULT NULL,
                                                          `created_on` datetime DEFAULT NULL,
                                                          `updated_by` int DEFAULT NULL,
                                                          `updated_on` datetime DEFAULT NULL,
                                                          PRIMARY KEY (`id`),
                                                          KEY `fk_ virtual_account_has_quiz_set_assesment_1_idx` (`quiz_id`),
                                                          KEY `fk_ virtual_account_has_quiz_set_assesment_2_idx` (`quiz_set_id`),
                                                          KEY `fk_ virtual_account_has_quiz_set_assesment_3_idx` (`company_id`),
                                                          KEY `fk_ virtual_account_has_quiz_set_assesment_4_idx` (`created_by`),
                                                          KEY `fk_ virtual_account_has_quiz_set_assesment_5_idx` (`updated_by`),
                                                          CONSTRAINT `fk_ virtual_account_has_quiz_set_assesment_1` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`),
                                                          CONSTRAINT `fk_ virtual_account_has_quiz_set_assesment_2` FOREIGN KEY (`quiz_set_id`) REFERENCES `quiz_set` (`id`),
                                                          CONSTRAINT `fk_ virtual_account_has_quiz_set_assesment_3` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
                                                          CONSTRAINT `fk_ virtual_account_has_quiz_set_assesment_4` FOREIGN KEY (`created_by`) REFERENCES `virtual_account` (`id`),
                                                          CONSTRAINT `fk_ virtual_account_has_quiz_set_assesment_5` FOREIGN KEY (`updated_by`) REFERENCES `virtual_account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


#--=================  virtual_account_has_quiz_set_session_timing   ==================--
DROP TABLE IF EXISTS virtual_account_has_quiz_set_session_timing;

CREATE TABLE `virtual_account_has_quiz_set_session_timing` (
                                                               `id` int NOT NULL AUTO_INCREMENT,
                                                               `sid` binary(32) NOT NULL,
                                                               `virtual_account_id` int NOT NULL,
                                                               `quiz_set_id` int NOT NULL,
                                                               `quiz_id` int NOT NULL,
                                                               `start_time` datetime NOT NULL,
                                                               `end_time` datetime NOT NULL,
                                                               `company_id` int NOT NULL,
                                                               PRIMARY KEY (`id`),
                                                               KEY `fk_ virtual_account_has_quiz_set_session_timing_1_idx` (`virtual_account_id`),
                                                               KEY `fk_ virtual_account_has_quiz_set_session_timing_2_idx` (`quiz_set_id`),
                                                               KEY `fk_ virtual_account_has_quiz_set_session_timing_3_idx` (`quiz_id`),
                                                               KEY `fk_ virtual_account_has_quiz_set_session_timing_4_idx` (`company_id`),
                                                               CONSTRAINT `fk_ virtual_account_has_quiz_set_session_timing_1` FOREIGN KEY (`virtual_account_id`) REFERENCES `virtual_account` (`id`),
                                                               CONSTRAINT `fk_ virtual_account_has_quiz_set_session_timing_2` FOREIGN KEY (`quiz_set_id`) REFERENCES `quiz_set` (`id`),
                                                               CONSTRAINT `fk_ virtual_account_has_quiz_set_session_timing_3` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`),
                                                               CONSTRAINT `fk_ virtual_account_has_quiz_set_session_timing_4` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
