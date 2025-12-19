let currentMonth = 0; // Январь
let currentYear = 2026;

const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
                    "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

const monthYearElement = document.getElementById('monthYear');
const calendarBody = document.querySelector('#calendarTable tbody');
const prevBtn = document.getElementById('prevMonth');
const nextBtn = document.getElementById('nextMonth');

// Российские праздники 2026 года (основные официальные)
const holidays = [
    "01-01", "01-02", "01-03", "01-04", "01-05", "01-06", "01-07", "01-08", // Новогодние каникулы
    "02-23", // День защитника Отечества
    "03-08", // Международный женский день
    "05-01", "05-09", // Праздник Весны и Труда, День Победы
    "06-12", // День России
    "11-04"  // День народного единства
];

function displayCalendar(month, year) {
    calendarBody.innerHTML = '';
    monthYearElement.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Пн = 0

    let date = 1;
    for (let i = 0; i < 6; i++) { // максимум 6 строк
        const row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');

            if (i === 0 && j < startingDayOfWeek) {
                cell.classList.add('empty-cell');
            } else if (date > daysInMonth) {
                cell.classList.add('empty-cell');
            } else {
                cell.textContent = date;

                // Выходные: суббота (5) и воскресенье (6)
                if (j === 5 || j === 6) {
                    cell.classList.add('weekend');
                }

                // Праздничные дни
                const formattedDate = `${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                if (holidays.includes(formattedDate)) {
                    cell.classList.add('holiday');
                }

                // Сегодняшний день (если совпадает с текущей датой)
                const today = new Date();
                if (date === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    cell.classList.add('today');
                }

                date++;
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
        if (date > daysInMonth) break;
    }
}

prevBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    displayCalendar(currentMonth, currentYear);
});

nextBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    displayCalendar(currentMonth, currentYear);
});

// Первоначальное отображение
displayCalendar(currentMonth, currentYear);
