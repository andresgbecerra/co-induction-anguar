const dayStart = '07:30';
const dayEnd = '17:45';

//----------------My Solution-------------------------------

function scheduleMeeting(startTime, durationMinutes) {
    let _startTime = `${startTime.length == 4? '0' + startTime:startTime}`;
    const min = Number(_startTime.split(':')[1]) + durationMinutes;
    let _endTime = `${_startTime.split(':')[0]}:${min}`;
    if (min >= 60) {
        str = `${Number(_startTime.split(':')[0]) + Math.floor(min/60)}:${min>60? min-60:'00'}`
        _endTime = `${str.length == 4? '0' + str:str}`;
    }

    return _startTime >= dayStart && _endTime <= dayEnd;

}

console.log(scheduleMeeting("7:00", 15));
console.log(scheduleMeeting("07:15", 30));
console.log(scheduleMeeting("7:30", 30));
console.log(scheduleMeeting("11:30", 60));
console.log(scheduleMeeting("17:00", 45));
console.log(scheduleMeeting("17:30", 30));
console.log(scheduleMeeting("18:00", 15));

console.log('\n');

//----------------Book Solution-------------------------------

function scheduleMeetingBook(startTime, durationMinutes) {

    var [, meetingStartHour, meetingStartMinutes] = startTime.match(/^(\d{1,2}):(\d{2})$/) || [];
    durationMinutes = Number(durationMinutes);

    if (typeof meetingStartHour == "string" && typeof meetingStartMinutes == "string") {
        let durationHours = Math.floor(durationMinutes / 60);
        durationMinutes = durationMinutes - (durationHours * 60);
        let meetingEndHour = Number(meetingStartHour) + durationHours;
        let meetingEndMinutes = Number(meetingStartMinutes) + durationMinutes;

        if (meetingEndMinutes >= 60) {
            meetingEndHour = meetingEndHour + 1;
            meetingEndMinutes = meetingEndMinutes - 60;
        }
        // re-compose fully-qualified time strings 
        // (to make comparison easier)
        let meetingStart = `${meetingStartHour.padStart(2,"0") }:${meetingStartMinutes.padStart(2,"0") }`;
        let meetingEnd = `${ String(meetingEndHour).padStart(2,"0")}:${ String(meetingEndMinutes).padStart(2,"0")}`;
        // NOTE: since expressions are all strings, 
        // comparisons here are alphabetic, but it's 
        // safe here since they're fully qualified 
        // time strings (ie, "07:15" < "07:30") 
        return (meetingStart >= dayStart && meetingEnd <= dayEnd);
    }
    return false;
}


console.log(scheduleMeetingBook("7:00", 15));
console.log(scheduleMeetingBook("07:15", 30));
console.log(scheduleMeetingBook("7:30", 30));
console.log(scheduleMeetingBook("11:30", 60));
console.log(scheduleMeetingBook("17:00", 45));
console.log(scheduleMeetingBook("17:30", 30));
console.log(scheduleMeetingBook("18:00", 15));