const fs = require('fs');

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

fs.readFile('./package.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {
        const npmPackage = JSON.parse(jsonString);
        var date= new Date();
        npmPackage.lastReleaseDate = `${MONTHS[date.getMonth()]}. ${date.getDate()}`;
        
        fs.writeFile("./package.json", JSON.stringify(npmPackage, null, 2), err => {});
    } catch(err) {
        console.log('Error parsing JSON string:', err);
    }
})
