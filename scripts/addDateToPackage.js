const fs = require('fs')

var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Dec"];

fs.readFile('./package.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {
        const npmPackage = JSON.parse(jsonString);
        var date= new Date();
        npmPackage.lastReleaseDate = `${months[date.getMonth()]}. ${date.getDate()}`;
        
        fs.writeFile("./package.json", JSON.stringify(npmPackage, null, 2), err => {});

    } catch(err) {
        console.log('Error parsing JSON string:', err)
    }
})
