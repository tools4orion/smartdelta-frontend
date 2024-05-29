const errorToString = (errorObj) => {
	const { exception } = errorObj;
	let result = '';
  
	// Iterate through each error
	exception.forEach((error, errorIndex) => {
	  result += `Error #${errorIndex + 1}\n`;
	  result += `Stack Trace:\n`;
  
	  // Iterate through each stack trace of the error
	  error.stacktrace.forEach((trace, traceIndex) => {
		result += `Stack Trace #${traceIndex + 1}\n`;
		result += `${trace.function} in ${trace.abs_path}:${trace.line?.number}\n`;
  
		// Include context if available
		if (trace.line?.context) {
		  result += `${trace.line.context}\n`;
		}
  
		// Include pre-context if available
		if (trace.context?.pre) {
		  trace.context.pre.forEach((preContext) => {
			result += `${preContext}\n`;
		  });
		}
  
		// Include post-context if available
		if (trace.context?.post) {
		  trace.context.post.forEach((postContext) => {
			result += `${postContext}\n`;
		  });
		}
  
		result += `\n`;
	  });
  
	  result += `\n`;
	});
  
	return result;
  };
  

export default errorToString;