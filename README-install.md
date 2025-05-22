# 🚗 Infobam Fullstack Test – Guide d'installation et d'utilisation

## Prérequis

- Node.js >= 18.x
- npm >= 9.x
- PostgreSQL 

---

## 1. Cloner le projet

```bash
git clone https://github.com/Jimjim972/infobam-fullstack-test.git
cd infobam-fullstack-test
```
## 2. Installer les dépendances

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd ../frontend
npm install
```

---

## 3. Configurer les variables d'environnement

### Backend

Copiez le fichier `.env.example` en `.env` et adaptez les valeurs si besoin :

```bash
cp .env.example .env
```

Vérifiez la connexion à la base de données (PostgreSQL).


## 5. Initialiser la base de données

Dans le dossier backend :

```bash
npx prisma migrate dev
```

---

## 6. Démarrer le backend

```bash
cd backend
npm run start:dev
```

L’API sera disponible sur [http://localhost:3000](http://localhost:3000).

---

## 7. Démarrer le frontend

```bash
cd ../frontend
npm run dev
```

L’application sera disponible sur [http://localhost:3001](http://localhost:3001).

---

## 8. Accéder à la documentation API (Swagger)

Si Swagger est activé, rendez-vous sur :

[http://localhost:3000/api](http://localhost:3000/api)

---

## 9. Utilisation

- Accédez à l’interface web sur [http://localhost:3001](http://localhost:3001)
- Filtrez, triez, consultez les détails des véhicules
- Utilisez l’API REST pour manipuler les véhicules

---

## Structure du projet

```
backend/    # API NestJS
frontend/   # Application Next.js
```
---

## remise en question objective.

Le projet répond bien au cahier des charges de base, mais gagnerait en maturité avec plus de tests, une gestion des erreurs plus poussée, une documentation API enrichie et une meilleure expérience utilisateur.

### Améliorations potentielles

- **Ajouter des tests d’intégration backend et frontend.**
- **Enrichir la validation et la gestion des erreurs.**
- **Proposer une expérience utilisateur plus fluide (feedbacks, loaders, messages).**
- **Ajouter un script de seed pour la base de données.**
- **Préparer le projet à l’ajout de fonctionnalités avancées (auth, upload d’images, etc.).**

---
