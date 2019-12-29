all chat by user

SELECT `chats`.`id`, `chats`.`name`, `chats`.`picture`, `messages`.`created_at` FROM (SELECT `chat`.`id`, `chat`.`name`, `chat`.`picture` FROM `chat_users` INNER JOIN `chat` ON (`chat`.`id` = `chat_users`.`chat_id` AND `chat_users`.`user_id` = 2)) AS `chats` INNER JOIN (SELECT `chat_id`, MAX(`created_at`) AS `created_at` FROM `messages` GROUP BY `chat_id`) AS `messages` ON (`messages`.`chat_id` = `chats`.`id`) ORDER BY `created_at` DESC

messages by chat id

SELECT `id`, `content`, `created_at`, `sender_id` FROM `messages` WHERE `chat_id` = 2 ORDER BY `created_at` DESC
