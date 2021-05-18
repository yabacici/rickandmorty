import React from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Favorite from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import { useState, useEffect } from "react";
// import Character from "./characters";

const FavButton = () => {
    const [fav, setFav] = useState([], () => {
        const results = localStorage.getItem("fav");
        return results ? JSON.parse(results) : [];
    });
    useEffect(() => {
        localStorage.setItem("myFav", JSON.stringify(fav));
    }, [fav]);

    return (
        <div>
            <span className="mr-2">
                {fav && (
                    <IconButton
                        onClick={() => {
                            setFav(!fav);
                        }}
                        value={fav}
                        aria-label="delete"
                        color="primary"
                    >
                        <FavoriteBorderIcon></FavoriteBorderIcon>
                    </IconButton>
                )}
                {!fav && (
                    <IconButton
                        onClick={() => {
                            setFav(!fav);
                        }}
                        value={fav}
                        aria-label="delete"
                        color="primary"
                    >
                        <Favorite></Favorite>
                    </IconButton>
                )}
            </span>
        </div>
    );
};

export default FavButton;
