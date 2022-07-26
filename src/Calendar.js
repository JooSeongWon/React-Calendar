import React, { useCallback, useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./calendar.css";
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

//classnames 모듈 사용
const cn = classNames.bind(style); //calendar.css와 연결 (style).weekday

//Date 객체 생성
let date = new Date();

const Calendar = () => {
  
  //오늘 날짜, 시간
  const today = {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    day: date.getDay()
  };

  //요일
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  
  //현재 달력 연도
  const [selectedYear, setSelectedYear] = useState(today.year);
  //현재 달력 달
  const [selectedMonth, setSelectedMonth] = useState(today.month);

  //오늘 날짜로 이동 실험
  // const [todayGo, setTodayGo] = useState(goToday.date);
  
  //이전달 마지막 날 날짜 (아마 총 날짜 계산을 위해 사용)
  // const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate();

  //이전달,이번달 마지막 날 Date 객체 정보
  const prevLast = new Date(selectedYear, selectedMonth, 0);
  const thisLast = new Date(selectedYear, selectedMonth + 1, 0)

  //이전달 마지막 날짜와 요일 
  const prevLastDate =prevLast.getDate();
  const prevLastDay = prevLast.getDay();

  //이번달 마지막 날짜와 요일
  const thisLastDate = thisLast.getDate();
  const thisLastDay = thisLast.getDay();

  //날짜를 담을 배열
  const prevDates = [];
  const nextDates = [];
  const thisDates = [...Array(thisLastDate + 1).keys()].slice(1);

  // console.log("thisDates[]: " + thisDates)

  //지난달 날짜
  if(prevLastDay !== 6) {
    for (let i = 0; i < prevLastDay + 1; i++) {
      prevDates.unshift(prevLastDate - i);
    }
  }

  //다음달 날짜
  for(let i = 1; i < 7 - thisLastDay; i++) {
    nextDates.push(i);
  }  
  
  //세 배열 합치기
  const dates = [...prevDates, ...thisDates, ...nextDates];

  //이번달 첫날 찾기
  const firstDateIndex = dates.indexOf(1);

  //이번달 마지막날 찾기
  const lastDateIndex = dates.lastIndexOf(thisLastDate);
  
  //이번달 class에 this, 다른달 class에 other넣기
  const returnDate = useCallback(() => {
  dates.forEach((date, i) => {
    const condition = i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other';

    dates[i] = `<div class="date"><span class="${condition}">${date}</span></div>`

  })
  
  return dates;
  },);

  //오늘 날짜의 객체 생성
  // const todayDate = new Date();
//   //오늘 날짜 찾기
//   if(selectedYear === todayDate.getFullYear() && selectedMonth === todayDate.getMonth()) {
//     for( let date of document.querySelectorAll('.this')){
//         if(+date.innerText === todayDate.getDate()) {
//             date.classList.add('today');
//             break;
//         }
//     }
// }

  //이전달 이동 함수
  const prevMonth = useCallback(() => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  },);

  //다음달 이동 함수
  const nextMonth = useCallback(() => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  },);

  //오늘 날짜로 이동 함수
  const goToday = useCallback(() => {
    window.location = '/';
    // window.location.reload();
    // document.location.reload();
    // document.history.push("/");
    // <Link to="/"></Link>
    // <Navigate to="/" />;
    // history.push('/');
    // console.log(location);
  },);


  //토요일, 일요일에 class 추가
  const returnWeek = useCallback(() => {
    let weekArr = [];
    week.forEach((v) => {
      weekArr.push(
        <div
          key={v}
          className={cn(
            {weekday: true}, //weekday 클래스 추가
            // 'weekday',
            {sunday: v === "일"}, //v === "일" 조건이 true면 sunday 클래스 추가
            {saturday: v === "토"} //v ==="토" 조건이 true면 saturday 클래스 추가
            )}
            >
          {v}
        </div>
      );
    });
    return weekArr;
  },); 

  return (
    <>
      <div className="container">
        <div className="title">
          <h3>
            {selectedYear}년 {selectedMonth + 1}월
          </h3>
          <div className="pagination">
            <button onClick={prevMonth}>◀︎</button>
            <button onClick={goToday}>Today</button>
            <button onClick={nextMonth}>▶︎</button>
          </div>
        </div>
        <div className="week">{returnWeek()}</div>
        <Link to="/date/{dateId}"><div className="dates" dangerouslySetInnerHTML={{__html: returnDate().join('')}}></div></Link>
        {/* <Link to="/date/{dateId}" style={{ textDecoration: 'none' }} ><div className="dates" dangerouslySetInnerHTML={{__html: returnDate().join('')}}></div></Link> */}
      </div>
    </>
  );
};

export default Calendar;

