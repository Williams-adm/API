/* clave public: a2398fdfbd317316277fe42c389550e7 */
/* clave privada: 04963d769c4bc7bfbadbd28d6587a6ca1ea3602c */
const apikey = 'a2398fdfbd317316277fe42c389550e7' /* key publica */
const ts = '04/05/2024, 02:04:03' /* timestamp -> new Date().toLocaleString('en-GB', {timeZone:'UTC})*/
const hash = 'a5c11dd0c74a5615241c3ee4eeaef49f' /* union de ts | private | public */
const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${apikey}&ts=${ts}&hash=${hash}`

fetch(url)
    .then(response => response.json())
    .then(response => console.log(response.data.results))
    .catch( error => console.log('Se ha producido un error: ', error))