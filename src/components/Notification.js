const Notification = ({ classStatus, notification }) => {
  if (notification === null) {
    return null;
  } else {
    return <div className={classStatus}>{notification}</div>;
  }
};
export default Notification;
