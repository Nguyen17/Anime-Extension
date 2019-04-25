import gql from "graphql-tag";
const epochDate = Math.round(new Date().getTime() / 1000);

export const AnimeQuery = gql`
  query {
    Page(page: 1, perPage: 20) {
      airingSchedules(airingAt_greater: ${epochDate}) {
        id
        mediaId
        episode
        timeUntilAiring
        airingAt

        media {
          title {
            romaji
            english
          }
          siteUrl
          coverImage {
            medium
            large
            extraLarge
          }

          description(asHtml: false)
          meanScore
          popularity    
        }
      }
    }
  }
`;
