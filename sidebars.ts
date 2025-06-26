import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Developer: Tích hợp và sử dụng Cursor',
      items: [
        'cursor-integration/index',        
        'cursor-integration/cau-hinh-cursor',
        'cursor-integration/cursor-rules',
        {
          type: 'category',
          label: 'Prompt mẫu theo Tech Stack',
          items: [
            'cursor-integration/2-1-frontend',
            'cursor-integration/2-2-backend',
            'cursor-integration/2-3-devops',
          ],
        },
        'cursor-integration/meo-pair-programming',
      ],
    },
    {
      type: 'category',
      label: 'BA/Tester: Tận dụng GPT để tạo tài liệu',
      items: [
        'gpt-for-technical-docs/index',
        {
          type: 'category',
          label: 'BA - Tạo tài liệu dự án',
          items: [
            'gpt-for-technical-docs/prompt-for-ba/index',
            'gpt-for-technical-docs/prompt-for-ba/core-principles',
            'gpt-for-technical-docs/prompt-for-ba/define-the-context',
            'gpt-for-technical-docs/prompt-for-ba/crafting-the-task',
            'gpt-for-technical-docs/prompt-for-ba/specifying-the-output',
            'gpt-for-technical-docs/prompt-for-ba/examples-and-workflows',
          ]
        }
      ],
    },
    // {
    //   type: 'category',
    //   label: 'Chương 3: Áp dụng Gemini Gems',
    //   items: ['gemini-gems-workflow/index'],
    // },
    // {
    //   type: 'category',
    //   label: 'Chương 4: Hướng dẫn cấu trúc prompt',
    //   items: ['professional-prompting/index'],
    // },
    // {
    //   type: 'category',
    //   label: 'Chương 5: Quản lý & chia sẻ kiến thức AI',
    //   items: ['knowledge-management/index'],
    // },
    // {
    //   type: 'category',
    //   label: 'Bonus: AI Workflow Library',
    //   items: ['bonus-ai-workflow-library/index'],
    // },
  ],
};

export default sidebars;
