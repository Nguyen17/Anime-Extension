import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import "../AnimeList.css";
import { Dots } from "react-activity";
import CountDown from "react-countdown-now";

import { AnimeQuery } from "./query/AnimeQuery";

const prettyms = require("pretty-ms");

class AnimeList extends Component {
  renderTime(time) {
    return prettyms(time * 1000);
  }
  render() {
    const { data } = this.props;
    const { loading, error, Page } = data;
    console.log(Page);

    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return <span>Episode is now out!</span>;
      } else {
        // Render a countdown
        return (
          <span>
            {hours}hr : {minutes}min : {seconds}sec
          </span>
        );
      }
    };
    if (loading) {
      return <Dots />;
    }
    if (error) {
      return <h1>ERRROR</h1>;
    }
    return (
      <div className="animelist-wrapper">
        {Page.airingSchedules.map(anime => (
          <div className="anime-list-item-container">
            <div className="anime-details">
              <div className="anime-title">
                <h3 style={{ width: "150px" }}>{anime.media.title.romaji}</h3>
                <p>ep {anime.episode}</p>
              </div>
              <p id="anime-countdown">
                {
                  <CountDown
                    date={Date.now() + anime.timeUntilAiring * 1000}
                    autoStart={true}
                    renderer={renderer}
                  />
                }
              </p>

              <span className="anime-links">
                <a
                  href={`https://animekisa.tv/${anime.media.title.romaji
                    .split(" ")
                    .join("-")
                    .toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  > Watch
                </a>
                {/* <a
                  href={`https://www.crunchyroll.com/${anime.media.title.romaji
                    .split(" ")
                    .join("-")
                    .toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={cr_icon} />
                </a> */}
              </span>
            </div>
            <div className="anime-img">
              <img src={anime.media.coverImage.extraLarge} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default graphql(AnimeQuery)(AnimeList);
