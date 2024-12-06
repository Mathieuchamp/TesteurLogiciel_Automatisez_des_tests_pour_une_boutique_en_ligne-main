# Automatisez des tests pour une boutique en ligne
Objectifs
Installation Docker
Ouvrir Cypress via npm
Exécuter les tests en ligne de commande
Génération du Rapport

## Objectifs
1. Rédiger des scripts de test en JavaScript avec Cypress pour :
2. Les tests API.
3. Les smoke tests.
4. Les deux scénarios fonctionnels critiques choisis.

## Installation Docker
1. Installez Docker:   Docker pour Mac => https://docs.docker.com/desktop/setup/install/mac-install/
                    Docker pour Windows => https://docs.docker.com/desktop/setup/install/windows-install/ ;
2. Téléchargez le projet => https://github.com/OpenClassrooms-Student-Center/TesteurLogiciel_Automatisez_des_tests_pour_une_boutique_en_ligne ;
3. Téléchargez ou clonez le dépôt
4. Depuis un terminal ouvert dans le dossier du projet, lancer la commande : `sudo docker-compose up --build`
5. Ouvrez le site depuis la page http://localhost:8080 

Nb : à l'étape 2, ne pas ajouter le `sudo` si vous êtes sous Windows (sauf dernière version de Windows 11) (PowerShell ou Shell) : sudo n'existant pas et Docker Desktop configurant automatiquement Docker pour ne pas avoir besoin des droits administrateur.

## Ouvrir Cypress via npm

1. Depuis un terminal ouvert dans le dossier du projet, lancer la commande : npx cypress open
2. Choisissez votre navigateur préféré
3. Suivez les instructions pour "Create new spec"
4. Vous pouvez céer les fichiers de test directement dans le dossier e2e.

## Exécuter les tests en ligne de commande

1. Depuis un terminal ouvert dans le dossier du projet, lancer la commande: 
                npx cypress run => Tests non interactifs
                npx cypress open => Test sur Cypress via navigateurs
                                    Cliquez sur le bouton E2E Testing.
                                    Choisissez votre navigateur préféré
                                    Suivez les instructions pour "Create new spec"
                                    Vous pouvez céer les fichiers de test directement dans le dossier e2e.
## Génération du Rapport

1. Assurez-vous d'avoir installé les dépendances nécessaires pour la génération du rapport :
npm install mochawesome mochawesome-merge mochawesome-report-generator cypress-multi-reporters --save-dev
2. Exécutez les commandes suivantes dans votre terminal :
        Pour exécuter les tests Cypress et générer des rapports individuels : npm run cypress:run
        Pour fusionner les rapports générés : npm run merge:reports
        Pour générer le rapport final en HTML : npm run generate:report