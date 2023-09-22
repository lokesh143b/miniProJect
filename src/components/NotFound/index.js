import './index.css'

const NotFound = props => {
  const onClickGoHome = () => {
    const {history} = props
    console.log(props)
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <div className="not-found-videos-view">
        {/* <img
            className="not-found-videos-img"
            src={notFindImageUrl}
            alt="not found"
          /> */}
        <h1 className="not-found-videos-heading">Lost Your Way ?</h1>
        <p className="not-found-videos-note">
          we are sorry, the page you requested could not be found Please go back
          to the homepage.
        </p>

        <button
          onClick={onClickGoHome}
          className="not-found-comp-btn"
          type="button"
        >
          Go to Home
        </button>
      </div>
    </div>
  )
}

export default NotFound
