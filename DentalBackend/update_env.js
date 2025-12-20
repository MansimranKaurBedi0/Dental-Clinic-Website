const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const newEmail = "mdclinicjalandhar@gmail.com";
const newPass = "paks zizd avgo xxfe";

try {
    let content = "";
    if (fs.existsSync(envPath)) {
        content = fs.readFileSync(envPath, 'utf8');
    }

    let lines = content.split(/\r?\n/);
    let newLines = [];
    let userUpdated = false;
    let passUpdated = false;

    for (const line of lines) {
        if (line.trim().startsWith('EMAIL_USER=')) {
            newLines.push(`EMAIL_USER=${newEmail}`);
            userUpdated = true;
        } else if (line.trim().startsWith('EMAIL_PASS=')) {
            newLines.push(`EMAIL_PASS=${newPass}`);
            passUpdated = true;
        } else {
            newLines.push(line);
        }
    }

    if (!userUpdated) newLines.push(`EMAIL_USER=${newEmail}`);
    if (!passUpdated) newLines.push(`EMAIL_PASS=${newPass}`);

    fs.writeFileSync(envPath, newLines.join('\n'));
    console.log("✅ .env updated successfully");

} catch (err) {
    console.error("❌ Error updating .env:", err);
}
