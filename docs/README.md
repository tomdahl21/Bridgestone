# Bridgestone Fleet Management - GitHub Pages

This directory contains the GitHub Pages website for the Bridgestone Fleet Management app.

## Website Features

- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Interactive UI**: Smooth scrolling navigation and hover effects
- **Bridgestone Branding**: Official colors and design language
- **Feature Showcase**: Comprehensive overview of app capabilities
- **Technology Stack**: Detailed tech stack information
- **Call-to-Action**: Direct links to GitHub repository

## Local Development

To preview the site locally:

1. Open `index.html` in your web browser
2. Or use a local server:
   ```bash
   cd docs
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

## Deployment

GitHub Pages automatically deploys from this `docs` folder when:
1. Repository settings have Pages source set to "Deploy from a branch"
2. Branch is set to "main" 
3. Folder is set to "/docs"

The site will be available at: `https://tomdahl21.github.io/Bridgestone/`