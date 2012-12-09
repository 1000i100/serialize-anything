serialize-anything
==================

fonctions de serialization déserialisation gérant les type simple et complexes y compris ceux non pris en charge par json.
Cela ce fait au prix d'une perte de lisibilité en ajoutant certains préfix et en convertissant en base64 certain élément pour éviter les conflits lors des imbrications.


Le but premier est que vous puissiez stocker n'importe quoi (anything) sous forme de chaine de carracètre et le restaurer à l'identique.


    var str = serialize(anything);
    console.log(typeof str); // "string"
    var restoreAnything = deserialize(str);

restoreAnything a le même contenu/comportement qu'anything quel que soit son type d'origine et sa complexité.

Le script à été conçu dans l'optique de pouvoir stocker des objets dynamique complexe en localstorage.

## Erreurs connues
les méthodes statique native ne sont pas serialisé ni déserialisé correctement. ex : Math.round

## ToDo
Gérer la serialisation d'objet DOM, par valeur et une pseudo sérialisation par référence

## Test unitaires
http://gammanu.github.com/serialize-anything/test/