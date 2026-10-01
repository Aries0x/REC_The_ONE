document.addEventListener('DOMContentLoaded', () => {
    const uploadSection = document.getElementById('uploadSection');
    const analyzingSection = document.getElementById('analyzingSection');
    const resultsSection = document.getElementById('resultsSection');
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const resetBtn = document.getElementById('resetBtn');
    const statusText = document.getElementById('statusText');

    // Score Elements
    const scoreCircle = document.getElementById('scoreCircle');
    const scoreText = document.getElementById('scoreText');
    const verdictText = document.getElementById('verdictText');

    // Drag and Drop Logic
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
    });

    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) handleFile(files[0]);
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) handleFile(e.target.files[0]);
    });

    // Reset Logic
    resetBtn.addEventListener('click', () => {
        resultsSection.classList.add('hidden');
        uploadSection.classList.remove('hidden');
        scoreCircle.setAttribute('stroke-dasharray', '0, 100');
        scoreText.textContent = '0%';
        fileInput.value = ''; // clear input
    });

    // Mock Analysis Workflow
    function handleFile(file) {
        uploadSection.classList.add('hidden');
        analyzingSection.classList.remove('hidden');

        // Sequence of status texts
        const statuses = [
            "Extracting audio frequency spectrum...",
            "Analyzing visual frames with ViT...",
            "Cross-referencing biometric logic...",
            "Generating forensic heatmaps..."
        ];

        let statusIndex = 0;
        const statusInterval = setInterval(() => {
            if(statusIndex < statuses.length) {
                statusText.textContent = statuses[statusIndex];
                statusIndex++;
            }
        }, 800);

        // Finish analysis after 3.5 seconds
        setTimeout(() => {
            clearInterval(statusInterval);
            showResults();
        }, 3500);
    }

    function showResults() {
        analyzingSection.classList.add('hidden');
        resultsSection.classList.remove('hidden');

        // Mock result data (e.g. 23% Trust Score - Deepfake detected)
        const trustScore = 23; 
        
        // Animate Circle
        setTimeout(() => {
            scoreCircle.setAttribute('stroke-dasharray', `${trustScore}, 100`);
            
            // Color based on score
            let color = '';
            let verdict = '';
            if (trustScore > 80) {
                color = '#2ed573'; // Success green
                verdict = 'Authentic Media';
            } else if (trustScore > 50) {
                color = '#ffa502'; // Warning orange
                verdict = 'Suspicious Elements';
            } else {
                color = '#ff4757'; // Danger red
                verdict = 'Synthetic / Deepfake';
            }

            scoreCircle.style.stroke = color;
            verdictText.textContent = verdict;
            verdictText.style.color = color;
            
            // Animate number
            animateValue(scoreText, 0, trustScore, 1500);
        }, 100);
    }

    // Number animation helper
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});
