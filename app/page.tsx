
import * as React from "react";
import Image from 'next/image';
import Hero from "./(components)/(homepage)/hero/Hero";
import HowItWorks from "./(components)/(homepage)/howItWorks/HowItWorks";
import FaqList from "./(components)/(homepage)/faq/FaqList";

export const metadata = {
  title: "Programed",
  description: "Programează-te rapid și ușor la cei mai buni medici",
  alternates: {
    canonical: `https://progra-med.ro`
  },
  openGraph: {
    title: 'Programed',
    description: 'Programează-te rapid și ușor la cei mai buni medici',
    url: 'https://progra-med.ro',
    images: [
      {
        url: 'https://progra-med.ro/og/og2.jpg', // Must be an absolute URL
        width: 600,
        height: 600,
      },
      // {
      //   url: 'https://progra-med.ro/og/og1.jpg', // Must be an absolute URL
      //   width: 1800,
      //   height: 1600,
      //   alt: 'My custom alt',
      // },
    ],
  },
}
export default function Home() {




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
      {/* <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Ce zic utlizatorii nostri</h2>
            <p className="text__para text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt justo eget nunc dignissim lobortis.</p>
          </div>
          <Testimonial />
        </div>
      </section> */}

      {/* <button onClick={() => signOut()}>Sign Out</button> */}
      {/* <div style={{ paddingLeft: '24px', backgroundColor: "#FAFAFA" }}>
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

      </div> */}

      {/* <Ben /> */}
      {/* </PageWrapper> */}
    </div>
  );
}