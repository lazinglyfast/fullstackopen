import { PropTypes } from "prop-types"

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const style = {
    color: "green",
    backgroundColor: "lightgrey",
    borderStyle: "solid",
    borderColor: "green",
    borderWidth: 4,
    borderRadius: 8,
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.string,
}

export default Notification
