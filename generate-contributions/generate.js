const githubContributionsGenerator = require('github-contributions-generator');

const options = {
  username: 'gauravrathod802',
  // Add other options as needed
};

githubContributionsGenerator(options)
  .then(svg => {
    console.log(svg);
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
