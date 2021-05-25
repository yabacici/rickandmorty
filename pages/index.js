import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    {/* Welcome to <a href="https://nextjs.org">Next.js!</a> */}
                    Welcome to Rick and Morty's world!
                </h1>

                <p className={styles.description}>
                    Explore what the best animated science fiction has to offer{" "}
                    {/* <code className={styles.code}>pages/index.js</code> */}
                </p>

                <Image
                    src="/pic.jpg"
                    width={160}
                    height={110}
                    style={{ borderRadius: "80%" }}
                />

                <div className={styles.grid}>
                    <a href="/allCharacters" className={styles.card}>
                        <h2>Characters&rarr;</h2>
                        <p>Click and find your favorite characters.</p>
                    </a>

                    <a href="/allEpisodes" className={styles.card}>
                        <h2>Episodes &rarr;</h2>
                        <p>
                            If you are nostalgic, check out your favorite
                            episode
                        </p>
                    </a>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{" "}
                    <span className={styles.logo}>
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer>
        </div>
    );
}
