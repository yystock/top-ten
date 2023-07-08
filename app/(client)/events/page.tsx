import React from "react";
import EventList from "./EventList";
import getEvents from "@/app/actions/getEvents";
import Link from "next/link";

async function Events() {
  const events = await getEvents();

  return (
    <div>
      {events && (
        <div className="container">
          <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
            <div className="flex-1 space-y-4">
              <h1 className="font-heading inline-block text-4xl tracking-tight lg:text-5xl">event</h1>
              <p className="text-xl text-muted-foreground">Top Articles about XXX</p>
            </div>
          </div>

          <div
            className="
            grid
            grid-cols-1 
            gap-8 
            pt-24 
            sm:grid-cols-1 
            md:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            2xl:grid-cols-5"
          >
            {events.map((event) => (
              <EventList key={event.id} event={event} aspect="square" />
            ))}
          </div>
          <div className="mt-10 flex justify-center"></div>
        </div>
      )}
    </div>
  );
}

export default Events;
