# Jeu tu brûles tu chauffres

L'objectif est de retrouver les balises cachées dans la salle.
Chaque balise est une carte micro:bit qui émet un message "TAG" sur son canal tout les 500ms.

## Aide

* Il faut pouvoir changer de canal pour trouver toutes les balises : 
```Javascript
radio.setGroup(1) // configure le group 1
```
* La fréquence utilisée est celle de base. Nous aurions pu changer de fréquence pour chaque balise.
* La puissance du message reçu de la balise vous aidera à estimer sa distance : 
```Javascript
radio.receivedPacket(2) // Récupére la puissance de -128 à -28 du dernier message reçu
```
* L'écran vous permettra d'afficher l'information de distance à l'utilisateur : plus il y a de led allumé par ex, plus on est proche.