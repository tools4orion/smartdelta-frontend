export const formatDate = (dateString) => {
	const date = new Date(dateString);
	const options = {
	  year: 'numeric',
	  month: 'long',
	  day: 'numeric',
	  hour: 'numeric',
	  minute: 'numeric',
	  second: 'numeric',
	  hour12: true,
	};
	const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
	return formattedDate;
  };
  