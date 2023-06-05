// Your code here

let twoRows = [
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
]
function createEmployeeRecord(recordArray) {
    return {
        firstName: recordArray[0],
        familyName: recordArray[1],
        title: recordArray[2],
        payPerHour: recordArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(arrayOfrecordArrays) {
    const objArray = [];
    //console.log(arrayOfrecordArrays);
    for (let record of arrayOfrecordArrays) {
        //console.log(recordArray);
        objArray.push(createEmployeeRecord(record))
        //console.log(objArray);
    }
    return objArray;
}

function createTimeInEvent(recordObj, timeStamp) {
    const timeArray = timeStamp.split(" ");
    const timeStampObj = {
        type: 'TimeIn',
        hour: parseInt(timeArray[1]),
        date: timeArray[0],
    }
    recordObj.timeInEvents.push(timeStampObj);
    return recordObj;
}

function createTimeOutEvent(recordObj, timeStamp) {
    const timeArray = timeStamp.split(" ");
    const timeStampObj = {
        type: "TimeOut",
        hour: parseInt(timeArray[1]),
        date: timeArray[0],
    }
    recordObj.timeOutEvents.push(timeStampObj);
    return recordObj;
}

function hoursWorkedOnDate(record, date) {
   const timeInArray = record.timeInEvents;
   const timeOutArray = record.timeOutEvents;
   const curDateInRec = timeInArray.filter(object => object.date === date );
   const curDateOutRec = timeOutArray.filter(object => object.date === date );
    return (curDateOutRec[0].hour - curDateInRec[0].hour)/100;
}

function wagesEarnedOnDate(record, date){
    return record.payPerHour * hoursWorkedOnDate(record, date);
}

function allWagesFor(record){
    let totalWages = 0;
    const dateArr = [];
    const recOfTimeInArr = record.timeInEvents;
    //const recOfTimeOutArr = record.timeOutEvents;
    recOfTimeInArr.forEach(timeInEv => {
        dateArr.push(timeInEv.date)
        totalWages += wagesEarnedOnDate(record, timeInEv.date);
    });
    return totalWages
}

function calculatePayroll(arrEmRecords){
    let payrollSum = 0;
    arrEmRecords.forEach(record =>{
        payrollSum += allWagesFor(record);
    })
    return payrollSum;
}

// const testRecord = {
//     firstName: 'tj',
//     familyName: 'stifter',
//     title: 'student',
//     payPerHour: 2,
//     timeInEvents: [{
//         type: 'TimeIn',
//         hour: 0800,
//         date: '2023-06-05',
//     },
//     {
//         type: 'TimeIn',
//         hour: 0900,
//         date: '2022-06-05',
//     }],
//     timeOutEvents: [{
//         type: "TimeOut",
//         hour: 1200,
//         date: '2023-06-05',
//     },
//     {
//         type: "TimeOut",
//         hour: 1600,
//         date: '2022-06-05',
//     }],
// }
