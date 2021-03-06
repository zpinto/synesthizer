import React, { useState, useEffect } from "react";
import "./Search.css";

import Autocomplete from "react-autocomplete";
import { Link, useHistory } from "react-router-dom";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import useConstant from "use-constant";

import { beautifyString } from "../../../global/helper";
import { Button } from "../index";

function Search({ AutoItem, cacheFilter, ...props }) {
  let history = useHistory();

  const [searchMode, setSearchMode] = useState(
    props.params.searchMode !== undefined
      ? props.params.searchMode
      : props.searchModes[0]
  );

  const [search, setSearch] = useState(
    props.params.search !== undefined ? props.params.search : ""
  );

  const [autoItems, setAutoItems] = useState([]);

  // Debounce the original search async function
  const debouncedSearchFunction = useConstant(() =>
    AwesomeDebouncePromise(
      (search, searchMode) => getAutoItems(search, searchMode),
      300
    )
  );

  // should remove cache when page is reloaded
  useEffect(() => {
    localStorage.setItem(props.resource + searchMode, JSON.stringify({}));
  }, []);

  useEffect(() => {
    setSearchMode(
      props.params.searchMode !== undefined
        ? props.params.searchMode
        : props.searchModes[0]
    );
    setSearch(props.params.search !== undefined ? props.params.search : "");
  }, [props.params]);

  useEffect(() => {
    debouncedSearchFunction(search, searchMode);
  }, [search]);

  function cacheItems(searchTerm, items) {
    let cache = localStorage.getItem(props.resource + searchMode);
    if (cache) {
      cache = JSON.parse(cache);
    }

    localStorage.setItem(
      props.resource + searchMode,
      JSON.stringify({
        ...cache,
        [searchTerm]: items.map((item) => cacheFilter(item)),
      })
    );
  }

  function sendSearch() {
    if (search === "") {
      return;
    }

    props.setParams({
      ...props.params,
      searchMode: searchMode,
      search: search,
    });
  }

  function selectAuto(val) {
    history.push(`/app/explore/${props.resource}/${val}`);
  }

  const getAutoItems = (search, searchMode) => {
    if (search.length < 3) {
      setAutoItems([]);
      return;
    }

    console.log("Autocomplete Search Initialized");
    // Check the cache
    let cache = localStorage.getItem(props.resource + searchMode);
    if (cache) {
      cache = JSON.parse(cache);
      console.log(cache);
    }

    if (cache.hasOwnProperty(search)) {
      console.log("Autocomplete Items Cache");
      console.log(cache);
      setAutoItems(cache[search]);
      return;
    }

    // Send network request
    console.log("Autocomplete Items Server");
    props.getAutoItems(searchMode, search, setAutoItems, cacheItems);
  };

  return (
    <div className="search">
      <select
        value={searchMode}
        onChange={(e) => setSearchMode(e.currentTarget.value)}
      >
        {props.searchModes.map(function (mode, index) {
          return (
            <option className="search-mode" key={mode} value={mode}>
              {beautifyString(mode)}
            </option>
          );
        })}
      </select>
      <div className="search-bar-auto">
        <Autocomplete
          key="search-bar"
          placeholder="Search"
          autoHighlight={false}
          getItemValue={(item) => item}
          items={autoItems}
          menuStyle={{
            position: "",
          }}
          renderItem={(item, isHighlighted) => {
            return (
              <div
                key={item.id}
                className="search-bar-auto-item"
                style={{
                  background: isHighlighted ? "#ff7668" : "white",
                  color: isHighlighted ? "white" : "black",
                }}
              >
                <AutoItem item={item} />
              </div>
            );
          }}
          value={search}
          inputProps={{
            placeholder: "Search",
            onKeyPress: (event) => {
              if (event.key === "Enter") {
                sendSearch();
              }
            },
          }}
          onChange={(e) => {
            setSearch(e.currentTarget.value);
          }}
          onSelect={(item) => {
            selectAuto(item.id);
          }}
        />
      </div>
      <div style={{ width: "48px" }}></div>
      <Button type="submit" isPrimary={true} onClick={sendSearch}>
        Search
      </Button>
    </div>
  );
}

export default Search;

/* <input
        key="search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      ></input> */

// <div className="search-bar-auto-item-art">
//             <img alt="auto art" src={item.image || item.album.image} />
//           </div>
//           <div className="search-bar-auto-info">
//             <p>{item.name}</p>
//             <p>
//               {item.release_date ||
//                 (item.album ? item.album.release_date : undefined)}
//             </p>
//           </div>
