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
    console.log("this is results: ", results);

    // 1. initial State
    const initialState = results;
    // 2. update episodes
    const [episodes, setEpisodes] = useState(initialState.episodes);
    // 3. search episodes
    const [search, setSearch] = useState("");
    // 4. handling error mesages
    const toast = useToast();

    return (
        <div>
            <h1>This is the Episodes page</h1>
            <Button>
                <Link href="/">
                    <a>Back to the homepage</a>
                </Link>
            </Button>

            <Flex direction="colum" justify="center" align="center">
                <Box
                    mb={4}
                    flexDirection="column"
                    justify="center"
                    align="center"
                    py={8}
                    style={{
                        backgroundColor: "yellow",
                    }}
                >
                    <Heading
                        as="h1"
                        size="2x1"
                        mb={8}
                        style={{
                            backgroundColor: "gray",
                        }}
                    >
                        Rick and Morty
                    </Heading>
                    <form
                        onSubmit={async (event) => {
                            event.preventDefault();
                            const results = await fetch(
                                "/api/SearchCharacters",
                                {
                                    method: "post",
                                    body: search,
                                }
                            );
                            const { episodes, error } = await results.json();
                            if (error) {
                                toast({
                                    position: "bottom",
                                    title: "An error occured",
                                    description: error,
                                    status: "error",
                                    duration: 5000,
                                    isClosable: true,
                                });
                            } else {
                                setEpisodes(episodes);
                            }
                        }}
                    >
                        <Stack maxWidth="350px" width="100%" isInline mb={8}>
                            <Input
                                placeholder="Search"
                                value={search}
                                border="none"
                                onChange={(e) => setSearch(e.target.value)}
                            ></Input>
                            <IconButton
                                colorScheme="blue"
                                arial-label="Search Database"
                                icon={<SearchIcon />}
                                disabled={search === ""}
                                type="submit"
                            />
                            <IconButton
                                colorScheme="red"
                                arial-label="Reset Button"
                                icon={<CloseIcon />}
                                disabled={search === ""}
                                onClick={async () => {
                                    setSearch("");
                                    setEpisodes(initialState.episodes);
                                }}
                            />
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
        // if there a req it will check the last time it was created
        cache: new InMemoryCache(),
    });
    const { data } = await client.query({
        query: gql`
            query {
                episodes {
                    info {
                        count
                        pages
                        next
                        prev
                    }
                    results {
                        id
                        name
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
