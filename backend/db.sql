-- --------------------------------------------------------
-- Host:                         ec2-52-200-48-116.compute-1.amazonaws.com
-- Server version:               PostgreSQL 12.2 (Ubuntu 12.2-2.pgdg16.04+1) on x86_64-pc-linux-gnu, compiled by gcc (Ubuntu 5.4.0-6ubuntu1~16.04.12) 5.4.0 20160609, 64-bit
-- Server OS:                    
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table public.brands
DROP TABLE IF EXISTS "brands";
CREATE TABLE IF NOT EXISTS "brands" (
	"brand_id" INTEGER NOT NULL DEFAULT 'nextval(''brands_brand_id_seq''::regclass)',
	"brand" VARCHAR(255) NOT NULL,
	PRIMARY KEY ("brand_id")
);

-- Dumping data for table public.brands: 0 rows
DELETE FROM "brands";
/*!40000 ALTER TABLE "brands" DISABLE KEYS */;
INSERT INTO "brands" ("brand_id", "brand") VALUES
	(1, 'Asus'),
	(2, 'Lenovo'),
	(3, 'Dell'),
	(4, 'Apple'),
	(5, 'Acer'),
	(6, 'Intel'),
	(13, 'AMD'),
	(21, 'MSI'),
	(30, 'GIGABYTE'),
	(40, 'ASRock'),
	(51, 'XFX'),
	(63, 'SAMSUNG'),
	(76, 'KINGSTON'),
	(90, 'GSKILL'),
	(105, 'Crucial'),
	(121, 'Western Digital'),
	(138, 'Toshiba'),
	(156, 'SEAGATE'),
	(175, 'MS Industrial'),
	(195, 'LC Power'),
	(216, 'Cooler Master'),
	(238, 'Antec'),
	(261, 'NZXT'),
	(285, 'Huawei'),
	(310, 'LG'),
	(336, 'FOX'),
	(363, 'VOX'),
	(391, 'Philips');
/*!40000 ALTER TABLE "brands" ENABLE KEYS */;

-- Dumping structure for table public.categories
DROP TABLE IF EXISTS "categories";
CREATE TABLE IF NOT EXISTS "categories" (
	"category_id" INTEGER NOT NULL DEFAULT 'nextval(''categories_category_id_seq''::regclass)',
	"category" VARCHAR(255) NOT NULL,
	"image" VARCHAR(255) NOT NULL,
	PRIMARY KEY ("category_id")
);

-- Dumping data for table public.categories: 11 rows
DELETE FROM "categories";
/*!40000 ALTER TABLE "categories" DISABLE KEYS */;
INSERT INTO "categories" ("category_id", "category", "image") VALUES
	(1, 'Laptop računari', 'laptop.png'),
	(2, 'Računari', 'racunari.png'),
	(3, 'Procesori', 'procesori.png'),
	(4, 'Matične ploče', 'maticne_ploce.png'),
	(5, 'Grafičke kartice', 'graficke_kartice.png'),
	(6, 'RAM memorije', 'ram_memorije.png'),
	(7, 'Hard diskovi', 'hard_diskovi.png'),
	(8, 'SSD', 'ssd.png'),
	(9, 'Napajanja', 'napajanja.png'),
	(10, 'Kućišta', 'kucista.png'),
	(11, 'Hladnjaci i oprema', 'hladnjaci.png'),
	(12, 'Mobilni telefoni', 'mobilni.png'),
	(25, 'Televizori', 'televizori.png');
/*!40000 ALTER TABLE "categories" ENABLE KEYS */;

-- Dumping structure for table public.products
DROP TABLE IF EXISTS "products";
CREATE TABLE IF NOT EXISTS "products" (
	"product_id" INTEGER NOT NULL DEFAULT 'nextval(''products_product_id_seq''::regclass)',
	"title" VARCHAR(255) NOT NULL,
	"price" NUMERIC(10,2) NOT NULL,
	"quantity" INTEGER NOT NULL,
	"image" VARCHAR(255) NOT NULL,
	"description" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"updated_at" TIMESTAMP NOT NULL,
	"category_id" INTEGER NULL DEFAULT NULL,
	"brand_id" INTEGER NULL DEFAULT NULL,
	"featured" SMALLINT NOT NULL DEFAULT '0',
	PRIMARY KEY ("product_id"),
	CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "public"."brands" ("brand_id") ON UPDATE CASCADE ON DELETE SET NULL,
	CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories" ("category_id") ON UPDATE CASCADE ON DELETE SET NULL
);

-- Dumping data for table public.products: 45 rows
DELETE FROM "products";
/*!40000 ALTER TABLE "products" DISABLE KEYS */;
INSERT INTO "products" ("product_id", "title", "price", "quantity", "image", "description", "created_at", "updated_at", "category_id", "brand_id", "featured") VALUES
	(37, 'ASUS računar VivoMini VM45-G052Z', 39999.00, 25, 'pc4.png', 'RAM memorija: 4GB<br>Procesor: Intel® Celeron® 3865U 1.8 GHz<br>Grafička karta: Intel® HD Graphics 610<br>HDD: 32GB SSD<br>Kućište: Micro ATX (horizontalan položaj)<br>Napajanje: 65W<br>Operativni sistem: Windows 10 Pro 64bit<br>Težina (kg): 1.2', '2020-05-19 08:08:33.728599+00', '2020-05-19 08:08:33.728599+00', 2, 1, 1),
	(42, 'INTEL Core i7-9700K', 54999.00, 13, 'procesor4.png', 'Podnožje: Intel® 1151<br>Broj jezgara: 8<br>Threads: 8<br>Tehnologija izrade: 14 nm<br>TDP: 95W<br>Radna frekvencija: 3.6GHz<br>Turbo frekvencija: 4.7GHz<br>L3: 12MB', '2020-05-19 08:21:00.138113+00', '2020-05-19 08:21:00.138113+00', 3, 6, 1),
	(2, 'LENOVO IdeaPad L340-15API - 81LW00FURM', 55999.00, 63, 'laptop2.png', 'RAM memorija: 4GB<br>Ekran: 15.6" 1920 x 1080 piksela<br>Procesor: AMD® Picasso Ryzen 5 3500U<br>Grafička karta: Integrisana AMD Radeon Vega 8<br>HDD: 256GB<br>Baterija: Lithium Polymer<br>Boja: Crna<br>Težina (kg): 2.20', '2020-05-18 18:26:41.342279+00', '2020-05-18 18:26:41.342279+00', 1, 2, 0),
	(3, 'ACER Swift 3', 84999.00, 156, 'laptop3.png', 'RAM memorija: 8GB<br>Ekran: 14" 1920 x 1080 piksela<br>Procesor: Intel® Core™ i5 Quad Core Processor 8265U<br>Grafička karta: Integrisana Intel UHD 620<br>HDD: 512GB<br>Baterija: 4 ćelije<br>Boja: Siva<br>Težina (kg): 1.60', '2020-05-18 18:26:41.622554+00', '2020-05-18 18:26:41.622554+00', 1, 5, 0),
	(5, 'DELL Vostro 15 3590', 89999.00, 13, 'laptop5.png', 'RAM memorija: 8GB<br>Ekran: 15.6" 1920 x 1080 piksela<br>Procesor: Intel® Core™ i5 Quad Core Processor 10210U<br>Grafička karta: AMD Radeon 610<br>HDD: 256GB<br>Baterija: 3 ćelije<br>Boja: Crna<br>Težina (kg): 1.99', '2020-05-18 18:26:42.182784+00', '2020-05-18 18:26:42.182784+00', 1, 3, 0),
	(1, 'APPLE MacBook Air 13" Retina', 205299.00, 23, 'laptop1.png', 'RAM memorija: 8GB<br>Ekran: 13.3" 2560 x 1600 piksela<br>Procesor: i5 Dual Core Processor 8210Y<br>Grafička karta: Integrisana Intel UHD 617<br>HDD: 256GB<br>Baterija: Lithium Polymer<br>Boja: Siva<br>Težina (kg): 1.25', '2020-05-18 18:26:41.062259+00', '2020-05-18 18:26:41.062259+00', 1, 4, 0),
	(10, 'ACER Vertion N4640G W1', 29999.00, 36, 'pc1.png', 'RAM memorija: 4GB<br>Procesor: Intel® Celeron® G3900T 2.6 GHz<br>Grafička karta: Intel® HD Graphics 510<br>HDD: 500GB<br>Operativni sistem: FreeDOS', '2020-05-19 09:33:28+00', '2020-05-19 09:33:34+00', 2, 5, 0),
	(35, 'INTEL računar NUC KIT', 141999.00, 14, 'pc2.png', 'Procesor: Intel® Core™ i7-8809G 3.10 GHz (do 4.20 GHz)<br>Grafička karta: AMD Radeon RX Vega M 4GB DDR4<br>HDD: 2x M.2 SSD<br>Kućište: Mini<br>Operativni sistem: Nema operativni sistem', '2020-05-19 08:08:33.22559+00', '2020-05-19 08:08:33.22559+00', 2, 6, 0),
	(36, 'DELL Vostro 3670 MT', 45999.00, 65, 'pc3.png', 'RAM memorija: 4GB<br>Procesor: Intel® Pentium® Gold G5420 3.8 GHz<br>Grafička karta: Intel® UHD Graphics 610<br>HDD: 1TB<br>Kućište: Mini Tower<br>Operativni sistem: Linux Ubuntu<br>Težina (kg): 5.27', '2020-05-19 08:08:33.48061+00', '2020-05-19 08:08:33.48061+00', 2, 3, 0),
	(38, 'LENOVO V530-15ICR - 11BH000BYA', 95999.00, 230, 'pc5.png', 'RAM memorija: 8GB<br>Procesor: Intel® Core™ i5-9400 2.9 GHz (do 4.1 GHz)<br>Grafička karta: Intel® HD Graphics 630<br>HDD: 256GB SSD<br>Kućište: HP mini<br>Napajanje: 180W<br>Operativni sistem: Windows 10 Pro 64bit<br>Težina (kg): 5.7', '2020-05-19 08:08:33.976371+00', '2020-05-19 08:08:33.976371+00', 2, 2, 0),
	(39, 'AMD Ryzen 5 3600', 27999.00, 124, 'procesor1.png', 'Podnožje: AMD® AM4<br>Broj jezgara: 6<br>Threads: 12<br>Tehnologija izrade: 7 nm<br>TDP: 65W<br>Radna frekvencija: 3.6GHz<br>Turbo frekvencija: 4.2GHz<br>L2: 3MB<br>L3: 32MB', '2020-05-19 08:20:59.351338+00', '2020-05-19 08:20:59.351338+00', 3, 13, 0),
	(40, 'INTEL Core i5-9400F', 21999.00, 34, 'procesor2.png', 'Podnožje: Intel® 1151<br>Broj jezgara: 6<br>Threads: 6<br>Tehnologija izrade: 14 nm<br>TDP: 65W<br>Radna frekvencija: 2.9GHz<br>Turbo frekvencija: 4.1GHz<br>L3: 9MB', '2020-05-19 08:20:59.61787+00', '2020-05-19 08:20:59.61787+00', 3, 6, 0),
	(41, 'AMD Ryzen 7 3700X', 46999.00, 35, 'procesor3.png', 'Podnožje: AMD® AM4<br>Broj jezgara: 8<br>Threads: 16<br>Tehnologija izrade: 7 nm<br>TDP: 65W<br>Radna frekvencija: 3.6GHz<br>Turbo frekvencija: 4.4GHz<br>L2: 4MB<br>L3: 32MB', '2020-05-19 08:20:59.888092+00', '2020-05-19 08:20:59.888092+00', 3, 13, 0),
	(43, 'INTEL Core i9-9900K', 72999.00, 26, 'procesor5.png', 'Podnožje: Intel® 1151<br>Broj jezgara: 8<br>Threads: 16<br>Tehnologija izrade: 14 nm<br>TDP: 95W<br>Radna frekvencija: 3.6GHz<br>Turbo frekvencija: 5.0GHz<br>L3: 16MB', '2020-05-19 08:21:00.390398+00', '2020-05-19 08:21:00.390398+00', 3, 6, 0),
	(4, 'LENOVO IdeaPad S145-15IGM - 81MX0027YA', 34999.00, 220, 'laptop4.png', 'RAM memorija: 4GB<br>Ekran: 15.6" 1366 x 768 piksela<br>Procesor: Intel® Celeron® Dual Core Processor N4000<br>Grafička karta: Integrisana Intel UHD 600<br>HDD: 512GB<br>Baterija: 2 ćelije<br>Boja: Siva<br>Težina (kg): 1.85', '2020-05-18 18:26:41.903269+00', '2020-05-18 18:26:41.903269+00', 1, 2, 1),
	(44, 'MSI A320M-A PRO AMD', 6399.00, 124, 'maticna1.png', 'Podnožje: AMD® AM4<br>Čipset: AMD® A320<br>Format ploče: Micro ATX', '2020-05-19 08:37:26.894061+00', '2020-05-19 08:37:26.894061+00', 4, 21, 0),
	(45, 'GIGABYTE H310M', 7499.00, 34, 'maticna2.png', 'Podnožje: Intel® 1151<br>Čipset: Intel® H310<br>Format ploče: Micro ATX', '2020-05-19 08:37:27.150522+00', '2020-05-19 08:37:27.150522+00', 4, 30, 0),
	(46, 'ASUS EX-B365M-V', 9999.00, 35, 'maticna3.png', 'Podnožje: Intel® 1151<br>Čipset: Intel® B365<br>Format ploče: Micro ATX', '2020-05-19 08:37:27.40955+00', '2020-05-19 08:37:27.40955+00', 4, 1, 0),
	(47, 'MSI B450 TOMAHAWK MAX', 16999.00, 13, 'maticna4.png', 'Podnožje: AMD® AM4<br>Čipset: AMD® B450<br>Format ploče: ATX', '2020-05-19 08:37:27.668281+00', '2020-05-19 08:37:27.668281+00', 4, 6, 0),
	(48, 'GIGABYTE Z390 GAMING X', 20999.00, 26, 'maticna5.png', 'Podnožje: Intel® 1151<br>Čipset: Intel® Z390<br>Format ploče: ATX', '2020-05-19 08:37:27.920273+00', '2020-05-19 08:37:27.920273+00', 4, 30, 0),
	(49, 'MSI nVidia GeForce GT 710', 5999.00, 124, 'graficka1.png', 'Proizvodjač čipa: Nvidia<br>Tip memorije: GDDR3<br>Količina memorije: 1GB<br>Magistrala memorije: 64bit<br>Brzina memorije: 1600 MHz<br>Brzina GPU: 954 MHz', '2020-05-19 08:50:27.243217+00', '2020-05-19 08:50:27.243217+00', 5, 21, 0),
	(50, 'ASRock PHANTOM GAMING X RADEON RX580', 25499.00, 34, 'graficka2.png', 'Proizvodjač čipa: AMD Radeon<br>Tip memorije: GDDR5<br>Količina memorije: 8GB<br>Magistrala memorije: 256bit<br>Brzina memorije: 8000 MHz<br>Brzina GPU: 1380 MHz', '2020-05-19 08:50:27.497467+00', '2020-05-19 08:50:27.497467+00', 5, 40, 0),
	(51, 'ASUS Dual GeForce RTX 2070 MINI OC', 64999.00, 35, 'graficka3.png', 'Proizvodjač čipa: Nvidia<br>Tip memorije: GDDR6<br>Količina memorije: 8GB<br>Magistrala memorije: 256bit<br>Brzina memorije: 14000 MHz<br>Brzina GPU: 1410 MHz / 1680 MHz', '2020-05-19 08:50:27.767202+00', '2020-05-19 08:50:27.767202+00', 5, 1, 0),
	(52, 'XFX AMD Radeon RX 5600 XT', 43999.00, 13, 'graficka4.png', 'Proizvodjač čipa: AMD Radeon<br>Tip memorije: GDDR6<br>Količina memorije: 6GB<br>Magistrala memorije: 192bit<br>Brzina memorije: 12 Gbps<br>Brzina GPU: 1560 MHz / 1620 MHz', '2020-05-19 08:50:28.022463+00', '2020-05-19 08:50:28.022463+00', 5, 51, 0),
	(53, 'ASUS TUF Gaming X3 GeForce GTX 1660 OC', 34999.00, 26, 'graficka5.png', 'Proizvodjač čipa: Nvidia<br>Tip memorije: GDDR5<br>Količina memorije: 6GB<br>Magistrala memorije: 192bit<br>Brzina memorije: 8002 MHz<br>Brzina GPU: 1530 MHz / 1890 MHz', '2020-05-19 08:50:28.278965+00', '2020-05-19 08:50:28.278965+00', 5, 1, 0),
	(54, 'SAMSUNG 16GB DDR4', 7999.00, 124, 'ram1.png', 'Tip: DDR4<br>Kapacitet: 16GB<br>Maksimalna frekvencija: 2400Mhz<br>Latencija: CL17', '2020-05-19 09:01:32.149284+00', '2020-05-19 09:01:32.149284+00', 6, 63, 0),
	(55, 'KINGSTON HyperX Fury Black 16GB', 9499.00, 34, 'ram2.png', 'Tip: DDR4<br>Kapacitet: 16GB<br>Maksimalna frekvencija: 2400Mhz<br>Latencija: CL15', '2020-05-19 09:01:32.39557+00', '2020-05-19 09:01:32.39557+00', 6, 76, 0),
	(56, 'GSKILL Trident Z Neo 16GB (2 x 8GB)', 17999.00, 35, 'ram3.png', 'Tip: DDR4<br>Kapacitet: 16GB kit<br>Maksimalna frekvencija: 3600MHz<br>Latencija: CL18', '2020-05-19 09:01:32.64581+00', '2020-05-19 09:01:32.64581+00', 6, 90, 0),
	(57, 'KINGSTON 4GB DDR4', 3199.00, 13, 'ram4.png', 'Tip: DDR4<br>Kapacitet: 4GB<br>Maksimalna frekvencija: 3200Mhz<br>Latencija: CL22', '2020-05-19 09:01:32.901315+00', '2020-05-19 09:01:32.901315+00', 6, 76, 0),
	(58, 'CRUCIAL CT8G4DFS8266 8GB', 4999.00, 26, 'ram5.png', 'Tip: DDR4<br>Kapacitet: 8GB<br>Maksimalna frekvencija: 2666Mhz<br>Latencija: CL19', '2020-05-19 09:01:33.15307+00', '2020-05-19 09:01:33.15307+00', 6, 105, 0),
	(59, 'WD Purple - WD40PURZ', 14999.00, 124, 'hdd1.png', 'Format: 3.5"<br>Konekcija: SATA III<br>Kapacitet: 4TB<br>Broj obrtaja: 5400 RPM<br>Buffer: 64 MB', '2020-05-19 10:10:49.051745+00', '2020-05-19 10:10:49.051745+00', 7, 121, 0),
	(60, 'TOSHIBA 3TB P300', 10499.00, 34, 'hdd2.png', 'Format: 3.5"<br>Konekcija: SATA III<br>Kapacitet: 3TB<br>Broj obrtaja: 7200 RPM<br>Buffer: 64 MB', '2020-05-19 10:10:49.303713+00', '2020-05-19 10:10:49.303713+00', 7, 138, 0),
	(61, 'WD Caviar Blue - WD10EZEX', 5499.00, 35, 'hdd3.png', 'Format: 3.5"<br>Konekcija: SATA III<br>Kapacitet: 1TB<br>Broj obrtaja: 7200 RPM<br>Buffer: 64 MB', '2020-05-19 10:10:49.552726+00', '2020-05-19 10:10:49.552726+00', 7, 121, 0),
	(62, 'SEAGATE BarraCuda - ST1000DM010', 5199.00, 13, 'hdd4.png', 'Format: 3.5"<br>Konekcija: SATA III<br>Kapacitet: 1TB<br>Broj obrtaja: 7200 RPM<br>Buffer: 64 MB', '2020-05-19 10:10:49.803995+00', '2020-05-19 10:10:49.803995+00', 7, 156, 0),
	(63, 'SEAGATESkyHawk AI Surveillance - ST16000VE000', 64999.00, 26, 'hdd5.png', 'Format: 3.5"<br>Konekcija: SATA III<br>Kapacitet: 16TB<br>Broj obrtaja: 7200 RPM<br>Buffer: 256 MB', '2020-05-19 10:10:50.061027+00', '2020-05-19 10:10:50.061027+00', 7, 156, 0),
	(64, 'SAMSUNG SSD 860 EVO 250GB', 8999.00, 124, 'ssd1.png', 'Format: 2.5"<br>Interfejs: SATA III<br>Kapacitet: 250GB<br>Brzina čitanja: do 550 MB/s<br>Brzina pisanja: do 520 MB/s', '2020-05-19 10:30:35.70472+00', '2020-05-19 10:30:35.70472+00', 8, 63, 0),
	(65, 'INTEL SSD 660P', 19999.00, 34, 'ssd2.png', 'Format: PCIe<br>Interfejs: SATA III<br>Kapacitet: 1TB<br>Brzina čitanja: do 1800 MB/s<br>Brzina pisanja: do 1800 MB/s', '2020-05-19 10:30:35.961198+00', '2020-05-19 10:30:35.961198+00', 8, 6, 0),
	(66, 'GIGABYTE SSD 256GB NVMe', 7499.00, 35, 'ssd3.png', 'Format: PCIe 3.0<br>Interfejs: SATA III<br>Kapacitet: 256GB<br>Brzina čitanja: do 1700 MB/s<br>Brzina pisanja: do 1100 MB/s', '2020-05-19 10:30:36.214264+00', '2020-05-19 10:30:36.214264+00', 8, 30, 0),
	(67, 'KINGSTON SSD M.2 2280 500GB', 14999.00, 13, 'ssd4.png', 'Format: PCIe 3.0<br>Interfejs: SATA III<br>Kapacitet: 500GB<br>Brzina čitanja: do 3000 MB/s<br>Brzina pisanja: do 2000 MB/s', '2020-05-19 10:30:36.489018+00', '2020-05-19 10:30:36.489018+00', 8, 76, 0),
	(68, 'CRUCIAL SSD BX500', 3999.00, 26, 'ssd5.png', 'Format: 2.5"<br>Interfejs: SATA III<br>Kapacitet: 120GB<br>Brzina čitanja: do 540 MB/s<br>Brzina pisanja: do 500 MB/s', '2020-05-19 10:30:36.759233+00', '2020-05-19 10:30:36.759233+00', 8, 105, 0),
	(69, 'MS INDUSTRIAL MS-500', 1699.00, 124, 'napajanje1.png', 'Tip: Standardno<br>Oblik: ATX (PS2)<br>Izlazna snaga: 500W<br>PFC: Aktivno', '2020-05-19 10:43:35.348899+00', '2020-05-19 10:43:35.348899+00', 9, 175, 0),
	(70, 'LC-Power 600W LC600H-12', 4699.00, 34, 'napajanje2.png', 'Tip: Standardno<br>Oblik: ATX (PS2)<br>Izlazna snaga: 600W<br>PFC: Aktivno', '2020-05-19 10:43:35.608639+00', '2020-05-19 10:43:35.608639+00', 9, 195, 0),
	(71, 'COOLER MASTER 500W ELITE V3', 5799.00, 35, 'napajanje3.png', 'Tip: Standardno<br>Oblik: ATX (PS2)<br>Izlazna snaga: 500W<br>PFC: Aktivno', '2020-05-19 10:43:35.869136+00', '2020-05-19 10:43:35.869136+00', 9, 216, 0),
	(72, 'MS INDUSTRIAL PLATINUM PRO 80PLUS 600W', 6599.00, 13, 'napajanje4.png', 'Tip: Standardno<br>Oblik: ATX (PS2)<br>Izlazna snaga: 600W<br>PFC: Aktivno', '2020-05-19 10:43:36.122153+00', '2020-05-19 10:43:36.122153+00', 9, 175, 0),
	(73, 'COOLER MASTER MWE GOLD 550', 13999.00, 26, 'napajanje5.png', 'Tip: Standardno<br>Oblik: ATX (PS2)<br>Izlazna snaga: 550W<br>PFC: Aktivno', '2020-05-19 10:43:36.374156+00', '2020-05-19 10:43:36.374156+00', 9, 216, 0),
	(74, 'MS INDUSTRIAL HUNTER', 1699.00, 124, 'kuciste1.png', 'Tip: Midi Tower<br>Kompatibilnost: Micro-ATX, Mini-ITX, ATX<br>Napajanje: Nema', '2020-05-19 10:51:05.78432+00', '2020-05-19 10:51:05.78432+00', 10, 175, 0),
	(75, 'LC POWER LC-1401MI', 5399.00, 34, 'kuciste2.png', 'Tip: Mini ITX<br>Kompatibilnost: Micro-ATX, Mini-ITX<br>Napajanje: LC POWER 200W LC200SFX V3.21', '2020-05-19 10:51:06.039083+00', '2020-05-19 10:51:06.039083+00', 10, 195, 0),
	(76, 'MS INDUSTRIAL DARK SHADOW', 5499.00, 35, 'kuciste3.png', 'Tip: Midi Tower<br>Kompatibilnost: Micro-ATX, Mini-ITX, ATX<br>Napajanje: Nema', '2020-05-19 10:51:06.294075+00', '2020-05-19 10:51:06.294075+00', 10, 175, 0),
	(77, 'COOLER MASTER MASTERBOX LITE 3.1', 6499.00, 13, 'kuciste4.png', 'Tip: Micro Tower<br>Kompatibilnost: Micro-ATX, Mini-ITX<br>Napajanje: Nema', '2020-05-19 10:51:06.553349+00', '2020-05-19 10:51:06.553349+00', 10, 216, 0),
	(78, 'COOLER MASTER MASTERBOX Q300P', 9599.00, 26, 'kuciste5.png', 'Tip: Mini Tower<br>Kompatibilnost: Micro-ATX, Mini-ITX<br>Napajanje: Nema', '2020-05-19 10:51:06.813083+00', '2020-05-19 10:51:06.813083+00', 10, 216, 0),
	(79, 'Termalna pasta MasterGel', 1199.00, 124, 'hladnjaci1.png', 'Tip: Paste za hladnjake<br>Namena: Za centralne (CPU) i grafičke procesore (GPU)<br>Termalna provodljivost: >5 W/m-K<br>Zapremina: 1.5 ml<br>Boja: bela', '2020-05-19 11:00:28.55531+00', '2020-05-19 11:00:28.55531+00', 11, 216, 0),
	(80, 'ANTEC cpu kuler C40', 3599.00, 34, 'hladnjaci2.png', 'Tip: CPU<br>Tip hlađenja: Vazdušno hlađenje<br>Podržana podnožja procesora: Intel®: LGA1366/LGA1156/LGA1155/LGA1151/LGA1150/LGA775, AMD™: FM2+/FM2/FM1/AM3+/AM3/AM2+/AM2<br>Odvod toplote (Heatpipe): Četri toplotne cevi i bakarna ploča na kontaktu sa procesoru<br>Broj obrtaja: 800~2200± 10% RPM<br>Protok vazduha: 38 CFM<br>Nivo buke: 16-23 dB (A)<br>Konektor: 4 pin<br>Dimenzije: 136.5 x 100 x 77 mm<br>Težina: 540 g', '2020-05-19 11:00:28.834807+00', '2020-05-19 11:00:28.834807+00', 11, 238, 0),
	(81, 'MASTERFAN PRO 120', 7499.00, 35, 'hladnjaci3.png', 'Tip hlađenja: Vazdušno hlađenje<br>Broj obrtaja: 650-1,500 RPM ± 10%<br>Protok vazduha: 35 CFM ± 10%<br>Pritisak vazduha: 1.45 mmH2O ± 10%<br>Nivo buke: 6 - 20 dBA<br>Voltaža: 12 VDC<br>Konektor: 4-Pin<br>Težina: 162 g<br>Ostalo: Tri ventilatora sa RGB LED kontrolerom.', '2020-05-19 11:00:29.166845+00', '2020-05-19 11:00:29.166845+00', 11, 216, 0),
	(82, 'MasterAir Maker 8', 17999.00, 13, 'hladnjaci4.png', 'Tip: CPU<br>Tip hlađenja: Vazdušno hlađenje<br>Podržana podnožja procesora: Intel® LGA 2011-v3 / 2011 / 1366 / 1156 / 1155 / 1151 / 1150 / 775, AMD FM2+ / FM2 / FM1 / AM3+ / AM3 / AM2+<br>Odvod toplote (Heatpipe): 8 toplotnih cevi<br>Ventilator: 140 x 25 mm x 2kom<br>Broj obrtaja: 600 – 1,800 RPM ± 10%<br>Protok vazduha: 19.8 – 66 CFM ± 10%<br>Pritisak vazduha: 0.24 – 2.2 mmH2O<br>Nivo buke: 8~24 dBA<br>Voltaža: 12 VDC<br>Konektor: 4-Pin<br>Dimenzije: 135 x 145 x 172 mm (DxŠxV)<br>Težina: 1350 g', '2020-05-19 11:00:29.444607+00', '2020-05-19 11:00:29.444607+00', 11, 216, 0),
	(83, 'NZXT KRAKEN X62', 19999.00, 26, 'hladnjaci5.png', 'Tip: CPU<br>Tip hlađenja: Vodeno hlađenje<br>Podržana podnožja procesora: Intel Socket 1151, 1150, 1155, 1156, 1366, 2011, 2011-3, 2066, AMD Socket AM4, FM2+, FM2, FM1, AM3+, AM3, AM2+, AM2<br>Hladnjak: Aluminijum<br>Brzina pumpe: 1,600~2,800 +/- 300RPM<br>Ventilator: 2x Aer P140<br>Broj obrtaja: 500~1,800 +/- 300RPM<br>Nivo buke: ventilator: 21-38dBA<br>Dimenzije: Hladnjak: 315 x 143 x 30mm<br>Pumpa: 80 x 80 x 52.9mm<br>Težina: 1.29kg', '2020-05-19 11:00:29.788347+00', '2020-05-19 11:00:29.788347+00', 11, 261, 0),
	(84, 'Iphone 11 pro', 181999.00, 123, 'mobilni1.png', 'Proizvodjac: Apple<br>Baterija: Li-Ion 3190mAh<br>Operativi sistem: iOS 13<br>Velicina ekrana: 5.8"<br>Rezolucija: 2436x1125px<br>Procesor: Apple A A13 Bionic<br>Radna memorija: 64GB RAM<br>Interna memorija: 512GB<br>Prednja kamera: 12 mpx<br>Glavna kamera: 12mpx', '2020-05-19 11:24:57.739869+00', '2020-05-19 11:24:57.739869+00', 12, 4, 0),
	(85, 'Samsung S10e', 69999.00, 123, 'mobilni2.png', 'Proizvodjac: Samsung<br>Baterija: Li-Ion 3100mAh<br>Operativi sistem: Android 9.0 Pie<br>Velicina ekrana: 5.8"<br>Rezolucija: 2280x1080px<br>Procesor: Samsung Exynos 9820 Octa<br>Radna memorija: 64GB RAM<br>Interna memorija: 128GB<br>Prednja kamera: 10 mpx<br>Glavna kamera: 6mpx', '2020-05-19 11:24:57.994642+00', '2020-05-19 11:24:57.994642+00', 12, 63, 0),
	(86, 'Huawei P30 Pro', 109999.00, 123, 'mobilni3.png', 'Proizvodjac: Huawei<br>Baterija: Li-Po 4200mAh<br>Operativi sistem: Android 9.0 Pie<br>Velicina ekrana: 6.47"<br>Rezolucija: 2340x1080px<br>Procesor: HiSilicon Kirin 980<br>Radna memorija: 8GB RAM<br>Interna memorija: 256GB<br>Prednja kamera: 32 mpx<br>Glavna kamera: 40mpx', '2020-05-19 11:24:58.255414+00', '2020-05-19 11:24:58.255414+00', 12, 285, 0),
	(87, 'LG G7 ThinQ', 57699.00, 123, 'mobilni4.png', 'Proizvodjac: LG<br>Baterija: Li-Po 3000mAh<br>Operativi sistem: Android 8.0 Oreo<br>Velicina ekrana: 6.1"<br>Rezolucija:1440x3120px<br>Procesor:Qualcomm SDM845 Snapdragon 845<br>Radna memorija: 4GB RAM<br>Interna memorija:64GB<br>Prednja kamera: 8 mpx<br>Glavna kamera: 16mpx', '2020-05-19 11:24:58.506648+00', '2020-05-19 11:24:58.506648+00', 12, 310, 0),
	(88, 'FOX 32DLE172 LED', 12999.00, 123, 'televizor1.png', 'Ekran: 32" 720p HD Ready<br>Osvetljenje: 200cd<br>Dinamički kontrast: 100000:1<br>Vreme odziva: 5ms<br>Osvežavanje: 60Hz<br>Digitalni tjuner: DVB-T/C/T2<br>Zvuk: 2 x 10W', '2020-05-19 11:43:55.183617+00', '2020-05-19 11:43:55.183617+00', 25, 336, 0),
	(89, 'VOX 43ADS553B SMART', 27999.00, 26, 'televizor2.png', 'Ekran: 43" 1080p Full HD<br>Osvetljenje: 250cd<br>Dinamički kontrast: 100000:1<br>Vreme odziva: 5ms<br>Osvežavanje: 60Hz<br>Digitalni tjuner: DVB-T/C/T2<br>Zvuk: 2 x 8W', '2020-05-19 11:43:55.448137+00', '2020-05-19 11:43:55.448137+00', 25, 363, 0),
	(90, 'PHILIPS 43PUS6503/12 SMART', 41999.00, 69, 'televizor3.png', 'Ekran: 43" 4K Ultra HD<br>Osvetljenje: 300cd<br>Dinamički kontrast: 1000000:1<br>Vreme odziva: 5ms<br>Osvežavanje: 900 PPI<br>Digitalni tjuner: DVB-T/C/T2<br>Zvuk: 20W', '2020-05-19 11:43:55.696395+00', '2020-05-19 11:43:55.696395+00', 25, 391, 0),
	(91, 'LG 55UM7100PLB SMART', 69999.00, 14, 'televizor4.png', 'Ekran: 55" 4K Ultra HD<br>Osvetljenje: 500cd<br>Dinamički kontrast: 1000000:1<br>Vreme odziva: 5ms<br>Osvežavanje: 100Hz<br>Digitalni tjuner: DVB-T/C/T2<br>Zvuk: 20W', '2020-05-19 11:43:55.952136+00', '2020-05-19 11:43:55.952136+00', 25, 310, 0);
/*!40000 ALTER TABLE "products" ENABLE KEYS */;

-- Dumping structure for table public.users
DROP TABLE IF EXISTS "users";
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" INTEGER NOT NULL DEFAULT 'nextval(''users_user_id_seq''::regclass)',
	"firstname" VARCHAR(255) NOT NULL,
	"lastname" VARCHAR(255) NOT NULL,
	"email" VARCHAR(255) NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"updated_at" TIMESTAMP NOT NULL,
	PRIMARY KEY ("user_id"),
	UNIQUE INDEX "users_email_key" ("email")
);

-- Dumping data for table public.users: 0 rows
DELETE FROM "users";
/*!40000 ALTER TABLE "users" DISABLE KEYS */;
/*!40000 ALTER TABLE "users" ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
