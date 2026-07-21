# Yourl - URL Shortener

A modern, neo-brutalist styled URL shortener built with React and Vite. Yourl allows you to shorten long URLs into manageable links while tracking click statistics.

![Yourl](https://img.shields.io/badge/Yourl-URL%20Shortener-red?style=for-the-badge)

## ✨ Features

- **URL Shortening**: Convert long URLs into short, shareable links with 6-character codes
- **Click Tracking**: Monitor how many times each shortened link has been clicked
- **Link Management**: View, copy, and delete your shortened links
- **Local Storage**: All data persists in browser localStorage (no backend required)
- **Auto Redirection**: Visiting a short URL automatically redirects to the original destination
- **Neo-Brutalist Design**: Bold, high-contrast UI following modern design trends
- **Responsive**: Works seamlessly on desktop and mobile devices
- **Copy to Clipboard**: One-click copying of shortened URLs
- **Validation**: Input validation for proper URL format

## 🎨 Design Philosophy

Yourl follows a **Neo-Brutalism** design aesthetic characterized by:

- Thick black borders (4px stroke)
- Hard offset shadows without blur
- High-saturation accent colors (Red, Yellow, Violet)
- Space Grotesk typography with heavy weights
- Mechanical, tactile button interactions
- Rotated decorative elements
- Text stroke effects
- Scrolling marquee banners

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn installed
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yourl
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

The built files will be in the `dist/` directory.

## 📁 Project Structure

```
yourl/
├── public/              # Static assets
│   └── favicon.svg      # App favicon
├── src/
│   ├── components/      # React components
│   │   ├── Header.jsx   # Navigation header
│   │   ├── Hero.jsx     # Main hero section
│   │   ├── UrlForm.jsx  # URL input form
│   │   ├── LinkList.jsx # List of shortened links
│   │   ├── LinkCard.jsx # Individual link card
│   │   ├── Footer.jsx   # Page footer
│   │   └── Marquee.jsx  # Scrolling banner
│   ├── styles/          # CSS stylesheets
│   │   └── index.css    # Main styles with design tokens
│   ├── utils/           # Utility functions
│   │   └── storage.js   # LocalStorage helpers
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── DESIGN.md            # Design specification document
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 6
- **Styling**: Pure CSS with Custom Properties
- **Font**: Space Grotesk (Google Fonts)
- **Icons**: Inline SVG
- **Storage**: Browser LocalStorage API

## 📖 Usage Guide

### Shortening a URL

1. Enter a valid URL in the input field (e.g., `https://example.com/very/long/url`)
2. Click the "Shorten URL" button or press Enter
3. Your shortened link will appear in the list below (e.g., `yourl.app/abc123`)
4. Click the copy button to copy the short link to clipboard

### Managing Links

- **View Stats**: Each link card displays the number of clicks
- **Copy Link**: Click the copy icon to copy the short URL
- **Delete Link**: Click the trash icon to remove a link permanently

### How Redirection Works

When someone visits `yourl.app/{code}`:
1. The app checks if the code exists in localStorage
2. If found, it increments the click counter
3. User is automatically redirected to the original URL
4. If not found, user sees a 404 message

*Note: In production, you would configure server-side routing to handle this.*

## 🔧 Configuration

### Changing the Base URL

Edit the `BASE_URL` constant in `src/App.jsx`:

```javascript
const BASE_URL = 'https://yourl.app'; // Change to your domain
```

### Customizing Colors

Modify CSS custom properties in `src/styles/index.css`:

```css
:root {
  --color-accent-red: #ff003c;
  --color-accent-yellow: #ffe600;
  --color-accent-violet: #9b5de5;
  /* ... other colors */
}
```

## 🌐 Deployment

### Deploying to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy (Vite projects work out-of-the-box)

### Deploying to Netlify

1. Run `npm run build`
2. Drag and drop the `dist/` folder to Netlify
3. Configure redirect rules in `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Self-Hosting

1. Build the project: `npm run build`
2. Serve the `dist/` directory with any static file server
3. Configure URL rewriting for client-side routing

## 📝 API Reference

### LocalStorage Schema

Data is stored in localStorage under the key `yourl-links`:

```json
[
  {
    "id": "unique-id",
    "code": "abc123",
    "originalUrl": "https://example.com",
    "shortUrl": "https://yourl.app/abc123",
    "clicks": 5,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Utility Functions

Located in `src/utils/storage.js`:

- `getLinks()`: Retrieve all stored links
- `saveLinks(links)`: Save links to localStorage
- `addLink(link)`: Add a new link
- `deleteLink(id)`: Remove a link by ID
- `incrementClicks(code)`: Increment click counter for a code

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspiration from Neo-Brutalism movement
- Space Grotesk font by Space Type Foundry
- Built with ❤️ using React and Vite

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review the DESIGN.md file for design specifications

---

**Made with React & Vite** | **Neo-Brutalist Design** | **2024**
