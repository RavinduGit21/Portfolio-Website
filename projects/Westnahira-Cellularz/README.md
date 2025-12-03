# Westnahira Cellularz - Full-Stack E-Commerce Platform

This is a modern, full-stack e-commerce application built with React, TypeScript, Node.js, Express, and MongoDB. The entire project is configured to run locally and deploy seamlessly as a single project on Vercel.

## Final Instructions for Deployment & Local Development

You are at the final step! Please follow these instructions carefully to get your live website and local development environment working perfectly.

---

### 1. Set Up Your Vercel Environment Variables (Crucial for Live Site)

Your live website needs the "keys" to your database and for security. You must add these secrets directly to your Vercel project settings.

1.  Go to your project's dashboard on Vercel.
2.  Navigate to the **Settings** tab.
3.  In the left sidebar, click on **Environment Variables**.
4.  Add the following two variables. **Make sure there are no extra spaces or quotes.**

    *   **First Variable (The Database Key):**
        *   **Key**: `MONGO_URI`
        *   **Value**: Paste your full MongoDB connection string here. (e.g., `mongodb+srv://westnahira_user:YOUR_PASSWORD@cluster0.zbnqxdu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

    *   **Second Variable (The Security Key):**
        *   **Key**: `JWT_SECRET`
        *   **Value**: Create a long, random, secret string. You can use a password generator or just type a long sentence with no spaces. This is for securing user logins.

5.  Click **Save**.

### 2. Configure Your MongoDB IP Access List (Crucial for Live Site)

Your database needs to allow Vercel's servers to connect.

1.  Go to your MongoDB Atlas dashboard.
2.  In the left sidebar, under "Security", click on **Network Access**.
3.  Click the **"Add IP Address"** button.
4.  Select **"Allow Access from Anywhere"**.
5.  In the IP address field, it will automatically fill in `0.0.0.0/0`.
6.  Click **"Confirm"**. It may take a minute to activate.

**After completing steps 1 and 2, redeploy your project on Vercel. Your live site will now be fully functional!**

---

### 3. Set Up Your Local Environment

To run the full website on your own computer, you need one secret file.

1.  In the **root** of your project (where `package.json` is), create a new file named exactly `.env.development.local`
2.  Open this file and add your two secret keys. **Remember to replace the placeholder values!**

    ```env
    # This is your database password
    MONGO_URI=mongodb+srv://westnahira_user:YOUR_SAVED_PASSWORD@cluster0.zbnqxdu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

    # This is your security key
    JWT_SECRET=YOUR_SUPER_SECRET_RANDOM_STRING_FOR_JWT
    ```

### 4. Seed Your Database

This command will connect to your database and fill it with all the sample products, categories, and your admin user.

*   Open a terminal in the **root** folder of your project and run:
    ```bash
    npm run db:seed
    ```

### 5. Run the Full Application Locally

This single command starts both your frontend and backend servers at the same time.

*   From the **root** folder, run:
    ```bash
    npm run dev
    ```
*   Your website will be available at `http://localhost:3000`. This version is connected to your live database and will show all your uploaded images and data.