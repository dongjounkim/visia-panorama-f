# Histoires d'Autrices (Panorama Front-ofice)

## Live Demo

    ...

## Démarrer

L'application est créée avec create-react-app.

Le code source de tout le développement se trouve dans le dossier src.

Le code compilé (ou la production) se trouve dans le dossier build.


### Mode Développement (local)

Installer NodeJS et NPM.

Installer les dépendances.

    $ (sudo) npm i -unsafe-perm

Configurer l'url de l'API vers le back-office.

    Dans ./src/utils/api.js, changer endpoint en '{link-to}/api'.

Lancer l'application en mode dev

    $ npm start

Lancer l'application en mode prod (pour l'instant)

    $ npm run build

    $ (sudo) npm i -g serve

    $ serve -s build

Et voilà !

### Mode Production (déploiment vers un serveur)


Configurer l'url de l'API vers le back-office.

    Dans ./src/utils/api.js, changer endpoint en '{link-to}/api'.

Rebuild l'application pour la production

    $ npm run build

Créer dans le dossier www, un dossier histoires-autrices (www/histoires-autrices)

Mettre tout le contenu du dossier build dans ce dossier.

Et voilà !

## Liens

    /
    /explore/datasets/
    /epxlote/datasets/:id
    /explore/authors/
    /explore/authors/:id
