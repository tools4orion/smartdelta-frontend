import React, {  useState } from 'react';
import {  Stack} from '@mui/material';
import getAIAssistance from '../actions/getAIAssistance';
import ErrorItem from './ErrorItem';


const ErrorStackTrace = ({ errors }) => {
  console.log('ERRORS:');
  console.log(errors);
  const [isLoading, setIsLoading] = useState(false);
  console.log('STEPS:');
  const [activeIndex, setActiveIndex] = useState(null);
 const [steps, setSteps] = useState(null); // State to store the diagnosis steps
  const [diagnosis, setDiagnosis] = useState(''); // State to store the diagnosis
  const [note, setNote] = useState(''); // State to store the additional note
  const [isGptStepperVisible, setIsGptStepperVisible] = useState(false); // State to control GPT Stepper visibility
  const [isTooltipOpen, setIsTooltipOpen] = useState(false); // State to control Tooltip visibility

 

const handleAIAssistanceClick = async(index) => {
	setIsLoading(true);

 const {steps, diagnosis, additionalNote} = await getAIAssistance(errors[index].error);
 setIsLoading(false);

 console.log(steps);
 setSteps(steps);
 setDiagnosis(diagnosis);
 setNote(additionalNote);
 setIsGptStepperVisible(true);
 setActiveIndex(index);
 console.log('STEPS:')
console.log(steps);

};



  return (
    <Stack spacing={2}>
      {errors && errors.map((error, index) => (
		<ErrorItem
              error={error}
			  isLoading={isLoading}
              index={index}
              handleAIAssistanceClick={()=>handleAIAssistanceClick(index)}
              isGptStepperVisible={isGptStepperVisible && activeIndex === index}
              diagnosis={diagnosis}
              steps={steps}
              note={note}
            />
		
      ))}

    </Stack>
  );
};

export default ErrorStackTrace;
