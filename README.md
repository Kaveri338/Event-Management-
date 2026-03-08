## Idea Description

### The Problem
Organizing and participating in hackathons or technical workshops often involves navigating fragmented platforms, leading to missed opportunities for attendees and administrative overhead for organizers. Many existing solutions lack a unified interface that balances simplicity with the robust role-based functionality required for multi-event management. This fragmentation results in lower engagement and a steep learning curve for new community members.

### The Significance
In the rapidly evolving tech landscape, hackathons are critical for skill development and networking. A disorganized experience can discourage potential innovators. By streamlining the discovery and management process, we empower the tech community to focus on creation rather than coordination, ensuring that high-impact events reach their maximum potential audience.

### Our Solution & Unique Value
The **Multi-Event Management Platform** is a specialized, full-stack ecosystem designed to bridge the gap between event hosts and participants. Our unique approach centers on a dual-dashboard system built with **React 19** and **Express 5**, providing a lightning-fast, real-time experience. 

- **For Attendees:** It offers a high-performance discovery engine with categorized search and seamless one-click registration, powered by **TanStack React Query** for an ultra-responsive UI.
- **For Organizers:** It provides a comprehensive management suite to track engagement and registrations without the bloat of traditional enterprise tools. 

By prioritizing type-safety with **TypeScript** and secure, stateless authentication via **JWT**, we offer a professional-grade, reliable platform that remains intuitive and accessible for communities of all sizes.

## Submission Links
- **GitHub Repository:** [https://github.com/Kaveri338/Event-Management-.git](https://github.com/Kaveri338/Event-Management-.git)
- **Frontend Deployment (Vercel):** [https://eventmanagementplatform.vercel.app/](https://eventmanagementplatform.vercel.app/)
- **Backend Deployment (Render):** [https://event-management-oq1m.onrender.com](https://event-management-oq1m.onrender.com)
- **Presentation PPT:** [View PPT](https://docs.google.com/presentation/d/1OvSCd5YA9i4v3xr3s4Kj7wlp4L7GdaTT/edit?usp=drivesdk&ouid=103400001346558345393&rtpof=true&sd=true)
- **Live Demo Presentation Video:** [View Demo](https://drive.google.com/file/d/1GFw8j731IBvHZNmBmmVj0bUJUFDE0CfW/view?usp=drivesdk)
- **Pitch Video:** [View Pitch](https://drive.google.com/file/d/1XFgwStIeOIEt_YX3R5uwPSkkYG4N8Re9/view?usp=drivesdk)

## Technical Details

### Technologies Used
#### Frontend
- **React 19:** Modern UI library with functional components and hooks.
- **TypeScript:** Ensuring type safety and robust code quality.
- **Vite:** Next-generation frontend tooling for fast development.
- **Tailwind CSS 4:** Utility-first CSS framework for rapid UI styling.
- **TanStack React Query:** Powerful asynchronous state management and data fetching.
- **React Router Dom 7:** Client-side routing for seamless navigation.
- **Axios:** Promise-based HTTP client for API communication.
- **Lucide React:** Beautifully simple icons for a modern look.

#### Backend
- **Node.js:** JavaScript runtime for scalable backend services.
- **Express 5:** Fast, unopinionated web framework for Node.js.
- **TypeScript:** Strong typing for reliable backend logic.
- **JWT (JSON Web Tokens):** Secure authentication and session management.
- **bcryptjs:** Password hashing for user security.
- **CORS:** Cross-Origin Resource Sharing for API accessibility.

#### Cloud & Hosting
- **Potential Hosting:** Configured for deployment on platforms like **Render** (backend) and **Vercel** (frontend).

### Architecture Overview
The platform follows a **RESTful Client-Server architecture**:
- **Separation of Concerns:** The backend is modularly structured into Routes, Controllers, Models, and Middleware.
- **API-Driven:** The frontend communicates with the backend via a REST API.
- **Stateless Authentication:** Uses JWT to manage user sessions without server-side state.

### Database Used
- **MongoDB:** A NoSQL document-based database for flexible data storage.
- **Mongoose 9:** ODM (Object Data Modeling) library for MongoDB and Node.js.

### Third-party Integrations
- **Lucide Icons:** Used for consistent and modern iconography throughout the application.
- **TanStack React Query:** Integrated for efficient server state synchronization.

---

## How to Run in Local Host

### Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** (Running locally on `mongodb://localhost:27017` or a MongoDB Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/Kaveri338/Event-Management-.git
cd event-management-platform
```

### 2. Backend Setup
1. Navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` root:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/event-platform
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```
4. Start the server (using ts-node-dev if available or build and run):
   ```bash
   # If you have ts-node-dev:
   npx ts-node-dev src/index.ts
   # OR build and start:
   npm run build
   npm start
   ```

### 3. Frontend Setup
1. Navigate to the `client` folder (from the project root):
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### 4. Access the Application
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000)


