
export const uniqueRoomIdGenerator = () => {
    let generateRoomId = ""
    let alphabetAndNumbers = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
    for (let i = 0; i < 6; i++) {
        let randomCharacterOrNumber = alphabetAndNumbers[Math.floor(Math.random() * alphabetAndNumbers.length)];
        generateRoomId += randomCharacterOrNumber
    }
    // console.log("unique roomId --> ", generateRoomId)
    return generateRoomId;
}