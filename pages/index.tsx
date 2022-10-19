import type {GetStaticProps, InferGetStaticPropsType} from 'next'
import {FunctionComponent} from "react";

import readCsv from "../utils/readCsv";
import Table from "../components/Table";
import {TableProps} from "../types/types";

// "//assets.ctfassets.net/5jkg9bgtmne0/4RXqWcs3bHUhs6zdag8Reo/e534b9b4747324ff214131e32d76724a/testcsv.csv"


const Home: FunctionComponent<InferGetStaticPropsType<typeof getStaticProps>> = ({csv} : InferGetStaticPropsType<typeof getStaticProps>) => {


  return (
      <>
          <Table header={csv.header} rows={csv.rows} />

      </>


  )
}

export const getStaticProps: GetStaticProps<{ csv: TableProps }> = async () => {
    try {
        const csvUrl = `https://assets.ctfassets.net/5jkg9bgtmne0/4RXqWcs3bHUhs6zdag8Reo/d0c7d4a84b9f29dbab8e472dd445ce74/testcsv.csv`

        const csv = await readCsv(csvUrl);




        return {
            props: {
               csv
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
