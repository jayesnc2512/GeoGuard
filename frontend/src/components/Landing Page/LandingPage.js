import React from 'react'
import Slider from './Slider';
import { Heading, Container } from './LPStyles';
import Canva from './Canva';

function LandingPage() {
  return (
    <div>
      {/* <Slider /> */}
      <Container>
        {/* <Heading>Welcome to GeoGuard</Heading> */}
        {/* <Canva /> */}
        <p>GeoGuard is at the forefront of revolutionizing public safety and crime
          detection through innovative technological solutions. Specializing in comprehensive
          camera management systems, GeoGuard addresses the challenge of untraceable camera
          locations by introducing a robust Camera Registration Module. This module ensures the
          seamless enrollment of cameras, accompanied by secure geotagging and encrypted data
          storage in a centralized database. Leveraging the power of the Google Maps API, the
          Geotagging Module strategically maps approved camera areas, enhancing the efficiency of
          crime-prone area surveillance. GeoGuard goes beyond conventional systems with an Object
          Detection and Failure Detection Module, employing deep learning to identify specific objects
          and promptly detect camera malfunctions. The Alerting system facilitates real-time communication,
          generating alerts based on detected objects and notifying both owners and the Control Center
          about camera failures. The Command and Control Center Module acts as the nerve center,
          confirming camera registrations, managing alert subscriptions, and providing a map-based
          interface for displaying alerts and camera locations. GeoGuard emerges as a pioneering
          force, seamlessly integrating cutting-edge technology to elevate public safety and empower
          law enforcement agencies.</p>
      </Container>
      {/* <Slider /> */}
      

    </div>
  )
}

export default LandingPage;