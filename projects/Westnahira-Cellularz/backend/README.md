# Backend Server Setup

Your backend server files (`server.js` and `package.json`) have already been created for you!

Please follow these simple steps to get your server running and connected to your database.

### Step 1: Open Your Terminal in the `backend` folder

Make sure your command line tool (Terminal or Command Prompt) is running inside this `backend` directory.

If you are in the main project folder, run this command:
```bash
cd backend
```

### Step 2: Create your `.env` file

This is the only file you need to create yourself.

1.  Inside this `backend` folder, create a new file named exactly `.env`
2.  Open the file and add your secret MongoDB connection string.
3.  **Remember to replace `YOUR_SAVED_PASSWORD` with the real password you saved from the MongoDB website!**

    ```env
    MONGO_URI=mongodb+srv://westnahira_user:YOUR_SAVED_PASSWORD@cluster0.zbnqxdu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    ```

### Step 3: Install Dependencies

Now, let your project download the necessary libraries. Run this command in your terminal:

```bash
npm install
```

### Step 4: Run Your Backend Server

You're ready to go! Start the server with this command:
```bash
node server.js
```
You should see the success message: `✅ Connected successfully to MongoDB!` followed by `🚀 Backend server is running on http://localhost:5000`.

Your website is now connected! But your database is still empty. Let's add the data.

---

### Step 5: Add Data to Your Database

This is the final step!

1.  Go to your **MongoDB Atlas** dashboard in your web browser.
2.  Click on your cluster name (e.g., `Cluster0`) and then click the **"Browse Collections"** button.
3.  You will need to create your database and collections. Your server is expecting the database `westnahiraDB`.
    *   Click **"Create Database"**.
    *   Database Name: `westnahiraDB`
    *   Collection Name: `products`
    *   Click **"Create"**.
4.  **Insert Product Data:**
    *   Make sure the `products` collection is selected.
    *   Click the **"Insert Document"** button.
    *   In the modal that pops up, click the `{}` icon to switch to **JSON View**.
    *   Open the `backend/sample-data.json` file. Copy the entire list of products (including the `[` and `]` brackets).
    *   Paste this list into the JSON view textbox in MongoDB Atlas and click **"Insert"**.
5.  **Create and Populate Other Collections:**
    *   Next to your `westnahiraDB` database name, click the `+` sign to create a new collection.
    *   Create a collection named `categories`.
    *   Repeat the "Insert Document" process, this time copying and pasting the `categories` data from `sample-data.json`.
    *   Repeat for the `reviews` collection.
    *   Repeat for the `brands` collection. **(Important: for brands, you will only be pasting one single object, not a list)**.

6.  **All Done!** Go back to your website and refresh the page. You should now see all your products and content, loaded live from your database!

---

### 🚨 Troubleshooting

If you see an error like `ERROR: The MONGO_URI environment variable is not set.`, it means the server couldn't find your connection string. Please check the following:

1.  **Is the file in the right place?**
    *   The `.env` file **must** be inside the `backend` folder, right next to `server.js`.

2.  **Is the file named correctly?**
    *   The name must be exactly `.env`.
    *   Be careful: sometimes Windows will name it `.env.txt`. You must rename it to remove the `.txt`.

3.  **Is the content correct?**
    *   Open the file. The line must start with `MONGO_URI=` with no spaces or other characters before it.

4.  **Did you restart the server?**
    *   If you create or change the `.env` file while the server is running, it won't see the changes.
    *   Press `Ctrl + C` in the terminal to stop the server, then run `node server.js` again to restart it.

If you see an error like `EADDRINUSE: address already in use`, it means your server is already running in another terminal.

1.  **Find the other terminal window** where the server is already running.
2.  To stop it, click on that terminal and press **Ctrl + C**.
3.  Once it's stopped, you can run `node server.js` again to start it fresh.
