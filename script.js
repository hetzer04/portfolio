let currentSection = 0;
const sections = document.querySelectorAll('.section');
const totalSections = sections.length;
let isScrolling = false;

// Функция плавного перехода
function scrollToSection(index) {
    if (index >= 0 && index < totalSections) {
        isScrolling = true;
        currentSection = index;
        
        // Добавляем плавную анимацию
        document.querySelector('.container').style.transition = "transform 0.8s ease-in-out";
        document.querySelector('.container').style.transform = `translateY(-${currentSection * 100}vh)`;
        
        updateNav();
        
        // Через 800 мс снимаем блокировку быстрого переключения
        setTimeout(() => { isScrolling = false; }, 800);
    }
}

// Обработчик скролла колесиком
let scrollTimeout;
document.addEventListener('wheel', (event) => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (!isScrolling) {
            if (event.deltaY > 0) {
                scrollToSection(currentSection + 1);
            } else {
                scrollToSection(currentSection - 1);
            }
        }
    }, 100);
});

// Обработчик клавиш
document.addEventListener('keydown', (event) => {
    if (!isScrolling) {
        if (event.key === 'ArrowDown') {
            scrollToSection(currentSection + 1);
        } else if (event.key === 'ArrowUp') {
            scrollToSection(currentSection - 1);
        }
    }
});

// Обновление активного пункта меню
function updateNav() {
    document.querySelectorAll('nav ul li a').forEach((link, index) => {
        if (index === currentSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Навигация по клику
document.querySelectorAll('nav ul li a').forEach((link, index) => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Чтобы избежать мгновенного перехода по якорю
        scrollToSection(index);
    });
});

// Устанавливаем активный пункт при загрузке
updateNav();

