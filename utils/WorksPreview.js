import moneyversity from "@/public/images/works/moneyversity.jpg";
import shosai from "@/public/images/works/shosai.jpg";
import smartindustrial from "@/public/images/works/smartindustrial.jpg";
import eazysites from "@/public/images/works/eazysites.png";
import oplerra from "@/public/images/works/oplerra.png";

/** Featured projects shown on the home slider (keep imports lean). */
export const WorksPreview = [
  {
    title: "Moneyversity+",
    links: "https://moneyversity.co.za/",
    description:
      "A financial education platform from Old Mutual that helps people build money confidence through clear learning paths, practical tools, and accessible content.",
    stacks: ["Web", "EdTech"],
    imageUrl: moneyversity,
  },
  {
    title: "SHOSAI",
    links: "https://shosaistore.com/en-us",
    description:
      "A refined streetwear storefront with a strong brand presence — clean merchandising, collection storytelling, and a commerce experience built for modern apparel brands.",
    stacks: ["Shopify", "E-commerce"],
    imageUrl: shosai,
  },
  {
    title: "Smart Industrial",
    links: "https://smartindustrial.com.au/",
    description:
      "A labour hire site for industrial and commercial projects across NSW — connecting qualified trades with construction, manufacturing, mining, and infrastructure work.",
    stacks: ["WordPress", "Lead generation"],
    imageUrl: smartindustrial,
  },
  {
    title: "EazySites",
    links: "https://www.eazysites.com/",
    description:
      "A publishing system for solo creators — launch a site fast, lock a focused content plan, and keep a consistent publishing cadence without drowning in tools or design debt.",
    stacks: ["Next.js", "Product marketing"],
    imageUrl: eazysites,
  },
  {
    title: "Oplerra",
    links: "https://oplerra.com/",
    description:
      "Field operations software that keeps work, assets, compliance, and crews in sync in real time — so teams can see what happened on site, not guess from spreadsheets.",
    stacks: ["Next.js", "SaaS"],
    imageUrl: oplerra,
  },
];

/** Keep in sync with utils/WorksContent.js length. */
export const TOTAL_WORKS_COUNT = 12;
