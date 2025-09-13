### Cosmic Explorer 🌌

A simple web app that uses NASA's free APIs to let you explore space. It's built with HTML, CSS, and JavaScript, following best practices for a clean and manageable project structure.

<img width="948" height="438" alt="image" src="https://github.com/user-attachments/assets/b9e5a293-cabd-4963-953b-9cdd4a5fbd8b" />

-----

### ✨ Features

  * **Astronomy Picture of the Day:** View a new space image or video every day.
  * **Mars Rover Photos:** See the latest photos taken by the Curiosity rover on Mars.
  * **Near-Earth Asteroids:** Get data on asteroids passing close to our planet.

-----

### 🚀 Getting Started

To get a copy of this project up and running on your local machine, follow these steps.

#### Prerequisites

  * **NASA API Key:** You'll need a free API key from NASA. Get one here: `https://api.nasa.gov/`.
  * **Code Editor:** A text editor like Visual Studio Code or Sublime Text.
  * **Web Browser:** Any modern web browser like Chrome, Firefox, or Safari.

#### Installation

1.  **Clone the repository:**

    ```bash
    git clone [your-repo-url]
    cd [your-repo-name]
    ```

2.  **Add your API Key:**

      * Create a new file in the project's root directory named `config.js`.
      * Add the following code to `config.js`, replacing `"YOUR_API_KEY"` with your actual key:
        ```javascript
        export const API_KEY = "YOUR_API_KEY";
        ```
      * Create or update the `.gitignore` file and add `config.js` to it. This prevents your key from being uploaded to GitHub.
        ```gitignore
        # Ignore the file containing the API key
        config.js
        ```

3.  **Run Locally:**
    Open the `index.html` file in your web browser.

-----

### 🌐 Deployment

This project is a static site and can be deployed easily to various hosting services.

  * **GitHub Pages:** Push your code to a GitHub repository and enable GitHub Pages in your repository settings. The site will be hosted at `https://[your-username].github.io/[your-repo-name]`.
  * **Render:** Connect your GitHub repository to a new project in Render. Render will automatically detect the static site and deploy it.

-----

### 🖼️ Media Credits

  * **Cosmic Background Video:** Created with a public domain video.
  * **Icons:** The rocket, universe, rover, and asteroid icons were sourced from Flaticon and Gemini.
