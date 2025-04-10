# BLOODLETTER HQ

A modern, responsive website for the Bloodletter comic series set in the cyberpunk world of New Libertalia.

## Features

- **Modern Design**: Cyberpunk-inspired UI with neon accents
- **Responsive Layout**: Works on all devices (mobile, tablet, desktop)
- **Fast Performance**: Built with Next.js for optimal performance
- **SEO Friendly**: Server-side rendering for better search engine visibility
- **Easy Content Management**: Simple file structure for easy updates

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom components
- **Deployment**: Ready for deployment on Vercel, Netlify, or self-hosting

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd bloodletter-hq
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
bloodletter-hq/
├── app/                # Next.js App Router
│   ├── layout.tsx      # Root layout component
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # Reusable components
│   ├── Navigation.tsx  # Site navigation
│   └── Footer.tsx      # Site footer
├── public/             # Static assets
└── ...config files
```

## Customization

### Changing Colors

Edit the `tailwind.config.js` file to update the primary and secondary colors to match your brand.

### Adding Content

1. **Comic Issues**: Add new issues to the `/comics` directory
2. **Images**: Add artwork to the `/public/images` directory
3. **Blog Posts**: Create new markdown files in the `/content/blog` directory

## Hosting Recommendations

For minimal cost self-hosting, consider:

1. **Vercel**: Free tier with reasonable limits
2. **Netlify**: Free tier with good CI/CD integration
3. **GitHub Pages**: Free for static exports
4. **DigitalOcean App Platform**: Starts at $5/month
5. **Railway**: Simple deployment with reasonable free tier

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

---
Created for the Bloodletter comic series by [Your Name] 