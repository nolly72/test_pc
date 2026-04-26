/**
 * НОЛЬ ПК — Официальный скрипт управления интерфейсом
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. ИНИЦИАЛИЗАЦИЯ EMAILJS (Твой Public Key)
    emailjs.init("uMomqe3GHuHo1r5KO");

    // 2. ЖИВЫЕ ЦИФРОВЫЕ ЧАСЫ (Точно как на скриншоте)
    const updateClock = () => {
        const clockElement = document.getElementById('digital-clock');
        if (clockElement) {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            clockElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
    };
    setInterval(updateClock, 1000);
    updateClock();

    // 3. ГЕНЕРАЦИЯ КАРТЫ ЗАЛА (30 ПК)
    const pcGrid = document.getElementById('pc-grid');
    if (pcGrid) {
        for (let i = 1; i <= 30; i++) {
            const slot = document.createElement('div');
            slot.className = 'pc-slot';
            
            // Рандомная занятость для красоты
            if (Math.random() < 0.2) slot.classList.add('busy');
            
            slot.innerHTML = `<span>${i}</span>`;
            
            // Логика выбора места
            slot.addEventListener('click', () => {
                if (!slot.classList.contains('busy')) {
                    // Прокрутка к форме
                    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
                    
                    // Авто-выбор зоны
                    const zoneSelect = document.querySelector('select[name="user_tariff"]');
                    if (zoneSelect) {
                        zoneSelect.value = i > 25 ? 'VIP' : 'Standard';
                    }
                }
            });
            pcGrid.appendChild(slot);
        }
    }

    // 4. ОБРАБОТКА ФОРМЫ БРОНИРОВАНИЯ
    const orderForm = document.getElementById('order-form');
    const submitBtn = document.getElementById('submit-btn');

    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Индикация загрузки
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "ОТПРАВЛЯЕМ...";
            submitBtn.disabled = true;

            // Отправка через EmailJS
            // Твои ID: service_ernscfc и template_vakrk4p
            emailjs.sendForm('service_ernscfc', 'template_vakrk4p', this)
                .then(() => {
                    alert('УСПЕШНО! МЕСТО ЗАБРОНИРОВАНО. МЫ СКОРО ПЕРЕЗВОНИМ.');
                    orderForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, (error) => {
                    console.error('Ошибка:', error);
                    alert('ОШИБКА ОТПРАВКИ. ПОПРОБУЙТЕ ЕЩЕ РАЗ.');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // 5. АНИМАЦИЯ ЧАСТИЦ НА ФОНЕ (HERO CANVAS)
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                ctx.fillStyle = 'rgba(0, 242, 255, 0.2)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 80; i++) particles.push(new Particle());

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        };
        animate();
    }

    // 6. ИНИЦИАЛИЗАЦИЯ АНИМАЦИЙ AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }
});
