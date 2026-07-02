import { useEffect, useState } from "react";
import API from "../services/api";
import NotificationItem from "./NotificationItem";

function NotificationBell() {

    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {

        try {

            const response = await API.get("/api/notifications");

            console.log("Notifications Response:", JSON.stringify(response.data, null, 2));

            setNotifications(response.data.notifications);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchNotifications();

    }, []);

    const unreadCount = notifications.filter(
        notification => !notification.isRead
    ).length;

    return (

        <div className="dropdown">

            <button
                className="btn btn-light position-relative"
                data-bs-toggle="dropdown"
            >

                🔔

                {unreadCount > 0 && (

                    <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    >

                        {unreadCount}

                    </span>

                )}

            </button>

            <ul
                className="dropdown-menu dropdown-menu-end"
                style={{
                    width: "350px",
                    maxHeight: "400px",
                    overflowY: "auto"
                }}
            >

                {notifications.length === 0 ? (

                    <li className="dropdown-item">

                        No Notifications

                    </li>

                ) : (

                    notifications.map((notification) => (

                        <NotificationItem

                        key={notification._id}

                        notification={notification}

                        refreshNotifications={fetchNotifications}

                        />

                    ))

                )}

            </ul>

        </div>

    );

}

export default NotificationBell;