# Jeu tu brûles tu chauffres

L'objectif est de retrouver les balises cachées dans la salle.
Chaque balise est une carte micro:bit qui émet un message "TAG" sur son canal tout les 500ms.

## Etapes

* Utiliser les boutons A et B pour changer de groupe pour trouver toutes les balises
* Détecter les messages (string) envoyés par radio
* A partir de la puissance reçue du signal, afficher sur la matrice des informations pour évaluer la distance

## Aide

* Le package [**radio**](https://makecode.microbit.org/reference/radio) contient toutes les méthodes pour interragir avec la radio
* Pour écouter les messages qui arrivent, plusieurs méthodes sont disponibles : 
```Javascript
radio.onReceivedString(msg => console.log(msg)) // affiche la chaine de caractere reçue
radio.onReceivedNumber(nb => console.log(nb))   // affiche le nombre reçu
radio.onReceivedValue((name, value) => console.log(`${name} : ${value}`))   // affiche le couple clé / valeur reçu
```
* Il faut pouvoir changer de canal pour trouver toutes les balises : 
```Javascript
radio.setGroup(1) // configure le group 1
```
* La fréquence utilisée est celle de base. Nous aurions pu changer de fréquence pour chaque balise.
* La puissance du message reçu de la balise vous aidera à estimer sa distance : 
```Javascript
radio.receivedPacket(2) // Récupére la puissance de -128 à -28 du dernier message reçu. Dans les faits on observe plus -90 à -20
```
* L'écran vous permettra d'afficher l'information de distance à l'utilisateur : plus il y a de led allumé par ex, plus on est proche.

Le fichier skeleton.ts vous donne une structure de code pour démarrer.
