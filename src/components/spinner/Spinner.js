import './spinner.scss'

const Spinner = ({classSpinner}) => {
    return (
        <div className={'spinner spinner--' + classSpinner}>
            <div className="spinner__inner"></div>
        </div>
    )
}

export default Spinner