/**
 * НОЛЬ ПК — Официальный скрипт управления
 * Функционал: Неоновые частицы, Интерактивная карта, Бронирование
 */

// 1. ИНИЦИАЛИЗАЦИЯ EMAILJS
(function() {
    // Твой Public Key остается прежним
    emailjs.init("uMomqe3GHuHo1r5KO"); 
})();

document.addEventListener('DOMContentLoaded', () => {

    // --- 2. ГЕНЕРАЦИЯ КАРТЫ МЕСТ (30 ПК) ---
    const pcGrid = document.getElementById('pc-grid');
    if (pcGrid) {
        for (let i = 1; i <= 30; i++) {
            const slot = document.createElement('div');
            slot.className = 'pc-slot';
            
            // Рандомная занятость для эффекта живого клуба
            if (Math.random() < 0.25) {
                slot.classList.add('busy');
            }

            slot.innerHTML = `<span>${i}</span>`;
            
            // Клик по компьютеру
            slot.addEventListener('click', () => {
                if (!slot.classList.contains('busy')) {
                    // Авто-выбор зоны в форме
                    const tariffSelect = document.querySelector('select[name="user_tariff"]');
                    if (tariffSelect) {
                        // Места 21-30 по умолчанию VIP
                        tariffSelect.value = i > 20 ? 'VIP' : 'Standard';
                    }
                    
                    // Плавный переход к бронированию
                    document.getElementById('booking').scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                    
                    // Подсветка выбранного места (опционально)
                    console.log(`Место №${i} выбрано пользователем`);
                }
            });
            pcGrid.appendChild(slot);
        }
    }

    // --- 3. АНИМАЦИЯ НЕОНОВЫХ ЧАСТИЦ (HERO CANVAS) ---
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
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Бесконечный цикл движения
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                // Цвет частиц под стать неоновому фону
                ctx.fillStyle = 'rgba(0, 242, 255, 0.3)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            particlesArray = [];
            const count = window.innerWidth < 768 ? 40 : 100;
            for (let i = 0; i < count; i++) {
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

    // --- 4. ОТПРАВКА ЗАЯВКИ (EMAILJS) ---
    const orderForm = document.getElementById('order-form');
    const submitBtn = document.getElementById('submit-btn');

    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Блокируем кнопку
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "ОБРАБОТКА...";
            submitBtn.disabled = true;

            // Отправляем данные
            // Твои ID: service_ernscfc и template_vakrk4p
            emailjs.sendForm('service_ernscfc', 'template_vakrk4p', this)
                .then(() => {
                    alert('УСПЕХ! МЕСТО ЗАБРОНИРОВАНО. МЫ СКОРО ПЕРЕЗВОНИМ.');
                    orderForm.reset();
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                }, (error) => {
                    console.error('Ошибка:', error);
                    alert('УПС! ЧТО-ТО ПОШЛО НЕ ТАК. ПОПРОБУЙТЕ ЕЩЕ РАЗ.');
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

    // --- 5. ИНИЦИАЛИЗАЦИЯ AOS ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50
        });
    }
});
