#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Replace the placeholder in script.js with the actual API_KEY from the environment variable
sed -i "s|__API_KEY_PLACEHOLDER__|\"$API_KEY\"|g" script.js

# Note: For macOS users, you might need 'sed -i ""' instead
# Example: sed -i "" "s|__API_KEY_PLACEHOLDER__|\"$API_KEY\"|g" script.js
```
eof

### Step 3: Update Render's Build Command

1.  Go to your service in the Render dashboard.
2.  Navigate to the **Settings** tab.
3.  Under **Build Command**, replace the default command with:
    `./build.sh`

### What to Do Next

1.  **Save** the `script.js` file with the placeholder.
2.  **Create** and save the `build.sh` file.
3.  **Commit** both files and push them to your GitHub repository.

```bash
git add .
git commit -m "Fix: Add build script to handle API key"
git push
