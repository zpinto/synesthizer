import React, { useState, useEffect } from "react";
import "./ExpandableCart.css";

import axios from "axios";
import { Link } from "react-router-dom";

import { Button, DeleteSessionButton } from "../../components";
import { truncateTitle } from "../../../global/helper";
import api from "../../../api";

function ExpandableCart(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTrackContent, setShowTrackContent] = useState(false);

  // Session Tracks
  const [sessionTracks, setSessionTracks] = useState([]);
  const [sessionAlbums, setSessionAlbums] = useState([]);

  useEffect(() => {
    if (isExpanded) {
      // Get the data if it's specified to, this is so we can nicely load the cart total
      // by passing data in from the outside on changes
      if (props.getsOwnData) {
        getPlaylistSession();
      }

      setTimeout(() => {
        setShowTrackContent(true);
      }, 500);
    } else {
      setShowTrackContent(false);
    }
  }, [isExpanded]);

  useEffect(() => {
    if (!props.getsOwnData) {
      setSessionTracks(props.sessionTracks);
    }
  }, [props.sessionTracks]);

  useEffect(() => {
    if (!props.getsOwnData) {
      setSessionAlbums(props.sessionAlbums);
    }
  }, [props.sessionAlbums]);

  function getPlaylistSession() {
    axios
      .get(api.playlistSession)
      .then(function (response) {
        console.log(response);
        setSessionTracks(response.data.tracks);
        setSessionAlbums(response.data.albums);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <div className="expandable-cart-wrapper">
      {isExpanded ? (
        <div
          className="expandable-cart-opaque-cover fade-in"
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        />
      ) : null}
      <div
        className={
          "expandable-cart " +
          (isExpanded ? " expandable-cart-expanded " : "") +
          (props.className !== undefined ? props.className : "")
        }
        onClick={() => {
          if (!isExpanded) {
            setIsExpanded(!isExpanded);
          }
        }}
      >
        {isExpanded ? (
          <div className="cart-content">
            <div
              className="cart-content-header"
              style={{ animationDelay: "0.25s" }}
            >
              <h3>playlist</h3>
              {/* <p className="fade-in">{sessionTracks.length} songs</p>
              <p className="fade-in" style={{marginLeft: "16px"}}>{sessionAlbums.length} albums</p> */}
              <div
                className="X"
                onClick={() => {
                  setIsExpanded(!isExpanded);
                }}
              >
                <div className="X-left" />
                <div className="X-right" />
              </div>
            </div>
            <div className="cart-content-songs">
              <h4 className="fade-in">{sessionTracks.length} song{sessionTracks.length > 1 ? "s":""}</h4>
              {showTrackContent
                ? sessionTracks.map(function (track, index) {
                    return (
                      <React.Fragment key={index}>
                        <div
                          className="cart-content-song-row fade-in"
                          style={{ animationDelay: 0.1 * index + "s" }}
                        >
                          <img src={track.album.image} alt="album-art"></img>
                          <div className="card-content-song-row-wrapper">
                            <div>
                              <Link to={"/app/explore/songs/" + track.id}>
                                <p>{truncateTitle(track.name, 37)}</p>
                              </Link>
                              <Link to={"/app/explore/artists/" + track.artists[0].id}>
                                <span style={{ fontSize: "0.5em" }}>
                                  {track.artists[0].name}
                                </span>
                              </Link>
                            </div>
                          </div>
                          <DeleteSessionButton
                            style={{ position: "absolute", right: "24px" }}
                            onClick={() => {
                              props.removeFromSession(track.id, "track");
                            }}
                          />
                        </div>
                      </React.Fragment>
                    );
                  })
                : null}
                <h4 className="fade-in">{sessionAlbums.length} album{sessionAlbums.length > 1 ? "s":""}</h4>
                {showTrackContent
                ? sessionAlbums.map(function (album, index) {
                    return (
                      <React.Fragment key={index}>
                        <div
                          className="cart-content-song-row fade-in"
                          style={{ animationDelay: 0.1 * index + "s" }}
                        >
                          <img src={album.image} alt="album-art"></img>
                          <div className="card-content-song-row-wrapper">
                            <div>
                              <Link to={"/app/explore/albums/" + album.id}>
                                 <p>{truncateTitle(album.name, 37)}</p>
                              </Link>
                              <Link to={"/app/explore/artists/" + album.artist_id}>
                                <span style={{ fontSize: "0.5em" }}>
                                  {album.artist_name}
                                </span>
                              </Link>
                            </div>
                          </div>
                          <DeleteSessionButton
                            style={{ position: "absolute", right: "24px" }}
                            onClick={() => {
                              props.removeFromSession(album.id, "album");
                            }}
                          />
                        </div>
                      </React.Fragment>
                    );
                  })
                : null}
            </div>
            <Link to="/app/user/playlists/create">
              <Button
                isGreen={true}
                onClick={() => {}}
                className="create-playlist-button fade-in"
              >
                Create Playlist
              </Button>
            </Link>
          </div>
        ) : sessionTracks.length > 0 || sessionAlbums.length > 0 ? (
          sessionTracks.length + "-" + sessionAlbums.length
        ) : (
          "cart"
        )}
      </div>
    </div>
  );
}

export default ExpandableCart;
