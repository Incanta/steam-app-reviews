const axios = require("axios").default;
const fs = require("fs");

const SteamAppId = process.argv[2];

if (isNaN(parseInt(SteamAppId, 10))) {
  throw new Error("Enter a valid Steam App ID: yarn start YourSteamAppId");
}

const AppReviewsUrl = `https://store.steampowered.com/appreviews/${SteamAppId}?json=1`;

const params = {
  filter: "all",
  language: "all",
  day_range: 365, // 365 is max
  review_type: "all",
  purchase_type: "all",
  num_per_page: 100,
};

let NextCursor = "*";

// array of arrays of reviews
let reviews = [];

const PreviousCursors = [];

(async () => {
  while (NextCursor) {
    params.cursor = NextCursor;

    const paramsEncoded = Object.keys(params).map(key => {
      return `&${key}=${params[key]}`;
    });

    const CompleteUrl = AppReviewsUrl + paramsEncoded;

    const content = await axios.get(CompleteUrl);

    if (content.status !== 200) {
      throw new Error(content.statusText);
    }

    reviews.push(content.data.reviews);

    if (PreviousCursors.includes(content.data.cursor)) {
      break;
    }

    NextCursor = content.data.cursor;
    PreviousCursors.push(NextCursor);
  }

  const joinedReviews = reviews.flat();

  fs.writeFileSync("reviews.json", JSON.stringify(joinedReviews, null, 2));
})();
