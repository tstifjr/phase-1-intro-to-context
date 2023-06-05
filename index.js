// Your code here

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
    const objArray = [];;
    for (let record of arrayOfrecordArrays) {
        objArray.push(createEmployeeRecord(record))
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
   //optimized around find time stamp instance equal to desired date
   const timeInArray = record.timeInEvents;
   const timeOutArray = record.timeOutEvents;
   const tsInObjOfDate = timeInArray.find(object => object.date === date );
   const tsOutObjOfDate = timeOutArray.find(object => object.date === date );
    return (tsOutObjOfDate.hour - tsInObjOfDate.hour)/100;

    //bad code:::::
    // const InDateTimeArr = record.timeInEvents.map(entry => {
    //     return [entry.date, entry.hour];
    // })
    // console.log(InDateTimeArr);
    // const filterIn = InDateTimeArr.find(arrE => arrE[0] === date);
    // console.log(filterIn);
    // const OutDateTimeArr = record.timeOutEvents.map(entry => {
    //     return [entry.date, entry.hour];
    // })
    // const filterOut = OutDateTimeArr.find(arrE => arrE[0] === date);
    // return (filterOut[1] - filterIn[1])/100;


}

function wagesEarnedOnDate(record, date){
    return record.payPerHour * hoursWorkedOnDate(record, date);
}

function allWagesFor(record){
    const recOfTimeInArr = record.timeInEvents;
    const dateArr = recOfTimeInArr.map(timeInEv =>{  ///this code creates an array of dates for each timeIn event
        return timeInEv.date;
    })

    return dateArr.reduce((wage, date) => { //performs wagesEarned function for each date clocked and accumulates total results
        return wage + wagesEarnedOnDate(record, date)
    },0)

    ///less optimal code below:::
    // let totalWages = 0;
    // recOfTimeInArr.forEach(timeInEv => {
    //     dateArr.push(timeInEv.date)
    //     totalWages += wagesEarnedOnDate(record, timeInEv.date);
    // });
    // return totalWages

}

function calculatePayroll(arrEmRecords){
    return arrEmRecords.reduce((w, e) => w + allWagesFor(e), 0)

    //less optimal code below::::
    //let payrollSum = 0;
    // arrEmRecords.forEach(record =>{
    //     payrollSum += allWagesFor(record);
    // })
    //return payrollSum;
}

