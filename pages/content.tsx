// https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/#retrieving-entries-with-search-parameters


import { useState, FC, useEffect } from "react";
import styles from "../styles/Hello.module.css";
import { createClient, Entry, EntryCollection, Metadata, Sys  } from "contentful";
import {string} from "prop-types";

// press
type PressObject = {

  link: string,
  title: string
}

// researchArticle
type ResearchArticleObject = {
  citation: string,
  date: string,
  doi: string,
  researchType: string,
  title: string

}

// researchArticleLinks
type ResearchArticleLinkObject = {
  link: string,
  source: string,
  title: string

}

//researchArticleFeatured
type ResearchArticleFeaturedObject = {
  link: string,
  mediaSource: string,
  title: string


}

type FileObject = {
  contentType: string,
  details: {size: number, image: {height: number, width: number}},
  fileName: string,
  url: string
}

type HeroImageObject = {
  fields: {
    description: string,
    file: FileObject,
    title: string
  }
}

type ImageObject = {
  fields: {
    description: string,
    file: FileObject,
    title: string
  },
  metadata: Metadata,
  sys: Sys

}

type AuthorObject = {

  fields: {
    company: string,
    email: string,
    facebook: string,
    github: string,
    image: ImageObject,
    name: string,
    phone:string,
    shortBio: string,
    title: string,
    twitter: string,
  },
  metadata: Metadata,
  sys: Sys,
  body: string,
  description: string
}

type PersonObject = AuthorObject



//blogPost
type BlogPostObject = {

  author: AuthorObject,
  body: string,
  description: string,
  heroImage: HeroImageObject,
  publishDate: string,
  slug: string,
  tags: Array<string>,
  title: string

}





export default function Home() {
  const [entries, setEntries] = useState<Entry<any>[]>([]);

  const client = createClient({
    space: "",
    environment: "staging", // defaults to 'master' if not set
    accessToken: "",
  });

  const getEntries = async (contentType = "all") => {
    const res = await client.getEntries<PressObject>({content_type: 'person'})

        if (contentType === "all") {
          // setEntries(res.items);
          console.log(res.items);
        }
    
  };

  const Entries: FC = () => {
    return (
      <div className={styles.EntryDiv}>
        {entries.map((obj: Entry<any>) => (
          <p key={obj.sys.id} className={styles.pTag}>
            <b>Title:</b> {obj.fields.title}
            <br /> <b>Content Type: </b>{obj.sys.contentType.sys.id}
          </p>
        ))}
      </div>
    );
  };

  return (
    <>
      <h1>Display AARC Content</h1>

      <button onClick={() => getEntries()}>Get Entries</button>
      <Entries />
    </>
  );
}
