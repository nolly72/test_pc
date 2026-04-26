/**
 * НОЛЬ ПК — Официальный скрипт управления сайтом
 * Функционал: Частицы, Карта мест, Бронирование через EmailJS
 */

// 1. ИНИЦИАЛИЗАЦИЯ EMAILJS
(function() {
    // Используем твой Public Key
    emailjs.init("uMomqe3GHuHo1r5KO"); 
})();

document.addEventListener('DOMContentLoaded', () => {

    // --- 2. ГЕНЕРАЦИЯ КАРТЫ МЕСТ (30 ПК) ---
    const pcGrid = document.getElementById('pc-grid');
    if (pcGrid) {
        for (let i = 1; i <= 30; i++) {
            const slot = document.createElement('div');
            slot.className = 'pc-slot';
            
            // Имитация занятых мест (каждое 5-е место занято)
            if (i % 5 === 0) {
                slot.classList.add('busy');
            }

            slot.innerHTML = `<span>${i}</span>`;
            
            // Логика выбора места
            slot.addEventListener('click', () => {
                if (!slot.classList.contains('busy')) {
                    // Автоматический выбор тарифа в зависимости от номера ПК
                    const tariffSelect = document.querySelector('select[name="user_tariff"]');
                    if (tariffSelect) {
                        // Предположим, ПК с 21 по 30 — это VIP
                        tariffSelect.value = i > 20 ? 'VIP' : 'Standard';
                    }
                    
                    // Плавный скролл к форме бронирования
                    document.getElementById('booking').scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                }
            });
            pcGrid.appendChild(slot);
        }
    }

    // --- 3. АНИМАЦИЯ ЧАСТИЦ (HERO CANVAS) ---
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        
        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', setCanvasSize);
        setCanvasSize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
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
                ctx.fillStyle = 'rgba(0, 242, 255, 0.4)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            particlesArray = [];
            for (let i = 0; i < 100; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }

        init();
        animate();
    }

    // --- 4. ОБРАБОТКА ФОРМЫ (ОТПРАВКА НА EMAIL) ---
    const orderForm = document.getElementById('order-form');
    const submitBtn = document.getElementById('submit-btn');

    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Визуальная индикация отправки
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "ОТПРАВКА...";
            submitBtn.disabled = true;

            // Отправка формы через EmailJS
            // 'service_ernscfc' и 'template_vakrk4p' — твои актуальные ID
            emailjs.sendForm('service_ernscfc', 'template_vakrk4p', this)
                .then(() => {
                    alert('ОТЛИЧНО! ЗАЯВКА ПРИНЯТА. МЫ СКОРО СВЯЖЕМСЯ С ТОБОЙ.');
                    orderForm.reset();
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                }, (error) => {
                    console.error('Ошибка:', error);
                    alert('ОШИБКА ОТПРАВКИ. ПОПРОБУЙТЕ ЕЩЕ РАЗ.');
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // --- 5. ИНИЦИАЛИЗАЦИЯ AOS ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
});
