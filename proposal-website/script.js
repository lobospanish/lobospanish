// Floating hearts animation
function createHeart() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Create hearts periodically
setInterval(createHeart, 300);

// Button interactions
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebration = document.getElementById('celebration');
const mainContainer = document.getElementById('mainContainer');

let noBtnClickCount = 0;

yesBtn.addEventListener('click', () => {
    mainContainer.style.display = 'none';
    celebration.classList.remove('hidden');
    
    // Create explosion of hearts
    for (let i = 0; i < 50; i++) {
        setTimeout(createHeart, i * 50);
    }
    
    // Play confetti effect
    createConfetti();
});

noBtn.addEventListener('click', (e) => {
    noBtnClickCount++;
    
    if (noBtnClickCount === 1) {
        noBtn.textContent = 'Are you sure? 🥺';
        noBtn.style.background = 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)';
    } else if (noBtnClickCount === 2) {
        noBtn.textContent = 'Think again! 💔';
        noBtn.style.background = 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)';
    } else if (noBtnClickCount === 3) {
        noBtn.textContent = 'Please? 🥹';
        noBtn.style.background = 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)';
        noBtn.style.color = 'white';
    } else {
        // Make the No button run away
        const container = mainContainer.getBoundingClientRect();
        const button = noBtn.getBoundingClientRect();
        
        const maxX = container.width - button.width - 40;
        const maxY = container.height - button.height - 40;
        
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        noBtn.style.position = 'absolute';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.textContent = 'Catch me! 😝';
    }
});

// Make Yes button grow when hovering over No button
noBtn.addEventListener('mouseenter', () => {
    if (noBtnClickCount >= 3) {
        yesBtn.style.transform = 'scale(1.2)';
        yesBtn.style.transition = 'transform 0.3s ease';
    }
});

noBtn.addEventListener('mouseleave', () => {
    yesBtn.style.transform = 'scale(1)';
});

// Confetti effect
function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffd700', '#ff69b4'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 30);
    }
}

// Add fall animation for confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add some initial hearts
for (let i = 0; i < 10; i++) {
    setTimeout(createHeart, i * 200);
}
