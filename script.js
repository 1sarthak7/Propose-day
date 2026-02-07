document.addEventListener('DOMContentLoaded', () => {
    
    // CONFIG
    const slides = ['s1', 's2', 's3', 's4', 's5'];
    let currentSlide = 0;
    const audio = document.getElementById('bg-music');
    
    // INIT
    startRain();
    
    // NAVIGATION
    document.getElementById('btn-start').addEventListener('click', () => {
        playAudio();
        nextSlide();
    });
    document.getElementById('btn-next').addEventListener('click', nextSlide);
    document.getElementById('btn-ask').addEventListener('click', nextSlide);

    function nextSlide() {
        const curr = document.getElementById(slides[currentSlide]);
        curr.classList.remove('active');
        
        setTimeout(() => {
            currentSlide++;
            if(currentSlide < slides.length) {
                document.getElementById(slides[currentSlide]).classList.add('active');
            }
        }, 600);
    }

    // AUDIO FADE
    function playAudio() {
        audio.volume = 0;
        audio.play().then(() => {
            let vol = 0;
            const fade = setInterval(() => {
                if(vol < 0.5) { vol += 0.05; audio.volume = vol; }
                else clearInterval(fade);
            }, 200);
        }).catch(e => console.log("Audio waiting..."));
    }

    // 🌸 1. CLICK EFFECT (Flowers bloom where you click)
    document.addEventListener('click', (e) => {
        createClickBloom(e.clientX, e.clientY);
    });

    function createClickBloom(x, y) {
        const bloom = document.createElement('div');
        bloom.innerText = Math.random() > 0.5 ? '🌸' : '🌹';
        bloom.classList.add('click-flower');
        bloom.style.left = `${x}px`;
        bloom.style.top = `${y}px`;
        
        // Random slight offset
        const rotation = Math.random() * 360;
        bloom.style.transform = `rotate(${rotation}deg)`;
        
        document.body.appendChild(bloom);
        
        setTimeout(() => bloom.remove(), 1000);
    }

    // 🌹 2. RAIN GENERATOR (Petals & Hearts)
    function startRain() {
        const container = document.getElementById('rain-container');
        
        setInterval(() => {
            const item = document.createElement('div');
            item.classList.add('falling-item');
            
            // Randomly choose shape: Heart or Petal
            const isPetal = Math.random() > 0.5;
            item.classList.add(isPetal ? 'shape-petal' : 'shape-heart');
            
            // Random styling
            const size = Math.random() * 15 + 10 + 'px';
            const left = Math.random() * 100 + 'vw';
            const duration = Math.random() * 5 + 5 + 's';
            const drift = (Math.random() - 0.5) * 150 + 'px';
            
            // Rose/Pink Palette
            const colors = ['#ff6b81', '#ff4757', '#ff7f50', '#ffffff', '#e84393'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            item.style.setProperty('--color', color);
            item.style.setProperty('--drift', drift);
            item.style.left = left;
            item.style.width = size;
            item.style.height = size;
            item.style.animationDuration = duration;
            
            container.appendChild(item);
            
            setTimeout(() => item.remove(), 10000);
            
        }, 300); // Frequency
    }

    // 💖 3. YES BUTTON CELEBRATION
    window.sayYes = function() {
        // Massive burst
        for(let i = 0; i < 50; i++) {
            setTimeout(() => {
                const x = window.innerWidth / 2 + (Math.random() - 0.5) * 300;
                const y = window.innerHeight / 2 + (Math.random() - 0.5) * 300;
                createClickBloom(x, y);
            }, i * 20);
        }
        nextSlide();
        if(audio.volume < 1) audio.volume = 1;
    };
});