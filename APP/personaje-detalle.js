/* obtener id */
const obtenerURL = new URLSearchParams(window.location.search)
const personajeID = obtenerURL.get('id')
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
async function mostrardetalles(){
    try {
        const url = `https://gateway.marvel.com:443/v1/public/characters/${personajeID}?apikey=${apikey}&ts=${ts}&hash=${hash}`
        const response = await fetch(url)
        const info = await response.json()
        const inforesultado = await info.data.results
        /////////////////////////////////////////////////
        inforesultado.forEach(characters => {
            const container__title = document.querySelector('.container__title')
            const title = document.createElement('h1')
            const title__name = document.createTextNode(characters.name)
            title.appendChild(title__name)
            container__title.appendChild(title)
            //////////////////////////////////////
            const img = document.createElement('img')
            img.src = characters.thumbnail.path + '.' + characters.thumbnail.extension
            const container__content = document.querySelector('.container__content')
            container__content.appendChild(img)
            ////////////////////////////////////
            /* validación */
            let descrip = characters.description
            if (!descrip) {
                descrip = "I'm sorry, but this heroe has not description"
            }
            /////////////////////////////////////
            /* uso de la validación para la descripcion */
            const content__description = document.createElement('div')
            const description__title = document.createElement('h3')
            const description__title__text = document.createTextNode('DESCRIPTION:')
            description__title.appendChild(description__title__text)
            const description = document.createElement('p')
            const description__text = document.createTextNode(descrip)
            description.appendChild(description__text)
            content__description.append(description__title, description)
            container__content.appendChild(content__description)
            //////////////////////////////////////
            async function infocomic() {
                try {
                    /////////////////////////////////////
                    /* Generando el url para traer mas detalles de comics */
                    const urlcomic = characters.comics.collectionURI + `?apikey=${apikey}` + `&ts=${ts}` + `&hash=${hash}`
                    const responsec = await fetch(urlcomic)
                    const infoc = await responsec.json()
                    const inforesultadoc = await infoc.data.results
                    /* Accediendo a los comics */
                    if (inforesultadoc.length === 0) {
                            const container__comic__delete = document.querySelector('.container__comic')
                            container__comic__delete.remove()
                    }
                    else{
                    inforesultadoc.forEach(datecomics => {
                        /* CREAR TITULO COMIC */
                        const content__comic = document.createElement('div')
                        const title__comic = document.createElement('h3')
                        const title__comic__text = document.createTextNode(datecomics.title)
                        const container__comic = document.querySelector('.container__comic')
                        title__comic.appendChild(title__comic__text)
                        content__comic.appendChild(title__comic)
                        container__comic.appendChild(content__comic)
                        /* crear imagen comic */
                        const comic__img = document.createElement('img')
                        const valide__img__comic = datecomics.thumbnail
                        /* Validar imagen comic */
                        if (valide__img__comic) {
                            comic__img.src = datecomics.thumbnail.path + '.' + datecomics.thumbnail.extension
                        }
                        else {
                            comic__img.src = "../img/no comic.jpg"
                        }
                        content__comic.appendChild(comic__img)
                        container__comic.appendChild(content__comic)
                        /* Crear boton */
                        const comic__id = datecomics.id
                        const boton__comic = document.createElement('button')
                        const a__comic = document.createElement('a')
                        const a__comic__text = document.createTextNode('MORE INFORMATION HERE')
                        a__comic.href = `comic-detalle.html?id=${comic__id}`/* pasando el id */
                        a__comic.setAttribute('target', '_blank')
                        a__comic.appendChild(a__comic__text)
                        boton__comic.appendChild(a__comic)
                        content__comic.appendChild(boton__comic)
                        container__comic.appendChild(content__comic)
                    })
                    }
                } catch (error) {
                    console.log("Se ha producido un error: ", error)
                }
            }
            infocomic()
            async function infoserie() {
                try {
                    /* Generando el url para traer mas detalles de series */
                    const urlseries = characters.series.collectionURI + `?apikey=${apikey}` + `&ts=${ts}` + `&hash=${hash}`
                    ///////////////////////////////////////////////////////////
                    const responses = await fetch(urlseries)
                    const infos = await responses.json()
                    const inforesultados = await infos.data.results
                    /* Accediendo a las series */
                    if (inforesultados.length === 0) {
                        const container__series__delete = document.querySelector('.container__series')
                        container__series__delete.remove()
                    } else {
                        inforesultados.forEach(dateserie => {
                            /* Crear titulo cada series */
                            const container__series = document.querySelector('.container__series')
                            const content__series = document.createElement('div')
                            const title__series = document.createElement('h3')
                            const title__series__text = document.createTextNode(dateserie.title)
                            title__series.appendChild(title__series__text)
                            content__series.appendChild(title__series)
                            container__series.appendChild(content__series)
                            /* Crear imagen series */
                            const valide__img__series = dateserie.thumbnail
                            const serie__img = document.createElement('img')
                            /* validar imagen */
                            if(valide__img__series){
                                serie__img.src = dateserie.thumbnail.path + '.' + dateserie.thumbnail.extension
                            }
                            else {
                                serie__img.src = "../img/no serie.jpg"
                            }
                            content__series.appendChild(serie__img)
                            container__series.appendChild(content__series)
                            /* Crear boton */
                            const boton__series = document.createElement('button')
                            const a__series = document.createElement('a')
                            const a__series__text = document.createTextNode('MORE INFORMATION HERE')
                            a__series.setAttribute('target', '_blank')
                            a__series.appendChild(a__series__text)
                            boton__series.appendChild(a__series)
                            content__series.appendChild(boton__series)
                            container__series.appendChild(content__series)
                        })
                    }
                } catch (error) {
                    console.log("Se ha producido un error: ", error)
                }
            }    
            infoserie()
            async function infostories() {
                try {
                    /* Generando el url para traer stories */
                    const urlstories = characters.stories.collectionURI + `?apikey=${apikey}` + `&ts=${ts}` + `&hash=${hash}`
                    ///////////////////////////////////////////////////////////////////
                    const responses = await fetch(urlstories)
                    const infost = await responses.json()
                    const inforesultadost = await infost.data.results
                    /* Accediendo a las stories */
                    /* validando si existe contenido en el array */
                    if (inforesultadost.length === 0) {
                        const container__stories__delete = document.querySelector('.container__stories')
                        container__stories__delete.remove()
                    }
                    else{
                        inforesultadost.forEach(datastorie => {
                            /* Crear titulo cada stories */
                               const container__stories = document.querySelector('.container__stories')
                            const content__stories = document.createElement('div')
                            const title__stories = document.createElement('h3')
                            const title__stories__text = document.createTextNode(datastorie.title)
                            title__stories.appendChild(title__stories__text)
                            content__stories.appendChild(title__stories)
                            container__stories.appendChild(content__stories)
                            /* Crear imagen storie */
                            const valide__img__stories = datastorie.thumbnail
                            const stories__img = document.createElement('img')
                            /* Validar el campo si tiene la imagenen a traer */
                            if (valide__img__stories) {
                                stories__img.src = datastorie.thumbnail.path + '.' + datastorie.thumbnail.extension
                            }else {
                                stories__img.src = "../img/no storie.jpg"
                            }
                            content__stories.appendChild(stories__img)
                            container__stories.appendChild(content__stories)
                            /* Crear boton */
                            const boton__stories = document.createElement('button')
                            const a__stories = document.createElement('a')
                            const a__stories__text = document.createTextNode('MORE INFORMATION HERE')
                            a__stories.setAttribute('target', '_blank')
                            a__stories.appendChild(a__stories__text)
                            boton__stories.appendChild(a__stories)
                            content__stories.appendChild(boton__stories)
                            container__stories.appendChild(content__stories)
                        })
                    }
                } catch (error) {
                    console.log("Se ha producido un error: ", error)
                }
            }
            infostories()
            async function infoevents() {
                try {
                    /* Generando el url para traer events */
                    const urlevents = characters.events.collectionURI + `?apikey=${apikey}` + `&ts=${ts}` + `&hash=${hash}`
                    ////////////////////////////////////////////////////
                    const responseev = await fetch(urlevents)
                    const infoev = await responseev.json()
                    const inforesultadoev = await infoev.data.results
                    /* Accediendo a eventos */
                        /* Validación para saber si esta vacio o no */
                        /* !Array.isArray(dateevents) ||  */
                    if (inforesultadoev.length === 0) {
                        const container__events__delete = document.querySelector('.container__events')
                        container__events__delete.remove()
                    }
                    else {
                        inforesultadoev.forEach(dateevent => {
                            /* valida si existe contenido o no en el vento */
                            const container__events = document.querySelector('.container__events')
                            /* Trayendo a los nombres de eventos */
                            const content__event = document.createElement('div')
                            const title__event = document.createElement('h3')
                            const title__event__text = document.createTextNode(dateevent.title)
                            title__event.appendChild(title__event__text)
                            content__event.appendChild(title__event)
                            container__events.appendChild(content__event)
                            /* Validar si existe imagen */
                            const valid__img__event = dateevent.thumbnail
                            const event__img = document.createElement('img')
                            if (valid__img__event) {
                                event__img.src = dateevent.thumbnail.path + '.' + dateevent.thumbnail.extension
                            } else {
                                event__img.src = "../img/no event.jpg"
                            }
                            content__event.appendChild(event__img)
                            container__events.appendChild(content__event)
                            /* Crear boton */
                            const boton__event = document.createElement('button')
                            const a__event = document.createElement('a')
                            const a__event__text = document.createTextNode('MORE INFORMATION HERE')
                            a__event.setAttribute('target', '_blank')
                            /* falta la Agregar la dirección correpondiente para acceder*/
                            a__event.appendChild(a__event__text)
                            boton__event.appendChild(a__event)
                            content__event.appendChild(boton__event)
                            container__events.appendChild(content__event)
                        })
                    }
                } catch (error) {
                    console.log("Se ha producido un error: ", error)
                }
            }
            infoevents()
            async function infourls() {
                /* Trayendo a mas links relacionados */
                const recorrer = characters.urls
                if (recorrer.length === 0) {
                    const container__relevantlinks__delete = document.querySelector('.container__relevantlinks')
                    container__relevantlinks__delete.remove()
                }
                else{
                recorrer.forEach(run => {
                    const container__relevantlinks = document.querySelector('.container__relevantlinks')
                    const link__content = document.createElement('div')
                    const link__a = document.createElement('a')
                    link__a.setAttribute('target', '_blank')
                    link__a.href = run.url
                    const link__a__text = document.createTextNode(run.type)
                    const button__link = document.createElement('button')
                    link__a.appendChild(link__a__text)
                    button__link.appendChild(link__a)
                    link__content.appendChild(button__link)
                    container__relevantlinks.appendChild(link__content)
                })
                }  
            }
            infourls()
        })
    } catch (error) {
        console.log("Se ha producido un error: ", error)
    }
}
mostrardetalles()