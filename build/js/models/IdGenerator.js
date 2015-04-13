var IdGenerator = (function () {
    function IdGenerator() {
    }
    IdGenerator.newId = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return IdGenerator;
})();
module.exports = IdGenerator;
