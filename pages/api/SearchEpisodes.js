import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
});

export default async (req, res) => {
    const search = req.body;
    try {
        const { data } = await client.query({
            query: gql`
            query {
                episodes (filter: { id: "${search}"}){
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
                        air_date
                        created
                    }
                }
            }
            `,
        });
        res.status(200).json({
            characters: data.characters.results,
            error: null,
        });
    } catch (error) {
        if (error.message === "404: Not Found") {
            res.status(400).json({
                characters: null,
                error: "No character found",
            });
        } else {
            res.status(500).json({
                characters: null,
                error: "Internal error, try again!",
            });
        }
    }
};
