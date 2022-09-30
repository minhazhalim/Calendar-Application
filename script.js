const days = document.querySelector('.days');
const currentDate = document.querySelector('.current-date');
const span = document.querySelectorAll('.icons span');
let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const renderCalendar = () => {
     let firstDayOfMonth = new Date(currentYear,currentMonth,1).getDay();
     let lastDateOfMonth = new Date(currentYear,currentMonth + 1,0).getDate();
     let lastDayOfMonth = new Date(currentYear,currentMonth,lastDateOfMonth).getDay();
     let lastDateOfLastMonth = new Date(currentYear,currentMonth,0).getDate();
     let listTag = "";
     for(let i = firstDayOfMonth;i > 0;i--){
          listTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
     }
     for(let i = 1;i <= lastDateOfMonth;i++){
          let isToday = i === date.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() ? 'active' : "";
          listTag += `<li class="${isToday}">${i}</li>`;
     }
     for(let i = lastDayOfMonth;i < 6;i++){
          listTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
     }
     currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
     days.innerHTML = listTag;
}
renderCalendar();
span.forEach(icon => {
     icon.addEventListener('click',() => {
          currentMonth = icon.id === 'previous' ? currentMonth - 1 : currentMonth + 1;
          if(currentMonth < 0 || currentMonth > 11){
               date = new Date(currentYear,currentMonth);
               currentYear = date.getFullYear();
               currentMonth = date.getMonth();
          }else{
               date = new Date();
          }
          renderCalendar();
     });
});