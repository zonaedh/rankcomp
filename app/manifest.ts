import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RankComp — Competitor Intelligence & Digital Audit",
    short_name: "RankComp",
    description:
      "Instant competitor intelligence, active Meta ad creative tracking, Google search bidding signals, and PageSpeed benchmarks.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090C",
    theme_color: "#E06859",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
