// https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters
// blog with table : https://aarcresearch.com/blog/whos-being-honored-in-academia
// "//assets.ctfassets.net/5jkg9bgtmne0/4RXqWcs3bHUhs6zdag8Reo/e534b9b4747324ff214131e32d76724a/testcsv.csv"
import {useState, FC, useEffect, ReactNode} from "react";
import styles from "../styles/Hello.module.css";
import { createClient, Entry, Metadata, Sys, RichTextContent  } from "contentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import {string} from "prop-types";

import {EventObject,FullEventObject, PressObject} from "../types/types"
import {BLOCKS, Document} from "@contentful/rich-text-types";
import reactNodeToString from "react-node-to-string";
import {readCSV} from "danfojs";


export default function Content() {
  const [entries, setEntries] = useState<Entry<any>[]>([]);
  const [richText, setRichText] = useState<ReactNode | undefined | null>(null);
  const [textFromConvertedNode, setTextFromConvertedNode] = useState<string | undefined | null>(null);

  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
    environment: "staging", // defaults to 'master' if not set
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY || '',
  });

  const getEntries = async (contentType = "all") => {

      const fileReader = new FileReader();

      const events = [];
    const res = await client.getEntries<any>({content_type: 'blogPost'})

      for (let i = 0; i < res.items.length; i++) {
          const entry = res.items[i];


          // if(i === 0) {
          //     const csvUrl = `https:${entry.fields.csv.fields.file.url}`;
          //     console.log(csvUrl);
          //
          //     // @ts-ignore
          //
          //         readCSV(csvUrl)
          //             .then(df => {
          //
          //                 df.plot("plot_div").table()
          //             }).catch(err => {
          //             console.log(err);
          //         })
          //
          // }


          console.log(res.items);

      }

            setEntries(res.items);


    
  };

  const Entries: FC = () => {
    return (


      <div className={styles.EntryDiv}>

        {entries.map((obj: Entry<any>) => (
          <p key={obj.sys.id} className={styles.pTag}>
            <b>Title:</b> {obj.fields.title}
            <br /> <b>Content Type: </b>{obj.sys.contentType.sys.id}
              <br /> <b>Content Type: </b>{obj.fields.body}
          </p>
        ))}

      </div>
    );
  };

  return (
    <>
      <h1>Display AARC Content</h1>
        <div id="plot_div"></div>
      <button onClick={() => getEntries()}>Get Entries</button>
      <Entries />
    </>
  );
}
