
export const uniqueRoomIdGenerator = () => {
    let generateRoomId = ""
    let alphabetAndNumbers = '0123456789'.split('');
    for (let i = 0; i < 5; i++) {
        let randomCharacterOrNumber = alphabetAndNumbers[Math.floor(Math.random() * alphabetAndNumbers.length)];
        generateRoomId += randomCharacterOrNumber
    }
    // console.log("unique roomId --> ", generateRoomId)
    return generateRoomId.toUpperCase();
}