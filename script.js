document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const scoreDisplay = document.getElementById('score');
    const hpDisplay = document.getElementById('hp');
    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');
    const creatorModeButton = document.getElementById('creator-mode-button');
    const rankList = document.getElementById('rank-list');
    const gameAudio = document.getElementById('game-audio');
    const lanes = Array.from(document.querySelectorAll('.lane'));

    // Game Constants
    const keyMap = {'a': 0, 's': 1, 'd': 2, 'f': 3};
    const imageFiles = [
        'img/free-icon-emerald-3530625.png',
        'img/free-icon-gem-785126.png',
        'img/free-icon-gem-9412457.png',
        'img/free-icon-gemstone-1664529.png'
    ];
    const noteSpeed = 3000; // ms

    // --- BEATMAP: Paste your generated beatmap here! ---
    const beatmap = [
        { time: 1.0, lane: 0 }, { time: 1.5, lane: 1 }, { time: 2.0, lane: 2 }, { time: 2.5, lane: 3 },
        { time: 3.0, lane: 0 }, { time: 3.0, lane: 2 },
    ];

    // Game State
    let score = 0;
    let hp = 8;
    let rankings = [];
    let nextNoteIndex = 0;
    let animationFrameId = null;
    let isCreatorMode = false;
    let newBeatmap = [];

    // --- Core Game Logic ---

    function gameLoop() {
        while (nextNoteIndex < beatmap.length && beatmap[nextNoteIndex].time <= gameAudio.currentTime) {
            createNote(beatmap[nextNoteIndex].lane);
            nextNoteIndex++;
        }
        if (gameAudio.paused || gameAudio.ended) {
            if (hp > 0) stopGame();
        } else {
            animationFrameId = requestAnimationFrame(gameLoop);
        }
    }

    function createNote(laneIndex) {
        const note = document.createElement('img');
        note.classList.add('note');
        note.src = imageFiles[Math.floor(Math.random() * imageFiles.length)];
        note.dataset.lane = laneIndex;
        note.style.animation = `fall ${noteSpeed / 1000}s linear`;
        lanes[laneIndex].appendChild(note);

        setTimeout(() => {
            if (note.parentNode === lanes[laneIndex]) {
                lanes[laneIndex].removeChild(note);
                if (!isCreatorMode) {
                    hp -= 1;
                    hpDisplay.textContent = hp;
                    if (hp <= 0) {
                        alert('게임 오버!');
                        stopGame();
                    }
                }
            }
        }, noteSpeed);
    }

    function startGame() {
        isCreatorMode = false;
        score = 0;
        hp = 8;
        nextNoteIndex = 0;
        scoreDisplay.textContent = score;
        hpDisplay.textContent = hp;
        document.querySelectorAll('.note').forEach(note => note.remove());

        gameAudio.currentTime = 0;
        gameAudio.play();

        animationFrameId = requestAnimationFrame(gameLoop);

        startButton.disabled = true;
        stopButton.disabled = false;
        creatorModeButton.disabled = true;
    }

    function stopGame() {
        gameAudio.pause();
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        isCreatorMode = false;
        
        updateRankings(score);

        startButton.disabled = false;
        stopButton.disabled = true;
        creatorModeButton.disabled = false;
    }

    // --- Creator Mode Logic ---

    function startCreatorMode() {
        isCreatorMode = true;
        newBeatmap = [];
        
        gameAudio.currentTime = 0;
        gameAudio.play();

        alert('채보 만들기 모드를 시작합니다! 음악에 맞춰 키를 누르세요. 음악이 끝나면 결과가 콘솔에 출력됩니다.');

        startButton.disabled = true;
        stopButton.disabled = false; // Allow stopping creator mode
        creatorModeButton.disabled = true;

        gameAudio.onended = () => {
            alert('채보 만들기가 완료되었습니다! F12를 눌러 개발자 콘솔에서 결과를 확인하세요.');
            console.log("// --- 복사해서 붙여넣으세요! ---");
            console.log(JSON.stringify(newBeatmap));
            console.log("// ---------------------------");
            stopGame();
        };
    }

    // --- Input Handling ---

    function handleKeyPress(e) {
        const key = e.key.toLowerCase();
        if (!keyMap.hasOwnProperty(key)) return;
        const laneIndex = keyMap[key];
        const keyElement = document.querySelector(`.lane[data-lane='${laneIndex}'] .key`);

        keyElement.classList.add('active');
        setTimeout(() => keyElement.classList.remove('active'), 100);

        if (isCreatorMode) {
            // Record notes in creator mode
            const beat = { time: parseFloat(gameAudio.currentTime.toFixed(3)), lane: laneIndex };
            newBeatmap.push(beat);
        } else {
            // Normal game hit detection
            if (gameAudio.paused) return;
            let hit = false;
            const notesInLane = lanes[laneIndex].querySelectorAll('.note');
            notesInLane.forEach(note => {
                if (hit) return;
                const noteRect = note.getBoundingClientRect();
                const keyRect = keyElement.getBoundingClientRect();

                if (noteRect.bottom > keyRect.top && noteRect.top < keyRect.bottom) {
                    score += 10;
                    scoreDisplay.textContent = score;
                    note.remove();
                    hit = true;
                }
            });
        }
    }

    // --- Leaderboard Logic ---

    function loadRankings() {
        const savedRankings = localStorage.getItem('sillaVibeRankings');
        if (savedRankings) rankings = JSON.parse(savedRankings);
        displayRankings();
    }

    function displayRankings() {
        rankList.innerHTML = '';
        rankings.slice(0, 10).forEach((rank, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}위: ${rank}점`;
            rankList.appendChild(li);
        });
    }

    function updateRankings(newScore) {
        if (newScore > 0) {
            rankings.push(newScore);
            rankings.sort((a, b) => b - a);
            localStorage.setItem('sillaVibeRankings', JSON.stringify(rankings));
            displayRankings();
        }
    }

    // --- Initial Setup ---
    hpDisplay.textContent = hp;
    stopButton.disabled = true;
    loadRankings();
    startButton.addEventListener('click', startGame);
    stopButton.addEventListener('click', stopGame);
    creatorModeButton.addEventListener('click', startCreatorMode);
    document.addEventListener('keydown', handleKeyPress);
});