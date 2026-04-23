# Urbanworks Construction - Landing Page

A modern, professional, and fully responsive landing page for Urbanworks Construction & Development.

![Urbanworks Construction](https://img.shields.io/badge/Urbanworks-Construction-c41e3a?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 🏗️ Project Overview

This is a complete redesign of the Urbanworks Construction landing page, featuring:

- **Modern Design**: Clean, professional construction industry aesthetic
- **Responsive Layout**: Fully responsive on mobile, tablet, and desktop
- **Dark Theme**: Black/dark gray primary with red accent colors
- **Smooth Navigation**: Sticky header with smooth scrolling
- **Optimized Performance**: Fast loading with minimal dependencies

## 📁 Project Structure

```
urbanworks-landing/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles and responsive design
├── js/
│   └── main.js         # Navigation and animations
├── images/             # Image assets (add your own)
└── README.md           # This file
```

## 🚀 Quick Start

### Option 1: Local Development

1. **Clone or download** this project to your computer
2. **Open `index.html`** in any modern web browser
3. **Done!** The site works immediately with no build process

### Option 2: Live Server (Recommended for Development)

If you have VS Code:

1. Install the **Live Server** extension
2. Right-click `index.html` and select **"Open with Live Server"**
3. The site will open at `http://127.0.0.1:5500`

## 🌐 Deployment Options

### Netlify (Recommended - Free & Easy)

1. **Sign up** at [netlify.com](https://netlify.com)
2. **Drag and drop** the `urbanworks-landing` folder to Netlify Drop
3. **Done!** Your site is live in seconds

**Custom Domain:**
- Go to Site Settings → Domain Management
- Add your custom domain (e.g., urbanworksconstruction.com)

### Vercel (Free & Fast)

1. **Sign up** at [vercel.com](https://vercel.com)
2. **Install Vercel CLI**: `npm i -g vercel`
3. **Deploy**: Run `vercel` in the project folder
4. **Done!** Your site is live

### GitHub Pages (Free)

1. **Create a GitHub repository**
2. **Push** the project files to the repository
3. Go to **Settings → Pages**
4. Select **main branch** and save
5. Your site will be live at `https://yourusername.github.io/repo-name`

### Traditional Web Hosting

1. **Upload** all files via FTP to your web host
2. Ensure files are in the **public_html** or **www** directory
3. Access your site at your domain

## 🎨 Customization

### Adding Real Images

Replace the placeholder image divs with actual images:

```html
<!-- Replace this: -->
<div class="image-placeholder">
    <svg>...</svg>
</div>

<!-- With this: -->
<img src="images/your-photo.jpg" alt="Description">
```

### Changing Colors

Edit the CSS custom properties in `css/styles.css`:

```css
:root {
    --color-primary: #1a1a1a;      /* Main dark color */
    --color-accent: #c41e3a;       /* Red accent color */
    --color-white: #ffffff;        /* White */
    /* ... more colors */
}
```

### Updating Content

All content is in `index.html`. Simply find and replace:
- Company information
- Phone numbers and emails
- Project portfolio items
- Team member details

### Adding New Sections

Copy an existing section structure and modify:

```html
<section class="section" id="new-section">
    <div class="container">
        <div class="section-header">
            <span class="section-subtitle">Subtitle</span>
            <h2 class="section-title">Title</h2>
        </div>
        <!-- Your content here -->
    </div>
</section>
```

## 📱 Responsive Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Desktop | > 1024px | 3-column grids |
| Tablet | 768px - 1024px | 2-column grids |
| Mobile | < 768px | Single column, hamburger menu |

## ✨ Features

### Navigation
- ✅ Sticky header that appears on scroll
- ✅ Smooth scrolling to sections
- ✅ Mobile hamburger menu
- ✅ Active link highlighting

### Animations
- ✅ Fade-in on scroll
- ✅ Hover effects on cards
- ✅ Button animations
- ✅ Scroll indicator bounce

### Accessibility
- ✅ Semantic HTML5
- ✅ ARIA labels where needed
- ✅ Keyboard navigation support
- ✅ High contrast colors

### Performance
- ✅ No external frameworks
- ✅ Minimal JavaScript
- ✅ Optimized CSS
- ✅ Lazy loading ready

## 🔧 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Latest |
| Firefox | Latest |
| Safari | Latest |
| Edge | Latest |
| Opera | Latest |

## 📞 Contact Information

**Urbanworks Construction & Development**
- 📍 2823 Amaia Skies North Tower, Brgy. Highway Hills, Mandaluyong City, Philippines
- 📱 0966 440 9012 / 0967 307 5659
- 📧 urban.worksservice@gmail.com
- 📘 [Facebook](https://facebook.com/urbanworksservice/)

**PCAB License No. 56616 | Category D**

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

- **Fonts**: Inter by Google Fonts
- **Icons**: Custom SVG icons
- **Design**: Modern construction industry aesthetic
- **Colors**: Black/Dark Gray with Red Accent

---

**Built with ❤️ for Urbanworks Construction**
