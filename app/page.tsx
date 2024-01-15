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

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter()
  React.useEffect(() => {
    if (!session?.user) {
      router.push('/login')
    }
  }, [session])
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  // return (
  //   <Container component="main" maxWidth="xs">
  //     <CssBaseline />
  //     <Box
  //       sx={{
  //         marginTop: 8,
  //         display: "flex",
  //         flexDirection: "column",
  //         alignItems: "center",
  //       }}
  //     >
  //       <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
  //         <LockOutlinedIcon />
  //       </Avatar>
  //       <Typography component="h1" variant="h5">
  //         Sign in
  //       </Typography>
  //       <Box component="form" noValidate sx={{ mt: 1 }} >
  //         <TextField
  //           margin="normal"
  //           required
  //           fullWidth
  //           id="email"
  //           label="Email Address"
  //           name="email"
  //           autoComplete="email"
  //           autoFocus
  //         />
  //         <TextField
  //           margin="normal"
  //           required
  //           fullWidth
  //           name="password"
  //           label="Password"
  //           type="password"
  //           id="password"
  //           autoComplete="current-password"
  //         />
  //         <FormControlLabel
  //           control={<Checkbox value="remember" color="primary" />}
  //           label="Remember me"
  //         />
  //         <Button
  //           type="submit"
  //           fullWidth
  //           variant="contained"
  //           sx={{ mt: 3, mb: 2 }}
  //         >
  //           Sign In
  //         </Button>
  //         <GoogleButton onClick={() => signIn('google')}></GoogleButton>
  //         <Grid container>
  //           <Grid item>
  //             <Link href="/components/signUp" variant="body2">
  //               {"Don't have an account? Sign Up"}
  //             </Link>
  //           </Grid>
  //         </Grid>
  //       </Box>
  //     </Box>
  //   </Container>
  // );
  return (
    <div>
      {/* <HeaderPage /> */}
      {/* <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
        <hr style={{ width: '100%', border: 'none', height: '1px', backgroundColor: '#ccc', margin: '0' }} />
      </div> */}

      <FormSectionPage />
      <Login />

      <button onClick={() => signOut()}>Sign Out</button>
      <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>

        <MapPage />
        <div className="grid grid-cols-1 md:grid-cols-8 h-screen ">
          <div className="p-3">
            <CategoryList />
            <RangeSelect />
            <SelectRating />
          </div>
          <div className="col-span-7">
            Second
          </div>
        </div>
      </div>


    </div>

  );
}
