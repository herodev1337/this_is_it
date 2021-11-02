/**
 * Returns an Array of local network IPs
 */
module.exports = () => {
    return Object.values(require("os").networkInterfaces())
    .flat()
    .filter(({ family, internal }) => family === "IPv4" && !internal)
    .map(({ address }) => address)
}