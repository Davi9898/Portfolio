# Portfolio Refactoring Plan

## Current State Analysis

### Issues Identified
1. **No build system** - Pure HTML/CSS/JS, no bundling or optimization
2. **Poor code organization** - All styles in one file, no component structure
3. **Outdated practices**:
   - Hardcoded colors and values
   - No CSS variables
   - Inconsistent naming (portofolio vs portfolio)
   - Fixed height on body (`height: 100rem`)
   - Typo in CSS (`text-decoration: non;` should be `none`)
4. **Accessibility concerns**:
   - Missing alt text descriptions
   - No skip links
   - Footer link doesn't work (`href="#"`)
5. **Performance issues**:
   - Multiple Google Fonts requests
   - No image optimization
   - No lazy loading
6. **Maintainability**:
   - Repetitive HTML structure
   - No data-driven approach
   - Hard to add/remove projects

## Refactoring Goals

### Phase 1: Modern Foundation
- [ ] Set up build system (Vite or similar)
- [ ] Organize file structure (components, assets, styles)
- [ ] Add package.json with dependencies
- [ ] Implement CSS variables for theming
- [ ] Fix typos and inconsistencies

### Phase 2: Code Quality
- [ ] Refactor HTML with semantic elements
- [ ] Organize CSS into modules/components
- [ ] Create reusable components
- [ ] Add proper accessibility features
- [ ] Implement responsive design improvements

### Phase 3: Modern Features
- [ ] Create data-driven project list (JSON/JS)
- [ ] Add smooth scrolling
- [ ] Implement lazy loading for images
- [ ] Optimize font loading
- [ ] Add meta tags for SEO

### Phase 4: Enhancement (Optional)
- [ ] Add dark mode toggle
- [ ] Implement animations/transitions
- [ ] Add contact form
- [ ] Create project detail pages
- [ ] Add blog section

## Proposed Structure

```
portfolio_new_2026/
├── src/
│   ├── index.html
│   ├── assets/
│   │   ├── images/
│   │   └── fonts/
│   ├── styles/
│   │   ├── main.css
│   │   ├── variables.css
│   │   ├── components/
│   │   │   ├── header.css
│   │   │   ├── projects.css
│   │   │   └── footer.css
│   │   └── utilities.css
│   ├── scripts/
│   │   └── main.js
│   └── data/
│       └── projects.json
├── public/
├── package.json
├── vite.config.js (or similar)
└── README.md
```

## Technology Stack Recommendations

### Option A: Minimal (HTML/CSS/JS + Vite)
- **Build tool**: Vite
- **Styling**: Vanilla CSS with CSS variables
- **JS**: Vanilla JavaScript
- **Pros**: Lightweight, fast, easy to understand
- **Cons**: No component system

### Option B: Modern (React + Vite)
- **Framework**: React
- **Build tool**: Vite
- **Styling**: CSS Modules or Tailwind CSS
- **Pros**: Component-based, scalable, modern
- **Cons**: More complex, requires React knowledge

### Option C: Static Site Generator (11ty/Eleventy)
- **SSG**: Eleventy
- **Styling**: CSS with Nunjucks templates
- **Pros**: Great for portfolios, SEO-friendly, fast
- **Cons**: Learning curve for templating

## Recommended Approach: Option A (Vite + Vanilla)

**Why**: 
- Keeps it simple and fast
- Easy to understand and maintain
- Can upgrade to React later if needed
- Perfect for a portfolio site

## Implementation Steps

1. **Initialize project**
   - Create package.json
   - Install Vite
   - Set up folder structure

2. **Refactor HTML**
   - Use semantic HTML5 elements
   - Add proper ARIA labels
   - Create data structure for projects

3. **Refactor CSS**
   - Extract CSS variables
   - Organize into modules
   - Fix bugs and inconsistencies
   - Improve responsive design

4. **Add JavaScript**
   - Create project data structure
   - Generate project cards dynamically
   - Add smooth scroll
   - Implement lazy loading

5. **Optimize**
   - Optimize images
   - Minimize font requests
   - Add meta tags
   - Improve performance

6. **Test & Deploy**
   - Test on multiple devices
   - Check accessibility
   - Optimize for production
   - Deploy

## Notes

- Keep existing design aesthetic (green background, card layout)
- Maintain all existing projects and links
- Ensure backward compatibility with existing sub-projects
- Preserve CNAME file for GitHub Pages
