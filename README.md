# Multi-Event Management Platform

A modern, full-stack event management platform built for hackathons.

## Features
- **User Authentication:** JWT-based login and registration.
- **Role-based Access:** Attendees can register for events, Organizers can create and manage them.
- **Event Discovery:** Search and browse events by category and title.
- **Dashboard:** Personalized view of registered and hosted events.
- **Modern UI:** Built with React, Tailwind CSS, and Lucide Icons.

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Axios, Lucide React.
- **Backend:** Node.js, Express, TypeScript, MongoDB (Mongoose), JWT.

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (Running locally on `mongodb://localhost:27017/event-platform` or use Atlas)

### Backend Setup
1. Open a terminal in the `server` folder.
2. Install dependencies: `npm install`
3. Configure `.env` if necessary (defaults provided).
4. Start development server: `npm run dev`

### Frontend Setup
1. Open a terminal in the `client` folder.
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## Accessing the App
The frontend will be available at `http://localhost:5173`.
The API will be available at `http://localhost:5000`.
