import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Wandora Admin",
  version: packageJson.version,
  copyright: `© ${currentYear}, Wandora Admin.`,
  meta: {
    title: "Wandora Admin - Modern Admin Interface",
    description:
      "Wandora Admin is a modern admin interface for managing your applications with ease and efficiency. Built with NextJS and TypeScript.",
  },
};
