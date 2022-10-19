import type {GetStaticProps, InferGetStaticPropsType, NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {FunctionComponent, useEffect, useState} from "react";
import Papa from 'papaparse';
import {readCSV, toCSV} from "danfojs";
import readCsv from "../utils/readCsv";
import Table from "../components/Table";

// "//assets.ctfassets.net/5jkg9bgtmne0/4RXqWcs3bHUhs6zdag8Reo/e534b9b4747324ff214131e32d76724a/testcsv.csv"


const Home: FunctionComponent<InferGetStaticPropsType<typeof getStaticProps>> = ({header, rows} : InferGetStaticPropsType<typeof getStaticProps>) => {





  return (
      <>
          <Table header={header} rows={rows} />



    <div className={styles.container}>
<p>Go to /content for  content</p>


    </div>



      </>


  )
}

export const getStaticProps: GetStaticProps = async () => {
    try {
        const csvUrl = `https://assets.ctfassets.net/5jkg9bgtmne0/4RXqWcs3bHUhs6zdag8Reo/d0c7d4a84b9f29dbab8e472dd445ce74/testcsv.csv`

        const csv = await readCsv(csvUrl);




        return {
            props: {
               header: csv.header,
                rows: csv.rows
            },
            revalidate: 100,
        };
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log('Error from get static props of blog slug', e);
        return {
            notFound: true,
        };
    }
};



export default Home;
