# L’Assemblée Géniale

L’Assemblée Géniale est une **application web** développée dans le cadre d’un **projet de fin d’études pour le titre professionnel Concepteur Développeur d’Application (CDA)**.  
Elle a pour objectif de **faciliter la communication et la vie collective au sein d’une copropriété**, en proposant un espace centralisé, sécurisé et simple d’utilisation pour les résidents et les syndics.

---

## Objectifs du projet

- Centraliser les informations liées à la vie de la copropriété
- Faciliter la communication entre résidents et syndics
- Encourager la participation à la vie collective
- Proposer une application moderne, intuitive et accessible

---

## Rôles utilisateurs

L’application repose sur deux rôles principaux :

### Syndic
- Création et gestion de la résidence
- Publication d’actualités
- Invitation de nouveaux utilisateurs par email
- Attribution des rôles (syndic / résident)
- Gestion des comptes liés à la copropriété

### Résident
- Consultation du fil d’actualités
- Accès aux informations de la résidence
- Participation aux fonctionnalités proposées selon les droits attribués

> L’inscription est **restreinte par invitation**, sauf pour le **premier syndic**, qui crée la résidence lors de son inscription.

---

## Fonctionnalités actuelles

- Authentification sécurisée (JWT)
- Gestion des rôles (syndic / résident)
- Système d’invitations par email
- Fil d’actualités (création par les syndics, consultation par tous)
- Gestion des comptes utilisateurs

---

## Fonctionnalités prévues

- Gestion des événements (inscription des résidents)
- Sondages et votes
- Recommandations de bonnes adresses et artisans
- Messagerie privée entre résidents
- Notifications

---

## Architecture du projet

Le projet est organisé sous forme de **monorepo**, avec deux sous-dossiers principaux :
/
├── app/ # Front-end (React + TypeScript + Vite)
├── api/ # Back-end (Node.js + Express + TypeScript)
└── docker/ # Fichiers liés au déploiement Docker


---

## Stack technique

### Front-end
- React
- TypeScript
- Vite

### Back-end
- Node.js
- Express
- TypeScript
- Authentification via JWT

### Base de données
- PostgreSQL
- ORM : TypeORM

### DevOps / Outils
- Docker & Docker Compose
- Git & GitHub
- Postman (tests API)

---

## Lancement du projet en local (Docker)

### Prérequis
- Docker
- Docker Compose

### Installation
```bash
git clone https://github.com/ton-username/assemblee-geniale.git
cd assemblee-geniale
```

### Lancement
```bash
docker-compose up --build
```
