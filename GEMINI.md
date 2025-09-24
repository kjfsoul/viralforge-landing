# VIRALFORGE Project

## Project Overview

VIRALFORGE is an autonomous AI-driven Print-on-Demand (POD) campaign system designed to capitalize on trending events. The system integrates Supabase for the backend, n8n for automation workflows, and Printify for POD integration. The frontend is a Next.js application.

The project is designed to be a complete, end-to-end solution for creating and launching POD campaigns, from trend detection to product sales. It uses AI services like OpenAI's GPT-4 and DALL-E 3 for content and design generation.

The main components of the system are:

*   **Frontend:** A Next.js application located in the `viralforge_landing` directory. This application serves as the main landing page for the project and includes an interactive oracle, product showcases, and a trajectory simulator for the 3I/Atlas event.
*   **Backend:** A Supabase project with a comprehensive PostgreSQL database schema. The schema includes tables for managing events, brands, products, campaigns, and analytics.
*   **Automation:** A set of n8n workflows that automate the entire campaign lifecycle, from trend detection to social media posting and analytics tracking.
*   **AI Services:** The system uses OpenAI's GPT-4 and DALL-E 3 for generating product descriptions, social media content, and product designs.

## Building and Running

The frontend application is a Next.js project. To run it locally, you will need to have Node.js and npm (or yarn/pnpm) installed.

1.  **Navigate to the frontend directory:**
    ```bash
    cd "viralforge_landing/app"
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
This will start the development server on `http://localhost:6003`.

## Development Conventions

The project follows standard conventions for Next.js and React development.

*   **Components:** Reusable components are located in the `viralforge_landing/app/components` directory.
*   **Styling:** The project uses Tailwind CSS for styling.
*   **Database:** The database schema is defined in the `supabase_schemas.sql` file.
*   **Automation:** The n8n workflows are defined in the `n8n_workflows.json` file.
*   **API Routes:** API routes are located in the `viralforge_landing/app/app/api` directory.
*   **Types:** TypeScript types are defined in the `viralforge_landing/app/lib/types.ts` file.
