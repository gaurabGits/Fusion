CREATE TABLE `users` (
  `user_id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) UNIQUE NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
  `last_login` timestamp,
  `account_status` varchar(255) DEFAULT 'active',
  `profile_image_url` varchar(255)
);

CREATE TABLE `auth_tokens` (
  `token_id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `token` varchar(255) UNIQUE NOT NULL,
  `created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
  `expires_at` timestamp NOT NULL,
  `is_valid` boolean DEFAULT true,
  `device_info` text
);

CREATE TABLE `messages` (
  `message_id` integer PRIMARY KEY AUTO_INCREMENT,
  `sender_id` integer NOT NULL,
  `recipient_id` integer NOT NULL,
  `message_content` text,
  `sent_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
  `is_read` boolean DEFAULT false,
  `read_at` timestamp,
  `message_type` varchar(255) DEFAULT 'text'
);

CREATE TABLE `message_status` (
  `status_id` integer PRIMARY KEY AUTO_INCREMENT,
  `message_id` integer NOT NULL,
  `status` varchar(255) NOT NULL COMMENT 'sent, delivered, read',
  `updated_at` timestamp DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `notifications` (
  `notification_id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `message_id` integer,
  `notification_type` varchar(255) NOT NULL COMMENT 'new_message, system, etc.',
  `content` text NOT NULL,
  `created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
  `is_read` boolean DEFAULT false,
  `read_at` timestamp
);

CREATE TABLE `external_service_delivery` (
  `delivery_id` integer PRIMARY KEY AUTO_INCREMENT,
  `notification_id` integer NOT NULL,
  `service_type` varchar(255) NOT NULL COMMENT 'push, email, sms, etc.',
  `delivery_status` varchar(255) DEFAULT 'pending',
  `attempted_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
  `delivered_at` timestamp,
  `error_message` text
);

CREATE TABLE `conversations` (
  `conversation_id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `created_by` integer NOT NULL,
  `created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
  `is_group` boolean DEFAULT false
);

CREATE TABLE `conversation_participants` (
  `conversation_id` integer NOT NULL,
  `user_id` integer NOT NULL,
  `joined_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
  `is_admin` boolean DEFAULT false,
  PRIMARY KEY (`conversation_id`, `user_id`)
);

ALTER TABLE `auth_tokens` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `messages` ADD FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `messages` ADD FOREIGN KEY (`recipient_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `message_status` ADD FOREIGN KEY (`message_id`) REFERENCES `messages` (`message_id`);

ALTER TABLE `notifications` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `notifications` ADD FOREIGN KEY (`message_id`) REFERENCES `messages` (`message_id`);

ALTER TABLE `external_service_delivery` ADD FOREIGN KEY (`notification_id`) REFERENCES `notifications` (`notification_id`);

ALTER TABLE `conversations` ADD FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`);

ALTER TABLE `conversation_participants` ADD FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`conversation_id`);

ALTER TABLE `conversation_participants` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
