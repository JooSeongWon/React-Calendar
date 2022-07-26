import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./date.module.css";


const Date = () => {

    const { dateId } = useParams(); // const 변수명 = useParams().파라미터명;
    const navigate = useNavigate();

    return (
        <div>
            <div className='memo'>
            {dateId}일 페이지
            <input type="textarea" placeholder='내용 입력' className="textarea"></input>
            </div>
            <button onClick={() => navigate(-1)}>달력으로 돌아가기</button>
        </div>
    )
}

export default Date;