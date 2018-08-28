# Histoires d'Autrices (Panorama Front-ofice)

## Live Demo

    ...

## Démarrer

L'application est créée avec create-react-app.

Le code source de tout le développement se trouve dans le dossier src.

Le code compilé (ou la production) se trouve dans le dossier build.

### Mode Production

...Pour l'instant le déploiement avec serveur Apache ne marche pas encore (enfin, j'ai pas trouvé la solution).

### Mode Développement (local)

Installer NodeJS et NPM.

Installer les dépendanceS.

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

## Liens

    /
    /explore/datasets/
    /epxlote/datasets/:id
    /explore/authors/
    /explore/authors/:id
