# AquaLife Aquatic Center Management Platform

## Overview

Web application for AquaLife Aquatic Centers to manage reservations, check current weather conditions and monitor the occupancy of each aquatic center.

## Authorship

- Author: Nickolas Ramirez
- Repository:https://github.com/Bynickram02/examen-parcial-u202415551

## Features

- Toolbar with custom logo, platform title and EN/ES language switcher.
- Sidenav navigation: Home and New Reservation.
- Home (`/home`) with a grid of aquatic center summaries showing reservations, Total Participants and Available Capacity.
- New Reservation (`/reservations/new`) reactive form with capacity validation and current temperature from Open-Meteo.
- Page not found view for unsupported routes.
- Internationalization (English by default, Spanish).

## Stack

- Angular 22.2.2 (standalone components, Signals)
- Angular Material
- HttpClient and Angular Router
- ngx-translate (core and http-loader)
- json-server 0.17.4
- Open-Meteo Weather API

## Setup

```bash
npm install
```

Start the fake API (http://localhost:3000):

```bash
cd server
json-server --watch db.json
```

Or with the local dependency: `npm run server`.

Start the application (http://localhost:4200):

```bash
npm start
```
