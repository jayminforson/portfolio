# Portfolio

Personal site and résumé for **Boateng-Kissi Benjamin (Forson)**, a self-taught developer
who grew up in Kwahu and is based in Accra, Ghana.

Static, build-free, and small on purpose. Three entry points: a one-page overview, a résumé
built for printing, and seven case studies that keep the reasoning, not just the screenshots.

## Contents

| Path | What it is |
| --- | --- |
| `index.html` | One-page layout: hero, experience, projects, education, contact |
| `resume.html` | Print-optimised résumé |
| `projects/*.html` | Seven case studies, one per project |
| `assets/css/styles.css` | The whole design system in a single file |
| `assets/js/main.js` | Theme toggle, scrollspy, section reveal, copy-email, print |
| `assets/img/` | Portrait and social share card |
| `assets/covers/` | Hand-built SVG covers for each project |

## Projects

| # | Project | What it is |
| --- | --- | --- |
| 01 | **ScholarBridge** | Admissions-support app connecting students to scholarships and college information |
| 02 | **Sneaker Vault** | Sneaker reselling storefront, catalogue through sizing, verification and Paystack checkout |
| 03 | **GRAMIC Platform** | Management platform for a non-profit: outreaches, volunteers, programmes |
| 04 | **OpenGrid Sentinel** | Arduino build across temperature, humidity, distance, motion and light sensing |
| 05 | **Door-Unlocking Mechanism** | Arduino-controlled entry system for shared spaces |
| 06 | **64-bit CPU Project** | Instruction set, datapath, control unit, memory and pipeline, worked end to end |
| 07 | **Used-Car Price Prediction** | Python regression study from messy listings to a judged model |

Each one has a case study at `projects/<name>.html`.

## Stack

Plain HTML, CSS and JavaScript. No framework, no bundler, no dependencies.

- **Design:** light-first liquid glass, with dark mode persisted to `localStorage`
- **Type:** Inter for text, JetBrains Mono for code
- **A11y:** skip link, visible focus rings, `prefers-reduced-motion` respected

## Run it locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Notes

No build step, so the repo is the site. Commit, push, refresh.

## Author

- GitHub: [@jayminforson](https://github.com/jayminforson)
- LinkedIn: [Boateng-Kissi Benjamin](https://www.linkedin.com/in/boateng-kissi-benjaminamin)
