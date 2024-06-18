const fs = require('fs');
const path = require('path');

const iconsDirectory = './dracula_icons';
const outputFile = './icons-preview.md';

// Create a stream to write to the output file
const output = fs.createWriteStream(outputFile);

// Read the directory
fs.readdir(iconsDirectory, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Filter for PNG files and write Markdown lines
  files.filter(file => file.endsWith('.png')).forEach(file => {
    const imageUrl = `https://raw.githubusercontent.com/Jas-SinghFSU/homepage-dracula/main/dracula_icons/${file}`;
    const markdownLine = `<a href="${imageUrl}"><img src="${imageUrl}" alt="${path.basename(file, '.png')}" height="50"></a>\n`;

    output.write(markdownLine);
  });

  output.end();
});

output.on('finish', () => {
  console.log('Markdown file has been created with previews of all PNG icons.');
});

output.on('error', (err) => {
  console.error('Error writing to file:', err);
});
