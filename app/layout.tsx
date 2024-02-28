"use client"
import type { Metadata } from 'next'
import { Inter, Raleway } from 'next/font/google'
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Logout from './logout';
import '../styles/global.css'
import Provider from './Provider';
import MapPage from './(components)/(homepage)/map/page';
import HeaderPage from './(components)/header/page';
import { useEffect, useState } from 'react';
import { UserLocationContext } from './context/UserLocationContext';
import { SelectedBusinessContext } from './context/SelectedBusinessContext';
import Footer from './(components)/footer/Footer';
import '../styles/global.css'
import '../styles/global.css'; // Asumând că globals.css se află în directorul styles
import Header from './(components)/header/header';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const raleway = Raleway({ subsets: ['latin'] })

const inter = Inter({ subsets: ['latin'] })

const metadata: Metadata = {
  title: 'Smile Seek',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    getUserLocation();
  }, [])
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log(pos)
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      })
    })
  }

  const [userLocation, setUserLocation] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState([]);

  //const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <nav>
          {!!session &&
            <Logout />
          }
          {!session &&
            <Link href={'/login'}>
              Login
            </Link>
          }
        </nav> */}
        <Provider>

          <SelectedBusinessContext.Provider value={{ selectedBusiness, setSelectedBusiness }}>
            <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
              {/* <ToastContainer theme='dark' position="top-right" autoClose={3000} closeOnClick pauseOnHover={false} /> */}
              <Header />
              {children}
              <Footer />
            </UserLocationContext.Provider>
          </SelectedBusinessContext.Provider>
        </Provider>
      </body>
    </html>
  )
}
