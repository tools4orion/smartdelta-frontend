export const getDateForFilter = (date) => {
    const startDate = new Date();

    switch (date) {
		case 1:
            startDate.setMinutes(startDate.getMinutes() - 15);
            break;
		case 2:
			startDate.setHours(startDate.getHours() - 1);
			break;
        case 3:
            startDate.setHours(startDate.getHours() - 24);
            break;
        case 4:
            startDate.setDate(startDate.getDate() - 7);
            break;
        case 5:
            startDate.setDate(1);
            break;
        default:
            break;
    }

    return startDate.toISOString();
};

