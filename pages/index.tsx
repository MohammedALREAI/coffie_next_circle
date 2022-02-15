import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Banner from "../components/banner";
import Card from "../components/card";
import { fetchCoffeeStores } from "../lib/coffee-stores";

import useTrackLocation from "../hooks/use-track-location";
import { useEffect, useState, useContext } from "react";
import { ACTION_TYPES, StoreContext } from "../store/store-context";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import dynamic from "next/dynamic";

export const getStaticProps: GetStaticProps = async (context) => {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    },
  };
}



const Home: NextPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  // const [coffeeStores, setCoffeeStores] = useState("");

  const [coffeeStoresError, setCoffeeStoresError] = useState<string>('');

  const { dispatch, state } = useContext(StoreContext);

  const { coffeeStores, latLong } = state;

  const setCoffeeStoresByLocation = async () => {
    if (latLong) {
      try {
        const response = await fetch(
          `/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`
        );

        const coffeeStores = await response.json();

        // setCoffeeStores(fetchedCoffeeStores);
        dispatch({
          type: ACTION_TYPES.SET_COFFEE_STORES,
          payload: {
            coffeeStores,
          },
        });
        setCoffeeStoresError("");
      } catch (error: any) {
        setCoffeeStoresError(error?.message!);
      }
    }
  };
  useEffect(() => {

    setCoffeeStoresByLocation();
  }, [latLong, dispatch]);

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="description"
          content="allows you to discover coffee stores"
        ></meta>
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            width={700}
            height={400}
            alt="hero image"
          />
        </div>

        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores near me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.id}`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Toronto stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map(({ id, name, imgUrl }) => {
                return (
                  <Card
                    key={id}
                    name={name}
                    imgUrl={
                      imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`/coffee-store/${id}`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


export default Home