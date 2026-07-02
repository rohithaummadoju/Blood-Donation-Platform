import { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap
} from "react-leaflet";
import L from "leaflet";
import API from "../services/api";
import { getDistance } from "geolib";

import "leaflet/dist/leaflet.css";

// Fix Leaflet Marker Icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Automatically move map to current location
function ChangeMapCenter({ center }) {

    const map = useMap();

    useEffect(() => {

        map.setView(center, 13);

    }, [center, map]);

    return null;
}

function MapView() {

    const [donors, setDonors] = useState([]);

    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {

        fetchDonors();

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(

                (position) => {

                    setCurrentLocation({

                        latitude: position.coords.latitude,

                        longitude: position.coords.longitude

                    });

                },

                (error) => {

                    console.log(error);

                }

            );

        }

    }, []);

    const fetchDonors = async () => {

        try {

            const response = await API.get("/api/donors/map");

            setDonors(response.data.donors);

        } catch (error) {

            console.log(error);

        }

    };

    const defaultCenter = currentLocation
        ? [
              currentLocation.latitude,
              currentLocation.longitude
          ]
        : [
              16.316962483970894,
              80.43624894195
          ];
          const sortedDonors = [...donors]
                .map((donor) => {

                const distance = currentLocation
                ? getDistance(
                {
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude
                },
                {
                    latitude: donor.location.latitude,
                    longitude: donor.location.longitude
                }
                ) / 1000
                : Infinity;

            return {
                ...donor,
                distance
            };

        })
        .sort((a, b) => a.distance - b.distance);

    return (

        <div className="container mt-4">

            <h2 className="text-center text-danger mb-3">
                Nearby Blood Donors
            </h2>

            <MapContainer
                center={defaultCenter}
                zoom={12}
                style={{
                    height: "550px",
                    width: "100%",
                    borderRadius: "10px"
                }}
            >

                <ChangeMapCenter center={defaultCenter} />

                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Donor Markers */}

                {donors.map((donor) => {

                    const distance = currentLocation
                        ? getDistance(
                              {
                                  latitude: currentLocation.latitude,
                                  longitude: currentLocation.longitude
                              },
                              {
                                  latitude: donor.location.latitude,
                                  longitude: donor.location.longitude
                              }
                          ) / 1000
                        : null;
                        
                    return (

                        <Marker
                            key={donor._id}
                            position={[
                                Number(donor.location.latitude),
                                Number(donor.location.longitude)
                            ]}
                        >

                            <Popup>

                                <h5>{donor.name}</h5>

                                <p>
                                    🩸 <b>Blood Group:</b> {donor.bloodGroup}
                                </p>

                                <p>
                                    📍 <b>City:</b> {donor.city}
                                </p>

                                <p>
                                    📞 <b>Phone:</b> {donor.phone}
                                </p>

                                {distance !== null && (
                                    <p>
                                        📏 <b>Distance:</b>{" "}
                                        {Number.isFinite(distance)
                                        ? `${distance.toFixed(2)} km`
                                        : "Unknown"}
                                    </p>
                                )}

                            </Popup>

                        </Marker>

                    );

                })}

                {/* Current User Marker */}

                {currentLocation && (

                    <Marker
                        position={[
                            currentLocation.latitude,
                            currentLocation.longitude
                        ]}
                    >

                        <Popup>

                            <h5>📍 You are Here</h5>

                            <p>
                                This is your current location.
                            </p>

                        </Popup>

                    </Marker>

                )}

            </MapContainer>
            <div className="card shadow mt-4">

    <div className="card-header bg-danger text-white">
        <h4 className="mb-0">
            📍 Nearest Donors
        </h4>
    </div>

    <div className="card-body">

        {sortedDonors.length === 0 ? (

            <p>No donors available.</p>

        ) : (

            sortedDonors.map((donor, index) => (

                <div
                    key={donor._id}
                    className="border-bottom pb-3 mb-3"
                >

                    <h5>
                        {index + 1}. {donor.name}
                    </h5>

                    <p>
                        🩸 <strong>Blood Group:</strong> {donor.bloodGroup}
                    </p>

                    <p>
                        📍 <strong>City:</strong> {donor.city}
                    </p>

                    <p>
                        📞 <strong>Phone:</strong> {donor.phone}
                    </p>

                    <p className="text-success">
                        📏 <strong>Distance:</strong>{" "}
                        {Number.isFinite(donor.distance)
                            ? `${donor.distance.toFixed(2)} km`
                            : "Unknown"}
                    </p>

                </div>

            ))

        )}

    </div>

</div>
        </div>

    );

}

export default MapView;