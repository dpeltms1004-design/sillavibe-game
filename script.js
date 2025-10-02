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
    const noteSpeed = 1500; // ms

    // --- BEATMAP: Paste your generated beatmap here! ---
    const beatmap = 
 [{"time":2.779,"lane":0},{"time":3.678,"lane":1},{"time":4.762,"lane":2},{"time":5.95,"lane":3},{"time":7.104,"lane":0},{"time":8.338,"lane":2},{"time":9.488,"lane":1},{"time":10.587,"lane":3},{"time":11.207,"lane":0},{"time":11.509,"lane":0},{"time":11.842,"lane":1},{"time":12.256,"lane":2},{"time":12.716,"lane":3},{"time":13.183,"lane":0},{"time":14.096,"lane":3},{"time":14.599,"lane":3},{"time":15.067,"lane":1},{"time":16.283,"lane":2},{"time":16.555,"lane":0},{"time":16.969,"lane":1},{"time":17.35,"lane":2},{"time":17.854,"lane":3},{"time":21.186,"lane":0},{"time":22.506,"lane":3},{"time":23.65,"lane":1},{"time":24.724,"lane":2},{"time":25.935,"lane":3},{"time":27.013,"lane":0},{"time":28.273,"lane":0},{"time":29.439,"lane":1},{"time":30.419,"lane":2},{"time":30.677,"lane":3},{"time":31.095,"lane":3},{"time":31.511,"lane":1},{"time":32.759,"lane":0},{"time":33.032,"lane":2},{"time":33.452,"lane":3},{"time":33.877,"lane":1},{"time":35.027,"lane":3},{"time":35.299,"lane":0},{"time":35.743,"lane":1},{"time":36.162,"lane":2},{"time":39.844,"lane":0},{"time":41.161,"lane":3},{"time":42.445,"lane":2},{"time":43.681,"lane":1},{"time":44.588,"lane":0},{"time":44.7,"lane":1},{"time":44.85,"lane":0},{"time":46.024,"lane":2},{"time":47.123,"lane":3},{"time":48.217,"lane":1},{"time":49.493,"lane":0},{"time":50.676,"lane":2},{"time":51.805,"lane":1},{"time":52.952,"lane":3},{"time":53.971,"lane":0},{"time":54.098,"lane":2},{"time":54.254,"lane":0},{"time":55.36,"lane":1},{"time":56.489,"lane":3},{"time":57.626,"lane":2},{"time":58.943,"lane":0},{"time":60.062,"lane":1},{"time":61.197,"lane":2},{"time":62.424,"lane":3},{"time":63.377,"lane":0},{"time":63.508,"lane":2},{"time":63.719,"lane":0},{"time":64.824,"lane":1},{"time":65.852,"lane":2},{"time":66.898,"lane":3},{"time":67.924,"lane":0},{"time":69.193,"lane":1},{"time":70.566,"lane":2},{"time":71.772,"lane":3},{"time":72.848,"lane":0},{"time":72.928,"lane":1},{"time":72.995,"lane":2},{"time":75.1,"lane":1},{"time":75.176,"lane":2},{"time":75.252,"lane":3},{"time":77.657,"lane":1},{"time":96.724,"lane":0},{"time":96.84,"lane":1},{"time":96.901,"lane":2},{"time":97.076,"lane":0},{"time":97.143,"lane":1},{"time":97.265,"lane":2},{"time":97.963,"lane":1},{"time":98.074,"lane":2},{"time":98.202,"lane":2},{"time":98.746,"lane":0},{"time":99.566,"lane":2},{"time":100.329,"lane":1},{"time":101.094,"lane":3},{"time":101.946,"lane":0},{"time":102.857,"lane":1},{"time":108.146,"lane":2},{"time":109.485,"lane":1},{"time":109.813,"lane":2},{"time":111.894,"lane":0},{"time":112.307,"lane":2},{"time":112.859,"lane":1},{"time":114.928,"lane":0},{"time":115.384,"lane":2},{"time":115.973,"lane":1},{"time":118.044,"lane":3},{"time":118.573,"lane":0},{"time":119.006,"lane":1},{"time":119.81,"lane":2},{"time":120.014,"lane":1},{"time":120.176,"lane":0},{"time":120.377,"lane":1},{"time":120.775,"lane":2},{"time":121.129,"lane":3},{"time":122.524,"lane":0},{"time":122.669,"lane":3},{"time":123.965,"lane":1},{"time":124.245,"lane":2},{"time":125.609,"lane":0},{"time":125.807,"lane":3},{"time":127.7,"lane":0},{"time":127.862,"lane":2},{"time":128.044,"lane":1},{"time":128.338,"lane":3},{"time":128.574,"lane":0},{"time":129.093,"lane":1},{"time":129.242,"lane":2},{"time":129.432,"lane":3},{"time":129.665,"lane":0},{"time":129.814,"lane":1},{"time":129.927,"lane":2},{"time":130.129,"lane":3},{"time":130.225,"lane":0},{"time":130.311,"lane":1},{"time":130.422,"lane":0},{"time":130.609,"lane":2},{"time":132.024,"lane":0},{"time":132.131,"lane":1},{"time":132.212,"lane":2},{"time":132.4,"lane":0},{"time":132.475,"lane":1},{"time":132.568,"lane":2},{"time":132.808,"lane":0},{"time":132.877,"lane":1},{"time":132.99,"lane":2},{"time":133.17,"lane":0},{"time":133.234,"lane":1},{"time":133.33,"lane":2},{"time":133.662,"lane":2},{"time":134.035,"lane":3},{"time":134.259,"lane":3},{"time":134.832,"lane":1},{"time":135.008,"lane":0},{"time":137.675,"lane":2},{"time":139.458,"lane":3},{"time":140.542,"lane":0},{"time":141.424,"lane":1},{"time":142.216,"lane":2},{"time":143.552,"lane":3}]
    ;

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
        // Spawn notes based on audio time, adjusted for note speed to sync properly
        const lookaheadTime = gameAudio.currentTime + (noteSpeed / 1000);
        while (nextNoteIndex < beatmap.length && beatmap[nextNoteIndex].time <= lookaheadTime) {
            createNote(beatmap[nextNoteIndex].lane);
            nextNoteIndex++;
        }

        // Continue loop if game is still running
        if (gameAudio.paused || gameAudio.ended) {
            if (hp > 0) stopGame(); // Stop if song ends
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