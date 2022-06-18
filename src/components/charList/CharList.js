import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import ErrorMessage from '../errorMessage/ErrorMessage'
import SkeletonCard from '../skeleton/SkeletonCard'
import { range } from '../../helpers/utils'
import useMarvelService from '../../services/MarvelService'

import './charList.scss'

const CharList = (props) => {
    const [items, setItems] = useState([])
    const [newItemsLoading, setNewItemsLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [itemsEnded, setItemsEnded] = useState(false)
    const limit = 3
    
    const {loading, error, getAllCharacters, clearError} = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)
        // eslint-disable-next-line
    }, [])

    const onRequest = (offset, initial) => {
        clearError()
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true)
        getAllCharacters(offset, limit)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false

        if (newCharList.length < limit) {
            ended = true
        }

        setItems((items) => [...items, ...newCharList])
        setNewItemsLoading(false)
        setOffset((offset) => offset + limit)
        setItemsEnded(ended)
    }

    const itemsRef = useRef([])

    const handleClick = (id, idx) => {
        itemsRef.current.forEach((item) => item.classList.remove('char__item_selected'))
        itemsRef.current[idx].classList.add('char__item_selected')

        props.onCharSelected(id)
    }

    function renderItems(arr) {
        const items = arr.map((item, idx) => {
            return (
                <li 
                    ref={(el) => itemsRef.current[idx] = el}
                    tabIndex={idx}
                    className="char__item"
                    key={item.id + idx}
                    onClick={() => handleClick(item.id, idx)}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            handleClick(item.id, idx)
                        }
                    }}
                >
                        <img src={item.thumbnail} alt={item.name} />
                        <div className="char__name">{item.name}</div>
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

    const itemsList = renderItems(items)
    const skeleton = loading || newItemsLoading ? renderSkeletons() : null
    const errorMessage = error ? <ErrorMessage /> : null

    return (
        <div className="char__list">
            {errorMessage}
            <ul className="char__grid">
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

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList