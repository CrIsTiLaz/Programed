'use client'

import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import * as React from "react";
import Image from 'next/image';
import { FormSectionPage } from "./components/homepage/formSection/page";

import { useRouter } from "next/navigation";

import CategoryList from "./components/homepage/map/CategoryList";
import RangeSelect from "./components/homepage/map/RangeSelect";

import GoogleMapView from "./components/homepage/map/GoogleMapView";
import GlobalApi from "@/Shared/GlobalApi";
import { useContext, useState } from "react";
import { UserLocationContext } from "./context/UserLocationContext";
import BusinessList from "./components/homepage/map/BusinessList";
import SkeltonLoading from "./components/homepage/map/SkeltonLoading";
import Benefits from "./components/benefits/benefits";
import BusinessSignUp from "./components/homepage/businessSignUp/BusinessSignUp";
import "./page.module.css"
import Hero from "./components/homepage/hero/Hero";
import PageWrapper from "./pageWrapper";
import HowItWorks from "./components/homepage/howItWorks/HowItWorks";
import FaqList from "./components/homepage/faq/FaqList";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter()
  const [category, setCategory] = React.useState();
  const [radius, setRadius] = React.useState(2500);
  const [businessList, setBusinessList] = React.useState([]);
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    getGooglePlace();
  }, [category, radius])

  const getGooglePlace = () => {
    GlobalApi.getGooglePlace(category, radius, userLocation.lat, userLocation.lng).then(resp => {
      // console.log(resp.data);
      setBusinessList(resp.data.product.results)
    })

  }

  return (
    <div>
      {/* < PageWrapper> */}
      {/* <HeaderPage /> */}
      {/* <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
        <hr style={{ width: '100%', border: 'none', height: '1px', backgroundColor: '#ccc', margin: '0' }} />
      </div> */}
      <Hero />
      <HowItWorks />
      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-0">
            <div className="w-1/2 hidden md:block">
              <Image src='/faq/Doctors-amico.svg' alt="" width={500} height={500}></Image>
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="heading">Cele mai frecvente intrebari</h2>

              <FaqList />
            </div>

          </div>
        </div>
      </section>
      <FormSectionPage />

      {/* <button onClick={() => signOut()}>Sign Out</button> */}
      <div style={{ paddingLeft: '24px', backgroundColor: "#FAFAFA" }}>
        <div id="mapSection" className="grid grid-cols-1 md:grid-cols-8 " style={{ height: '850px' }}>
          <div className="p-3">
            <CategoryList onCategoryChange={(value) => setCategory(value)} />
            <RangeSelect onRadiusChange={(value) => setRadius(value)} />
          </div>
          <div className="col-span-7">
            <GoogleMapView businessList={businessList} />
            <div className='md:absolute mx-2 w-[90%] md:w-[82%] relative'>
              {category && !loading ?
                <BusinessList businessList={businessList} />
                :
                loading &&
                <div className='flex gap-3'>
                  {[1, 2, 3, 4, 5].map((item, index) => (
                    <SkeltonLoading key={index} />
                  ))}
                </div>
              }
            </div>
          </div>

        </div>

      </div>

      <Benefits />
      <BusinessSignUp />
      {/* <Ben /> */}
      {/* </PageWrapper> */}
    </div>
  );
}