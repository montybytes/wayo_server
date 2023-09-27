"use client";

import PageHeader from "@/src/components/PageHeader";
import { malls } from "@/src/helpers/_mock";
import { LatLngBounds, LatLng } from "leaflet";
import { useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";

export default function Dashboard() {
  const data = useMemo(() => malls, []);

  const bounds = useMemo(() => {
    if (data.length == 0) return new LatLngBounds([0, 0], [0, 0]);

    let northEast = new LatLng(
      data[0]["coordinates"]["lat"],
      data[0]["coordinates"]["long"]
    );
    let southWest = new LatLng(
      data[0]["coordinates"]["lat"],
      data[0]["coordinates"]["long"]
    );

    for (let index = 0; index < data.length; index++) {
      const coordinates = data[index]["coordinates"];

      if (coordinates["lat"] > northEast.lat)
        northEast.lat = coordinates["lat"];
      if (coordinates["lat"] < southWest.lat)
        southWest.lat = coordinates["lat"];
      if (coordinates["long"] > northEast.lng)
        northEast.lng = coordinates["long"];
      if (coordinates["long"] < southWest.lng)
        southWest.lng = coordinates["long"];
    }

    return new LatLngBounds(southWest, northEast);
  }, []);

  const markers = useMemo(() => {
    return data.map((element) => {
      return (
        <Marker
          key={element["id"]}
          position={[
            element["coordinates"]["lat"],
            element["coordinates"]["long"],
          ]}
        >
          <Popup>
            <div className="flex">
              <button>Open</button>
              <button>Edit</button>
            </div>
          </Popup>
          <Tooltip direction="right" permanent>
            {element["name"]}
          </Tooltip>
        </Marker>
      );
    });
  }, []);
  return (
    <div>
      <PageHeader>
        <h1 className="text-2xl font-bold uppercase">Dashboard</h1>
      </PageHeader>
      <div className="h-80 w-full max-w-5xl mx-auto">
        <MapContainer
          className="w-full h-full z-0"
          center={bounds.getCenter()}
          scrollWheelZoom={false}
          bounds={bounds.pad(0.05)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {...markers}
        </MapContainer>
      </div>
      <div className="h-4" />
    </div>
  );
}
