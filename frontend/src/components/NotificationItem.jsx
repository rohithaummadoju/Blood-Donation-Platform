import API from "../services/api";

function NotificationItem({
    notification,
    refreshNotifications
}) {

    const markAsRead = async () => {

        try {

            await API.put(
                `/api/notifications/${notification._id}/read`
            );

            refreshNotifications();

        } catch (error) {

            console.log(error);

        }

    };

    const deleteNotification = async () => {

        try {

            await API.delete(
                `/api/notifications/${notification._id}`
            );

            refreshNotifications();

        } catch (error) {

            console.log(error);

        }

    };

    const badgeColor = {

        accepted: "success",

        rejected: "danger",

        request: "primary",

        system: "secondary"

    };

    return (

        <div
            className={`border-bottom p-2 ${
                notification.isRead
                    ? ""
                    : "bg-light"
            }`}
        >

            <div className="d-flex justify-content-between">

                <span
                    className={`badge bg-${
                        badgeColor[
                            notification.type
                        ]
                    }`}
                >

                    {notification.type}

                </span>

                {!notification.isRead && (

                    <button
                        className="btn btn-sm btn-outline-success"
                        onClick={markAsRead}
                    >

                        ✓

                    </button>

                )}

            </div>

            <strong>

                {notification.title}

            </strong>

            <br />

            <small>

                {notification.message}

            </small>

            <br />

            <button
                className="btn btn-sm btn-link text-danger p-0 mt-1"
                onClick={deleteNotification}
            >

                Delete

            </button>

        </div>

    );

}

export default NotificationItem;