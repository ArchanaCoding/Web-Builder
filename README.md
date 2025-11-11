# Website Builder 

## Run Instructions
```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```
After a few seconds, it will show a local URL like  http://localhost:5173/ Open that link in your browser.

## Tech Choices (and why)
| Technology       | Purpose                            | Why We Chose It                                      |
| ---------------- | ---------------------------------- | ---------------------------------------------------- |
| **React**        | To build the app UI                | It's simple, component-based       |
| **TypeScript**   | To add type safety                 | Catches bugs early and makes code more reliable      |
| **Zustand**      | To manage app data              | Lightweight and super easy to use                    |
| **Vite**         | To build and run the project       | Very fast, modern, and simple to configure           |
| **Tailwind CSS** | To style the app                   | Makes it easy to design responsive and clean layouts |
| **DnD Kit**      | To enable drag-and-drop            | Helps users rearrange elements smoothly              |
| **Lucide Icons** | For modern icons                   | Lightweight and visually consistent                  |
| **JSZip**        | To create downloadable ZIP exports | Allows saving full projects easily                   |

## LocalStorage Schema
- Your work is automatically saved in your browser so that if you reload the page, nothing is lost.
It uses the key:
``website-builder-project``
- Here’s what the saved data looks like inside local storage:

```
{
  "name": "My Website",
  "theme": "light",
  "pages": [
    {
      "id": "home",
      "name": "Home",
      "sections": [
        {
          "id": "sec1",
          "type": "text",
          "data": {
            "heading": "Welcome!",
            "body": "This is my homepage content."
          }
        }
      ]
    }
  ]
}
```


**Why this is helpful:**
- Keeps your data safe even after refreshing the page
- No need for an account or backend — all data stays in your browser


## Export Format

| File                | Description                                               |
| ------------------- | --------------------------------------------------------- |
| **index.html**      | The main home page                                        |
| **other-page.html** | Extra pages (if you created more)                         |
| **styles.css**      | Contains your project’s styling and theme                 |
| **project.json**    | Raw project data (so you can re-import or reuse it later) |


### Example folder inside ZIP:
```
my-website.zip
│
├── index.html
├── about.html
├── styles.css
└── project.json
```
- You can unzip this and open index.html directly in any browser to view your site!
- This project is made to help people build simple websites without coding.
You can drag, drop, write, and export — all inside your browser!