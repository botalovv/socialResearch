import React, { useState } from "react"
import "../styles/managerQuestion.css"

function SelfRegulationQuestion({response, question, id}) {
    //const [valueRadio, setValueRadio] = useState("Всегда");

    return (
        <div className="manager">
            <p className="question">{question}</p>
            <div className="radioButtons">
                <div className="radioContainer">
                    <label htmlFor={"answerRegulation-"+id+"-4"}>Верно</label>
                    <input id={"answerRegulation-"+id+"-4"} onClick={() => response("Верно")} type="radio" name={question} value="Верно"/>
                </div>
                <div className="radioContainer">
                    <label htmlFor={"answerRegulation-"+id+"-3"}>Пожалуй, верно</label>
                    <input id={"answerRegulation-"+id+"-3"} onClick={() => response("Пожалуй, верно")} type="radio" name={question} value="Пожалуй, верно"/>
                </div>    
                <div className="radioContainer">
                    <label htmlFor={"answerRegulation-"+id+"-2"}>Пожалуй, неверно</label>
                    <input id={"answerRegulation-"+id+"-2"} onClick={() => response("Пожалуй, неверно")} type="radio" name={question} value="Пожалуй, неверно"/>
                </div>
                <div className="radioContainer">
                    <label htmlFor={"answerRegulation-"+id+"-1"}>Неверно</label>
                    <input id={"answerRegulation-"+id+"-1"} onClick={() => response("Неверно")} type="radio" name={question} value="Неверно"/>
                </div>
            </div>
        </div>
    )

}

export default SelfRegulationQuestion;