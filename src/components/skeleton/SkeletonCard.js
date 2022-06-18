import './skeleton.scss'

const SkeletonCard = () => {
    return (
        <>
            <div className="skeleton">
                <div className="pulse skeleton__image"></div>
                <div className="pulse skeleton__title"></div>
            </div>
        </>
    )
}

export default SkeletonCard