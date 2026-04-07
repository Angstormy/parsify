# Parsify Frontend Deployment Guide

Follow these steps to host your premium OCR interface on **GitHub Pages**.

## Prerequisites
Ensure your backend is already running on Hugging Face Spaces. The frontend is pre-configured to look for:
`https://angstormy-hindi-ocr-api.hf.space/predict`

## Step 1: Install Deployment Tool
Open your terminal in the `frontend/` directory and run:
```bash
npm install gh-pages --save-dev
```

## Step 2: Initialize Git (If not already done)
If you haven't initialized a git repository in the `frontend/` folder:
```bash
git init
git add .
git commit -m "Initial frontend commit"
```

## Step 3: Link to GitHub
Create a new repository on GitHub (e.g., `parsify-app`) and link it:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 4: Deploy to GitHub Pages
Run the following command. It will automatically build your project and push it to a special `gh-pages` branch:
```bash
npm run deploy
```

## Step 5: Activate GitHub Pages
1. Go to your GitHub Repository **Settings** > **Pages**.
2. Under **Build and deployment**, ensure the source is set to **Deploy from a branch**.
3. Select the `gh-pages` branch and the `/ (root)` folder.
4. Click **Save**.

Your app will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/` within a few minutes!

---

### Troubleshooting
- **White Screen?**: Ensure `base: './'` is present in your `vite.config.js`.
- **API Errors?**: Check that your Hugging Face Space is "Running" and not "Sleeping."
