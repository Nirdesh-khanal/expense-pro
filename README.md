# Expense Pro - Frontend

The frontend for **Expense Pro**, a modern and responsive expense tracking dashboard. Built with **React (Vite)** and **Tailwind CSS**, it provides an intuitive interface for users to manage their finances and for admins to monitor platform activity.

## 🛠 Technology Stack
- **Framework**: React 18+ (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios (with Interceptors for JWT)
- **Routing**: React Router DOM (v6)

## ✨ Key Features

### 📱 Responsive UI
- **Mobile-First Design**: Fully responsive layout that adapts to all screen sizes.
- **Smart Sidebar**: Collapsible sidebar on desktop, slide-out drawer on mobile.
- **Modern Aesthetics**: Clean design using glassmorphism effects, gradients, and smooth transitions.

### 👤 User Dashboard
- **Financial Overview**: Real-time cards showing Budget, Income, Expenses, and Balance.
- **Visualizations**: Category-wise spending breakdown using color-coded charts.
- **Transaction Management**: Easy-to-use modals for adding Expenses and Incomes.
- **Budgeting**: Set and track monthly budgets with visual progress indicators.

### 🛡 Admin Dashboard
- **User Management**: View, activate/deactivate, or delete users.
- **Expense Monitoring**: Filter and inspect platform-wide transactions by user or date.
- **Global Reports**: Dedicated analytics page showing platform health, trends, and top spenders.

### 📊 Advanced Reporting
- **Role-Based Views**: The `/reports` page adapts based on the logged-in user:
  - **Users**: See their personal monthly summary and daily spending trends.
  - **Admins**: See global platform statistics and user activity insights.

## 📂 Project Structure
- `src/components`: Reusable UI components (Sidebar, Modals, Forms).
- `src/Pages`: Main views (Login, Dashboard, AdminDashboard, Reports).
- `src/services`: API integration services (`auth.js`, `expense.js`).
- `src/commons`: Shared utilities and Axios configuration.

## ⚡ Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173/` (or similar).

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 🔐 Environment Setup
Ensure the Backend URL is correctly configured in `src/commons/api.js` (Default: `http://127.0.0.1:8000/`).
