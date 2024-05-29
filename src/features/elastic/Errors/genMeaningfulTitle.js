const  genMeaningfulTitle = (errorMessage) => {
    const match = errorMessage.match(/Value (.*?) at '(.*?)' failed/);
        if (match) {
            const value = match[1];
            const field = match[2];
            return `Error: ${value} at '${field}'`;

        } 
    
    
    return "Error: See more";
}

export default genMeaningfulTitle;