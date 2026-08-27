const navLinks = [...document.querySelectorAll("[data-view-link]")];
const views = [...document.querySelectorAll("[data-view]")];
const validViews = new Set(views.map((view) => view.dataset.view));
const dotFieldElements = [...document.querySelectorAll("[data-dotfield]")];
const langToggle = document.querySelector("#lang-toggle");
const metaDescription = document.querySelector("#meta-description");
const translatableNodes = [...document.querySelectorAll("[data-i18n]")];
const heroSection = document.querySelector(".hero");
const heroTitle = document.querySelector(".hero-title");
const heroTitleText = document.querySelector(".hero-title-text");
const heroAuroraSurface = document.querySelector(".hero-aurora-surface");
const heroSubtitle = document.querySelector(".hero-minimal-subtitle");
const heroFocusRow = document.querySelector(".hero-minimal-focus-row");
const expertiseSection = document.querySelector(".expertise-section");
const workMarqueeTransition = document.querySelector(".work-marquee-transition");
const workCarousel = document.querySelector("[data-work-carousel]");
const connectRevealNodes = [...document.querySelectorAll("[data-home-reveal]")];
const homeScrollButtons = [...document.querySelectorAll("[data-scroll-home]")];
const skillPreviewPanel = document.querySelector("[data-skill-preview-panel]");
const skillPreviewImage = document.querySelector("[data-skill-preview-image]");
let dotFieldsInitialized = false;
let heroSubtitleTextType = null;
let pendingHomeScrollTarget = "";

const translations = {
  en: {
    brand_cn: "Code & Design",
    nav_home: "Home",
    nav_experience: "About",
    nav_projects: "Projects",
    nav_ai_library: "AI Library",
    nav_connect: "Connect",
    status_ready: "SYS.READY",
    data_stream: "[DATA.STREAM]",
    home_kicker: "01 / HOME",
    home_location: "AI-Native Product Designer · Beijing / London Rhythm",
    home_intro:
      "I design interfaces that help AI feel legible, useful, and emotionally grounded across product systems, prototypes, and spatial experiences.",
    home_side_strategy_label: "CURRENT FOCUS",
    home_side_strategy_value:
      "Designing clearer bridges between AI capability, human intent, and product trust.",
    home_side_archive_label: "ARCHIVE NOTE",
    home_side_archive_value:
      "A portfolio home re-authored as a continuous blue gradient landscape with cinematic pacing.",
    home_scroll_label: "Scroll to Selected Work",
    home_footer_note:
      "Structured by design, extended by code, refined through collaboration.",
    home_archive_kicker: "AFTER RAIN ARCHIVE",
    home_archive_note:
      "Condition: after rain. Signal: stable. A personal archive built between systems, stories, and lived experience.",
    home_hero_copy:
      "Structured by design, extended by code, and shaped through collaboration. A quiet interface for systems, stories, and the worlds I move through.",
    home_type_line_1:
      "Structured by design, extended by code, shaped through collaboration",
    home_type_line_2: "Turning AI ideas into usable product experiences",
    home_expertise_title: "Expertise",
    home_expertise_copy:
      "I design AI-native experiences and prototype intelligent interactions across products, apps, and mixed reality systems.",
    home_tools_label: "Tools",
    home_expertise_card_1_title: "AI Experience Design",
    home_expertise_card_1_copy:
      "Designing clear and usable experiences for AI assistants, agents, and intelligent tools.",
    home_expertise_card_1_tools: "Figma、Sketch",
    home_expertise_card_2_title: "Prototype Development",
    home_expertise_card_2_copy:
      "Building testable demos with code, AI tools, and interactive prototyping workflows.",
    home_expertise_card_2_tools: "Codex、Unity、Xcode",
    home_expertise_card_3_title: "Product Collaboration",
    home_expertise_card_3_copy:
      "Translating user needs, AI capabilities, and business goals into product flows that can move forward with teams.",
    home_expertise_card_3_tools: "Office、SPSS",
    home_work_title: "Selected Work",
    home_work_kicker: "02 / SELECTED WORK",
    home_work_label: "FEATURED WORK",
    home_work_copy:
      "A focused selection of AI-native product work, mobile interaction design, and mixed reality experiments.",
    home_work_card_1_title: "智能任务Agent",
    home_work_card_1_tags: "AI Task Assistant / 全链路体验设计 / Alibaba Amap",
    home_work_card_1_copy:
      "Designing conversational task flows, structured task cards, and scalable AI interaction patterns for a map-based intelligent assistant.",
    home_work_card_1_body:
      "From task framing to card hierarchy, the focus was turning complex intent into calm, sequential actions that users can trust at a glance.",
    home_work_card_1_screen_title: "Plan the next move with confidence.",
    home_work_card_1_screen_copy:
      "Structured tasks, contextual prompts, and intelligent action cards for map-native decision making.",
    home_work_card_2_title: "Bee Hero",
    home_work_card_2_tags: "AI + AR Mobile App / National 1st Prize",
    home_work_card_2_copy:
      "An AI-native mobile app that helps children explore plants through recognition, voice Q&A, and playful AR interactions.",
    home_work_card_2_body:
      "The experience combines visual recognition, guided storytelling, and reward loops to make learning feel tactile and alive.",
    home_work_card_3_title: "MyAIPal",
    home_work_card_3_tags: "MR AI Agent / CHI EA 2025",
    home_work_card_3_copy:
      "Exploring how everyday objects can become personalized AI agents in mixed reality.",
    home_work_card_3_body:
      "This work studies intimacy, embodiment, and ambient intelligence through speculative but testable interaction scenarios.",
    home_work_button: "View Case",
    home_work_next: "Next Project",
    home_skills_kicker: "03 / SOFTWARE SKILLS",
    home_skills_title: "Software Skills",
    home_skills_intro:
      "A working stack across interface design, interactive prototyping, development, and AI-assisted making.",
    home_skill_design_copy:
      "Figma and Sketch for interface systems, interaction states, flows, rapid layout decisions, and polished visual handoff.",
    home_skill_build_copy:
      "Xcode, Unity, and Sublime Text for turning interaction concepts into testable experiences with believable motion and logic.",
    home_skill_ai_copy:
      "Codex, Cursor, and prompt systems for prototyping product ideas faster, structuring research, and extending design into code.",
    home_skill_system_copy:
      "Information architecture, reusable content logic, and cross-functional design communication that keeps concepts shippable.",
    home_about_kicker: "04 / ABOUT YU",
    home_about_title: "About Yu",
    home_about_lead:
      "I believe the best AI products feel composed rather than crowded: emotionally clear, structurally calm, and capable of helping people move forward with confidence.",
    home_about_body:
      "My design philosophy sits between rigor and softness. I like systems that stay readable, interactions that feel intentional, and prototypes that are expressive enough to invite conversation early.",
    home_about_gallery_label: "Outside of work",
    home_about_gallery_copy:
      "Cities, light, exhibitions, quiet corners, and the small visual fragments that keep my design taste alive.",
    home_connect_title: "Connect Me",
    home_connect_copy: "Let’s design intelligent experiences together.",
    home_connect_channels: "Channels",
    home_connect_placeholder_1_label: "Portrait / Placeholder",
    home_connect_placeholder_2_label: "Social / Placeholder",
    home_connect_placeholder_meta: "To be replaced with your photo",
    home_signal_condition_label: "CONDITION",
    home_signal_condition_value: "After rain / low light / stable signal",
    home_signal_method_label: "PRACTICE",
    home_signal_method_value: "Design first, code enabled, collaboration aware",
    home_signal_current_label: "CURRENTLY",
    home_signal_current_value: "Collecting systems, stories, and cities in motion",
    home_scroll: "initiate_scroll()",
    card_experience_title: "Experience",
    card_experience_copy:
      "Roles, collaborations, and systems-thinking across design and frontend execution.",
    card_projects_title: "Projects",
    card_projects_copy:
      "Selected digital builds, portfolio experiments, and product concepts in motion.",
    card_ai_library_title: "AI Library",
    card_ai_library_copy:
      "Curated tools, prompts, references, and workflow notes for practical creative AI.",
    experience_kicker: "03 / Experience",
    experience_title: "Personal Experience",
    experience_copy:
      "I work across content structure, visual design, and frontend execution to turn vague ideas into clear, usable experiences.",
    experience_research_title: "Research",
    experience_research_tag: "RESEARCH",
    experience_research_copy:
      "Clarifying audience, goals, and information hierarchy before visual decisions begin.",
    experience_research_meta:
      "Discovery work, framing, and decision-making structure before execution starts.",
    experience_systems_title: "Systems",
    experience_systems_tag: "SYSTEMS",
    experience_systems_copy:
      "Building scalable page logic, content groupings, and repeatable interaction patterns.",
    experience_systems_meta:
      "Modular architecture, reusable sections, and maintainable content systems.",
    experience_execution_title: "Execution",
    experience_execution_tag: "EXECUTION",
    experience_execution_copy:
      "Translating concepts into refined interfaces with responsive, maintainable frontend structure.",
    experience_execution_meta:
      "Frontend delivery, responsive refinement, and design-to-build continuity.",
    projects_kicker: "01 / Projects",
    projects_title: "Featured Projects",
    projects_copy:
      "A curated selection of projects, including mobile design & development and immersive spatial experiences.",
    projects_mobile_kicker: "01 / Mobile",
    projects_mobile_title: "Mobile Design & Development",
    projects_mobile_card_1_tag: "MOBILE APP",
    projects_mobile_card_1_tag_1: "AI Native App",
    projects_mobile_card_1_tag_2: "National 1st Prize",
    projects_mobile_card_1_title: "Bee Hero",
    projects_mobile_card_1_meta:
      "Focused on children's natural knowledge popularization, building a playful experience that combines AI exploration with AR planting.",
    projects_mobile_card_2_tag_1: "AR Learning",
    projects_mobile_card_2_tag_2: "iF Design Talent Award",
    projects_mobile_card_2_title: "CollabEar",
    projects_mobile_card_2_meta:
      "Supports hearing-impaired children in practicing oral language within everyday home environments through AR-based situational experiences.",
    projects_mobile_card_3_tag_1: "Urban Wildlife",
    projects_mobile_card_3_tag_2: "Citizen Science",
    projects_mobile_card_3_title: "BIO-NEIGHBOR",
    projects_mobile_card_3_meta:
      "Helps citizens mark and collect urban wildlife information anytime, turning meaningful encounters into a shared record.",
    projects_space_kicker: "02 / Space",
    projects_space_title: "Immersive Spatial Experience",
    projects_space_row_1_label: "Spatial Work",
    projects_space_card_1_tag_1: "AI Agent",
    projects_space_card_1_tag_2: "CHI 2025",
    projects_space_card_1_title: "MyAIPal",
    projects_space_card_1_meta:
      "Transforms everyday objects into personalized AI conversational agents within mixed reality environments.",
    projects_space_card_2_tag_1: "Embodied Immersion",
    projects_space_card_2_tag_2: "SIGGRAPH Asia 2023",
    projects_space_card_2_title: "DreamSongs",
    projects_space_card_2_meta:
      "An embodied virtual narrative experience built around ancient Miao songs.",
    projects_space_card_3_tag_1: "MR Interaction",
    projects_space_card_3_tag_2: "IEEE VR XR Gallery",
    projects_space_card_3_title: "Mythoscape",
    projects_space_card_3_meta:
      "An MR Shan Hai Jing game built around interaction with real objects.",
    projects_space_card_4_tag_1: "AR On-site",
    projects_space_card_4_tag_2: "Huawei Hetu",
    projects_space_card_4_title: "751 CANDY FACTORY",
    projects_space_card_4_meta:
      "Built a mixed virtual-physical candy world on site within the 751 Power Square district.",
    projects_space_card_5_tag_1: "Future Retail",
    projects_space_card_5_tag_2: "BUAA × Alibaba Industry Course",
    projects_space_card_5_title: "邂逅之境",
    projects_space_card_5_meta:
      "Explores future XR commerce experiences through the Chanel Chance series.",
    projects_space_card_6_tag_1: "Future Social",
    projects_space_card_6_tag_2: "Prototype Practice",
    projects_space_card_6_title: "HOLOCHAT",
    projects_space_card_6_meta:
      "A future social exploration in mixed reality environments.",
    projects_cta: "Submit Your Project ->",
    projects_portfolio_tag: "PORTFOLIO",
    projects_portfolio_copy: "Brand-led websites with stronger visual storytelling.",
    projects_portfolio_meta:
      "Identity systems, landing pages, and editorial web experiences.",
    projects_experiment_tag: "EXPERIMENT",
    projects_experiment_copy: "Creative coding and motion systems for expressive interfaces.",
    projects_experiment_meta:
      "Motion studies, interactions, and immersive visual prototypes.",
    projects_ai_tag: "AI WORKFLOW",
    projects_ai_copy: "Reusable prompt and tool pipelines for faster making.",
    projects_ai_meta:
      "Prompt ops, automation recipes, and AI-native product experiments.",
    projects_systems_tag: "SYSTEMS",
    projects_systems_copy:
      "Structured interfaces designed to scale across pages and workflows.",
    projects_systems_meta:
      "Design systems, reusable sections, and productized interaction patterns.",
    projects_metric_label: "Systems shipped",
    projects_story_tag: "DATA STORY",
    projects_story_copy:
      "Narrative-driven layouts for complex information and visual explanation.",
    projects_story_meta:
      "Insight pages, dashboards, and information architecture with rhythm.",
    projects_brand_tag: "BRAND",
    projects_brand_copy:
      "Distinct digital identities that feel authored, not templated.",
    projects_brand_meta:
      "Tone systems, typography direction, and memorable first impressions.",
    ai_kicker: "02 / AI Library",
    ai_title: "AI Library",
    ai_copy:
      "A growing collection of prompts, resources, process maps, and tool observations for creative and productive AI-native work.",
    ai_patterns_tag: "PROMPT PATTERNS",
    ai_patterns_copy:
      "Reusable prompt structures for ideation, drafting, and decision support.",
    ai_patterns_meta:
      "Prompt scaffolds, framing templates, and repeatable creative instructions.",
    ai_models_tag: "MODEL NOTES",
    ai_models_copy:
      "Comparisons and observations about where different models perform best.",
    ai_models_meta:
      "Strengths, limits, and practical notes for selecting the right model quickly.",
    ai_recipes_tag: "AUTOMATION RECIPES",
    ai_recipes_copy:
      "Step-based AI workflows that turn repeated tasks into reliable systems.",
    ai_recipes_meta:
      "Research flows, content pipelines, and operational shortcuts for everyday work.",
    ai_metric_label: "Workflow notes",
    ai_panel_copy:
      "This page is designed as a modular archive for prompt patterns, model comparisons, workflow recipes, and selected inspiration.",
    ai_chip_1: "Prompt Patterns",
    ai_chip_2: "Model Notes",
    ai_chip_3: "Automation Recipes",
    ai_chip_4: "Reference Links",
  },
  zh: {
    brand_cn: "代码与设计",
    nav_home: "首页",
    nav_experience: "关于",
    nav_projects: "项目",
    nav_ai_library: "AI 资料库",
    nav_connect: "联系我",
    status_ready: "系统就绪",
    data_stream: "[数据流]",
    home_kicker: "01 / 首页",
    home_location: "AI 原生产品设计师 · 北京 / 伦敦节奏",
    home_intro:
      "我关注如何让 AI 产品在系统结构、交互逻辑与情绪感受上都更清晰、更可用，也更贴近真实的人。",
    home_side_strategy_label: "当前关注",
    home_side_strategy_value:
      "持续寻找 AI 能力、用户意图与产品信任之间更清晰的连接方式。",
    home_side_archive_label: "改版注记",
    home_side_archive_value:
      "把个人站首页重写成连续流动的蓝色渐变场景，并保留更有叙事感的节奏。",
    home_scroll_label: "滚动查看精选作品",
    home_footer_note:
      "以设计为结构，以代码为延展，并在协作中持续打磨。",
    home_archive_kicker: "雨后档案",
    home_archive_note:
      "状态：雨后。信号：稳定。一个建立在系统、叙事与真实生活经验之间的个人档案界面。",
    home_hero_copy:
      "以设计为结构，以代码为延展，并在协作中持续成形。这里是一处安静的界面档案，收纳系统、故事与我所经过的世界。",
    home_type_line_1: "以设计为结构，以代码为延展，并在协作中持续成形",
    home_type_line_2: "把 AI 想法转化为可用的产品体验",
    home_expertise_title: "Expertise",
    home_expertise_copy:
      "我设计 AI 原生体验，并围绕产品、应用与混合现实系统原型化智能交互。",
    home_tools_label: "工具",
    home_expertise_card_1_title: "AI Experience Design",
    home_expertise_card_1_copy:
      "为 AI 助手、智能体与智能工具设计清晰、可用且可理解的产品体验。",
    home_expertise_card_1_tools: "Figma、Sketch",
    home_expertise_card_2_title: "Prototype Development",
    home_expertise_card_2_copy:
      "借助代码、AI 工具与交互式原型工作流，快速构建可测试的体验 demo。",
    home_expertise_card_2_tools: "Codex、Unity、Xcode",
    home_expertise_card_3_title: "Product Collaboration",
    home_expertise_card_3_copy:
      "把用户需求、AI 能力与业务目标转译为能够被团队推进的产品流程。",
    home_expertise_card_3_tools: "Office、SPSS",
    home_work_title: "Selected Work",
    home_work_kicker: "02 / 精选作品",
    home_work_label: "精选作品",
    home_work_copy:
      "精选三类代表性工作：AI 原生产品、移动交互体验与混合现实研究。",
    home_work_card_1_title: "智能任务Agent",
    home_work_card_1_tags: "AI Task Assistant / 全链路体验设计 / Alibaba Amap",
    home_work_card_1_copy:
      "为地图场景中的智能助手设计对话式任务流、结构化任务卡片与可扩展的 AI 交互模式。",
    home_work_card_1_body:
      "从任务 framing 到卡片层级，重点在于把复杂意图转化为用户一眼就能信任的顺序化行动。",
    home_work_card_1_screen_title: "更安心地规划下一步。",
    home_work_card_1_screen_copy:
      "通过结构化任务、上下文提示与智能行动卡片，让地图场景中的决策更清晰。",
    home_work_card_2_title: "Bee Hero",
    home_work_card_2_tags: "AI + AR Mobile App / National 1st Prize",
    home_work_card_2_copy:
      "一款面向儿童植物探索的 AI 原生移动应用，结合识别、语音问答与趣味 AR 交互。",
    home_work_card_2_body:
      "通过视觉识别、引导式故事表达与奖励循环，让自然学习变得更有触感和参与感。",
    home_work_card_3_title: "MyAIPal",
    home_work_card_3_tags: "MR AI Agent / CHI EA 2025",
    home_work_card_3_copy:
      "探索如何让日常物品在混合现实中成为个性化 AI 智能体。",
    home_work_card_3_body:
      "这个项目围绕亲密感、具身性与环境式智能，搭建可被讨论也可被验证的交互场景。",
    home_work_button: "查看案例",
    home_work_next: "下一个项目",
    home_skills_kicker: "03 / 软件技能",
    home_skills_title: "Software Skills",
    home_skills_intro:
      "围绕界面设计、交互原型、开发实现与 AI 协同创作形成的一套工作栈。",
    home_skill_design_copy:
      "使用 Figma 与 Sketch 搭建设计系统、状态细节、页面流与高质量视觉交付。",
    home_skill_build_copy:
      "借助 Xcode、Unity 与 Sublime Text，把交互概念转化为可信、可测的体验原型。",
    home_skill_ai_copy:
      "借助 Codex、Cursor 与提示词系统，更快原型化产品想法、组织研究过程，并让设计延展到代码。",
    home_skill_system_copy:
      "通过信息架构、可复用内容逻辑与跨职能沟通，让概念最终能够被稳定推进。",
    home_about_kicker: "04 / 关于 Yu",
    home_about_title: "About Yu",
    home_about_lead:
      "我相信好的 AI 产品不是堆满能力，而是保持克制、清晰和情绪上的稳定，帮助人更有把握地继续向前。",
    home_about_body:
      "我的设计哲学介于理性与柔软之间。我喜欢可读的系统、明确的交互，以及足够有表现力、能尽早引发讨论的原型。",
    home_about_gallery_label: "工作之外",
    home_about_gallery_copy:
      "城市、光线、展览、安静角落，以及那些持续滋养我设计审美的细小视觉碎片。",
    home_connect_title: "Connect Me",
    home_connect_copy: "让我们一起设计智能体验。",
    home_connect_channels: "渠道",
    home_connect_placeholder_1_label: "照片占位",
    home_connect_placeholder_2_label: "社交占位",
    home_connect_placeholder_meta: "等待替换为你的照片",
    home_signal_condition_label: "状态",
    home_signal_condition_value: "雨后 / 低照度 / 信号稳定",
    home_signal_method_label: "实践",
    home_signal_method_value: "设计优先，代码延展，协作共创",
    home_signal_current_label: "此刻",
    home_signal_current_value: "持续收集流动中的系统、故事与城市",
    home_scroll: "启动滚动()",
    card_experience_title: "经历",
    card_experience_copy:
      "展示我在设计、协作与前端落地中的系统性思考与实践。",
    card_projects_title: "项目",
    card_projects_copy:
      "收录数字作品、作品集实验，以及正在推进中的产品概念。",
    card_ai_library_title: "AI 资料库",
    card_ai_library_copy:
      "整理实用型创意 AI 的工具、提示词、参考资料与工作流笔记。",
    experience_kicker: "03 / 经历",
    experience_title: "个人经历",
    experience_copy:
      "我围绕内容结构、视觉设计与前端执行展开工作，把模糊想法转化为清晰、可用的体验。",
    experience_research_title: "研究",
    experience_research_tag: "研究",
    experience_research_copy:
      "在进入视觉表达之前，先厘清受众、目标与信息层级。",
    experience_research_meta:
      "聚焦发现阶段、问题定义与执行前的判断结构。",
    experience_systems_title: "系统",
    experience_systems_tag: "系统",
    experience_systems_copy:
      "构建可扩展的页面逻辑、内容分组与可复用的交互模式。",
    experience_systems_meta:
      "模块化架构、可复用区块与可维护的内容系统。",
    experience_execution_title: "执行",
    experience_execution_tag: "执行",
    experience_execution_copy:
      "把概念转化为精炼界面，并以响应式、可维护的前端结构完成落地。",
    experience_execution_meta:
      "前端交付、响应式打磨与设计到实现的连续性。",
    projects_kicker: "01 / 项目",
    projects_title: "精选项目",
    projects_copy:
      "精选作品涵盖移动端设计与开发，以及沉浸式空间体验。",
    projects_mobile_kicker: "01 / 移动端",
    projects_mobile_title: "移动端设计与开发",
    projects_mobile_card_1_tag_1: "AI原生应用",
    projects_mobile_card_1_tag_2: "中国高校计算机大赛全国一等奖",
    projects_mobile_card_1_title: "Bee Hero",
    projects_mobile_card_1_meta:
      "聚焦儿童自然知识科普，构建AI探索+AR种植的趣味体验。",
    projects_mobile_card_2_tag_1: "AR情境学习",
    projects_mobile_card_2_tag_2: "德国IF设计新秀奖",
    projects_mobile_card_2_title: "CollabEar",
    projects_mobile_card_2_meta:
      "通过AR情境体验，助力听障儿童在日常家庭环境中学习口语。",
    projects_mobile_card_3_tag_1: "城市野生动物",
    projects_mobile_card_3_tag_2: "公民科学家",
    projects_mobile_card_3_title: "BIO-NEIGHBOR",
    projects_mobile_card_3_meta:
      "帮助公民随时标记、收集城市野生动物信息，记录每一次美好相遇。",
    projects_space_kicker: "02 / 空间体验",
    projects_space_title: "沉浸式空间体验",
    projects_space_row_1_label: "空间作品",
    projects_space_card_1_tag_1: "AI对话伙伴",
    projects_space_card_1_tag_2: "CHI 2025",
    projects_space_card_1_title: "MyAIPal",
    projects_space_card_1_meta:
      "在混合现实环境中，将日常物品转化为个性化的AI对话智能体。",
    projects_space_card_2_tag_1: "沉浸身体",
    projects_space_card_2_tag_2: "SIGGRAPH Asia 2023",
    projects_space_card_2_title: "DreamSongs",
    projects_space_card_2_meta:
      "融入身体互动的苗族古歌虚拟叙事体验",
    projects_space_card_3_tag_1: "MR互动体验",
    projects_space_card_3_tag_2: "IEEE VR XR Gallery",
    projects_space_card_3_title: "Mythoscape",
    projects_space_card_3_meta:
      "一场围绕真实物体互动的MR山海经游戏",
    projects_space_card_4_tag_1: "AR实景",
    projects_space_card_4_tag_2: "华为河图",
    projects_space_card_4_title: "751 CANDY FACTORY",
    projects_space_card_4_meta:
      "在751动力广场区域，现场实景打造虚实融合的糖果世界。",
    projects_space_card_5_tag_1: "未来购物",
    projects_space_card_5_tag_2: "北航×阿里校企合作课",
    projects_space_card_5_title: "邂逅之境",
    projects_space_card_5_meta:
      "以香奈儿邂逅系列为例探索未来XR电商体验",
    projects_space_card_6_tag_1: "未来社交",
    projects_space_card_6_tag_2: "原型开发实践",
    projects_space_card_6_title: "HOLOCHAT",
    projects_space_card_6_meta:
      "混合现实环境下的未来社交探索",
    projects_cta: "提交你的项目 ->",
    projects_portfolio_tag: "作品集",
    projects_portfolio_copy: "更具品牌表达力与视觉叙事感的网站体验。",
    projects_portfolio_meta: "品牌识别系统、落地页与更具编辑感的网页体验。",
    projects_experiment_tag: "实验",
    projects_experiment_copy: "用于表达式界面的创意编码与动态系统探索。",
    projects_experiment_meta: "动态研究、交互实验与沉浸式视觉原型。",
    projects_ai_tag: "AI 工作流",
    projects_ai_copy: "可复用的提示词与工具管线，帮助更快完成创作。",
    projects_ai_meta: "提示词运营、自动化配方与 AI 原生产品实验。",
    projects_systems_tag: "系统",
    projects_systems_copy: "可跨页面与跨工作流扩展的结构化界面设计。",
    projects_systems_meta: "设计系统、可复用区块与产品化交互模式。",
    projects_metric_label: "已交付系统",
    projects_story_tag: "数据叙事",
    projects_story_copy: "为复杂信息与视觉说明打造叙事驱动的页面布局。",
    projects_story_meta: "洞察页面、仪表盘与更有节奏的信息架构。",
    projects_brand_tag: "品牌",
    projects_brand_copy: "打造有作者感、而不是模板感的数字品牌体验。",
    projects_brand_meta: "语气系统、字体方向与更有辨识度的第一印象。",
    ai_kicker: "02 / AI 资料库",
    ai_title: "AI 资料库",
    ai_copy:
      "持续整理提示词、资源、流程图与工具观察，服务于创意与效率并重的 AI 工作方式。",
    ai_patterns_tag: "提示词模式",
    ai_patterns_copy:
      "可复用的提示词结构，用于构思、起草与辅助决策。",
    ai_patterns_meta:
      "涵盖提示词脚手架、 framing 模板与可重复使用的创意指令。",
    ai_models_tag: "模型笔记",
    ai_models_copy:
      "对不同模型适用场景的对比与实战观察。",
    ai_models_meta:
      "快速判断模型优势、限制与适配任务的实践笔记。",
    ai_recipes_tag: "自动化配方",
    ai_recipes_copy:
      "把重复任务整理成稳定可复用的分步式 AI 工作流。",
    ai_recipes_meta:
      "包括研究流程、内容管线与日常工作的效率捷径。",
    ai_metric_label: "工作流笔记",
    ai_panel_copy:
      "这个页面被设计为一个模块化档案库，用于收纳提示词模式、模型对比、流程配方与精选灵感。",
    ai_chip_1: "提示词模式",
    ai_chip_2: "模型笔记",
    ai_chip_3: "自动化配方",
    ai_chip_4: "参考链接",
  },
};

const storedLanguage = localStorage.getItem("site-language");
const pageLanguageOverride = document.body.dataset.page === "projects" ? "zh" : null;
let currentLanguage = pageLanguageOverride || storedLanguage || "en";
const dotFieldInstances = [];

const getCurrentView = () => {
  const pageView = document.body.dataset.page;
  if (pageView) {
    return pageView;
  }

  if (views.length === 1) {
    return views[0].dataset.view || "home";
  }

  const hash = window.location.hash.replace("#", "");
  return validViews.has(hash) ? hash : "home";
};

const getViewTitle = (view, language) => {
  const titles = {
    en: {
      home: "CODESIGN.YOONA",
      experience: "About | CODESIGN.YOONA",
      projects: "Projects | CODESIGN.YOONA",
      "ai-library": "AI Library | CODESIGN.YOONA",
    },
    zh: {
      home: "CODESIGN.YOONA",
      experience: "关于 | CODESIGN.YOONA",
      projects: "项目 | CODESIGN.YOONA",
      "ai-library": "AI 资料库 | CODESIGN.YOONA",
    },
  };

  return titles[language][view];
};

const applyLanguage = () => {
  const copy = translations[currentLanguage];

  for (const node of translatableNodes) {
    const key = node.dataset.i18n;
    if (copy[key]) {
      node.textContent = copy[key];
    }
  }

  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  metaDescription?.setAttribute(
    "content",
    currentLanguage === "zh"
      ? "CODESIGN.YOONA 个人网站，聚焦人工智能、数据、设计与数字创作。"
      : "CODESIGN.YOONA personal portfolio blending product thinking, AI workflows, and digital craft."
  );

  if (langToggle) {
    langToggle.textContent = currentLanguage === "zh" ? "中文" : "EN";
    langToggle.setAttribute(
      "aria-label",
      currentLanguage === "zh" ? "切换到英文" : "Switch to Chinese"
    );
  }
};

const getHeroSubtitleLines = () => {
  const copy = translations[currentLanguage];
  return [copy.home_type_line_1, copy.home_type_line_2].filter(Boolean);
};

const scrollToHomeTarget = (targetId) => {
  if (!targetId) return;
  const target = document.getElementById(targetId);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
};

const renderView = () => {
  const currentView = getCurrentView();
  document.body.dataset.view = currentView;

  if (views.length <= 1) {
    if (views[0]) {
      views[0].hidden = false;
      views[0].classList.add("is-active");
    }

    document.title = getViewTitle(currentView, currentLanguage);

    for (const instance of dotFieldInstances) {
      instance.resize();
    }
    return;
  }

  for (const view of views) {
    const isActive = view.dataset.view === currentView;
    view.hidden = !isActive;
    view.classList.toggle("is-active", isActive);
  }

  for (const link of navLinks) {
    link.classList.toggle("active", link.dataset.viewLink === currentView);
  }

  document.title = getViewTitle(currentView, currentLanguage);

  for (const instance of dotFieldInstances) {
    instance.resize();
  }

  if (currentView !== "home") {
    window.scrollTo({ top: 0, behavior: "auto" });
    return;
  }

  if (pendingHomeScrollTarget) {
    window.requestAnimationFrame(() => {
      scrollToHomeTarget(pendingHomeScrollTarget);
      pendingHomeScrollTarget = "";
    });
    return;
  }

  window.scrollTo({ top: 0, behavior: "auto" });
};

class HeroScene {
  constructor(section, titleNode) {
    this.section = section;
    this.titleNode = titleNode;
    this.charNodes = [];
    this.hoveredIndex = -1;
    this.pointer = { x: 0.5, y: 0.4 };
    this.scrollProgress = 0;
    this.active = false;
    this.raf = null;
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerLeave = this.handlePointerLeave.bind(this);
    this.handleTitlePointerOver = this.handleTitlePointerOver.bind(this);
    this.handleTitlePointerOut = this.handleTitlePointerOut.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.update = this.update.bind(this);
    this.buildCharacters();
    this.attach();
    this.handleScroll();
    this.update();
  }

  buildCharacters() {
    const value = this.titleNode.textContent.trim();
    const fragment = document.createDocumentFragment();
    const interactiveLimit = value.indexOf(".");

    for (const [index, char] of [...value].entries()) {
      const span = document.createElement("span");
      span.className = "hero-char";
      span.textContent = char === " " ? "\u00A0" : char;
      span.dataset.index = String(index);
      if (interactiveLimit > 0 && index < interactiveLimit) {
        span.dataset.hoverable = "true";
      }
      fragment.appendChild(span);
      this.charNodes.push(span);
    }

    this.titleNode.textContent = "";
    this.titleNode.appendChild(fragment);
  }

  attach() {
    this.section.addEventListener("pointermove", this.handlePointerMove);
    this.section.addEventListener("pointerleave", this.handlePointerLeave);
    this.titleNode.addEventListener("pointerover", this.handleTitlePointerOver);
    this.titleNode.addEventListener("pointerout", this.handleTitlePointerOut);
    window.addEventListener("scroll", this.handleScroll, { passive: true });
  }

  handlePointerMove(event) {
    const rect = this.section.getBoundingClientRect();
    this.pointer.x = (event.clientX - rect.left) / rect.width;
    this.pointer.y = (event.clientY - rect.top) / rect.height;
    this.active = true;
    this.queueUpdate();
  }

  handlePointerLeave() {
    this.pointer.x = 0.5;
    this.pointer.y = 0.4;
    this.active = false;
    this.queueUpdate();
  }

  handleTitlePointerOver(event) {
    const target = event.target.closest(".hero-char[data-hoverable='true']");
    this.hoveredIndex = target ? Number(target.dataset.index) : -1;
    this.queueUpdate();
  }

  handleTitlePointerOut(event) {
    if (this.titleNode.contains(event.relatedTarget)) {
      const nextTarget = event.relatedTarget.closest?.(".hero-char[data-hoverable='true']");
      if (!nextTarget) {
        this.hoveredIndex = -1;
        this.queueUpdate();
      }
      return;
    }
    this.hoveredIndex = -1;
    this.queueUpdate();
  }

  handleScroll() {
    const rect = this.section.getBoundingClientRect();
    const viewport = window.innerHeight || 1;
    this.scrollProgress = Math.max(0, Math.min(1, (viewport - rect.top) / (viewport + rect.height)));
    this.queueUpdate();
  }

  queueUpdate() {
    if (this.raf) return;
    this.raf = window.requestAnimationFrame(this.update);
  }

  update() {
    this.raf = null;
    const x = this.pointer.x;
    const y = this.pointer.y;
    const offsetX = (x - 0.5) * 44;
    const offsetY = (y - 0.5) * 38;
    const tiltX = (0.5 - y) * 8;
    const tiltY = (x - 0.5) * 10;
    const scrollLift = this.scrollProgress * 22;

    this.section.style.setProperty("--hero-mouse-x", `${(x * 100).toFixed(2)}%`);
    this.section.style.setProperty("--hero-mouse-y", `${(y * 100).toFixed(2)}%`);
    this.section.style.setProperty("--hero-tilt-x", `${tiltX.toFixed(2)}deg`);
    this.section.style.setProperty("--hero-tilt-y", `${tiltY.toFixed(2)}deg`);
    this.section.style.setProperty("--hero-parallax-x", `${offsetX.toFixed(2)}px`);
    this.section.style.setProperty("--hero-parallax-y", `${(offsetY - scrollLift).toFixed(2)}px`);

    const centerIndex = (this.charNodes.length - 1) / 2;

    this.charNodes.forEach((node, index) => {
      const depth = index - centerIndex;
      const distanceX = Math.abs(index / Math.max(this.charNodes.length - 1, 1) - x);
      const wave = Math.sin((index * 0.7) + (x * Math.PI * 1.8)) * 8;
      const raise = this.active ? Math.max(0, 1 - distanceX * 3.4) * 18 : 0;
      const translateX = depth * 0.7 + offsetX * 0.06;
      const translateY = wave - raise - scrollLift * 0.4;
      const rotate = depth * 0.35 + tiltY * 0.12;
      const scale = 1 + (this.active ? Math.max(0, 1 - distanceX * 4) * 0.08 : 0) + this.scrollProgress * 0.015;

      node.style.transform = `translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0) rotate(${rotate.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      node.style.opacity = `${Math.max(0.68, 1 - distanceX * 0.34)}`;
      node.classList.toggle("is-glow", distanceX < 0.12);
      node.classList.toggle("is-active", this.hoveredIndex === index);
      node.classList.toggle(
        "is-near",
        this.hoveredIndex >= 0 && Math.abs(this.hoveredIndex - index) === 1
      );
    });
  }
}

class HeroAuroraSurface {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      colorStops: ["#4CA6EC", "#abe4ff", "#2E63FF"],
      amplitude: 1.0,
      blend: 0.51,
      speed: 0.6,
      ...options,
    };
    this.program = null;
    this.gl = null;
    this.canvas = null;
    this.ctx2d = null;
    this.mode = "webgl";
    this.positionBuffer = null;
    this.uniforms = null;
    this.frameId = 0;
    this.handleResize = this.handleResize.bind(this);
    if (!this.container) return;
    try {
      this.mount();
    } catch (error) {
      this.showFallback(error);
    }
  }

  mount() {
    const VERT = `#version 300 es
    in vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }`;

    const FRAG = `#version 300 es
    precision highp float;

    uniform float uTime;
    uniform float uAmplitude;
    uniform vec3 uColorStops[3];
    uniform vec2 uResolution;
    uniform float uBlend;

    out vec4 fragColor;

    vec3 permute(vec3 x) {
      return mod(((x * 34.0) + 1.0) * x, 289.0);
    }

    float snoise(vec2 v){
      const vec4 C = vec4(
          0.211324865405187, 0.366025403784439,
          -0.577350269189626, 0.024390243902439
      );
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);

      vec3 p = permute(
          permute(i.y + vec3(0.0, i1.y, 1.0))
        + i.x + vec3(0.0, i1.x, 1.0)
      );

      vec3 m = max(
          0.5 - vec3(
              dot(x0, x0),
              dot(x12.xy, x12.xy),
              dot(x12.zw, x12.zw)
          ), 
          0.0
      );
      m = m * m;
      m = m * m;

      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    struct ColorStop {
      vec3 color;
      float position;
    };

    #define COLOR_RAMP(colors, factor, finalColor) {              \
      int index = 0;                                            \
      for (int i = 0; i < 2; i++) {                               \
         ColorStop currentColor = colors[i];                    \
         bool isInBetween = currentColor.position <= factor;    \
         index = int(mix(float(index), float(i), float(isInBetween))); \
      }                                                         \
      ColorStop currentColor = colors[index];                   \
      ColorStop nextColor = colors[index + 1];                  \
      float range = nextColor.position - currentColor.position; \
      float lerpFactor = (factor - currentColor.position) / range; \
      finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution;
      uv.y = 1.0 - uv.y;
      
      ColorStop colors[3];
      colors[0] = ColorStop(uColorStops[0], 0.0);
      colors[1] = ColorStop(uColorStops[1], 0.5);
      colors[2] = ColorStop(uColorStops[2], 1.0);
      
      vec3 rampColor;
      COLOR_RAMP(colors, uv.x, rampColor);
      
      float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
      height = exp(height);
      height = (uv.y * 2.0 - height + 0.2);
      float intensity = 0.6 * height;
      
      float midPoint = 0.20;
      float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
      
      vec3 auroraColor = intensity * rampColor;
      
      fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
    }`;

    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
    });

    if (!gl) {
      this.showFallback(new Error("webgl2 unavailable"));
      return;
    }

    this.canvas = canvas;
    this.gl = gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    canvas.style.backgroundColor = "transparent";

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader) || "Shader compile failed");
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, VERT);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, FRAG);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || "Program link failed");
    }
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    gl.useProgram(program);
    this.program = program;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    this.positionBuffer = positionBuffer;

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const hexToRgb = (hex) => {
      const value = hex.replace("#", "");
      const normalized =
        value.length === 3
          ? value
              .split("")
              .map((char) => char + char)
              .join("")
          : value;
      const num = Number.parseInt(normalized, 16);
      return [
        ((num >> 16) & 255) / 255,
        ((num >> 8) & 255) / 255,
        (num & 255) / 255,
      ];
    };

    this.uniforms = {
      time: gl.getUniformLocation(program, "uTime"),
      amplitude: gl.getUniformLocation(program, "uAmplitude"),
      colorStops: gl.getUniformLocation(program, "uColorStops"),
      resolution: gl.getUniformLocation(program, "uResolution"),
      blend: gl.getUniformLocation(program, "uBlend"),
    };

    gl.uniform1f(this.uniforms.amplitude, this.options.amplitude);
    gl.uniform1f(this.uniforms.blend, this.options.blend);
    gl.uniform3fv(
      this.uniforms.colorStops,
      new Float32Array(this.options.colorStops.flatMap(hexToRgb))
    );

    this.container.innerHTML = "";
    this.container.appendChild(canvas);
    this.container.dataset.auroraRuntime = "webgl2";

    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    this.update();
  }

  showFallback(error) {
    if (!this.container) return;
    this.container.dataset.auroraFallback = "true";
    this.container.setAttribute("data-aurora-error", error?.message || "unknown");
    this.mountCanvasFallback();
  }

  mountCanvasFallback() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: true });

    if (!ctx) {
      this.container.innerHTML = "";
      return;
    }

    this.mode = "canvas2d";
    this.canvas = canvas;
    this.ctx2d = ctx;
    this.container.dataset.auroraRuntime = "canvas2d";
    canvas.style.backgroundColor = "transparent";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    this.container.innerHTML = "";
    this.container.appendChild(canvas);

    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    this.update();
  }

  handleResize() {
    if (!this.canvas) return;
    const width = Math.max(1, this.container.offsetWidth);
    const height = Math.max(1, this.container.offsetHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(width * dpr);
    this.canvas.height = Math.round(height * dpr);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    if (this.mode === "canvas2d" && this.ctx2d) {
      this.ctx2d.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx2d.scale(dpr, dpr);
      return;
    }

    if (!this.gl || !this.program) return;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.uniform2f(this.uniforms.resolution, this.canvas.width, this.canvas.height);
  }

  update = (time = 0) => {
    this.frameId = window.requestAnimationFrame(this.update);
    if (this.mode === "canvas2d") {
      this.drawFallbackFrame(time);
      return;
    }

    if (!this.gl || !this.program) return;
    this.gl.useProgram(this.program);
    this.gl.uniform1f(this.uniforms.time, time * 0.01 * this.options.speed * 0.1);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
  };

  drawFallbackFrame(time) {
    if (!this.ctx2d || !this.canvas) return;

    const ctx = this.ctx2d;
    const width = Math.max(1, this.container.offsetWidth);
    const height = Math.max(1, this.container.offsetHeight);
    const t = time * 0.0009 * Math.max(this.options.speed, 0.7);
    const blur = Math.max(22, height * 0.055);
    const alphaScale = 1.0;
    const blendScale = 1.08 + this.options.blend * 0.54;

    const hexToRgbString = (hex, alpha) => {
      const value = hex.replace("#", "");
      const normalized =
        value.length === 3
          ? value
              .split("")
              .map((char) => char + char)
              .join("")
          : value;
      const num = Number.parseInt(normalized, 16);
      const r = (num >> 16) & 255;
      const g = (num >> 8) & 255;
      const b = num & 255;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const drawBlob = ({ x, y, rx, ry, color, phase, alpha }) => {
      const px =
        width * x +
        Math.sin(t + phase) * width * 0.18 +
        Math.cos(t * 0.6 + phase) * width * 0.08;
      const py =
        height * y +
        Math.cos(t * 1.18 + phase) * height * 0.1 * this.options.amplitude;
      const prx = width * rx * (1 + Math.sin(t * 0.72 + phase) * 0.16);
      const pry = height * ry * (1 + Math.cos(t * 0.66 + phase) * 0.2);
      const radius = Math.max(prx, pry);
      const gradient = ctx.createRadialGradient(px, py, 0, px, py, radius);

      gradient.addColorStop(0, hexToRgbString(color, alpha * alphaScale));
      gradient.addColorStop(0.14, hexToRgbString(color, alpha * alphaScale));
      gradient.addColorStop(0.34, hexToRgbString(color, alpha * 0.62 * alphaScale));
      gradient.addColorStop(0.62, hexToRgbString(color, alpha * 0.22 * alphaScale));
      gradient.addColorStop(1, hexToRgbString(color, 0));

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(px, py, prx, pry, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.filter = `blur(${blur}px) saturate(132%)`;

    drawBlob({
      x: 0.12,
      y: 0.93,
      rx: 0.34,
      ry: 0.22,
      color: this.options.colorStops[0],
      phase: 0.2,
      alpha: 1.18 * blendScale,
    });
    drawBlob({
      x: 0.5,
      y: 0.98,
      rx: 0.32,
      ry: 0.17,
      color: this.options.colorStops[1],
      phase: 1.6,
      alpha: 1.0 * blendScale,
    });
    drawBlob({
      x: 0.86,
      y: 0.92,
      rx: 0.38,
      ry: 0.22,
      color: this.options.colorStops[2],
      phase: 2.4,
      alpha: 1.14 * blendScale,
    });

    ctx.filter = `blur(${Math.max(12, height * 0.03)}px)`;

    for (let index = 0; index < 5; index += 1) {
      const ribbonY =
        height * (0.64 + index * 0.07) +
        Math.sin(t * (1.2 + index * 0.2) + index * 0.9) * height * 0.075;
      const driftX = Math.sin(t * 1.05 + index) * width * 0.18;
      const gradient = ctx.createLinearGradient(
        -width * 0.1 + driftX,
        ribbonY,
        width * 1.1 + driftX,
        ribbonY + height * 0.06
      );
      const color = this.options.colorStops[index % this.options.colorStops.length];
      gradient.addColorStop(0, hexToRgbString(color, 0));
      gradient.addColorStop(0.14, hexToRgbString(color, 0.22 * blendScale));
      gradient.addColorStop(0.48, hexToRgbString(color, 0.52 * blendScale));
      gradient.addColorStop(0.82, hexToRgbString(color, 0.2 * blendScale));
      gradient.addColorStop(1, hexToRgbString(color, 0));
      ctx.fillStyle = gradient;
      ctx.fillRect(-width * 0.16, ribbonY - height * 0.055, width * 1.32, height * 0.16);
    }

    ctx.filter = `blur(${Math.max(6, height * 0.018)}px)`;

    for (let index = 0; index < 4; index += 1) {
      const scanY =
        height * (0.68 + index * 0.06) +
        Math.cos(t * (1.8 + index * 0.24) + index * 1.2) * height * 0.04;
      const scanGradient = ctx.createLinearGradient(
        0,
        scanY,
        width,
        scanY + height * 0.02
      );
      const color = this.options.colorStops[(index + 1) % this.options.colorStops.length];
      scanGradient.addColorStop(0, hexToRgbString(color, 0));
      scanGradient.addColorStop(0.25, hexToRgbString(color, 0.12 * blendScale));
      scanGradient.addColorStop(0.55, hexToRgbString(color, 0.26 * blendScale));
      scanGradient.addColorStop(0.82, hexToRgbString(color, 0.08 * blendScale));
      scanGradient.addColorStop(1, hexToRgbString(color, 0));
      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, scanY, width, height * 0.038);
    }

    ctx.restore();
  }
}

class DotFieldBackground {
  constructor(container) {
    this.container = container;
    this.canvas = container.querySelector(".dotfield-canvas");
    this.svg = container.querySelector(".dotfield-glow");
    this.glow = container.querySelector("circle");
    this.gradient = container.querySelector("radialGradient");
    this.parent = container.parentElement?.parentElement;
    this.ctx = this.canvas?.getContext("2d", { alpha: true });
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.dots = [];
    this.mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 };
    this.size = { w: 0, h: 0, offsetX: 0, offsetY: 0 };
    this.glowOpacity = 0;
    this.engagement = 0;
    this.dotRadius = 1.5;
    this.dotSpacing = 14;
    this.cursorRadius = 500;
    this.cursorForce = 0.1;
    this.bulgeOnly = true;
    this.bulgeStrength = 67;
    this.glowRadius = 100;
    this.waveAmplitude = 2;
    this.sparkle = true;
    this.gradientFrom = container.dataset.gradientFrom || "#1c326e";
    this.gradientTo = container.dataset.gradientTo || "#394c7b";
    this.glowColor = container.dataset.glowColor || "#0a0d15";
    this.glowId = `dot-field-glow-${Math.random().toString(36).slice(2, 9)}`;
    this.frameCount = 0;
    this.resizeTimer = null;
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.updateMouseSpeed = this.updateMouseSpeed.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.attach();
    this.resize();
  }

  attach() {
    if (!this.parent || !this.canvas || !this.ctx) return;
    if (this.gradient && this.glow) {
      this.gradient.id = this.glowId;
      const stops = this.gradient.querySelectorAll("stop");
      stops[0]?.setAttribute("stop-color", this.glowColor);
      this.glow.setAttribute("fill", `url(#${this.glowId})`);
      this.glow.setAttribute("r", String(this.glowRadius));
    }
    window.addEventListener("mousemove", this.handleMouseMove, { passive: true });
    window.addEventListener("resize", this.handleResize);
    this.speedInterval = window.setInterval(this.updateMouseSpeed, 20);
  }

  handleMouseMove(event) {
    const { offsetX, offsetY } = this.size;
    this.mouse.x = event.pageX - offsetX;
    this.mouse.y = event.pageY - offsetY;
  }

  handleResize() {
    window.clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(() => this.resize(), 100);
  }

  resize() {
    if (!this.parent || !this.canvas || !this.ctx) return;
    const rect = this.parent.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    this.canvas.width = Math.round(width * this.dpr);
    this.canvas.height = Math.round(height * this.dpr);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.size = {
      w: width,
      h: height,
      offsetX: rect.left + window.scrollX,
      offsetY: rect.top + window.scrollY,
    };
    this.buildDots(width, height);
  }

  buildDots(width, height) {
    const step = this.dotRadius + this.dotSpacing;
    const cols = Math.floor(width / step);
    const rows = Math.floor(height / step);
    const padX = (width % step) / 2;
    const padY = (height % step) / 2;
    const dots = new Array(rows * cols);
    let index = 0;

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const ax = padX + col * step + step / 2;
        const ay = padY + row * step + step / 2;
        dots[index] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
        index += 1;
      }
    }

    this.dots = dots;
  }

  updateMouseSpeed() {
    const dx = this.mouse.prevX - this.mouse.x;
    const dy = this.mouse.prevY - this.mouse.y;
    const dist = Math.hypot(dx, dy);
    this.mouse.speed += (dist - this.mouse.speed) * 0.5;
    if (this.mouse.speed < 0.001) {
      this.mouse.speed = 0;
    }
    this.mouse.prevX = this.mouse.x;
    this.mouse.prevY = this.mouse.y;
  }

  render(now) {
    if (!this.parent || this.parent.hidden || !this.ctx) return;
    const ctx = this.ctx;
    const { w, h } = this.size;
    if (!w || !h) return;

    this.frameCount += 1;
    const t = this.frameCount * 0.02;
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, this.gradientFrom);
    grad.addColorStop(1, this.gradientTo);

    const targetEngagement = Math.min(this.mouse.speed / 5, 1);
    this.engagement += (targetEngagement - this.engagement) * 0.06;
    if (this.engagement < 0.001) {
      this.engagement = 0;
    }

    this.glowOpacity += (this.engagement - this.glowOpacity) * 0.08;
    if (this.glow) {
      this.glow.setAttribute("cx", String(this.mouse.x));
      this.glow.setAttribute("cy", String(this.mouse.y));
      this.glow.style.opacity = String(this.glowOpacity * 0.42);
    }

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = grad;
    ctx.globalAlpha = 0.74;
    ctx.beginPath();

    const cursorRadiusSq = this.cursorRadius * this.cursorRadius;
    const baseRadius = this.dotRadius / 2;

    for (let i = 0; i < this.dots.length; i += 1) {
      const dot = this.dots[i];
      const dx = this.mouse.x - dot.ax;
      const dy = this.mouse.y - dot.ay;
      const distSq = dx * dx + dy * dy;

      if (distSq < cursorRadiusSq && this.engagement > 0.01) {
        const dist = Math.sqrt(distSq) || 0.001;
        if (this.bulgeOnly) {
          const power = 1 - dist / this.cursorRadius;
          const push = power * power * this.bulgeStrength * this.engagement;
          const angle = Math.atan2(dy, dx);
          dot.sx += (dot.ax - Math.cos(angle) * push - dot.sx) * 0.15;
          dot.sy += (dot.ay - Math.sin(angle) * push - dot.sy) * 0.15;
        } else {
          const angle = Math.atan2(dy, dx);
          const move = (500 / dist) * (this.mouse.speed * this.cursorForce);
          dot.vx += Math.cos(angle) * -move;
          dot.vy += Math.sin(angle) * -move;
        }
      } else if (this.bulgeOnly) {
        dot.sx += (dot.ax - dot.sx) * 0.1;
        dot.sy += (dot.ay - dot.sy) * 0.1;
      }

      if (!this.bulgeOnly) {
        dot.vx *= 0.9;
        dot.vy *= 0.9;
        dot.x = dot.ax + dot.vx;
        dot.y = dot.ay + dot.vy;
        dot.sx += (dot.x - dot.sx) * 0.1;
        dot.sy += (dot.y - dot.sy) * 0.1;
      }

      let drawX = dot.sx;
      let drawY = dot.sy;

      if (this.waveAmplitude > 0) {
        drawY += Math.sin(dot.ax * 0.03 + t) * this.waveAmplitude;
        drawX += Math.cos(dot.ay * 0.03 + t * 0.7) * this.waveAmplitude * 0.5;
      }

      if (this.sparkle) {
        const hash = ((i * 2654435761) ^ (this.frameCount >> 5)) >>> 0;
        if (hash % 100 < 3) {
          ctx.moveTo(drawX + baseRadius * 1.8, drawY);
          ctx.arc(drawX, drawY, baseRadius * 1.8, 0, Math.PI * 2);
          continue;
        }
      }

      ctx.moveTo(drawX + baseRadius, drawY);
      ctx.arc(drawX, drawY, baseRadius, 0, Math.PI * 2);
    }

    ctx.fill();
    ctx.globalAlpha = 1;
  }

  destroy() {
    window.clearInterval(this.speedInterval);
    window.clearTimeout(this.resizeTimer);
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("resize", this.handleResize);
  }
}

class HeroSubtitleTextType {
  constructor(container, options = {}) {
    this.container = container;
    this.textNode = container?.querySelector(".hero-minimal-subtitle-text") || null;
    this.cursorNode = container?.querySelector(".hero-minimal-subtitle-cursor") || null;
    this.texts = options.texts || [];
    this.typingSpeed = options.typingSpeed ?? 42;
    this.deletingSpeed = options.deletingSpeed ?? 24;
    this.pauseDuration = options.pauseDuration ?? 1500;
    this.initialDelay = options.initialDelay ?? 250;
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.displayedText = "";
    this.isDeleting = false;
    this.timer = null;

    if (!this.container || !this.textNode || this.texts.length === 0) return;
    this.start();
  }

  setTexts(texts) {
    this.texts = Array.isArray(texts) ? texts.filter(Boolean) : [];
    this.reset();
    if (this.texts.length > 0) {
      this.start();
    }
  }

  reset() {
    window.clearTimeout(this.timer);
    this.timer = null;
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.displayedText = "";
    this.isDeleting = false;
    if (this.textNode) {
      this.textNode.textContent = "";
    }
  }

  start() {
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => this.tick(), this.initialDelay);
  }

  tick() {
    if (!this.textNode || this.texts.length === 0) return;

    const currentText = this.texts[this.currentTextIndex] || "";

    if (this.isDeleting) {
      if (this.displayedText.length > 0) {
        this.displayedText = this.displayedText.slice(0, -1);
        this.textNode.textContent = this.displayedText;
        this.timer = window.setTimeout(() => this.tick(), this.deletingSpeed);
        return;
      }

      this.isDeleting = false;
      this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
      this.currentCharIndex = 0;
      this.timer = window.setTimeout(() => this.tick(), 220);
      return;
    }

    if (this.currentCharIndex < currentText.length) {
      this.displayedText += currentText[this.currentCharIndex];
      this.currentCharIndex += 1;
      this.textNode.textContent = this.displayedText;
      this.timer = window.setTimeout(() => this.tick(), this.typingSpeed);
      return;
    }

    this.timer = window.setTimeout(() => {
      this.isDeleting = true;
      this.tick();
    }, this.pauseDuration);
  }
}

class HeroTrueFocus {
  constructor(container, options = {}) {
    this.container = container;
    this.words = [...container.querySelectorAll(".hero-focus-chip")];
    this.frame = container.querySelector(".hero-focus-frame");
    this.currentIndex = options.initialIndex ?? 1;
    this.lastActiveIndex = this.currentIndex;
    this.animationDuration = options.animationDuration ?? 2;
    this.handleResize = this.handleResize.bind(this);

    if (!this.container || !this.words.length || !this.frame) return;

    this.container.style.setProperty("--focus-animation-duration", `${this.animationDuration}s`);
    this.words.forEach((word, index) => {
      word.addEventListener("pointerenter", () => this.setActive(index));
      word.addEventListener("mouseenter", () => this.setActive(index));
      word.addEventListener("focus", () => this.setActive(index));
    });

    window.addEventListener("resize", this.handleResize);
    this.setActive(this.currentIndex, false);
  }

  setActive(index, animate = true) {
    this.currentIndex = index;
    this.lastActiveIndex = index;
    this.words.forEach((word, wordIndex) => {
      word.classList.toggle("is-active", wordIndex === index);
    });

    const activeWord = this.words[index];
    if (!activeWord) return;

    const parentRect = this.container.getBoundingClientRect();
    const activeRect = activeWord.getBoundingClientRect();
    const x = activeRect.left - parentRect.left;
    const y = activeRect.top - parentRect.top;
    const width = activeRect.width;
    const height = activeRect.height;

    if (!animate) {
      const previous = this.frame.style.transition;
      this.frame.style.transition = "none";
      this.frame.style.transform = `translate(${x}px, ${y}px)`;
      this.frame.style.width = `${width}px`;
      this.frame.style.height = `${height}px`;
      this.frame.style.opacity = "1";
      void this.frame.offsetHeight;
      this.frame.style.transition = previous || "";
      return;
    }

    this.frame.style.transform = `translate(${x}px, ${y}px)`;
    this.frame.style.width = `${width}px`;
    this.frame.style.height = `${height}px`;
    this.frame.style.opacity = "1";
  }

  handleResize() {
    this.setActive(this.currentIndex, false);
  }
}

class ExpertiseSectionController {
  constructor(section) {
    this.section = section;
    this.cards = [...section.querySelectorAll("[data-expertise-card]")];
    this.methodItems = [...section.querySelectorAll(".expertise-method-item")];
    this.railDots = [...section.querySelectorAll(".expertise-method-rail span")];
    this.observer = null;
    this.sectionObserver = null;
    this.activeIndex = -1;
    this.ticking = false;
    this.loopTimer = null;
    this.loopIndex = 0;
    this.isLooping = false;
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);

    if (!this.section || !this.cards.length) return;

    this.initObserver();
    this.initSectionObserver();
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    window.addEventListener("resize", this.handleResize);
    this.updateActiveCard();
  }

  initObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    this.cards.forEach((card) => this.observer.observe(card));
  }

  initSectionObserver() {
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target !== this.section) return;

          if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
            this.startLoop();
          } else {
            this.stopLoop();
            this.updateActiveCard();
          }
        });
      },
      {
        threshold: [0.15, 0.45, 0.7],
      }
    );

    this.sectionObserver.observe(this.section);
  }

  handleScroll() {
    if (this.ticking) return;
    this.ticking = true;
    window.requestAnimationFrame(() => {
      if (!this.isLooping) {
        this.updateActiveCard();
      }
      this.ticking = false;
    });
  }

  handleResize() {
    this.updateActiveCard();
  }

  updateActiveCard() {
    if (!this.cards.length) return;

    const viewportCenter = window.innerHeight * 0.52;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    this.cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const distance = Math.abs(cardCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    this.setActive(closestIndex);
  }

  startLoop() {
    if (this.isLooping || this.cards.length < 2) return;
    this.isLooping = true;
    this.loopIndex = this.activeIndex >= 0 ? this.activeIndex : 0;
    this.setActive(this.loopIndex);
    this.loopTimer = window.setInterval(() => {
      this.loopIndex = (this.loopIndex + 1) % this.cards.length;
      this.setActive(this.loopIndex);
    }, 2400);
  }

  stopLoop() {
    this.isLooping = false;
    window.clearInterval(this.loopTimer);
    this.loopTimer = null;
  }

  setActive(index) {
    if (index === this.activeIndex) return;

    this.activeIndex = index;
    this.section.style.setProperty("--expertise-active-index", String(index));

    this.cards.forEach((card, cardIndex) => {
      card.classList.toggle("is-active", cardIndex === index);
    });

    this.methodItems.forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex === index);
    });

    this.railDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });
  }
}

class WorkCarouselController {
  constructor(container) {
    this.container = container;
    this.slides = [...container.querySelectorAll("[data-work-slide]")];
    this.dots = [...document.querySelectorAll("[data-work-dot]")];
    this.nextButton = container.querySelector("[data-work-next]");
    this.activeIndex = this.slides.findIndex((slide) => slide.classList.contains("is-active"));
    this.intervalMs = 5600;
    this.timer = null;
    this.paused = false;

    if (!this.container || this.slides.length === 0) return;
    if (this.activeIndex < 0) this.activeIndex = 0;

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.setActive(index);
        this.restart();
      });
    });

    if (this.nextButton) {
      this.nextButton.addEventListener("click", () => {
        this.setActive((this.activeIndex + 1) % this.slides.length);
        this.restart();
      });
    }

    this.container.addEventListener("mouseenter", this.handleMouseEnter);
    this.container.addEventListener("mouseleave", this.handleMouseLeave);

    this.setActive(this.activeIndex, false);
    this.start();
  }

  handleMouseEnter() {
    this.paused = true;
    window.clearInterval(this.timer);
  }

  handleMouseLeave() {
    this.paused = false;
    this.start();
  }

  start() {
    window.clearInterval(this.timer);
    if (this.paused || this.slides.length < 2) return;
    this.timer = window.setInterval(() => {
      this.setActive((this.activeIndex + 1) % this.slides.length);
    }, this.intervalMs);
  }

  restart() {
    this.start();
  }

  setActive(index, animate = true) {
    this.activeIndex = index;

    this.slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
      slide.dataset.state = slideIndex === index ? "active" : "inactive";
      if (!animate) {
        slide.style.transition = "none";
        window.requestAnimationFrame(() => {
          slide.style.transition = "";
        });
      }
    });

    this.dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
      dot.setAttribute("aria-pressed", dotIndex === index ? "true" : "false");
    });
  }
}

class HomeRevealController {
  constructor(nodes) {
    this.nodes = nodes;
    if (!this.nodes.length) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    this.nodes.forEach((node) => this.observer.observe(node));
  }
}

class SkillsPreviewController {
  constructor(panel, image) {
    this.panel = panel;
    this.image = image;
    this.items = [...document.querySelectorAll("[data-skill-item]")];
    this.pointer = { x: 0, y: 0 };
    this.raf = null;

    if (!this.panel || !this.image || !this.items.length) return;

    this.handleMove = this.handleMove.bind(this);
    this.updatePosition = this.updatePosition.bind(this);

    this.items.forEach((item, index) => {
      item.addEventListener("mouseenter", () => this.setActive(item, index));
      item.addEventListener("focusin", () => this.setActive(item, index));
      item.addEventListener("mousemove", this.handleMove);
    });

    this.setActive(this.items[0], 0);
  }

  setActive(item, index) {
    const nextImage = item.dataset.previewImage;
    if (nextImage) {
      this.image.src = nextImage;
    }

    this.items.forEach((node, nodeIndex) => {
      node.classList.toggle("is-active", nodeIndex === index);
    });
  }

  handleMove(event) {
    const section = event.currentTarget.closest(".skills-section");
    if (!section) return;
    const rect = section.getBoundingClientRect();
    this.pointer.x = event.clientX - rect.left;
    this.pointer.y = event.clientY - rect.top;
    if (!this.raf) {
      this.raf = window.requestAnimationFrame(this.updatePosition);
    }
  }

  updatePosition() {
    this.raf = null;
    this.panel.style.transform = `translate(${this.pointer.x}px, ${this.pointer.y}px)`;
  }
}

class WorkMarqueeController {
  constructor(section) {
    this.section = section;
    this.viewport = section?.querySelector(".work-marquee-viewport");
    this.track = section?.querySelector(".work-marquee-track");
    this.groups = this.track ? [...this.track.querySelectorAll(".work-marquee-group")] : [];
    this.templateHTML = "";
    this.resizeTimer = null;
    this.handleResize = this.handleResize.bind(this);

    if (!this.section || !this.viewport || !this.track || this.groups.length < 2) return;

    const firstItem = this.groups[0].querySelector(".work-marquee-item");
    if (!firstItem) return;

    this.templateHTML = firstItem.outerHTML;
    this.rebuild();
    window.addEventListener("resize", this.handleResize, { passive: true });

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => this.rebuild());
    }
  }

  handleResize() {
    window.clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(() => this.rebuild(), 80);
  }

  rebuild() {
    const viewportWidth = this.viewport.clientWidth;
    if (!viewportWidth || !this.templateHTML) return;

    const sourceGroup = this.groups[0];
    const cloneGroup = this.groups[1];

    sourceGroup.innerHTML = this.templateHTML;
    cloneGroup.innerHTML = this.templateHTML;

    let safety = 0;
    const minimumGroupWidth = viewportWidth * 1.6;

    while (sourceGroup.scrollWidth < minimumGroupWidth && safety < 60) {
      sourceGroup.insertAdjacentHTML("beforeend", this.templateHTML);
      safety += 1;
    }

    cloneGroup.innerHTML = sourceGroup.innerHTML;
  }
}

const initializeDotFields = () => {
  if (dotFieldsInitialized) return;
  dotFieldsInitialized = true;

  for (const element of dotFieldElements) {
    dotFieldInstances.push(new DotFieldBackground(element));
  }

  const animate = (now) => {
    for (const instance of dotFieldInstances) {
      instance.render(now);
    }
    window.requestAnimationFrame(animate);
  };

  window.requestAnimationFrame(animate);
};

langToggle?.addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "zh" : "en";
  localStorage.setItem("site-language", currentLanguage);
  applyLanguage();
  heroSubtitleTextType?.setTexts(getHeroSubtitleLines());
  renderView();
});

homeScrollButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = button.dataset.scrollHome;
    if (!targetId) return;

    if (getCurrentView() === "home") {
      scrollToHomeTarget(targetId);
      return;
    }

    pendingHomeScrollTarget = targetId;
    window.location.hash = "#home";
  });
});

window.addEventListener("hashchange", renderView);
window.addEventListener("load", () => {
  applyLanguage();
  renderView();

  if (heroSection && heroAuroraSurface && heroSection.classList.contains("hero-water-minimal")) {
    new HeroAuroraSurface(heroAuroraSurface, {
      colorStops: ["#4CA6EC", "#abe4ff", "#2E63FF"],
      blend: 0.51,
      amplitude: 1.0,
      speed: 0.6,
    });
  }
  if (heroSection && heroTitleText && !heroSection.classList.contains("hero-water-minimal")) {
    new HeroScene(heroSection, heroTitleText);
  }
  if (heroSubtitle) {
    heroSubtitleTextType = new HeroSubtitleTextType(heroSubtitle, {
      texts: getHeroSubtitleLines(),
      typingSpeed: 42,
      deletingSpeed: 24,
      pauseDuration: 1500,
      initialDelay: 250,
    });
  }
  if (heroFocusRow) {
    new HeroTrueFocus(heroFocusRow, {
      initialIndex: 1,
      animationDuration: 0.8,
    });
  }
  if (expertiseSection) {
    new ExpertiseSectionController(expertiseSection);
  }
  if (workMarqueeTransition) {
    new WorkMarqueeController(workMarqueeTransition);
  }
  if (workCarousel) {
    new WorkCarouselController(workCarousel);
  }
  if (connectRevealNodes.length) {
    new HomeRevealController(connectRevealNodes);
  }
  if (skillPreviewPanel && skillPreviewImage) {
    new SkillsPreviewController(skillPreviewPanel, skillPreviewImage);
  }
  initializeDotFields();
});
