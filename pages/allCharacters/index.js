import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Character from "./characters";
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
    // using initialState to reset the search that comes back from the user
    // it will be easier to rerender the page with the 1st state that we have
    // 1. initial State
    const initialState = results;
    // 2. update characters
    const [characters, setCharacters] = useState(initialState.characters);
    // 3. search characters
    const [search, setSearch] = useState("");
    // 4. handling error mesages
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
                    // style={{
                    //     backgroundColor: "yellow",
                    // }}
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
                            const { characters, error } = await results.json();
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
                                setCharacters(characters);
                            }
                        }}
                    >
                        <Stack maxWidth="350px" width="100%" isInline mb={8}>
                            <Button>
                                <Link href="/">
                                    <a border="2px solid black">HOMEPAGE</a>
                                </Link>
                            </Button>
                            <Button>
                                <Link href="/allEpisodes">
                                    <a border="2px solid black">EPISODES</a>
                                </Link>
                            </Button>
                            <Input
                                placeholder="Search"
                                value={search}
                                border="2px solid black"
                                onChange={(e) => setSearch(e.target.value)}
                            ></Input>

                            <IconButton
                                color="blue"
                                bgColor="gray"
                                arial-label="Search Database"
                                icon={<SearchIcon />}
                                disabled={search === ""}
                                type="submit"
                            />
                            <IconButton
                                color="red"
                                bgColor="gray"
                                arial-label="Reset Button"
                                icon={<CloseIcon />}
                                disabled={search === ""}
                                onClick={async () => {
                                    setSearch("");
                                    setCharacters(initialState.characters);
                                }}
                            />
                        </Stack>
                    </form>
                    <Character characters={characters}></Character>
                    <Button>Load more</Button>
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
                characters(page: 1) {
                    info {
                        count
                        pages
                        next
                        prev
                    }
                    results {
                        name
                        id
                        location {
                            id
                            name
                        }
                        origin {
                            id
                            name
                        }
                        episode {
                            name
                            episode
                            air_date
                            created
                        }
                        image
                    }
                }
            }
        `,
    });
    return {
        props: {
            characters: data.characters.results,
        },
    };
}
