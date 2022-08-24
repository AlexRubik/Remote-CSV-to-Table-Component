import { useState, FC, useEffect } from "react";
import styles from "../styles/Hello.module.css";
import { createClient } from "contentful";

type entries = {
  metadata: Object;
  sys: Object;
  fields: Object[];
};

export default function Home() {
  const [entries, setEntries] = useState<entries[]>([]);

  const client = createClient({
    space: "",
    environment: "staging", // defaults to 'master' if not set
    accessToken: "",
  });

  const getEntries = async (contentType = "all") => {
    await client
      .getEntries()
      .then((response: Object) => {
        const res = response;

        if (contentType === "all") {
          setEntries(res.items);
          console.log(res.items);
        }
      })
      .catch(console.error);
  };

  const Entries: FC = () => {
    return (
      <div className={styles.EntryDiv}>
        {entries.map((obj: entries) => (
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
