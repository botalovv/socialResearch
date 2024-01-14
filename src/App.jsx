import { useState } from 'react'
import './App.css'
import ManagerQuestion from './components/ManagerQuestion.jsx';
import SelfRegulationQuestion from './components/SelfRegulationQuestion.jsx';
import ReflexivityQuestion from './components/ReflexivityQuestion.jsx';


const hashValue = val =>
  crypto.subtle
    .digest('SHA-256', new TextEncoder('utf-8').encode(val))
    .then(h => {
      let hexes = [],
        view = new DataView(h);
      for (let i = 0; i < view.byteLength; i += 4)
        hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
      return hexes.join('');
    });

const ValidKeyHash = "dc317e2ab4bd5ec9dc34a2575805429166f4b0cf9c578b1778cdbde202961dc7";

function App() {
  const [key, setKey] = useState("");
  const [keyIsValid, setKeyIsValid] = useState(false);

  const setKeyWithCheck = (key) => {
    hashValue(key).then(newHash => {
      setKeyIsValid(newHash == ValidKeyHash)
      setKey(key)
    });
  }

  const [user, setUser] = useState("");
  const [blakePeople, setBlakePeople] = useState(0);
  let [counterX, setCounterX] = useState(0);
  let [counterY, setCounterY] = useState(0);
  let [counterSelfReg, setCounterSelfReg] = useState(0);
  let [reflexivityCounter, setReflexivityCounter] = useState(0);

  //Решетка менеджмента
  const [questionListManager, setQuestionListManager] = useState([
    "1. Я действую как представитель своего коллектива.",
    "2. Я предоставляю членам коллектива свободу в выполнении работы.",
    "3. Я поощряю применение унифицированных приёмов в работе.",
    "4. Я разрешаю подчинённым решать задачи по их усмотрению.",
    "5. Я побуждаю членов коллектива к большему напряжению в работе.",
    "6. Я предоставляю подчинённым возможность делать работу так, как они считают целесообразным.",
    "7. Я поддерживаю высокий темп работы.",
    "8. Я направляю помыслы людей на выполнение производственных заданий.",
    "9. Я лично разрешаю конфликты в коллективе.",
    "10. Я неохотно предоставляю подчинённым свободу действий.",
    "11. Я решаю сам, что и как должно сделано.",
    "12. Я уделяю внимание производственным показателям.",
    "13. Я распределяю поручения исходя только из производственной целесообразности.",
    "14. Я способствую нововведениям в коллективе.",
    "15. Я тщательно планирую работу коллектива.",
    "16. Я не объясняю подчинённым свои решения.",
    "17. Я стараюсь объяснить подчинённым полезность моих действий.",
    "18. Я предоставляю подчинённым возможность устанавливать свой режим работы.",
  ]);

  //Диагностика саморегуляции человека
  const [selfRegulationArray, setSelfRegulationArray] = useState([
    "19. Свои планы на будущее люблю разрабатывать в малейших деталях.",
    "20. Люблю всякие приключения, могу идти на риск.",
    "21. Стараюсь всегда приходить вовремя, но тем не менее часто опаздываю.",
    "22. Придерживаюсь девиза «Выслушай совет, но сделай по-своему».",
    "23. Часто полагаюсь на свои способности ориентироваться по ходу дела и не стремлюсь заранее представить последовательность своих действий.",
    "24. Окружающие отмечают, что я недостаточно критичен к себе и своим действиям, но сам я это не всегда замечаю.",
    "25. Накануне контрольных или экзаменов у меня обычно появлялось чувство, что не хватило 1–2 дней для подготовки.",
    "26. Чтобы чувствовать себя уверенно, необходимо знать, что ждет тебя завтра.",
    "27. Мне трудно себя заставить что-либо переделывать, даже если качество сделанного меня не устраивает.",
    "28. Не всегда замечаю свои ошибки, чаще это делают окружающие меня люди.",
    "29. Переход на новую систему работы не причиняет мне особых неудобств.",
    "30. Мне трудно отказаться от принятого решения даже под влиянием близких мне людей.",
    "31. Я не отношу себя к людям, жизненным принципом которых является «Семь раз отмерь, один раз отрежь».",
    "32. Не выношу, когда меня опекают и за меня что-то решают.",
    "33. Не люблю много раздумывать о своем будущем.",
    "34. В новой одежде часто ощущаю себя неловко.",
    "35. Всегда заранее планирую свои расходы, не люблю совершать незапланированные покупки.",
    "36. Избегаю риска, плохо справляюсь с неожиданными ситуациями.",
    "37. Мое отношение к будущему часто меняется: то строю радужные планы, то будущее кажется мне мрачным.",
    "38. Всегда стараюсь продумать способы достижения цели, прежде чем начну действовать.",
    "39. Предпочитаю сохранять независимость даже от близких мне людей.",
    "40. Мои планы на будущее обычно реалистичны, и я не люблю их менять.",
    "41. В первые дни отпуска (каникул) при смене образа жизни всегда появляется чувство дискомфорта.",
    "42. При большом объеме работы неминуемо страдает качество результатов.",
    "43. Люблю перемены в жизни, смену обстановки и образа жизни.",
    "44. Не всегда вовремя замечаю изменения обстоятельств и из-за этого терплю неудачи.",
    "45. Бывает, что настаиваю на своем, даже когда не уверен в своей правоте.",
    "46. Люблю придерживаться заранее намеченного на день плана.",
    "47. Прежде, чем выяснять отношения, стараюсь представить себе различные способы преодоления конфликта.",
    "48. В случае неудачи всегда ищу, что же было сделано неправильно.",
    "49. Не люблю посвящать кого-либо в свои планы, редко следую чужим советам.",
    "50. Считаю разумным принцип: сначала надо ввязаться в бой, а затем искать средства для победы.",
    "51. Люблю помечтать о будущем, но это скорее фантазии, чем реальность.",
    "52. Стараюсь всегда учитывать мнение товарищей о себе и своей работе.",
    "53. Если я занят чем-то важным для себя, то могу работать в любой обстановке.",
    "54. В ожидании важных событий стремлюсь заранее представить последовательность своих действий при том или ином развитии ситуации.",
    "55. Прежде чем взяться за дело, мне необходимо собрать подробную информацию об условиях его выполнения и сопутствующих обстоятельствах.",
    "56. Редко отступаюсь от начатого дела.",
    "57. Часто допускаю небрежное отношение к своим обязательствам в случае усталости и плохого самочувствия.",
    "58. Если я считаю, что прав, то меня мало волнует мнение окружающих о моих действиях.",
    "59. Про меня говорят, что я «разбрасываюсь», не умею отделить главное от второстепенного.",
    "60. Не умею и не люблю заранее планировать свой бюджет.",
    "61.  Если в работе не удалось добиться устраивающего меня качества, стремлюсь переделать, даже если окружающим это неважно.",
    "62. После разрешения конфликтной ситуации часто мысленно к ней возвращаюсь, перепроверяю предпринятые действия и результаты.",
    "63.  Непринужденно чувствую себя в незнакомой компании, новые люди мне обычно интересны.",
    "64.  Обычно резко реагирую на возражения, стараюсь думать и делать все по-своему."
  ]);

  // Методика определения уровня рефлексивности
  const [reflexivityArray, setReflexivityArray] = useState([
    "65. Прочитав хорошую книгу, я всегда потом долгое время думаю о ней, хочется с кем-нибудь ее обсудить.",
    "66. Когда меня вдруг неожиданно о чем-то спросят, я могу ответить первое, что пришло в голову.",
    "67. Прежде чем снять трубку телефона, чтобы позвонить по делу, я обычно мысленно планирую предстоящий разговор.",
    "68. Совершив какой-то промах, я долго потом не могу отвлечься от мыслей о нем.",
    "69. Когда я размышляю над чем-то или беседую с другим человеком, мне бывает интересно вдруг вспомнить, что послужило началом цепочки мыслей.",
    "70. Приступая к трудному заданию, я стараюсь не думать о предстоящих трудностях.",
    "71. Главное для меня – представить конечную цель своей деятельности, а детали имеют второстепенное значение.",
    "72. Бывает, что я не могу понять, почему кто-либо не доволен мною.",
    "73. Я часто ставлю себя на место другого человека.",
    "74. Для меня важно в деталях представлять ход предстоящей работы.",
    "75. Мне было бы трудно написать серьезное письмо, если бы я заранее не составил плана.",
    "76. Я предпочитаю действовать, а не размышлять над причинами своих неудач.",
    "77. Я довольно легко принимаю решения относительно дорогой покупки.",
    "78. Как правило, что-то задумав, я прокручиваю в голове свои замыслы, уточняя детали, рассматривая все варианты.",
    "79. Я беспокоюсь о своем будущем.",
    "80. Думаю, что во множестве ситуаций надо действовать быстро, руководствуясь первой пришедшей в голову мыслью.",
    "81. Порой я принимаю необдуманные решения.",
    "82. Закончив разговор, я, бывает, продолжаю вести его мысленно, приводя все новые и новые аргументы в защиту своей точки зрения.",
    "83. Если происходит конфликт, то, размышляя над тем, кто в нем виноват, я в первую очередь начинаю с себя.",
    "84. Прежде чем принять решение, я всегда стараюсь все тщательно обдумать и взвесить.",
    "85. У меня бывают конфликты оттого, что я порой не могу предугадать, какого поведения от меня ожидают окружающие.",
    "86. Бывает, что, обдумывая разговор с другим человеком, я как бы мысленно веду с ним разговор.",
    "87. Я стараюсь не задумываться над тем, какие мысли и чувства вызывают в других людях мои слова и поступки.",
    "88. Прежде, чем сделать замечание другому человеку, я обязательно подумаю, в каких словах это лучше сделать, чтобы его не обидеть.",
    "89. Решая трудную задачу, я думаю над ней даже тогда, когда занимаюсь другими делами.",
    "90. Если я с кем-то ссорюсь, то в большинстве случаев не считаю себя виноватым.",
    "91. Редко бывает так, что я жалею о сказанном.",
  ]);

  const [result, setResult] = useState({});
  const [resultSelfReg, setResultSelfReg] = useState({});
  const [resultReflexivity, setResultReflexivity] = useState({});

  const response = (state) => {
    setResult(state);
    //console.log(result);
  };

  const responceSelfReg = (state) => {
    setResultSelfReg(state);
    //console.log(resultSelfReg);
  };

  const responceReflexivity = (state) => {
    setResultReflexivity(state);
  }

  const getTestResult = (object) => {

    let arrPeopleAlways = [1, 3, 4, 5, 7, 9, 13, 17];
    let arrPeopleNever = [15];
    let arrProductionAlways = [2, 6, 8, 11, 12];
    let arrProductionNever = [0, 10, 14, 16];
    let arrSelfRegYes = [18, 19, 21, 25, 28, 29, 31, 34, 37, 38, 39, 42, 44, 45, 46, 47, 48, 52, 53, 54, 55, 57, 60, 61, 62, 63];
    let arrSelfRegNo = [20, 22, 23, 24, 26, 27, 30, 32, 33, 35, 36, 40, 41, 43, 49, 50, 51, 56, 58, 59];
    let arrReflexivityYes = [64, 66, 67, 68, 72, 73, 74, 77, 78, 81, 82, 83, 85, 87, 88];
    let arrReflexivityNo = [65, 69, 70, 71, 75, 76, 79, 80, 84, 86, 89, 90];

    for (let key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        let elem = object[key];
        
        //Подсчет итогов второй части теста
        if (arrPeopleAlways.includes(Number(key))) {

          if (elem.answer == "Всегда" || elem.answer == "Часто") {
            setCounterY(counterY++);
          }
        } else if (arrPeopleNever.includes(Number(key))) {
          if (elem.answer == "Никогда" || elem.answer == "Редко") {
            setCounterY(counterY++);
          }
        }
        if (arrProductionAlways.includes(Number(key))) {

          if (elem.answer == "Всегда" || elem.answer == "Часто") {
            setCounterX(counterX++);
          }
        } else if (arrProductionNever.includes(Number(key))) {

          if (elem.answer == "Никогда" || elem.answer == "Редко") {
            setCounterX(counterX++);
          }
        }

        //Подсчет итогов второй части теста
        if (key >= 18 && key <= 63) {
          if (arrSelfRegYes.includes(Number(key)) && (elem.answer == "Верно" || elem.answer == "Пожалуй, верно")) {
            setCounterSelfReg(counterSelfReg++);
          } else if (arrSelfRegNo.includes(Number(key)) && (elem.answer == "Пожалуй, неверно" || elem.answer == "Неверно")) {
            setCounterSelfReg(counterSelfReg++);
          }
        }

        //Подсчет итогов третьей части теста
        if (key >= 64 && key <= 90) {
          console.log(reflexivityCounter, key, elem.answer)
          if (arrReflexivityYes.includes(Number(key))) {
            if (elem.answer == "Абсолютно неверно") {
              setReflexivityCounter(reflexivityCounter += 1);
            } else if (elem.answer == "Неверно") {
              setReflexivityCounter(reflexivityCounter += 2);
            } else if (elem.answer == "Скорее неверно") {
              setReflexivityCounter(reflexivityCounter += 3);
            } else if (elem.answer == "Не знаю") {
              setReflexivityCounter(reflexivityCounter += 4);
            } else if (elem.answer == "Скорее верно") {
              setReflexivityCounter(reflexivityCounter += 5);
            } else if (elem.answer == "Верно") {
              setReflexivityCounter(reflexivityCounter += 6);
            } else if (elem.answer == "Совершенно верно") {
              setReflexivityCounter(reflexivityCounter += 7);
            }
          }
        }  
        if (arrReflexivityNo.includes(Number(key))) {
          if (elem.answer == "Абсолютно неверно") {
            setReflexivityCounter(reflexivityCounter += 7);
          } else if (elem.answer == "Неверно") {
            setReflexivityCounter(reflexivityCounter += 6);
          } else if (elem.answer == "Скорее неверно") {
            setReflexivityCounter(reflexivityCounter += 5);
          } else if (elem.answer == "Не знаю") {
            setReflexivityCounter(reflexivityCounter += 4);
          } else if (elem.answer == "Скорее верно") {
            setReflexivityCounter(reflexivityCounter += 3);
          } else if (elem.answer == "Верно") {
            setReflexivityCounter(reflexivityCounter += 2);
          } else if (elem.answer == "Совершенно верно") {
            setReflexivityCounter(reflexivityCounter += 1);
          }
        }
      }
    }
    let resultText = "";
    //Интерпретация первой части теста
    if (counterY <= 3 && counterX <= 3) {
      resultText = "Вы руководите без напряжения, но, возможно, вы могли бы сделать гораздо больше.";
    } else if (counterY > 3 && counterY <= 6 && counterX <= 3) {
      resultText = "Вы заинтересованы в безконфликтной и дружественной атмосфере, вы можете сделать больше, если уделите внимание качеству.";
    } else if (counterY > 6 && counterY <= 9 && counterX <= 3) {
      resultText = "Вы создаете прекрасную атмосферу в коллективе, вам по плечу многое, ставьте цели и достигайте их вместе со своей командой.";
    } else if (counterY <= 3 && counterX > 3 && counterX <= 6) {
      resultText = "У вас поставлены рабочие процессы, обратите внимание на ваших сотрудников, кадры решают всё.";
    } else if (counterY > 3 && counterY <= 6 && counterX > 3 && counterX <= 6) {
      resultText = "У вас хорошо поставлены процессы управления, развивайте лидеров в компании и делегируйте.";
    } else if (counterY > 6 && counterY <= 9 && counterX > 3 && counterX <= 6) {
      resultText = "Вы умеете выстраивать командное взаимодействие в коллективе. Развивайте компетенции сотрудников и следите за качеством.";
    } else if (counterY <= 3 && counterX > 6 && counterX <= 9) {
      resultText = "Ваши бизнес-процессы похожи на конвейер. Уделите больше внимания вашим сотрудникам и результат может удивить.";
    } else if (counterY > 3 && counterY <= 6 && counterX > 6 && counterX <= 9) {
      resultText = "Вы умеете руководить эффективно, попробуйте больше доверять людям и делегировать полномочия.";
    } else if (counterY > 6 && counterY <= 9 && counterX > 6 && counterX <= 9) {
      resultText = "Вы умеете одновременно и руководить эффективно, и доверять людям, и делегировать свои полномочия.";
    }

    //Интерпретация второй части теста
    if (counterSelfReg <= 23) {
      resultText = resultText + " Вы испытываете трудности в том, чтобы продумать пути и способы достижения своих целей и строить планы на будущее. Вы также можете часто испытывать тревожность и напряжение.";
    } else if (counterSelfReg > 23 && counterSelfReg <= 32) {
      resultText = resultText + " Вы стремитесь планировать свою деятельность, но вас может сбить с толку изменение условий и ситуации. Вы скорее склонны фиксировать внимание на своих ошибках и самокритике, чем на способах и возможностях для достижении цели.";
    } else if (counterSelfReg > 32) {
      resultText = resultText + " Вы умеете ставить цели и планировать их достижение. Вы также быстро адаптируетесь к изменениям и способны к адекватной оценке ситуации. Вы скорее обращаете внимание на возможности, чем долго переживаете об ошибках."
    }

    //Интерпретация третьей части теста
    if (reflexivityCounter < 114) {
      resultText = resultText + " Вы не всегда думаете о последствиях своих поступков и можете принимать решения без детального анализа ситуации. Вам может быть сложно понять других людей и причины их поведения";
    } else if (reflexivityCounter >= 114 && reflexivityCounter < 140) {
      resultText = resultText + " Вы не склонны к педантичному анализу своей деятельности и поступков других людей. Тем не менее, вы вдумчивы и можете действовать как спонтанно, так и заранее подумав о последствиях принятых вами решений.";
    } else if (reflexivityCounter >= 140) {
      resultText = resultText + " Вы склонны анализировать свою деятельность и поступки других людей, выявлять причинно-следственные связи в событиях в прошлом и будущем. Вы обдумываете и планируете свои действия и задумываетесь об их последствиях. Вы также умеете поставить себя на место другого человека."
    }



    console.log(reflexivityCounter);
    setCounterX(counterX = 0);
    setCounterY(counterY = 0);
    setCounterSelfReg(counterSelfReg = 0);
    setReflexivityCounter(reflexivityCounter = 0);
    alert(resultText);
    //return resultText;
  };

  const submit = () => {

    if (questionListManager.length != Object.keys(result).length || selfRegulationArray.length != Object.keys(resultSelfReg).length) {
      alert("Вы ответили не на все вопросы");
    } else if (user == "") {
      alert("Вы не заполнили должность");
    } else if (key == "") {
      alert("Вы не заполнили ключ тестирования");
    } else if (!keyIsValid) {
      alert("Кажется это неверный ключ!");
    }
    else {
      let responseForm = [];
      Object.keys(result).forEach(function (s, i) {
        responseForm.push({
          question: `${i + 1} `,
          answer: result[i],
        })
      });

      Object.keys(resultSelfReg).forEach(function (s, i) {
        responseForm.push({
          question: `${i + 19} `,
          answer: resultSelfReg[i],
        })
      });

      Object.keys(resultReflexivity).forEach(function (s, i) {
        responseForm.push({
          question: `${i + 65} `,
          answer: resultReflexivity[i],
        })
      });
      console.log(responseForm)
      const rawResponse = fetch(`https://schumacher.dumk.in/index.php?key=${key}`, {
        method: 'POST',
        mode: "no-cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          form: responseForm,
          user: user
        })
      }).then(function (response) {
        return response.text();
      }).then(function (content) {
        console.log(responseForm);
        getTestResult(responseForm);
      });
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Узнайте, какой вы руководитель</h1>
        <p className="introduction">
          В современной психологии управления много внимания уделяется непосредственно характеристикам личности руководителя.
          В условиях высокой скорости изменений и необходимости принятия решений в неопределённости некоторые из качеств
          личности выходят на первый план. Узнайте, насколько вы устойчивы, адаптивны и эффективны в  быстроменяющемся и непредсказуемом мире.<br/>
          Ниже приводится ряд утверждений. Исходя из Ваших собственных предпочтений, выскажите свое мнение о том, как поступили бы Вы в каждой из описанных ситуаций.
          Выберите только один вариант ответа.
        </p>
        <input className="styledInput position" type="text" placeholder="Ваша должность" onChange={(e) => setUser(e.target.value)} />
        <div className="questionContainer">
          {questionListManager.map((question, i) => (
            <ManagerQuestion question={question} id={i + "manager"} response={(answer) => {
              let state = { ...result };//!!!!
              state[i] = answer;
              response(state);
            }} key={question} />
          ))}
          {selfRegulationArray.map((question, i) => (
            <SelfRegulationQuestion question={question} id={i + 18} response={(answer) => {
              let state = { ...resultSelfReg }; //!!!! Создать новое состояние для каждого массива и добавить их проверку в условие в submit функции
              state[i] = answer;
              responceSelfReg(state);
            }} key={question} />
          ))}
          {reflexivityArray.map((question, i) => (
            <ReflexivityQuestion question={question} id={i + 64} response={(answer) => {
              let state = { ...resultReflexivity };
              state[i] = answer;
              responceReflexivity(state);
            }} key={question}/>
          ))}
        </div>
        <div className="footer">
          <input className={"styledInput footerInput " + (keyIsValid ? "valid" : "invalid")} type="text" placeholder="Ключ от тестирования" name="key" value={key} onChange={(e) => setKeyWithCheck(e.target.value)} />
          <button className="submitButton" onClick={submit}>Завершить тестирование</button>
        </div>
      </div>
    </div>
  )
}

export default App;
