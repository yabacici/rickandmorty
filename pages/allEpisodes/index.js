import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Episode from "./episodes";
import Link from "next/link";
import {
    Heading,
    Header,
    Box,
    Text,
    Button,
    Flex,
    Input,
    Stack,
    IconButton,
    useToast,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";

export default function Home(results) {
    // console.log("this is results: ", results);
    const initialState = results;
    const [episodes, setEpisodes] = useState(initialState.episodes);
    const [search, setSearch] = useState("");
    const toast = useToast();

    return (
        <div>
            <Flex direction="colum" justify="center" align="center">
                <Box
                    mb={4}
                    flexDirection="column"
                    justify="center"
                    align="center"
                    py={8}
                >
                    <Heading
                        as="h1"
                        size="2x1"
                        mb={12}
                        style={{
                            backgroundColor: "gray",
                        }}
                    >
                        Rick and Morty
                    </Heading>

                    <form>
                        <Stack maxWidth="350px" width="100%" isInline mb={12}>
                            <div className="buttonStyle">
                                <Button className="iconButton">
                                    <Link href="/">
                                        <a border="2px solid black">HOMEPAGE</a>
                                    </Link>
                                </Button>
                                <Button className="iconButton">
                                    <Link href="/allCharacters">
                                        <a border="2px solid black">
                                            CHARACTERS
                                        </a>
                                    </Link>
                                </Button>
                            </div>
                        </Stack>
                    </form>

                    <Episode episodes={episodes}></Episode>
                </Box>
            </Flex>
        </div>
    );
}

export async function getStaticProps() {
    const client = new ApolloClient({
        uri: "https://rickandmortyapi.com/graphql/",
        cache: new InMemoryCache(),
    });
    const { data } = await client.query({
        query: gql`
            query {
                episodes(page: 1) {
                    info {
                        count
                        pages
                        next
                        prev
                    }
                    results {
                        id
                        name
                        episode
                        characters {
                            name
                        }
                        air_date
                        created
                    }
                }
            }
        `,
    });
    return {
        props: {
            episodes: data.episodes.results,
        },
    };
}
