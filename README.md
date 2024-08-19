# Vue.js Application

## Project Overview
Ministry of Labour and Social Protection (MoGLSD) is in the process of establishing a Social Assistance Fund. The Social Protection Fund will consolidate monetary resources from state and non-state actors with the aim of disbursing it to the needy and vulnerable persons on a timely and predictable manner. The applicants will be identified on demand basis and assessed based on determination of their vulnerability and income status. An applicant can apply for one or more social assistance programmes. Once eligibility has been determined, then the applicants will be informed by email or through SMS alerts.

## Requirements

Ensure the following are installed on your system:

- [Node.js](https://nodejs.org/) version 20.x or higher
- npm (Node Package Manager) version 6.x or higher / or yarn

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/jmwantisi/socialAssistanceFundWebApp
cd socialAssistanceFundWebApp
```
### 2. Install Web App Dependencies while in the directory

```bash
  npm install
```
### 3. Configure API Client to point at the backend
- Find apClient.js file under the roor directory and update apiClient.js property called baseURL to point at the backend based on your needs
- Excample
```bash
  //apiClient.js
  baseURL: 'http://127.0.0.1:8080/api/v1'
```

### 4. Run Wep App

```bash
  npm run dev
```

