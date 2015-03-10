-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Lun 09 Mars 2015 à 23:44
-- Version du serveur :  5.6.21
-- Version de PHP :  5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `open-beer`
--
CREATE DATABASE IF NOT EXISTS `open-beer`;
use `open-beer`;
-- --------------------------------------------------------

--
-- Structure de la table `beer`
--

CREATE TABLE IF NOT EXISTS `beer` (
`id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `abv` varchar(20) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP,
  `idBrewery` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `beer`
--

INSERT INTO `beer` (`id`, `name`, `description`, `abv`, `photo`, `created_at`, `updated_at`, `idBrewery`) VALUES
(1, 'Strawberry Harvest', 'Strawberry Harvest Lager is a wheat beer ...', '4.2', NULL, '2015-03-07 00:43:23', '2015-03-07 00:43:23', 1),
(2, 'Brooklyn Detonation Ale', 'For about eight years now, we''ve brewed a Brooklyn-style hop monster called BLAST! It''s a robust IPA using both British and Pacific Northwest hops. We haven''t had enough space to brew much of it, but we hear that people really enjoy BLAST! when it shows up. And it''s one of our favorite beers here at the brewery. Well, now we''d like more of you to see our hoppier side. Meet BLAST!''s big brother, Brooklyn Detonation Ale. It''s a copper-colored pale ale with British malt character, American hop ebullience, Brooklyn attitude and disturbing drinkability. British caramel malts lend richness and depth, while a blend of American hops give the beer a minerally backbone and explosive aromatics (with a special guest appearance by our pal East Kent Golding as "The English Aristocrat").', 'bda', NULL, '2015-03-08 21:06:46', '2015-03-08 21:06:46', 12),
(3, 'Brooklyn Ama Bruna', 'Brewed by Amarcord Brewery in the small medieval town of Apecchio, Italy, AMA Bruna is a beer made specifically for the Italian dinner table. Designed by Brooklyn Brewmaster Garrett Oliver, Ama Bruna is refermented in the bottle with brown candy sugar(7,5% ABV). Complex, but soft on the palate, the malt flavors are pronounced but subtle, with flavors of toffee, a touch of chocolate, pear and cinnamon as a result of the caramelized sugar.', 'bab', NULL, '2015-03-08 21:06:46', '2015-03-08 21:06:46', 12);

-- --------------------------------------------------------

--
-- Structure de la table `brewery`
--

CREATE TABLE IF NOT EXISTS `brewery` (
`id` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `url` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `brewery`
--

INSERT INTO `brewery` (`id`, `name`, `url`, `photo`, `thumbnail`, `created_at`, `updated_at`) VALUES
(1, 'Anchor', 'http://www.anchorbrewing.com/', '', '', '2015-03-06 19:11:39', '2015-03-06 21:53:12'),
(6, 'Dogfish Head', 'http://www.dogfish.com/', '', '', '2015-03-07 02:19:22', '2015-03-07 02:19:22'),
(7, 'Stone Brewing Co.', 'http://www.stonebrew.com/', '', '', '2015-03-07 02:19:22', '2015-03-07 02:19:22'),
(8, 'Sierra Nevada Brewing Company', 'http://www.sierranevada.com/', '', '', '2015-03-07 02:19:22', '2015-03-07 02:19:22'),
(9, 'Lagunitas', 'http://www.lagunitas.com/', '', '', '2015-03-07 02:20:29', '2015-03-07 02:20:29'),
(10, 'Rogue', 'http://www.rogue.com/', '', '', '2015-03-07 02:20:58', '2015-03-07 02:20:58'),
(11, 'Boston Beer Company', 'http://www.samadams.com/', '', '', '2015-03-07 02:21:38', '2015-03-07 02:21:38'),
(12, 'Victory', 'http://www.victorybeer.com/', '', '', '2015-03-07 02:22:15', '2015-03-07 02:22:15'),
(13, 'Founders', 'http://www.foundersbrewing.com/', '', '', '2015-03-07 02:22:58', '2015-03-07 02:22:58'),
(14, 'Brooklyn', 'http://www.brooklynbrewery.com/', '', '', '2015-03-07 02:23:38', '2015-03-08 17:00:57'),
(15, 'Flying dogs', 'http://www.flyingdogales.com/', '', '', '2015-03-07 12:15:47', '2015-03-07 12:15:47');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
`id` int(11) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `salt` varchar(60) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `mail`, `password`, `salt`) VALUES
(2, 'admin@local.fr', '68CmvlwzY8u4k', '68870744754fb2234f0a326.92655156'),
(3, 'admin@local.fr', '64xD/wjEZyJRc', '64286999454fb235d61da23.15423389'),
(4, 'jcheron@kobject.net', '17kpOh31rz8Ds', '178954671254fb297e6492c1.34796807'),
(5, 'jcheron@kobject.net', '17kpOh31rz8Ds', '171645767254fb2c6bd1b572.68269135'),
(6, 'jcheron@kobject.net', '48UqXWnd1knSo', '48542286354fb2cbce78d88.74974473');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `beer`
--
ALTER TABLE `beer`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `name` (`name`), ADD KEY `idBrewery` (`idBrewery`);

--
-- Index pour la table `brewery`
--
ALTER TABLE `brewery`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `beer`
--
ALTER TABLE `beer`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `brewery`
--
ALTER TABLE `brewery`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `beer`
--
ALTER TABLE `beer`
ADD CONSTRAINT `beer_ibfk_1` FOREIGN KEY (`idBrewery`) REFERENCES `brewery` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
