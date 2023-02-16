const calendar = document.getElementById('calendar');
const month = document.getElementById('month');
const navigation = document.getElementsByClassName('navigation');
const months = ['January','February','March','April','May','June','July','August','September','October','November','December',];
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Satureday'];
const storyblok_url = 'https://api-us.storyblok.com/v2/cdn/stories?starts_with=events&token=qLGIo93pqdZVT9kuaVrBBAtt';
const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let events;
const drawBlankCalendar = () => {
     for(let i = 0;i < 35;i++){
          const div = document.createElement('div');
          div.classList.add('day');
          const p1 = document.createElement('p');
          p1.classList.add('day-text');
          p1.innerText = days[i % 7];
          const p2 = document.createElement('p');
          p2.classList.add('day-number');
          const small = document.createElement('small');
          small.classList.add('event-name');
          div.appendChild(p1);
          div.appendChild(p2);
          div.appendChild(small);
          calendar.appendChild(div);
     }
};
const updateCalendar = (month,year,events) => {
     const day = document.querySelectorAll('.day');
     const theFirst = new Date();
     theFirst.setMonth(month);
     theFirst.setMonth(year);
     const theFirstDayOfWeek = theFirst.getDay();
     const monthName = months[month];
     const monthWithYear = `${year} - ${monthName}`;
     month.innerText = monthWithYear;
     const daysInMonth = new Date(year,month + 1,0).getDate();
     let dayCounter = 1;
     for(let i = 0;i < day.length;i++){
          const count = day[i];
          const dayNumber = count.querySelector('.day-number');
          if(i >= theFirstDayOfWeek && dayCounter <= daysInMonth){
               const thisDate = new Date(year,month,dayCounter);
               const eventName = count.querySelector('.event-name');
               if(events[thisDate]){
                    const event = events[thisDate];
                    eventName.innerText = `* ${event.title}`;
               }else{
                    eventName.innerText = "";
               }
          }else{
               dayNumber.innerText = "";
          }
     }
};
const loadEvents = async () => {
     const response = await fetch(storyblok_url);
     const {stories} = await response.json();
     events = stories.reduce((accumulator,event) => {
          const eventTime = new Date(event.content.time);
          const eventDate = new Date(eventTime.toDateString());
          accumulator[eventDate] = event.content;
          return accumulator;
     },{});
     updateCalendar(currentMonth,currentYear,events);
};
loadEvents();
const previousMonth = () => {
     if(currentMonth === 0){
          currentMonth = 12;
          currentYear--;
     }
     updateCalendar(--currentMonth,currentYear,events);
};
navigation[0].addEventListener('click',previousMonth);
const nextMonth = () => {
     if(currentMonth === 11){
          currentMonth = -1;
          currentYear++;
     }
     updateCalendar(++currentMonth,currentYear,events);
};
navigation[1].addEventListener('click',nextMonth);
const load = async () => {
     drawBlankCalendar();
     updateCalendar(currentMonth,currentYear,{});
     await loadEvents();
};
load();