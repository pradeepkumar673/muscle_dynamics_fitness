# Muscle Dynamics - Gym Workout Generator

A MERN stack application for generating personalized gym workouts with dark theme aesthetics.

## Features
- 3-step wizard for workout generation
- Equipment selection with visual icons
- Interactive muscle group selection
- Exercise list with shuffle and delete functionality
- Exercise detail modal with instructions and images
- Dark theme UI with red accents
- Responsive design for all devices

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB connection string
npm run dev