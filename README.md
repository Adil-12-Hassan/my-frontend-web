# dev&design — Portfolio Portfolio — Full Stack Developer & Creative Designer

A premium, highly-interactive portfolio site built for a modern developer-designer hybrid. This project showcases a clean, dark-themed UI with advanced animations, smooth scrolling, and a responsive design tailored for high-end digital experiences.

---

## 🚀 Key Features

- **Interactive Hero Section**: Four unique letter panels that expand on hover to reveal deep-dive content about development, branding, OSS, and UI/UX.
- **Custom Cursor & Ring**: A dynamic, desktop-only cursor that adapts its shape and color based on the element it's interacting with (inputs, links, design sections).
- **Smooth Scrolling (Lenis)**: Integrated Lenis library for a high-end, inertial scrolling experience across all browsers.
- **Advanced GSAP Animations**: Scroll-triggered entrance animations for work cards, skill chips, and sections, ensuring a polished and modern feel.
- **Skill Tabs & Work Filters**: Seamless switching between technology categories (Frontend, Backend, Databases) and project types (Dev, Design, UI/UX, Full Stack).
- **Mobile-First Responsive Design**: A custom-built mobile menu and overlay system that ensures accessibility on all devices.
- **Fully Functional Contact Form**: Integrated with a Vercel-hosted backend to send real-time emails to the owner.

---

## 🛠️ Tech Stack

### Frontend
- **Languages**: HTML5, CSS3, Modern JavaScript (ES6+)
- **Animations**: [GSAP (GreenSock)](https://gsap.com/) + ScrollTrigger
- **Smooth Scroll**: [Lenis](https://lenis.studiofreight.com/)
- **Typography**: Syne, DM Sans, JetBrains Mono
- **Icons**: FontAwesome 6.5.1

### Backend (API Connection)
- **Framework**: Node.js (Vercel Serverless)
- **Email Service**: Integrated via SMTP (Nodemailer)

---

## 📁 Project Structure

```text
/
├── index.html        # Main entry point and structural markup
├── style.css         # Core styling, tokens, and animations
├── script.js        # Interactive logic, GSAP, and form handling
├── responsive.css    # Mobile-specific layout overrides
├── favicon.svg       # Project icon
├── my.jpeg          # Profile/Hero image
└── .env             # Environment configuration (local)
```

---

## ⚙️ Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Adil-12-Hassan/my-frontend-web.git
   cd my-frontend-web
   ```

2. **Configuration**:
   - Update the `CONTACT_ENDPOINT` in `script.js` to point to your live backend.
   - Configure your SMTP credentials in your backend environment if hosting locally.

3. **Deployment**:
   - The frontend is ready to be hosted on **Vercel**, **Netlify**, or **GitHub Pages**.
   - Simply upload the files to your chosen provider.

---

## 📧 Contact & Socials

- **Developer**: Syed Adil Hassan
- **Email**: syedadilhassan06@gmail.com
- **LinkedIn**: [Adil Hassan](https://www.linkedin.com/in/adil-hassan-a08115325)
- **GitHub**: [@adil-12-hassan](https://github.com/adil-12-hassan)
- **Behance**: [adilhassan19](https://www.behance.net/adilhassan19)

---

Built with ♥, caffeine, and too many Figma frames. © 2025 dev&design Portfolio.
