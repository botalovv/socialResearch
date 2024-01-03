import React, { useState } from "react"
import "../styles/managerQuestion.css"

function ReflexivityQuestion({response, question, id}) {
    //const [valueRadio, setValueRadio] = useState("Всегда");

    return (
        <div className="manager">
            <p className="question">{question}</p>
            <div className="radioButtons reflexivity">
                <div className="radioContainer">
                    <label htmlFor={"answerReflexivity-"+id+"-7"}>Абсолютно неверно</label>
                    <input id={"answerReflexivity-"+id+"-7"} onClick={() => response("Абсолютно неверно")} type="radio" name={question} value="Абсолютно неверно"/>
                </div>
                <div className="radioContainer">
                    <label htmlFor={"answerReflexivity-"+id+"-6"}>Неверно</label>
                    <input id={"answerReflexivity-"+id+"-6"} onClick={() => response("Неверно")} type="radio" name={question} value="Неверно"/>
                </div>
                <div className="radioContainer">
                    <label htmlFor={"answerReflexivity-"+id+"-5"}>Скорее неверно</label>
                    <input id={"answerReflexivity-"+id+"-5"} onClick={() => response("Скорее неверно")} type="radio" name={question} value="Скорее неверно"/>
                </div>
                <div className="radioContainer">
                    <label htmlFor={"answerReflexivity-"+id+"-4"}>Не знаю</label>
                    <input id={"answerReflexivity-"+id+"-4"} onClick={() => response("Не знаю")} type="radio" name={question} value="Не знаю"/>
                </div>    
                <div className="radioContainer">
                    <label htmlFor={"answerReflexivity-"+id+"-3"}>Скорее верно</label>
                    <input id={"answerReflexivity-"+id+"-3"} onClick={() => response("Скорее верно")} type="radio" name={question} value="Скорее верно"/>
                </div>
                <div className="radioContainer">
                    <label htmlFor={"answerReflexivity-"+id+"-2"}>Верно</label>
                    <input id={"answerReflexivity-"+id+"-2"} onClick={() => response("Верно")} type="radio" name={question} value="Верно"/>
                </div>
                <div className="radioContainer">
                    <label htmlFor={"answerReflexivity-"+id+"-1"}>Совершенно верно</label>
                    <input id={"answerReflexivity-"+id+"-1"} onClick={() => response("Совершенно верно")} type="radio" name={question} value="Совершенно верно"/>
                </div>
            </div>
        </div>
    )

}

export default ReflexivityQuestion;