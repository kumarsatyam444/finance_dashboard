# FinVision Dashboard

A premium, responsive finance dashboard built with React, Tailwind CSS, and Framer Motion.

## Features

- **Dashboard Overview**: Summary cards with real-time balance, income, and expense tracking.
- **Interactive Charts**: Visual trends using Recharts (Area and Pie charts).
- **Transaction Management**: Search, filter, and sort transactions.
- **Role-Based Access Control**:
  - **Admin**: Can add, edit, and delete transactions.
  - **Viewer**: Read-only access to all data.
- **Smart Insights**: AI-style analytics cards and financial health scoring.
- **Dark & Light Mode**: Fully themed with glassmorphism effects.
- **Persistence**: Data and settings are saved to `localStorage`.
- **Responsive Design**: Mobile-first layout with a collapsible sidebar.

## Tech Stack

- **React 19**: Frontend framework.
- **Tailwind CSS**: Utility-first styling with custom theme variables.
- **Framer Motion**: Smooth animations and transitions.
- **Lucide React**: High-quality iconography.
- **Recharts**: Data visualization.
- **Context API**: Global state management.

## Setup Instructions

1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Build for production: `npm run build`

## Design Decisions

- **Glassmorphism**: Used backdrop-blur and subtle borders for a modern, premium feel.
- **Gradients**: Applied primary (Indigo/Purple) and secondary (Emerald/Teal) gradients to highlight key metrics.
- **Typography**: Integrated "Inter" font for maximum legibility and a clean SaaS aesthetic.
- **Micro-interactions**: Added hover scaling and smooth page transitions to enhance UX.
