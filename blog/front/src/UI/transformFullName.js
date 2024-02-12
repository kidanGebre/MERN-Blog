export function transformFullName (fullName) {
    // Split the full name into an array of words
    const words = fullName.split(' ');

    // Check if there are at least two words (first name and last name)
    if(words.length >= 2) {
        const firstName = words[ 0 ];
        const lastName = words[ words.length - 1 ];

        // Create the transformed format
        const transformedName = `${firstName} ${lastName[ 0 ]}.`;

        return transformedName;
    } else {
        // If there are not enough words, return the original name
        return fullName;
    }
}