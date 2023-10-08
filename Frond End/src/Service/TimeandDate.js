export function convertDatetimeFormat(initialDatetime) {
    const parsedDate = new Date(initialDatetime);
    
    // Format date and time
    const formattedDate = parsedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const formattedTime = parsedDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });

    // Combine date, time, and AM/PM
    const convertedDatetime = `${formattedDate.split("/").join("-")} ${formattedTime} `;

    return convertedDatetime;
}

export function revertDatetimeFormat(convertedDatetime) {
    const dateParts = convertedDatetime.split(' '); // Split into date, time, and AM/PM parts

    const datePart = dateParts[0];
    const timePart = dateParts[1];
    const ampm = dateParts[2];

    const [hours, minutes] = timePart.split(':'); // Split time into hours and minutes

    // Determine the 24-hour format hours based on AM/PM
    const militaryHours = ampm === 'AM' ? parseInt(hours, 10) : parseInt(hours, 10) + 12;

    // Create a new Date object using the extracted parts
    const revertedDate = new Date(`${datePart}T${militaryHours}:${minutes}`);

    return revertedDate.toISOString(); // Outputs: "2023-08-31T10:00:00.000Z"
}

