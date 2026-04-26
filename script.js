/**
 * НОЛЬ ПК — Официальный скрипт управления сайтом
 * Функционал: Частицы, Карта мест, EmailJS, AOS
 */

// 1. ИНИЦИАЛИЗАЦИЯ EMAILJS
(function() {
    emailjs.init("uMomqe3GHuHo1r5KO"); 
})();

document.addEventListener('DOMContentLoaded', () => {

    // --- 2. АНИМАЦИЯ ЧАСТИЦ (HERO CANVAS) ---
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
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.color = 'rgba(0, 242, 255, 0.5)';
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
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            for (let i = 0; i < 80; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }

    // --- 3. ГЕНЕРАЦИЯ КАРТЫ МЕСТ (30 ПК) ---
    const pcGrid = document.getElementById('pc-grid-container');
    if (pcGrid) {
        for (let i = 1; i <= 30; i++) {
            const slot = document.createElement('div');
            slot.className = 'pc-slot';
            
            // Рандомная занятость для красоты
            if (Math.random() < 0.2) slot.classList.add('busy');
            
            slot.innerHTML = `<span>${i}</span>`;
            
            slot.addEventListener('click', () => {
                if (!slot.classList.contains('busy')) {
                    const zoneSelect = document.querySelector('select[name="zone"]');
                    if (zoneSelect) {
                        zoneSelect.value = i > 25 ? 'VIP' : 'Standard';
                    }
                    const bookingFormSection = document.getElementById('booking-form');
                    if (bookingFormSection) {
                        bookingFormSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
            pcGrid.appendChild(slot);
        }
    }

    // --- 4. ОБРАБОТКА ФОРМЫ БРОНИРОВАНИЯ ---
    const bookingForm = document.getElementById('contact-form');
    // Находим кнопку внутри формы, чтобы не зависеть от ID
    const submitBtn = bookingForm ? bookingForm.querySelector('button[type="submit"]') : null;

    if (bookingForm && submitBtn) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="btn-text">ОТПРАВКА...</span>';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            emailjs.sendForm('service_ernscfc', 'template_vakrk4p', this)
                .then(() => {
                    alert('ОТЛИЧНО! Твоя заявка в НОЛЬ ПК принята. Ожидай звонка.');
                    bookingForm.reset();
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.opacity = '1';
                    submitBtn.disabled = false;
                }, (error) => {
                    console.error('Ошибка:', error);
                    alert('ЧТО-ТО ПОШЛО НЕ ТАК. Попробуй еще раз или позвони нам.');
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.opacity = '1';
                    submitBtn.disabled = false;
                });
        });
    }

    // --- 5. ИНИЦИАЛИЗАЦИЯ AOS ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true, offset: 100 });
    }
});
