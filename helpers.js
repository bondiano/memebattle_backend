module.exports = {
    parseAction: msg => {
        const type = msg.split(':')[1];
        console.log(type);
        return type
    },
};
