import React, { useState, useEffect } from "react";
import "./ContentView.css";

import { Redirect } from "react-router-dom";

import {
  Button,
  SkeletonPulse,
  SongCard,
  AlbumCard,
  ArtistCard,
} from "../../components";
import { Card } from "../../containers";

function ContentView({ props, match }) {
  // Selection Variables
  const [selectedCardId, setSelectedCardId] = useState(null);

  // Redirect Variables
  const [willRedirectSong, redirectSong] = useState(false);
  const [willRedirectArtist, redirectArtist] = useState(false);
  const [willRedirectAlbum, redirectAlbum] = useState(false);

  const [songs, setSongs] = useState(null);

  useEffect(() => {
    // Reset redirect variables where needed
    if (willRedirectArtist) {
      redirectArtist(false);
    }
    if (willRedirectAlbum) {
      redirectAlbum(false);
    }
    if (willRedirectSong) {
      redirectSong(false);
    }
  }, [willRedirectArtist, willRedirectAlbum, willRedirectSong]);

  useEffect(() => {
    if (selectedCardId !== null) {
      redirectSong(true);
    }
  }, [selectedCardId]);

  function selectCard(id) {
    setSelectedCardId(id);
  }

  function renderContentCards() {
    if (match.params.contentType === "songs") {
      return [1, 2, 3, 4, 5, 6].map(function (item, index) {
        return (
          <SongCard
            song={item}
            key={index}
            style={{ margin: "32px" }}
            onClick={() => selectCard(item)}
            skeletonPulse
          ></SongCard>
        );
      });
    } else if (match.params.contentType === "albums") {
      return [1, 2, 3, 4, 5, 6].map(function (item, index) {
        return (
          <AlbumCard
            album={item}
            key={index}
            style={{ margin: "32px" }}
            onClick={() => selectCard(item)}
            skeletonPulse
          ></AlbumCard>
        );
      });
    } else if (match.params.contentType === "artists") {
      return [1, 2, 3, 4, 5, 6].map(function (item, index) {
        return (
          <ArtistCard
            artist={item}
            key={index}
            style={{ margin: "32px" }}
            onClick={() => selectCard(item)}
            skeletonPulse
          ></ArtistCard>
        );
      });
    }

    return null;
  }

  return (
    <div className="content-view">
      {willRedirectSong ? (
        <Redirect push to={"/app/songs/" + selectedCardId}></Redirect>
      ) : null}
      <div className="content-view-content">
        <div className="content-view-search">
          <input></input>
          <div style={{ width: "48px" }}></div>
          <Button isPrimary={true}>Search</Button>
        </div>
        <div className="content-view-filter-wrapper">
          <Card
            className="content-view-filter"
            innerStyle={{
              display: "flex",
              "flex-direction": "row",
              margin: "8px 24px 8px 24px",
            }}
          >
            <p>Song</p>
            <p>Album</p>
            <p>Artist</p>
            <p>Popularity</p>
          </Card>
        </div>
        <div className="content-view-cards">{renderContentCards()}</div>
        <div
          className="content-view-filter-wrapper"
          style={{ marginTop: "64px", marginBottom: "0px" }}
        >
          <Card
            className="content-view-filter"
            innerStyle={{
              display: "flex",
              "flex-direction": "row",
              margin: "8px 24px 8px 24px",
            }}
          >
            <p>1</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ContentView;
