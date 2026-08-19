import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RankComp — Competitor Intelligence & Digital Audit",
    short_name: "RankComp",
    description:
      "Instant competitor intelligence, active Meta ad creative tracking, Google search bidding signals, and PageSpeed benchmarks.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#DA7735",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
