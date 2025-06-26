// Mock Virus Database (SHA-256 hashes of "infected" files)
const VIRUS_DB = [
    "5d41402abc4b2a76b9719d911017c592", // Sample hash 1
    "7d793037a0760186574b0282f2f435e7"  // Sample hash 2
];

// File Scanner
document.getElementById('scan-btn').addEventListener('click', async () => {
    const files = document.getElementById('file-input').files;
    if (files.length === 0) return alert("Please select files first!");
    
    const threatList = document.getElementById('threat-list');
    threatList.innerHTML = "";
    
    for (let file of files) {
        const fileHash = await calculateMD5(file);
        const isInfected = VIRUS_DB.includes(fileHash);
        
        const resultItem = document.createElement('div');
        resultItem.className = isInfected ? 'threat-item infected' : 'threat-item clean';
        resultItem.innerHTML = `
            <span>${file.name}</span>
            <span>${isInfected ? '🦠 INFECTED' : '✅ CLEAN'}</span>
            ${isInfected ? `<button class="quarantine-btn" data-name="${file.name}">Quarantine</button>` : ''}
        `;
        threatList.appendChild(resultItem);
    }
    
    document.getElementById('scan-results').classList.remove('hidden');
});

// Quarantine System
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('quarantine-btn')) {
        const fileName = e.target.getAttribute('data-name');
        const quarantineList = document.getElementById('quarantine-list');
        
        if (quarantineList.innerHTML.includes("No files")) {
            quarantineList.innerHTML = '';
        }
        
        quarantineList.innerHTML += `
            <div class="quarantine-item">
                <span>${fileName}</span>
                <button class="restore-btn">Restore</button>
            </div>
        `;
        
        e.target.parentElement.remove();
    }
});

// File Hashing
document.getElementById('hash-btn').addEventListener('click', async () => {
    const file = document.getElementById('hash-file-input').files[0];
    if (!file) return alert("Select a file first!");
    
    const hash = await calculateMD5(file);
    document.getElementById('hash-result').innerHTML = `
        <p><strong>${file.name}</strong></p>
        <p>MD5: <code>${hash}</code></p>
    `;
});

// Helper: Calculate MD5 Hash (simplified)
async function calculateMD5(file) {
    return new Promise((resolve) => {
        // In real app, use Crypto API for actual hashing
        const fakeHashes = {
            "test.txt": "5d41402abc4b2a76b9719d911017c592",
            "virus.exe": "7d793037a0760186574b0282f2f435e7"
        };
        resolve(fakeHashes[file.name] || "randomhash123");
    });
}