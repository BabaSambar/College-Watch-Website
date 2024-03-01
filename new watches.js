
const fs = require('fs');

const directory = './images/';

function getNewWatches(directory)
{
    const files = fs.readdirSync(directory);

    // Filter out PNG files and get file stats
    const fileStats = files.filter(file => file.endsWith('.png'))
                           .map(file => ({ file, mtime: fs.statSync(directory + file).mtime }))
                           .sort((a, b) => b.mtime - a.mtime); // Sort by modification time
                    
    // Get the paths of the three most recently modified PNG images
    const recentPNGImages = fileStats.slice(0, 3).map(file => directory + file.file);

    return recentPNGImages;
}

// Function to add 3 newest watches on page load
function addImages()
{
    const newWatches = getNewWatches(directory);

    var image = document.createElement("img");
    image.src = newWatches[0];
    image.alt = "NEWEST WATCH!";


    anchor.appendChild(image);

    console.log("Done");
}


window.onload = function()
{
    addImages();
}