/**
 * НОЛЬ ПК — Официальный скрипт управления сайтом
 * Функционал: Прелоадер, Частицы, Карта мест, EmailJS
 */

// 1. ИНИЦИАЛИЗАЦИЯ EMAILJS
// Вставь сюда свой Public Key из личного кабинета EmailJS
(function() {
    emailjs.init("uMomqe3GHuHo1r5KO"); 
})();

document.addEventListener('DOMContentLoaded', () => {



    // Имитация загрузки ресурсов
    const loadingInterval = setInterval(() => {
        if (width >= 100) {
            clearInterval(loadingInterval);
            // Плавное исчезновение
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
            }, 500);
        } else {
            // Случайный шаг для естественности
            width += Math.floor(Math.random() * 10) + 1;
            if (width > 100) width = 100;
            loaderBar.style.width = width + '%';
            loaderPercent.innerText = width + '%';
        }
    }, 150);


    // --- 3. АНИМАЦИЯ ЧАСТИЦ (HERO CANVAS) ---
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        
        // Подгонка размера
        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', setCanvasSize);
        setCanvasSize();

        // Класс частицы
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
                // Возврат при выходе за границы
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
            const numberOfParticles = 80;
            for (let i = 0; i < numberOfParticles; i++) {
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


    // --- 4. ГЕНЕРАЦИЯ КАРТЫ МЕСТ (30 ПК) ---
    const pcGrid = document.getElementById('pc-grid-container');
    if (pcGrid) {
        for (let i = 1; i <= 30; i++) {
            const slot = document.createElement('div');
            slot.className = 'pc-slot';
            
            // Логика: рандомно занимаем места для демонстрации
            // В реальности здесь может быть запрос к API клуба
            const isBusy = Math.random() < 0.2; 
            if (isBusy) slot.classList.add('busy');

            slot.innerHTML = `<span>${i}</span>`;
            
            // Клик по месту
            slot.addEventListener('click', () => {
                if (!slot.classList.contains('busy')) {
                    // Выбираем соответствующую зону в форме ниже
                    const zoneSelect = document.querySelector('select[name="zone"]');
                    if (i > 20) {
                        zoneSelect.value = 'VIP';
                    } else {
                        zoneSelect.value = 'Standard';
                    }
                    // Плавный скролл к форме
                    document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' });
                    // Визуальный эффект выбора
                    console.log(`Выбрано место №${i}`);
                }
            });

            pcGrid.appendChild(slot);
        }
    }


    // --- 5. ОБРАБОТКА ФОРМЫ БРОНИРОВАНИЯ ---
    const bookingForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Индикация загрузки на кнопке
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="btn-text">ОТПРАВКА...</span>';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            // Сбор данных и отправка через EmailJS
            // Замени 'YOUR_SERVICE_ID' и 'YOUR_TEMPLATE_ID' на свои
            emailjs.sendForm('service_ernscfc', 'template_vakrk4p', this)
                .then(() => {
                    alert('ОТЛИЧНО! Твоя заявка в NOLLY_PC принята. Ожидай звонка.');
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

    // --- 6. ИНИЦИАЛИЗАЦИЯ AOS (Анимация скролла) ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

});
