import path from "path";
import fs from "fs";
import { fileURLToPath } from "url"; // Helper to get __dirname in ES Modules
import "dotenv/config"; // Load environment variables from .env file

// Instead of importing fetchData, let's define our own fetch function here
async function fetchData<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorBody = await response.text();
    console.error(
      `Fetch error ${response.status}: ${response.statusText}`,
      errorBody
    );
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${
        errorBody || response.statusText
      }`
    );
  }
  return response.json() as Promise<T>;
}

// Define the CategoryType structure if needed, or import it
// type CategoryType = { ... };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define headers (ensure API_AUTH_TOKEN is loaded from .env)
const headers = {
  Authorization: `Basic ${process.env.API_AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

async function generateCategoriesFile() {
  console.log("Fetching categories...");
  try {
    const categoriesUrl = `${process.env.NEXT_PUBLIC_EPOS_URL}/Category`;
    const categoriesResData = await fetchData(categoriesUrl, {
      method: "GET",
      headers,
    });

    // Define the output path relative to the project root
    const projectRoot = path.resolve(__dirname, ".."); // Go up one level from scripts/
    const filePath = path.join(projectRoot, "public", "data.json");

    console.log(`Writing data to ${filePath}...`);
    fs.writeFileSync(filePath, JSON.stringify(categoriesResData, null, 2));

    console.log("Successfully generated data.json!");
  } catch (error) {
    console.error("Error generating categories file:", error);
    process.exit(1); // Exit with error code
  }
}

generateCategoriesFile();
