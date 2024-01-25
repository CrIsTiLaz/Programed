'use client'
import GoogleButton from "react-google-button";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RegisterPage from "./components/register/page";
import LoginPage from "./components/login/page";
import HomePage from "./components/homepage/page";
import HeaderPage from "./components/header/page";
import { FormSectionPage } from "./components/homepage/formSection/page";
import Login from "./login/page";
import Provider from "./Provider";
import { useRouter } from "next/navigation";
import MapPage from "./components/homepage/map/page";
import CategoryList from "./components/homepage/map/CategoryList";
import RangeSelect from "./components/homepage/map/RangeSelect";
import SelectRating from "./components/homepage/map/SelectRating";
import GoogleMapView from "./components/homepage/map/GoogleMapView";
import GlobalApi from "@/Shared/GlobalApi";
import { useContext, useState } from "react";
import { UserLocationContext } from "./context/UserLocationContext";
import BusinessList from "./components/homepage/map/BusinessList";
import SkeltonLoading from "./components/homepage/map/SkeltonLoading";
import Benefits from "./components/benefits/benefits";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter()
  const [category, setCategory] = React.useState();
  const [radius, setRadius] = React.useState(2500);
  const [businessList, setBusinessList] = React.useState([]);
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const [loading, setLoading] = useState(false);
  // React.useEffect(() => {
  //   if (!session?.user) {
  //     router.push('/login')
  //   }
  // }, [session])

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
      {/* <HeaderPage /> */}
      {/* <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
        <hr style={{ width: '100%', border: 'none', height: '1px', backgroundColor: '#ccc', margin: '0' }} />
      </div> */}

      <FormSectionPage />

      {/* <button onClick={() => signOut()}>Sign Out</button> */}
      <div style={{ paddingLeft: '24px' }}>
        <div id="mapSection" className="grid grid-cols-1 md:grid-cols-8 h-screen ">
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
    </div>
  );
}