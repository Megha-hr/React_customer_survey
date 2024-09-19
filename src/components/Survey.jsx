import React,{useState,useEffect} from 'react'
import {questions} from '../data'
import '../App.css'
function Survey(){
const [response,setResponse]=useState({})
const [questionNum,setQuestionNum]=useState(0);
const [surveyCompleted, setSurveyCompleted] = useState(false);
const [showConfirmation, setShowConfirmation] = useState(false);


const handleNext=()=>{
    if(questionNum<=questions.length-1){
        setQuestionNum(questionNum+1);
    }
    
}
const handlePrev=()=>{
    if(questionNum>0){
        setQuestionNum(questionNum-1);
    }
}
const handleSkip=()=>{
    setResponse((prevResponse)=>({...prevResponse,[questions[questionNum].id]:"skipped"}))
    handleNext();
}
const handleSubmit=()=>{
    
    setShowConfirmation(true);
    
}
 // Confirm submission and mark the survey as completed

const confirmSubmission=()=>{
    setSurveyCompleted(true);
    setShowConfirmation(false);
    localStorage.setItem('surveyStatus', 'COMPLETED');
    alert('Survey has been submitted successfully!');
}
 // Cancel submission and close the confirmation dialog
const cancelSubmission=()=>{
    setShowConfirmation(false);
}

  // Effect to store responses in localStorage whenever they change
  useEffect(()=>{
    localStorage.setItem('serveyResponse',JSON.stringify(response))
  },[response])

   const  handleTextArea =(questionId,event)=>{
    setResponse(prevResponse=>({...prevResponse,[questionId]:event.target.value}))
   }
   const storeRadioResponse =(questionId,value)=>{
    setResponse(prevResponse=>({...prevResponse,[questionId]:value}))
   }


   const radioButtonsRange=(scale,questionId)=>{
    return(
        <div>
             {[...Array(scale)].map((_,index)=>(
            <label key={index} htmlFor={`radio_${questionId}_${index + 1}`} >
                 <input
              type="radio"
              id={`radio_${questionId}_${index + 1}`}
              name={`rating_${questionId}`}
              value={index + 1}
              checked={response[questionId]=== (index + 1).toString()}
              onChange={(e)=>storeRadioResponse(questionId,e.target.value)}
            />
            {index+1}
            </label>
        )

        )}
        </div>
       
    )
   }
    return(
        <div>
              {surveyCompleted ? (
        <p>Your survey is stored</p>
      ) : 
             <div className='container'>
                     <h4> Question number is {questions[questionNum].id}/{questions.length} </h4>
                     <h3>{questions[questionNum].text}</h3>
                     {questions[questionNum].type==="rating"?  radioButtonsRange(questions[questionNum].ratingScale, questions[questionNum].id)
                    :<input type='textarea' 
                     id="message" 
                     name="message"
                    value={response[questions[questionNum].id]||""}
                    onChange={(e)=>handleTextArea(questions[questionNum].id,e)}/>
                    }
                    {questionNum===questions.length-1?<div className='button-container'>
                        <button onClick={handlePrev}>previous</button>
                        <button onClick={handleSubmit}>Sumbit</button>
                        </div>:
                     <div className='button-container'>

                        <button className='prev-button' onClick={handlePrev}>previous</button>
                        <button className='next-button' onClick={handleNext}>next</button>
                        <button className='skip-button' onClick={handleSkip}>Skip</button>
                        
                     </div>
                     }
                     {/* Custom Confirmation Dialog */}
                        {showConfirmation && (
                            <div className="confirmation-modal">
                            <div className="modal-content">
                                <p>Are you sure you want to submit the survey?</p>
                                <button onClick={confirmSubmission}>Confirm</button>
                                <button onClick={cancelSubmission}>Cancel</button>
                            </div>
                            </div>
                        )}
                    
                </div>   
}
        </div>
    )
}
export default Survey;