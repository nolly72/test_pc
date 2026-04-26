document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ЦИФРОВЫЕ ЧАСЫ (Обновление каждую секунду)
    const updateClock = () => {
        const clockElement = document.getElementById('digital-clock');
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getHours()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        if (clockElement) {
            clockElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
    };
    setInterval(updateClock, 1000);
    updateClock();

    // 2. ПЛАВНЫЙ СКРОЛЛ ДЛЯ НАВИГАЦИИ
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Убираем класс active у всех и добавляем текущей
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                window.scrollTo({
                    top: targetSection.offsetTop - 80, // отступ под шапку
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКОВ ПРИ СКРОЛЛЕ
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.cyber-box, .price-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // 4. ИМИТАЦИЯ ВЫБОРА МЕСТА НА КАРТЕ
    const nodes = document.querySelectorAll('.pc-node.free');
    nodes.forEach(node => {
        node.addEventListener('click', () => {
            // Снимаем выделение с других
            nodes.forEach(n => n.style.backgroundColor = 'transparent');
            // Выделяем текущее
            node.style.backgroundColor = 'rgba(0, 242, 255, 0.3)';
            console.log(`Выбрано место: ${node.textContent}`);
        });
    });
});
