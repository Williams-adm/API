/* obtener id */
const obtenerURL = new URLSearchParams(window.location.search)
const comicID = obtenerURL.get('id')
////////////////////////////////////////////////////
/* primera clave */
/* const apikey = 'a2398fdfbd317316277fe42c389550e7' */ /* key publica */
/* const ts = '04/05/2024, 02:04:03' */ /* timestamp -> new Date().toLocaleString('en-GB', {timeZone:'UTC})*/
/* const hash = 'a5c11dd0c74a5615241c3ee4eeaef49f' */ /* union de ts | private | public */

/* segunda clave public: 588d0a9beacf074ff511aac1c2f46fe4
segunda clave privada: a860c4f999c1df2bf63c0c7b028fb78363dda30a
*/
const apikey = '588d0a9beacf074ff511aac1c2f46fe4'
const ts = '07/05/2024, 02:04:03'
const hash = '5fa43858711de76566b62ff2dd4d1645'
async function mascomic() {
    try {
        const url = `https://gateway.marvel.com:443/v1/public/comics/${comicID}?apikey=${apikey}&ts=${ts}&hash=${hash}`
        ///////////////////////////////////////////////////
        const response = await fetch(url)
        const info = await response.json()
        const inforesultado = await info.data.results
        /////////////////////////////////////////////////
        inforesultado.forEach(comic => {
            /* Crear el title del comic seleccionado */
            const container__title = document.querySelector('.container__title')
            const comic__title = document.createElement('h2')
            const comic__title__text = document.createTextNode(comic.title)
            comic__title.appendChild(comic__title__text)
            container__title.appendChild(comic__title)
            /* crear imagen comic */
            const container__content = document.querySelector('.container__content')
            const comic__img = document.createElement('img')
            const valide__img__comic = comic.thumbnail
            /* Validar imagen comic */
            if (valide__img__comic) {
                comic__img.src = comic.thumbnail.path + '.' + comic.thumbnail.extension
            }
            else {
                comic__img.src = "../img/no comic.jpg"
            }
            container__content.appendChild(comic__img)
            /* Creando Descripción */
            let descrip = comic.description
            if (!descrip) {
                descrip = "I'm sorry, but this comic has not description"
            }
            const comic__description__content = document.createElement('div')
            const comic__title__description = document.createElement('h3')
            const comic__title__description__text = document.createTextNode('DESCRIPTION: ')
            const comic__description = document.createElement('p')
            const comic__description__text = document.createTextNode(descrip)
            comic__title__description.appendChild(comic__title__description__text)
            comic__description.appendChild(comic__description__text)
            comic__description__content.append(comic__title__description, comic__description)
            container__content.appendChild(comic__description__content)
            /* Creando el page count */
            if (comic.pageCount.length !== 0) {
                const comic__count__content = document.createElement('div')
                const comic__title__page = document.createElement('h3')
                const comic__title__page__text = document.createTextNode('PAGE COUNT: ')
                comic__title__page.appendChild(comic__title__page__text)
                const page__count = document.createElement('p')
                const page__count__text = document.createTextNode(comic.pageCount)
                page__count.appendChild(page__count__text)
                comic__count__content.append(comic__title__page, page__count)
                container__content.append(comic__count__content)
            }
            /* Creando el issue */
            if (comic.pageCount.length !== 0) {
                const comic__issue__content = document.createElement('div')
                const comic__title__issue = document.createElement('h3')
                const comic__title__issue__text = document.createTextNode('ISSUE NUMBER: ')
                comic__title__issue.appendChild(comic__title__issue__text)
                const issue = document.createElement('p')
                const issue__text = document.createTextNode(comic.issueNumber)
                issue.appendChild(issue__text)
                comic__issue__content.append(comic__title__issue, issue)
                container__content.append(comic__issue__content)
            }
            /* object */
            if (comic.textObjects.length !== 0) {
                comic.textObjects.forEach(object => {
                    const comic__object__content = document.createElement('div')
                    const object__type__title = document.createElement('h3')
                    const object__type__title__text = document.createTextNode(object.type)
                    object__type__title.appendChild(object__type__title__text)
                    const object__language = document.createElement('h4')
                    const object__language__text = document.createTextNode('LENGUAGE:')
                    object__language.appendChild(object__language__text)
                    const language = document.createElement('p')
                    const language__text = document.createTextNode(object.language)
                    language.appendChild(language__text)
                    const object__synopsis = document.createElement('h4')
                    const object__synopsis__text = document.createTextNode('SYNOPCIS:')
                    object__synopsis.appendChild(object__synopsis__text)
                    const synopsis = document.createElement('p')
                    /* const synopsis__text = document.createTextNode(object.text) */
                    synopsis.innerHTML = object.text
                    /* synopsis.appendChild(synopsis__text) */
                    comic__object__content.append(object__type__title, object__language, language, object__synopsis, synopsis)
                    container__content.appendChild(comic__object__content)
                });
            }
            /* Precios */
            if (comic.prices.length !== 0) { 
                const prices__content = document.createElement('div')
                const prices__title = document.createElement('h3')
                const prices__title__text = document.createTextNode('PRICES:')
                prices__title.appendChild(prices__title__text)
                prices__content.appendChild(prices__title)
                comic.prices.forEach(precio => {
                    const prices__type = document.createElement('h4')
                    const prices__type__text = document.createTextNode(precio.type)
                    prices__type.appendChild(prices__type__text)
                    const prices = document.createElement('p')
                    const number__prices = document.createTextNode('$.' + precio.price)
                    prices.appendChild(number__prices)
                    prices__content.append(prices__type, prices)
                    container__content.append(prices__content)
                })
            }
            /* Creador */
            if (comic.creators.items.length !== 0) {
                ///////////////////////////////////////////////////
                /* Generando array para traer las imagenes y guradarlas */
                const creador__array = []
                const a__array = []
                /* Generando el url para traer mas detalles de creadores */
                async function infocreator() {
                    try {
                        const urlcreators = comic.creators.collectionURI + `?apikey=${apikey}` + `&ts=${ts}` + `&hash=${hash}`
                        ///////////////////////////////////////////////////
                        const responsecre = await fetch(urlcreators)
                        const infocre = await responsecre.json()
                        const inforesultadocre = await infocre.data.results
                        if (inforesultadocre.length !== 0) {
                            inforesultadocre.forEach(creator => {
                                const creator__valid__img = creator.thumbnail
                                /* Validar existencia de img */
                                let valor = 0
                                if (creator__valid__img) {
                                    valor = creator.thumbnail.path + '.' + creator.thumbnail.extension
                                }
                                else {
                                    valor = "../img/no creator.png"
                                }
                                creador__array.push(valor)
                                /* linkeado */
                                if (creator.urls) {
                                    creator.urls.forEach(urls => {
                                        const url__valid = urls.url
                                        let valor__url = 0
                                        if (url__valid) {
                                            valor__url = urls.url
                                        } else {
                                            valor__url = ""
                                        }
                                        a__array.push(valor__url)
                                    })
                                }
                            })
                            ///////////////////////////////////////////////////////
                            comic.creators.items.forEach((autor, index) => {
                                const content__creator = document.createElement('div')
                                const name__creator = document.createElement('h4')
                                const name__creator__text = document.createTextNode(autor.name)
                                name__creator.appendChild(name__creator__text)
                                /* Agregando el url a el nombre del creador */
                                const alink__creator = document.createElement('a')
                                alink__creator.setAttribute('target', '_blank')
                                alink__creator.href = a__array[index]
                                alink__creator.appendChild(name__creator)
                                const rol__creator = document.createElement('h4')
                                const rol__Creator__text = document.createTextNode('ROLE: ')
                                rol__creator.appendChild(rol__Creator__text)
                                const rol = document.createElement('p')
                                const rol__text = document.createTextNode(autor.role)
                                rol.appendChild(rol__text)
                                const container__creators = document.querySelector('.container__creators')
                                /* Llmando el array creado de arriba */
                                const img__creator = document.createElement('img')
                                img__creator.src = creador__array[index]
                                content__creator.append(alink__creator, rol__creator, rol, img__creator)
                                container__creators.append(content__creator)
                            })
                        } else {
                            const container__creators__delete = document.querySelector('.container__creators')
                            container__creators__delete.remove()
                        }
                    } catch (error) {
                        console.log("Se ha producido un error: ", error)
                    }
                }
                infocreator()
            } else {
                const container__creators__delete = document.querySelector('.container__creators')
                container__creators__delete.remove()
            }
            if (comic.characters.length !== 0) {
                async function infocharacter() {
                    try {
                        urlcharacters = comic.characters.collectionURI + `?apikey=${apikey}` + `&ts=${ts}` + `&hash=${hash}`
                        const responsecha = await fetch(urlcharacters)
                        const infocha = await responsecha.json()
                        const inforesultadocha = await infocha.data.results
                        inforesultadocha.forEach(character => {
                            if (character !== 0) {
                                const container__characters = document.querySelector('.container__characters')
                                const content__characters = document.createElement('div')
                                const title__characters = document.createElement('h3')
                                const title__characters__text = document.createTextNode(character.name)
                                title__characters.appendChild(title__characters__text)
                                const img__character = document.createElement('img')
                                if (character.thumbnail !== 0) {
                                    img__character.src = character.thumbnail.path + '.' + character.thumbnail.extension
                                } else {
                                    img__character.src = "../img/no characters.jpg"
                                }
                                const id = character.id
                                const button__character = document.createElement('button')
                                const alink__character = document.createElement('a')
                                alink__character.setAttribute('target', '_blank')
                                alink__character.href = `personaje-detalle.html?id=${id}`
                                const alink__character__text = document.createTextNode('MORE ABOUT ME')
                                alink__character.appendChild(alink__character__text)
                                button__character.appendChild(alink__character)
                                content__characters.append(title__characters, img__character, button__character)
                                container__characters.appendChild(content__characters)
                            }
                            else {
                                const container__characters__delete = document.querySelector('.container__characters')
                                container__characters__delete.remove()
                            }
                        });
                    } catch (error) {
                        console.log("Se ha producido un error: ", error)
                    }
                } infocharacter()
            } else {
                const container__characters__delete = document.querySelector('.container__characters')
                container__characters__delete.remove()
            }
            /* series */
            if (comic.series.length !== 0) {
                async function infoserie() {
                    try {
                        const urlseries = comic.series.resourceURI + `?apikey=${apikey}` + `&ts=${ts}` + `&hash=${hash}`
                        const responsese = await fetch(urlseries)
                        const infose = await responsese.json()
                        const inforesultadose = await infose.data.results
                        inforesultadose.forEach(serie => {
                            if (serie !== 0) {
                                const container__serie = document.querySelector('.container__serie')
                                const content__serie = document.createElement('div')
                                const serie__title = document.createElement('h3')
                                const serie__title__text = document.createTextNode(serie.title)
                                serie__title.appendChild(serie__title__text)
                                const serie__img = document.createElement('img')
                                const valide__img__serie = serie.thumbnail
                                if (valide__img__serie) {
                                    serie__img.src = serie.thumbnail.path + '.' + serie.thumbnail.extension
                                } else {
                                    img__storie.src = "../img/no serie.jpg"
                                }
                                const button__serie = document.createElement('button')
                                const alink__serie = document.createElement('a')
                                alink__serie.setAttribute('target', '_blank')
                                const alink__serie__text = document.createTextNode('MORE ABOUT ME')
                                alink__serie.appendChild(alink__serie__text)
                                button__serie.appendChild(alink__serie)
                                content__serie.append(serie__title, serie__img, button__serie)
                                container__serie.appendChild(content__serie)
                            } else {
                                const container__serie__delete = document.querySelector('.container__serie')
                                container__serie__delete.remove()
                            }
                        })
                    } catch (error) {
                        console.log("Se ha producido un error: ", error)
                    }
                } infoserie()
            } else {
                const container__serie__delete = document.querySelector('.container__serie')
                container__serie__delete.remove()
            }
            /* stories */
            if (comic.stories.available) {
                async function infostorie() {
                    try {
                        const urlstorie = comic.stories.collectionURI + `?apikey=${apikey}` + `&ts=${ts}` + `&hash=${hash}`
                        const responsest = await fetch(urlstorie)
                        const infost = await responsest.json()
                        const inforesultadost = await infost.data.results
                        inforesultadost.forEach(storie => {
                            if (storie !== 0) {
                                const container__storie = document.querySelector('.container__storie')
                                const content__storie = document.createElement('div')
                                const storie__title = document.createElement('h3')
                                const storie__title__text = document.createTextNode(storie.title)
                                storie__title.appendChild(storie__title__text)
                                const img__storie = document.createElement('img')
                                const valide__img__storie = storie.thumbnail
                                if (valide__img__storie) {
                                    img__storie.src = storie.thumbnail.path + '.' + storie.thumbnail.extension
                                } else {
                                    img__storie.src = "../img/no storie.jpg"
                                }
                                const button__storie = document.createElement('button')
                                const alink__storie = document.createElement('a')
                                alink__storie.setAttribute('target', '_blank')
                                const alink__storie__text = document.createTextNode('MORE ABOUT ME')
                                alink__storie.appendChild(alink__storie__text)
                                button__storie.appendChild(alink__storie)
                                content__storie.append(storie__title, img__storie, button__storie)
                                container__storie.appendChild(content__storie)
                            } else {
                                const container__storie__delete = document.querySelector('.container__serie')
                                container__storie__delete.remove()
                            }
                        })
                    } catch (error) {
                        console.log("Se ha producido un error: ", error)
                    }
                } infostorie()
            }
            else {
                const container__serie__delete = document.querySelector('.container__serie')
                container__serie__delete.remove()
            }
            /* EVENT */
            if (comic.events.available) {
                async function infoevent() {
                    try {
                        const urlevent = comic.events.collectionURI + `?apikey=${apikey}` + `&ts=${ts}` + `&hash=${hash}`
                        const responseeve = await fetch(urlevent)
                        const infoeve = await responseeve.json()
                        const inforesultadoeve = await infoeve.data.results
                        inforesultadoeve.forEach(events => {
                            if (events !== 0) {
                                const container__events = document.querySelector('.container__events')
                                const content__events = document.createElement('div')
                                const events__title = document.createElement('h3')
                                const events__title__title = document.createTextNode(events.title)
                                events__title.appendChild(events__title__title)
                                const events__img = document.createElement('img')
                                const valide__img__events = events.thumbnail
                                if (valide__img__events) {
                                    events__img.src = events.thumbnail.path + '.' + events.thumbnail.extension
                                } else {
                                    events__img.src = "../img/no event.jpg"
                                }
                                const button__events = document.createElement('button')
                                const alink__events = document.createElement('a')
                                alink__events.setAttribute('target', '_blank')
                                const alink__events__text = document.createTextNode('MORE ABOUT ME')
                                alink__events.appendChild(alink__events__text)
                                button__events.appendChild(alink__events)
                                content__events.append(events__title, events__img , button__events)
                                container__events.appendChild(content__events)
                            }
                            else {
                                const container__events__delete = document.querySelector('.container__events')
                                container__events__delete.remove()
                            }
                        })
                    } catch (error) {
                        console.log("Se ha producido un error: ", error)
                    } 
                } infoevent()
            } else {
                const container__events__delete = document.querySelector('.container__events')
                container__events__delete.remove()
            }
        });  
    } catch (error) {
        console.log("Se ha producido un error: ", error)
    }
}
mascomic()