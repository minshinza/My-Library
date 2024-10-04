$(document).ready(function () {
    const currentDayEl = $("#currentDay");
    const timeblocksEl = $("#timeblocks");
  
    const hours = [
      { time: "1 AM", hour24: 1 },
      { time: "10 AM", hour24: 10 },
      { time: "11 AM", hour24: 11 },
      { time: "12 PM", hour24: 12 },
      { time: "1 PM", hour24: 13 },
      { time: "2 PM", hour24: 14 },
      { time: "3 PM", hour24: 15 },
      { time: "4 PM", hour24: 16 },
      { time: "5 PM", hour24: 17 },
    ];
  
    const updateCurrentDay = () => {
      const now = moment().format("dddd, MMMM Do");
      currentDayEl.text(now);
    };
  
    const loadEvents = () => {
      const events = JSON.parse(localStorage.getItem("events")) || {};
      return events;
    };
  
    const saveEvent = (hour, description) => {
      const events = loadEvents();
      events[hour] = description;
      localStorage.setItem("events", JSON.stringify(events));
    };
  
    const createTimeblocks = () => {
      const now = moment().hour();
  
      hours.forEach(({ time, hour24 }) => {
        const timeblock = $("<div>").addClass("row timeblock");
        const hourEl = $("<div>").addClass("col-2 col-md-1 hour").text(time);
        const descriptionEl = $("<textarea>").addClass("col-8 col-md-10 description");
        const saveBtn = $("<button>").addClass("col-2 col-md-1 saveBtn").html('<i class="fas fa-save"></i>');
  
        if (hour24 < now) {
          descriptionEl.addClass("past");
        } else if (hour24 === now) {
          descriptionEl.addClass("present");
        } else {
          descriptionEl.addClass("future");
        }
  
        descriptionEl.val(loadEvents()[time] || "");
  
        saveBtn.on("click", function () {
          const description = descriptionEl.val();
          saveEvent(time, description);
        });
  
        timeblock.append(hourEl, descriptionEl, saveBtn);
        timeblocksEl.append(timeblock);
      });
    };
  
    updateCurrentDay();
    createTimeblocks();
  });
  