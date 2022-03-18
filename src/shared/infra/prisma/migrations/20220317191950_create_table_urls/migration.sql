-- CreateTable
CREATE TABLE `urls` (
    `id` VARCHAR(36) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `short_url` VARCHAR(50) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `urls_url_key`(`url`),
    UNIQUE INDEX `urls_short_url_key`(`short_url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
