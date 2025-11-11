// custom export system that converts data from a React/TypScript project to HTML, CSS, and JSON and creates a .zip file.
import JSZip from 'jszip';
import { Project, Page, Section, TextSectionData, ImageSectionData, ButtonSectionData } from '../types';

const generateSectionHTML = (section: Section): string => {
  if (section.type === 'text') {
    const data = section.data as TextSectionData;
    return `
    <section class="text-section">
      <h2>${data.heading}</h2>
      <p>${data.body}</p>
    </section>`;
  }

  if (section.type === 'image') {
    const data = section.data as ImageSectionData;
    return `
    <section class="image-section">
      <img src="${data.src}" alt="${data.alt}" />
    </section>`;
  }

  if (section.type === 'button') {
    const data = section.data as ButtonSectionData;
    return `
    <section class="button-section">
      <a href="${data.href}" class="button">${data.label}</a>
    </section>`;
  }

  return '';
};

const generatePageHTML = (page: Page, project: Project, allPages: Page[]): string => {
  const sectionsHTML = page.sections.map(generateSectionHTML).join('\n');

  const navigation = allPages.map(p =>
    `        <a href="${p.id}.html" class="${p.id === page.id ? 'active' : ''}">${p.name}</a>`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.name} - ${project.name}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body class="${project.theme}">
  <nav class="navigation">
    <div class="nav-container">
      <h1 class="site-title">${project.name}</h1>
      <div class="nav-links">
${navigation}
      </div>
    </div>
  </nav>

  <main class="container">
${sectionsHTML}
  </main>
</body>
</html>`;
};

const generateCSS = (theme: string): string => {
  return `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  min-height: 100vh;
}

body.light {
  background-color: #f9fafb;
  color: #1f2937;
}

body.dark {
  background-color: #111827;
  color: #f9fafb;
}

.navigation {
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dark .navigation {
  background-color: #1f2937;
  border-bottom-color: #374151;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.site-title {
  font-size: 1.5rem;
  font-weight: 700;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links a {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.dark .nav-links a {
  color: #d1d5db;
}

.nav-links a:hover,
.nav-links a.active {
  background-color: #3b82f6;
  color: white;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

section {
  margin-bottom: 2rem;
}

.text-section {
  padding: 2rem;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dark .text-section {
  background-color: #1f2937;
}

.text-section h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
}

.dark .text-section h2 {
  color: white;
}

.text-section p {
  font-size: 1.125rem;
  color: #4b5563;
  line-height: 1.75;
}

.dark .text-section p {
  color: #d1d5db;
}

.image-section {
  padding: 1rem;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dark .image-section {
  background-color: #1f2937;
}

.image-section img {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.button-section {
  padding: 2rem;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
}

.dark .button-section {
  background-color: #1f2937;
}

.button {
  display: inline-block;
  padding: 0.75rem 2rem;
  background-color: #3b82f6;
  color: white;
  text-decoration: none;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
}

.button:hover {
  background-color: #2563eb;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .text-section h2 {
    font-size: 1.5rem;
  }

  .text-section p {
    font-size: 1rem;
  }
}`;
};

export const exportProject = async (project: Project): Promise<void> => {
  const zip = new JSZip();

  const homePage = project.pages[0];
  const indexHTML = generatePageHTML(homePage, project, project.pages);
  zip.file('index.html', indexHTML);

  project.pages.forEach((page, index) => {
    if (index === 0) return;
    const pageHTML = generatePageHTML(page, project, project.pages);
    zip.file(`${page.id}.html`, pageHTML);
  });

  const css = generateCSS(project.theme);
  zip.file('styles.css', css);

  zip.file('project.json', JSON.stringify(project, null, 2));

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${project.name.replace(/\s+/g, '-').toLowerCase()}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
