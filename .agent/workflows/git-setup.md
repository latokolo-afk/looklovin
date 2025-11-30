---
description: Setup Git and push to remote repository
---

# Git Setup and Remote Update Workflow

This workflow helps you set up Git tracking and push your code to a remote repository (GitHub, GitLab, etc.).

## Prerequisites

Git is not currently installed on your system. You'll need to install it first.

### Step 1: Install Git

1. Download Git for Windows from: https://git-scm.com/download/win
2. Run the installer with default settings
3. Restart your terminal/command prompt after installation

### Step 2: Configure Git (First Time Only)

After installing Git, configure your identity:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Setting Up Remote Repository

### Option A: Push to Existing Remote (if you have a GitHub repo)

1. Check current remote:
```bash
git remote -v
```

2. If no remote exists, add one:
```bash
git remote add origin https://github.com/yourusername/looklovin.git
```

3. If remote exists but needs updating:
```bash
git remote set-url origin https://github.com/yourusername/looklovin.git
```

### Option B: Create New GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named "looklovin"
3. Don't initialize with README (we already have one)
4. Copy the repository URL

## Tracking and Pushing Changes

### Step 3: Stage All Files

```bash
git add .
```

This stages all new and modified files for commit.

### Step 4: Commit Changes

```bash
git commit -m "Initial commit: World-class luxury e-commerce website"
```

### Step 5: Push to Remote

First time push (sets upstream):
```bash
git push -u origin main
```

Or if your default branch is 'master':
```bash
git push -u origin master
```

Subsequent pushes:
```bash
git push
```

## Checking Status

View current status:
```bash
git status
```

View commit history:
```bash
git log --oneline
```

## Common Issues

**Issue: Branch name mismatch**
If your local branch is 'master' but remote expects 'main':
```bash
git branch -M main
git push -u origin main
```

**Issue: Authentication required**
For HTTPS URLs, you may need a Personal Access Token:
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token with 'repo' permissions
3. Use token as password when pushing

**Alternative: Use SSH**
```bash
git remote set-url origin git@github.com:yourusername/looklovin.git
```

## Quick Reference

```bash
# Check status
git status

# Stage all changes
git add .

# Commit with message
git commit -m "Your message"

# Push to remote
git push

# Pull latest changes
git pull

# View remotes
git remote -v
```

## Next Steps After Setup

Once Git is installed and configured:
1. Run `git status` to see current state
2. Run `git add .` to stage all files
3. Run `git commit -m "Initial commit: Complete luxury e-commerce website"`
4. Add your remote repository
5. Run `git push -u origin main`

Your world-class LookLovin website will then be backed up and version-controlled on your remote repository!
