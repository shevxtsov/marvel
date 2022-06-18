import { useState, useEffect } from 'react'
import useMarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/ErrorMessage'
import SkeletonCard from '../skeleton/SkeletonCard'
import { range } from '../../helpers/utils'

import './comicsList.scss'

const ComicsList = () => {
    const [comics, setComics] = useState([])
    const [newItemsLoading, setNewItemsLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [itemsEnded, setItemsEnded] = useState(false)
    const [limit, setLimit] = useState(8)
    const {loading, error, getAllComics} = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true)
        getAllComics(offset, limit)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false

        if (newComicsList.length < limit) {
            ended = true
        }

        setComics((items) => [...items, ...newComicsList])
        setNewItemsLoading(false)
        setOffset((offset) => offset + limit)
        setItemsEnded(ended)
    }

    function renderItems(arr) {
        const items = arr.map((item, idx) => {
            return (
                <li className="comics__item" key={idx}>
                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        })

        return items
    }

    function renderSkeletons() {
        return range(0, limit).map((item) => {
            return (
                <SkeletonCard key={item} />
            )
        })
    }

    const itemsList = renderItems(comics)
    const skeleton = loading || newItemsLoading ? renderSkeletons() : null
    const errorMessage = error ? <ErrorMessage/> : null
    
    return (
        <div className="comics__list">
            {errorMessage}
            <ul className="comics__grid">
                {itemsList}
                {skeleton}
            </ul>
            <button
                className="button button__main button__long"
                disabled={newItemsLoading}
                style={{'display': itemsEnded || error ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">{newItemsLoading ? 'loading...' : 'load more'}</div>
            </button>
        </div>
    )
}

export default ComicsList