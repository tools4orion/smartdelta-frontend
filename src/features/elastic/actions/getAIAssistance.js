import gptEndpoints from "network/endpoints/gpt";
import errorToString from "../Errors/ErrorToList";


const getAIAssistance = async(error) => {
	const errorAsText = errorToString(error);
	const {data} = await gptEndpoints.inputErrorData(errorAsText);
	return data;
  };

  export default getAIAssistance;