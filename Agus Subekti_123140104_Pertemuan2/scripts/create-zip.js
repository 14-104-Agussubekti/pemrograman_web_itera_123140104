import JSZip from "jszip"
import fs from "fs"
import path from "path"

// Baca semua file yang diperlukan
const files = {
  "index.html": fs.readFileSync(path.join(process.cwd(), "index.html"), "utf-8"),
  "styles.css": fs.readFileSync(path.join(process.cwd(), "styles.css"), "utf-8"),
  "app.js": fs.readFileSync(path.join(process.cwd(), "app.js"), "utf-8"),
  "README.md": fs.readFileSync(path.join(process.cwd(), "README.md"), "utf-8"),
}

// Buat ZIP
const zip = new JSZip()
Object.entries(files).forEach(([filename, content]) => {
  zip.file(filename, content)
})

// Generate ZIP file
zip.generateAsync({ type: "nodebuffer" }).then((content) => {
  fs.writeFileSync("personal-dashboard.zip", content)
  console.log("[v0] ZIP file created: personal-dashboard.zip")
})
