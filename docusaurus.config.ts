import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'FIS AI Cookbook',
  tagline: 'Sổ tay AI cho lập trình viên FPT IS',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://hiro-pna.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/ai-cookbook/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'hiro-pna', // Usually your GitHub org/user name.
  projectName: 'ai-cookbook', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/', // Serve the docs at the site's root
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/hiro-pna/ai-cookbook/tree/main/',
        },
        blog: false, // Disable blog for this cookbook
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],
  
  markdown: {
    mermaid: true,
  },

  themeConfig: {
    // Replace with your project's social card
    image: 'img/ai-cookbook-social-card.jpg',
    navbar: {
      title: 'AI Cookbook',
      logo: {
        alt: 'AI Cookbook Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Hướng Dẫn',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/hiro-pna/ai-cookbook',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Nội Dung',
          items: [
            {
              label: 'Giới thiệu',
              to: '/intro',
            },
            {
              label: 'Tích hợp với Cursor',
              to: '/cursor-integration',
            },
            {
              label: 'GPT cho Technical Docs',
              to: '/gpt-for-technical-docs',
            },
          ],
        },
        {
          title: 'Công Cụ AI',
          items: [
            {
              label: 'ChatGPT',
              href: 'https://chat.openai.com',
            },
            {
              label: 'Google Gemini',
              href: 'https://gemini.google.com',
            },
            {
              label: 'Cursor',
              href: 'https://cursor.sh',
            },
          ],
        },
        {
          title: 'Tài Nguyên',
          items: [
            {
              label: 'Docusaurus',
              href: 'https://docusaurus.io',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/hiro-pna/ai-cookbook',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Hiro. Built with Docusaurus. Powered by FPT IS.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'javascript', 'typescript', 'python'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
