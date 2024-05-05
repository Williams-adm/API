/* clave public: a2398fdfbd317316277fe42c389550e7 */
/* clave privada: 04963d769c4bc7bfbadbd28d6587a6ca1ea3602c */
const apikey = 'a2398fdfbd317316277fe42c389550e7' /* key publica */
const ts = '04/05/2024, 02:04:03' /* timestamp -> new Date().toLocaleString('en-GB', {timeZone:'UTC})*/
const hash = 'a5c11dd0c74a5615241c3ee4eeaef49f' /* union de ts | private | public */
const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${apikey}&ts=${ts}&hash=${hash}`

fetch(url)
    .then(response => response.json())
    .then(response => datos(response.data.results))
    .catch(error => console.log('Se ha producido un error: ', error))


/* const title = document.createElement('h2')
const container = document.querySelector('.container')
container.appendChild(title)

const textitle = document.createTextNode('HOLA')
title.appendChild(textitle) */

const datos = (personajes) => {
    personajes.forEach(characters => {
        /* console.log(elemento.name) */
        const id = characters.id
        const container = document.querySelector('.container')
        const target = document.createElement('div')
        const target__title = document.createElement('h2')
        const title__text = document.createTextNode(characters.name)
        const target__link = document.createElement('a')
        target__link.href = `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=${apikey}&ts=${ts}&hash=${hash}`;
        console.log(id)
        /* https://gateway.marvel.com:443/v1/public//characters/1010846?apikey=a2398fdfbd317316277fe42c389550e7&ts=04/05/2024,%2002:04:03&hash=a5c11dd0c74a5615241c3ee4eeaef49f */

        target__title.appendChild(title__text)
        target.appendChild(target__title)
        container.appendChild(target)
        ///////////////////////////////////////////
        const target__imagen = document.createElement('img')
        target__imagen.src = characters.thumbnail.path + '.' + characters.thumbnail.extension
        target__link.appendChild(target__imagen)
        target.appendChild(target__link)
    });
}
