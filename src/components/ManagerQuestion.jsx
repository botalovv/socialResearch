import React, { useState } from "react"
import "../styles/managerQuestion.css"

function ManagerQuestion({response, question, id}) {
    //const [valueRadio, setValueRadio] = useState("Всегда");

    return (
        <div className="manager">
            <p className="question">{question}</p>
            <div className="radioButtons">
                <div className="radioContainer">
                    <label htmlFor={"answer-"+id+"-5"}>Всегда</label>
                    <input id={"answer-"+id+"-5"} onClick={() => response("Всегда")} type="radio" name={question} value="Всегда"/>
                </div>
                <div className="radioContainer">
                    <label htmlFor={"answer-"+id+"-4"}>Часто</label>
                    <input id={"answer-"+id+"-4"} onClick={() => response("Часто")} type="radio" name={question} value="Часто"/>
                </div>    
                <div className="radioContainer">
                    <label htmlFor={"answer-"+id+"-3"}>Иногда</label>
                    <input id={"answer-"+id+"-3"} onClick={() => response("Иногда")} type="radio" name={question} value="Иногда"/>
                </div>
                <div className="radioContainer">
                    <label htmlFor={"answer-"+id+"-2"}>Редко</label>
                    <input id={"answer-"+id+"-2"} onClick={() => response("Редко")} type="radio" name={question} value="Редко"/>
                </div>
                <div className="radioContainer">
                    <label htmlFor={"answer-"+id+"-1"}>Никогда</label>
                    <input id={"answer-"+id+"-1"} onClick={() => response("Никогда")} type="radio" name={question} value="Никогда"/>
                </div>
            </div>
        </div>
    )

}

export default ManagerQuestion;