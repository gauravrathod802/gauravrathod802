const fs = require('fs');
const fetch = require('node-fetch');

async function fetchContributions(username) {
  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  return data.data.user.contributionsCollection.contributionCalendar;
}

function generateSVG(contributions) {
  // Your SVG generation logic here using contributions data
  // For simplicity, you can use a basic SVG template
  const svgTemplate = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="200">
      <!-- Your SVG content here -->
    </svg>
  `;

  return svgTemplate;
}

async function run() {
  const username = 'gauravrathod802';
  const contributions = await fetchContributions(username);
  const svgContent = generateSVG(contributions);

  fs.writeFileSync('dist/github-contribution-grid-snake.svg', svgContent);
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
