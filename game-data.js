// ============================================
// 《巧言令色》游戏数据
// 修改这个文件来改变故事内容
// ============================================

const GAME_CONFIG = {
  title: "巧言令色",
  subtitle: "How to Lie Without Lying",
  intro: [
    "人很少直接说谎。",
    "真正高明的方式，是先说服自己。",
    "只要你相信了，别人迟早也会相信。",
    "或者至少——",
    "他们会假装相信。",
    "",
    "欢迎来到：",
    "《巧言令色》。"
  ]
};

// ============================================
// 角色定义
// ============================================

const CHARACTERS = {
  player: {
    name: "你",
    title: "项目经理",
    color: "#e8e6e3"
  },
  boss: {
    name: "王总",
    title: "部门总监",
    color: "#c9a86c"
  },
  subordinate: {
    name: "小林",
    title: "你的下属",
    color: "#7eb8da"
  },
  colleague: {
    name: "陈静",
    title: "产品经理",
    color: "#d4a5c9"
  },
  hr: {
    name: "老张",
    title: "HR经理",
    color: "#a8c9a8"
  },
  narrator: {
    name: "",
    title: "旁白",
    color: "#666666"
  }
};

// ============================================
// 数值系统
// ============================================

const STATS = {
  narrativeStability: {
    name: "叙事稳定度",
    description: "你的心理状态",
    stages: ["稳定", "动摇", "不安", "崩溃"]
  },
  selfDeception: {
    name: "自我欺骗",
    description: "你相信了自己的版本",
    max: 100
  },
  trust: {
    name: "他人信任",
    description: "别人对你的信任",
    max: 100
  },
  realityPressure: {
    name: "现实矛盾",
    description: "与客观事实的冲突",
    max: 100
  }
};

// ============================================
// 游戏场景
// ============================================

const SCENES = {
  // ═══════════════════════════════════════════
  // 序章
  // ═══════════════════════════════════════════

  intro: {
    id: "intro",
    type: "narration",
    content: [
      "三个月前，公司启动了「北极星项目」。你是项目负责人。",
      "这是你升职后的第一个大项目。",
      "",
      "现在，项目失败了。",
      "预算超支，上线延期，最终产品出现重大bug，导致客户损失。",
      "",
      "今天，王总要找你谈话。",
      "",
      "你知道一件事：",
      "那个bug，小林早在两周前就报告给了你。",
      "你没有优先处理。",
      "然后你——",
      "",
      "......忘了。",
      "",
      "现在，你要决定：",
      "如何解释这一切。"
    ],
    choices: [
      { text: "推门进去", nextScene: "d1_boss_office_enter" }
    ]
  },

  // ═══════════════════════════════════════════
  // 第一天：构建
  // ═══════════════════════════════════════════

  // ----------------------------------------
  // 1.1 王总办公室
  // ----------------------------------------
  d1_boss_office_enter: {
    id: "d1_boss_office_enter",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "narrator", text: "王总办公室的门很厚。你敲了两下。" },
      { speaker: "boss", text: "进来。" },
      { speaker: "narrator", text: "王总正在看窗外。他没回头。" },
      { speaker: "boss", text: "坐。" },
      { speaker: "narrator", text: "你坐下。桌上没有水，没有茶。只有一份文件夹。" },
      { speaker: "boss", text: "北极星项目的事，我听说了。" },
      { speaker: "boss", text: "客户很生气。董事会也在问。" },
      { speaker: "boss", text: "......" },
      { speaker: "boss", text: "我想听听你的说法。" }
    ],
    choices: [
      {
        text: "\"我来解释一下整个情况。\"",
        hint: "主动定义框架",
        effects: { trust: 5, selfDeception: 5, realityPressure: 0 },
        nextScene: "d1_boss_explain"
      },
      {
        text: "\"王总，您想问什么，直接问吧。\"",
        hint: "被动等待",
        effects: { trust: 0, selfDeception: 0, realityPressure: 5 },
        nextScene: "d1_boss_defensive"
      },
      {
        text: "\"在谈责任之前，我们先聊聊怎么补救。\"",
        hint: "转移焦点",
        effects: { trust: 10, selfDeception: 10, realityPressure: 0 },
        nextScene: "d1_boss_redirect"
      }
    ]
  },

  d1_boss_explain: {
    id: "d1_boss_explain",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "narrator", text: "你选择主动出击。先开口的人，拥有叙事的主动权——至少你这么相信。" },
      { speaker: "player", text: "我来解释一下整个情况。" },
      { speaker: "boss", text: "嗯。" },
      { speaker: "narrator", text: "王总终于转过身，看着你。" }
    ],
    choices: [
      {
        text: "\"这个项目从一开始就存在结构性问题。\"",
        hint: "系统归因",
        effects: { trust: 0, selfDeception: 10, realityPressure: 10 },
        nextScene: "d1_boss_systemic"
      },
      {
        text: "\"我最后才知道这件事的严重性。\"",
        hint: "时间线解释",
        effects: { trust: 5, selfDeception: 15, realityPressure: 20 },
        nextScene: "d1_boss_timeline"
      },
      {
        text: "\"这是一个团队的失败，不是个人的。\"",
        hint: "分散责任",
        effects: { trust: -5, selfDeception: 10, realityPressure: 5 },
        nextScene: "d1_boss_team"
      }
    ]
  },

  d1_boss_defensive: {
    id: "d1_boss_defensive",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "player", text: "王总，您想问什么，直接问吧。" },
      { speaker: "narrator", text: "王总挑了挑眉毛。" },
      { speaker: "boss", text: "好。那我直说了。" },
      { speaker: "boss", text: "bug出现之前，有人知道吗？" },
      { speaker: "narrator", text: "你的心跳快了一拍。" }
    ],
    choices: [
      {
        text: "\"......我不清楚。\"",
        hint: "装作不知道",
        effects: { trust: -10, selfDeception: 20, realityPressure: 25 },
        nextScene: "d1_boss_lie"
      },
      {
        text: "\"小林负责那个模块，你应该问他。\"",
        hint: "指向他人",
        effects: { trust: -15, selfDeception: 25, realityPressure: 15 },
        nextScene: "d1_boss_blame"
      },
      {
        text: "\"......有人报告过。但我没有意识到严重性。\"",
        hint: "部分承认",
        effects: { trust: 10, selfDeception: -5, realityPressure: 5 },
        nextScene: "d1_boss_partial"
      }
    ]
  },

  d1_boss_redirect: {
    id: "d1_boss_redirect",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "player", text: "在谈责任之前，我们先聊聊怎么补救。" },
      { speaker: "boss", text: "......" },
      { speaker: "narrator", text: "王总盯着你看了三秒。" },
      { speaker: "boss", text: "你倒是挺冷静的。" },
      { speaker: "boss", text: "行，先说补救。" }
    ],
    choices: [
      {
        text: "\"我已经准备了一个初步方案。\"",
        hint: "展示行动力",
        effects: { trust: 15, selfDeception: 5, realityPressure: 0 },
        nextScene: "d1_boss_solution"
      },
      {
        text: "\"我需要一点时间整理思路。\"",
        hint: "拖延战术",
        effects: { trust: 5, selfDeception: 10, realityPressure: 5 },
        nextScene: "d1_boss_delay"
      }
    ]
  },

  // 分支：系统归因
  d1_boss_systemic: {
    id: "d1_boss_systemic",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "player", text: "这个项目从一开始就存在结构性问题。" },
      { speaker: "player", text: "预算、时间线、跨部门协作......每一个环节都在积累风险。" },
      { speaker: "boss", text: "所以呢？" },
      { speaker: "boss", text: "你的意思是，这是公司的错，不是你的错？" },
      { speaker: "narrator", text: "王总的语气里带着一丝讽刺。" }
    ],
    choices: [
      {
        text: "\"我不是这个意思。我只是想说明背景。\"",
        effects: { trust: 0, selfDeception: 5, realityPressure: 5 },
        nextScene: "d1_boss_systemic_2"
      },
      {
        text: "\"......好吧，我承认这个解释有问题。\"",
        effects: { trust: 5, selfDeception: -10, realityPressure: 0 },
        nextScene: "d1_boss_admit"
      }
    ]
  },

  d1_boss_systemic_2: {
    id: "d1_boss_systemic_2",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "player", text: "我不是这个意思。我只是想说明背景。" },
      { speaker: "boss", text: "背景我都知道。" },
      { speaker: "boss", text: "我问的是——你知道那个bug的事吗？" },
      { speaker: "narrator", text: "来了。" }
    ],
    choices: [
      { text: "......", nextScene: "d1_boss_bug_question" }
    ]
  },

  // 分支：时间线解释
  d1_boss_timeline: {
    id: "d1_boss_timeline",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "player", text: "我最后才知道这件事的严重性。" },
      { speaker: "player", text: "项目进行期间，信息传递有很多环节......" },
      { speaker: "boss", text: "但你是项目经理。" },
      { speaker: "boss", text: "项目的任何问题，不应该第一时间到你这里吗？" },
      { speaker: "narrator", text: "你说不出话。" }
    ],
    choices: [
      {
        text: "\"我每天收到的信息太多了，不可能每条都仔细处理。\"",
        hint: "信息过载辩护",
        effects: { trust: -10, selfDeception: 15, realityPressure: 25 },
        nextScene: "d1_boss_overload"
      },
      {
        text: "\"......你说得对。我确实应该知道。\"",
        hint: "承认失职",
        effects: { trust: 10, selfDeception: -15, realityPressure: 5 },
        nextScene: "d1_boss_admit"
      }
    ]
  },

  d1_boss_overload: {
    id: "d1_boss_overload",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "player", text: "我每天收到的信息太多了，不可能每条都仔细处理。" },
      { speaker: "boss", text: "所以你就让重要的信息漏掉？" },
      { speaker: "boss", text: "小林说他给你发过邮件。两次。标题里有「紧急」。" },
      { speaker: "narrator", text: "你的后背开始发烫。" }
    ],
    choices: [
      { text: "......", nextScene: "d1_boss_bug_question" }
    ]
  },

  // 分支：分散责任
  d1_boss_team: {
    id: "d1_boss_team",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "player", text: "这是一个团队的失败，不是个人的。" },
      { speaker: "boss", text: "团队的失败。" },
      { speaker: "boss", text: "那我问你——你是团队负责人吗？" },
      { speaker: "player", text: "......是。" },
      { speaker: "boss", text: "那团队的失败，是谁的责任？" },
      { speaker: "narrator", text: "你意识到自己走进了一个逻辑陷阱。" }
    ],
    choices: [
      {
        text: "\"我明白您的意思。我会承担责任。\"",
        effects: { trust: 5, selfDeception: -10, realityPressure: 0 },
        nextScene: "d1_boss_admit"
      },
      {
        text: "\"但团队里其他人的问题，不应该由我一个人来承担。\"",
        effects: { trust: -5, selfDeception: 15, realityPressure: 10 },
        nextScene: "d1_boss_bug_question"
      }
    ]
  },

  // 分支：撒谎
  d1_boss_lie: {
    id: "d1_boss_lie",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "player", text: "......我不清楚。" },
      { speaker: "narrator", text: "你撒谎了。" },
      { speaker: "narrator", text: "或者说，你选择性地不记得了。" },
      { speaker: "boss", text: "你不清楚？" },
      { speaker: "boss", text: "小林说你收到了他的邮件。他有发送记录。" },
      { speaker: "narrator", text: "你的手心开始出汗。" }
    ],
    choices: [
      {
        text: "\"邮件？什么邮件？\"",
        hint: "继续装傻",
        effects: { trust: -20, selfDeception: 30, realityPressure: 35 },
        nextScene: "d1_boss_double_down"
      },
      {
        text: "\"......我可能漏看了。\"",
        hint: "部分承认",
        effects: { trust: 5, selfDeception: -5, realityPressure: 10 },
        nextScene: "d1_boss_bug_question"
      }
    ]
  },

  d1_boss_double_down: {
    id: "d1_boss_double_down",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "player", text: "邮件？什么邮件？" },
      { speaker: "narrator", text: "你看着王总的眼睛，努力让自己的表情保持平静。" },
      { speaker: "boss", text: "......" },
      { speaker: "boss", text: "你确定？" },
      { speaker: "narrator", text: "王总没有追问。但他的眼神变了。" },
      { speaker: "narrator", text: "那是一种失望的眼神。或者——是审视。" }
    ],
    choices: [
      { text: "......", nextScene: "d1_boss_end" }
    ]
  },

  // 分支：指向他人
  d1_boss_blame: {
    id: "d1_boss_blame",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "player", text: "小林负责那个模块，你应该问他。" },
      { speaker: "boss", text: "小林是你的下属。" },
      { speaker: "boss", text: "你是在说，问题出在你的团队管理上？" },
      { speaker: "narrator", text: "你意识到自己说错了话。" }
    ],
    choices: [
      {
        text: "\"我没有推卸责任的意思。\"",
        effects: { trust: -5, selfDeception: 20, realityPressure: 15 },
        nextScene: "d1_boss_bug_question"
      },
      {
        text: "\"......我只是想说明事实。\"",
        effects: { trust: -10, selfDeception: 25, realityPressure: 10 },
        nextScene: "d1_boss_bug_question"
      }
    ]
  },

  // 分支：部分承认
  d1_boss_partial: {
    id: "d1_boss_partial",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "player", text: "......有人报告过。但我没有意识到严重性。" },
      { speaker: "boss", text: "谁报告的？" },
      { speaker: "narrator", text: "你知道王总已经知道答案。他在等你亲口说出来。" }
    ],
    choices: [
      {
        text: "\"小林。\"",
        effects: { trust: 5, selfDeception: -5, realityPressure: 5 },
        nextScene: "d1_boss_bug_question"
      }
    ]
  },

  // 展示方案
  d1_boss_solution: {
    id: "d1_boss_solution",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "player", text: "我已经准备了一个初步方案。" },
      { speaker: "narrator", text: "你从包里拿出一份文件。" },
      { speaker: "narrator", text: "王总翻了几页，点了点头。" },
      { speaker: "boss", text: "方案还可以。但责任的事，我不会就这么算了。" },
      { speaker: "boss", text: "董事会需要一个交代。" }
    ],
    choices: [
      { text: "......", nextScene: "d1_boss_bug_question" }
    ]
  },

  // 拖延
  d1_boss_delay: {
    id: "d1_boss_delay",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "player", text: "我需要一点时间整理思路。" },
      { speaker: "boss", text: "行。明天给我方案。" },
      { speaker: "boss", text: "但今天的问题，我还会再问的。" },
      { speaker: "boss", text: "你现在可以走了。" }
    ],
    choices: [
      { text: "离开办公室", nextScene: "d1_hallway" }
    ]
  },

  // 承认
  d1_boss_admit: {
    id: "d1_boss_admit",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "narrator", text: "你深吸一口气。" },
      { speaker: "player", text: "......我明白您的意思。" },
      { speaker: "player", text: "我是项目负责人。出了问题，我难辞其咎。" },
      { speaker: "boss", text: "......" },
      { speaker: "boss", text: "你能这么说，很好。" },
      { speaker: "boss", text: "但光是认错，解决不了问题。" },
      { speaker: "boss", text: "明天给我一个补救方案。" },
      { speaker: "boss", text: "另外——那两封邮件的事，你打算怎么处理？" }
    ],
    choices: [
      { text: "......", nextScene: "d1_boss_bug_question" }
    ]
  },

  // 关键追问：邮件
  d1_boss_bug_question: {
    id: "d1_boss_bug_question",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "boss", text: "小林说他给你发过两封邮件。关于bug的。" },
      { speaker: "boss", text: "你看到了吗？" },
      { speaker: "narrator", text: "这是最关键的问题。" },
      { speaker: "narrator", text: "你确实看到了。你确实没有回复。你确实忘了。" },
      { speaker: "narrator", text: "但现在，你有最后一次机会——决定如何解释这一切。" }
    ],
    choices: [
      {
        text: "\"我看到了。我没有处理。这是我的责任。\"",
        hint: "完全诚实",
        effects: { trust: 20, selfDeception: -30, realityPressure: -15 },
        flag: "honest_path",
        nextScene: "d1_boss_honest"
      },
      {
        text: "\"我可能漏看了。我不记得有这两封邮件。\"",
        hint: "选择性遗忘",
        effects: { trust: -5, selfDeception: 20, realityPressure: 20 },
        flag: "deny_path",
        nextScene: "d1_boss_deny"
      },
      {
        text: "\"邮件......有。但那不是问题的核心。\"",
        hint: "淡化重要性",
        effects: { trust: 0, selfDeception: 15, realityPressure: 10 },
        flag: "minimize_path",
        nextScene: "d1_boss_minimize"
      },
      {
        text: "\"这件事，我们可以私下聊吗？\"",
        hint: "请求保密",
        effects: { trust: -10, selfDeception: 10, realityPressure: 15 },
        flag: "secret_path",
        nextScene: "d1_boss_secret"
      }
    ]
  },

  // 完全诚实
  d1_boss_honest: {
    id: "d1_boss_honest",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "player", text: "我看到了。我没有处理。这是我的责任。" },
      { speaker: "narrator", text: "房间里安静了几秒。" },
      { speaker: "boss", text: "......" },
      { speaker: "boss", text: "你知道吗，你是我见过的少数敢直接承认的人。" },
      { speaker: "boss", text: "这件事我会处理的。但你的态度，我记住了。" },
      { speaker: "boss", text: "先回去吧。明天给我补救方案。" }
    ],
    choices: [
      { text: "离开办公室", nextScene: "d1_hallway_honest" }
    ]
  },

  // 否认
  d1_boss_deny: {
    id: "d1_boss_deny",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "player", text: "我可能漏看了。我不记得有这两封邮件。" },
      { speaker: "boss", text: "你不记得。" },
      { speaker: "boss", text: "好。" },
      { speaker: "narrator", text: "王总没有追问。但你知道，这件事没有结束。" },
      { speaker: "boss", text: "明天给我补救方案。" },
      { speaker: "boss", text: "你可以走了。" }
    ],
    choices: [
      { text: "离开办公室", nextScene: "d1_hallway" }
    ]
  },

  // 淡化
  d1_boss_minimize: {
    id: "d1_boss_minimize",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "player", text: "邮件......有。但那不是问题的核心。" },
      { speaker: "player", text: "bug的产生有很多原因，单一归因解决不了问题。" },
      { speaker: "boss", text: "你很会说话。" },
      { speaker: "boss", text: "但有时候，话说得太漂亮，反而让人起疑。" },
      { speaker: "narrator", text: "王总看了你一眼，眼神难以捉摸。" },
      { speaker: "boss", text: "明天给我方案。你可以走了。" }
    ],
    choices: [
      { text: "离开办公室", nextScene: "d1_hallway" }
    ]
  },

  // 请求保密
  d1_boss_secret: {
    id: "d1_boss_secret",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "player", text: "这件事，我们可以私下聊吗？" },
      { speaker: "boss", text: "私下？" },
      { speaker: "boss", text: "你想说什么？" },
      { speaker: "narrator", text: "王总靠在椅背上，双手交叉。" }
    ],
    choices: [
      {
        text: "\"我在想办法解决这个问题。不想让更多人卷进来。\"",
        effects: { trust: 5, selfDeception: 10, realityPressure: 5 },
        nextScene: "d1_boss_secret_2"
      },
      {
        text: "\"......算了，没什么。\"",
        effects: { trust: -10, selfDeception: 5, realityPressure: 10 },
        nextScene: "d1_boss_end" }
    ]
  },

  d1_boss_secret_2: {
    id: "d1_boss_secret_2",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "player", text: "我在想办法解决这个问题。不想让更多人卷进来。" },
      { speaker: "boss", text: "......" },
      { speaker: "boss", text: "我理解。" },
      { speaker: "boss", text: "但你要明白——董事会要的是结果，不是你的努力。" },
      { speaker: "boss", text: "明天给我方案。" }
    ],
    choices: [
      { text: "离开办公室", nextScene: "d1_hallway" }
    ]
  },

  // 办公室对话结束
  d1_boss_end: {
    id: "d1_boss_end",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "boss", text: "今天就到这里。" },
      { speaker: "boss", text: "明天给我补救方案。" },
      { speaker: "boss", text: "另外——" },
      { speaker: "boss", text: "好好想想，怎么解释那两封邮件。" },
      { speaker: "narrator", text: "王总低下头，开始看文件。谈话结束。" }
    ],
    choices: [
      { text: "离开办公室", nextScene: "d1_hallway" }
    ]
  },

  // ----------------------------------------
  // 1.2 走廊
  // ----------------------------------------
  d1_hallway: {
    id: "d1_hallway",
    type: "narration",
    location: "走廊",
    content: [
      "你走出王总办公室。",
      "走廊里没有人。",
      "",
      "你的脑子里还在回放刚才的对话。",
      "每一句话，每一个眼神，每一个停顿——",
      "",
      "你有没有说错什么？",
      "王总相信你了吗？",
      "",
      "走廊尽头，有一个人影。"
    ],
    choices: [
      { text: "走过去", nextScene: "d1_hallway_xiaolin" }
    ]
  },

  d1_hallway_honest: {
    id: "d1_hallway_honest",
    type: "narration",
    location: "走廊",
    content: [
      "你走出王总办公室。",
      "奇怪的是，你感到一种久违的轻松。",
      "",
      "至少，你不必再记住两个版本的真相了。",
      "",
      "走廊尽头，有一个人影。",
      "是小林。"
    ],
    choices: [
      { text: "走过去", nextScene: "d1_hallway_xiaolin_honest" }
    ]
  },

  d1_hallway_xiaolin: {
    id: "d1_hallway_xiaolin",
    type: "dialogue",
    location: "走廊",
    content: [
      { speaker: "narrator", text: "小林站在窗边，看着外面。他显然在等你。" },
      { speaker: "subordinate", text: "......王总找你谈话了？" },
      { speaker: "subordinate", text: "关于北极星项目的bug？" },
      { speaker: "narrator", text: "小林的眼神有些复杂。你知道，他手里的那两封邮件，是你最大的隐患。" }
    ],
    choices: [
      {
        text: "\"小林，我们聊聊。\"",
        hint: "尝试沟通",
        nextScene: "d1_xiaolin_talk"
      },
      {
        text: "\"王总问了什么，你应该能猜到。\"",
        hint: "暗示施压",
        effects: { trust: -15, selfDeception: 10, realityPressure: 5 },
        nextScene: "d1_xiaolin_tense"
      },
      {
        text: "（沉默走开）",
        hint: "回避",
        effects: { trust: -5, selfDeception: 5, realityPressure: 10 },
        nextScene: "d1_desk"
      }
    ]
  },

  d1_hallway_xiaolin_honest: {
    id: "d1_hallway_xiaolin_honest",
    type: "dialogue",
    location: "走廊",
    content: [
      { speaker: "narrator", text: "小林看着你，眼神有些意外。" },
      { speaker: "subordinate", text: "你......跟王总说了？" },
      { speaker: "subordinate", text: "关于邮件的事？" }
    ],
    choices: [
      {
        text: "\"我承认了。是我漏掉了。\"",
        effects: { trust: 15, selfDeception: -10, realityPressure: -5 },
        nextScene: "d1_xiaolin_respect"
      },
      {
        text: "\"说了。但不是重点。\"",
        effects: { trust: 0, selfDeception: 5, realityPressure: 5 },
        nextScene: "d1_xiaolin_talk"
      }
    ]
  },

  d1_xiaolin_respect: {
    id: "d1_xiaolin_respect",
    type: "dialogue",
    location: "走廊",
    content: [
      { speaker: "player", text: "我承认了。是我漏掉了。" },
      { speaker: "subordinate", text: "......" },
      { speaker: "narrator", text: "小林沉默了几秒。" },
      { speaker: "subordinate", text: "说实话......我没想过你会这么直接。" },
      { speaker: "subordinate", text: "......谢谢。" },
      { speaker: "narrator", text: "小林转身离开了。但他的眼神，从复杂变成了释然。" }
    ],
    choices: [
      { text: "回到工位", nextScene: "d1_desk" }
    ]
  },

  d1_xiaolin_talk: {
    id: "d1_xiaolin_talk",
    type: "dialogue",
    location: "走廊",
    content: [
      { speaker: "player", text: "小林，我们聊聊。" },
      { speaker: "subordinate", text: "......" },
      { speaker: "subordinate", text: "聊什么？" },
      { speaker: "subordinate", text: "聊你打算怎么跟王总解释那两封邮件？" },
      { speaker: "narrator", text: "小林的问题很直接。他在试探你的态度。" }
    ],
    choices: [
      {
        text: "\"我确实漏看了。这是我的失误。\"",
        effects: { trust: 10, selfDeception: -10, realityPressure: -5 },
        nextScene: "d1_xiaolin_understand"
      },
      {
        text: "\"那两封邮件......你确定王总已经知道了？\"",
        effects: { trust: -20, selfDeception: 20, realityPressure: 15 },
        nextScene: "d1_xiaolin_cold"
      },
      {
        text: "\"这件事，我们都有责任。\"",
        effects: { trust: -5, selfDeception: 15, realityPressure: 5 },
        nextScene: "d1_xiaolin_pushback"
      }
    ]
  },

  d1_xiaolin_understand: {
    id: "d1_xiaolin_understand",
    type: "dialogue",
    location: "走廊",
    content: [
      { speaker: "player", text: "我确实漏看了。这是我的失误。" },
      { speaker: "subordinate", text: "......" },
      { speaker: "subordinate", text: "好吧。至少你承认了。" },
      { speaker: "subordinate", text: "......说实话，我也不是想让你背锅。" },
      { speaker: "subordinate", text: "只是这件事，我不知道该怎么处理。" }
    ],
    choices: [
      {
        text: "\"我们一起来想办法。\"",
        effects: { trust: 15, selfDeception: -5, realityPressure: -5 },
        nextScene: "d1_desk"
      },
      {
        text: "\"你只需要实话实说就行。\"",
        effects: { trust: 5, selfDeception: 0, realityPressure: 0 },
        nextScene: "d1_desk"
      }
    ]
  },

  d1_xiaolin_cold: {
    id: "d1_xiaolin_cold",
    type: "dialogue",
    location: "走廊",
    content: [
      { speaker: "player", text: "那两封邮件......你确定王总已经知道了？" },
      { speaker: "subordinate", text: "......" },
      { speaker: "narrator", text: "小林的眼神从复杂变成了冷。" },
      { speaker: "subordinate", text: "你是什么意思？" },
      { speaker: "subordinate", text: "你是在暗示我......不要提这件事？" }
    ],
    choices: [
      {
        text: "\"我只是想确认一下情况。\"",
        effects: { trust: -10, selfDeception: 15, realityPressure: 10 },
        nextScene: "d1_desk"
      },
      {
        text: "\"......我没有这个意思。\"",
        effects: { trust: -5, selfDeception: 10, realityPressure: 5 },
        nextScene: "d1_desk"
      }
    ]
  },

  d1_xiaolin_pushback: {
    id: "d1_xiaolin_pushback",
    type: "dialogue",
    location: "走廊",
    content: [
      { speaker: "player", text: "这件事，我们都有责任。" },
      { speaker: "subordinate", text: "我们？" },
      { speaker: "subordinate", text: "bug是我报告的。邮件是我发的。" },
      { speaker: "subordinate", text: "你没有回复，你没有处理，你忘了——" },
      { speaker: "subordinate", text: "现在你说是「我们」的责任？" },
      { speaker: "narrator", text: "小林的声音压得很低，但你能听出他的愤怒。" }
    ],
    choices: [
      {
        text: "\"......你说得对。我不应该这么说。\"",
        effects: { trust: 5, selfDeception: -5, realityPressure: 5 },
        nextScene: "d1_desk"
      },
      {
        text: "\"我只是觉得，把所有责任推到一个人身上，解决不了问题。\"",
        effects: { trust: -10, selfDeception: 20, realityPressure: 10 },
        nextScene: "d1_desk"
      }
    ]
  },

  d1_xiaolin_tense: {
    id: "d1_xiaolin_tense",
    type: "dialogue",
    location: "走廊",
    content: [
      { speaker: "player", text: "王总问了什么，你应该能猜到。" },
      { speaker: "subordinate", text: "......" },
      { speaker: "subordinate", text: "所以呢？" },
      { speaker: "subordinate", text: "你打算把责任推给我？" },
      { speaker: "narrator", text: "气氛变得僵硬。" }
    ],
    choices: [
      {
        text: "\"我没有这个意思。\"",
        effects: { trust: -5, selfDeception: 10, realityPressure: 5 },
        nextScene: "d1_desk"
      },
      {
        text: "\"你也是项目成员。bug是你负责的模块。\"",
        effects: { trust: -20, selfDeception: 25, realityPressure: 10 },
        nextScene: "d1_desk"
      }
    ]
  },

  // ----------------------------------------
  // 1.3 工位
  // ----------------------------------------
  d1_desk: {
    id: "d1_desk",
    type: "narration",
    location: "你的工位",
    content: [
      "你回到工位。",
      "同事们都在忙自己的事，没有人注意到你。",
      "",
      "你打开电脑，盯着屏幕。",
      "邮件图标显示有3封未读邮件。",
      "",
      "你点开搜索框，输入「小林」。",
      "找到了。两封邮件。标题分别是：",
      "",
      "「北极星项目-支付模块bug报告」",
      "「【紧急】支付模块bug仍未处理，请确认」",
      "",
      "第一封是两周前发的。",
      "第二封是一周前发的。",
      "",
      "两封邮件，你都没有回复。",
      "",
      "......"
    ],
    choices: [
      { text: "继续", nextScene: "d1_desk_2" }
    ]
  },

  d1_desk_2: {
    id: "d1_desk_2",
    type: "narration",
    location: "你的工位",
    content: [
      "你盯着这两封邮件，脑子里一片混乱。",
      "",
      "王总说，明天要补救方案。",
      "但你知道，他还会再问那两封邮件的事。",
      "",
      "现在的问题是——",
      "你打算怎么面对这个事实？",
      "",
      "承认？否认？还是想办法让这件事「变得不那么重要」？",
      "",
      "......",
      "",
      "就在这时，有人拍了拍你的肩膀。"
    ],
    choices: [
      { text: "回头看", nextScene: "d1_chenjing_intro" }
    ]
  },

  // ----------------------------------------
  // 1.4 陈静登场
  // ----------------------------------------
  d1_chenjing_intro: {
    id: "d1_chenjing_intro",
    type: "dialogue",
    location: "你的工位",
    content: [
      { speaker: "narrator", text: "是陈静，产品经理。" },
      { speaker: "colleague", text: "听说王总找你谈话了？" },
      { speaker: "colleague", text: "......你还好吗？" },
      { speaker: "narrator", text: "陈静的声音很轻，像是在担心你，又像是在试探什么。" }
    ],
    choices: [
      {
        text: "\"还好。就是问了问项目的事。\"",
        hint: "轻描淡写",
        effects: { trust: 0, selfDeception: 5, realityPressure: 0 },
        nextScene: "d1_chenjing_casual"
      },
      {
        text: "\"......说实话，有点麻烦。\"",
        hint: "示弱",
        effects: { trust: 5, selfDeception: -5, realityPressure: 5 },
        nextScene: "d1_chenjing_honest"
      },
      {
        text: "\"你怎么知道王总找我？\"",
        hint: "反问",
        effects: { trust: -5, selfDeception: 5, realityPressure: 5 },
        nextScene: "d1_chenjing_suspicious"
      }
    ]
  },

  d1_chenjing_casual: {
    id: "d1_chenjing_casual",
    type: "dialogue",
    location: "你的工位",
    content: [
      { speaker: "player", text: "还好。就是问了问项目的事。" },
      { speaker: "colleague", text: "哦......" },
      { speaker: "colleague", text: "那就好。" },
      { speaker: "narrator", text: "陈静欲言又止。" },
      { speaker: "colleague", text: "对了，有件事我想跟你说一下。" },
      { speaker: "colleague", text: "关于北极星项目的需求变更记录。" }
    ],
    choices: [
      { text: "......", nextScene: "d1_chenjing_reveal" }
    ]
  },

  d1_chenjing_honest: {
    id: "d1_chenjing_honest",
    type: "dialogue",
    location: "你的工位",
    content: [
      { speaker: "player", text: "......说实话，有点麻烦。" },
      { speaker: "colleague", text: "我就知道。" },
      { speaker: "colleague", text: "其实......我有件事想告诉你。" },
      { speaker: "colleague", text: "可能会对你有帮助。" },
      { speaker: "narrator", text: "陈静看了看周围，压低声音。" },
      { speaker: "colleague", text: "关于北极星项目的需求变更。" }
    ],
    choices: [
      { text: "......", nextScene: "d1_chenjing_reveal" }
    ]
  },

  d1_chenjing_suspicious: {
    id: "d1_chenjing_suspicious",
    type: "dialogue",
    location: "你的工位",
    content: [
      { speaker: "player", text: "你怎么知道王总找我？" },
      { speaker: "colleague", text: "......" },
      { speaker: "colleague", text: "公司就这么大。什么事传得都很快。" },
      { speaker: "colleague", text: "不过......我不是来打听八卦的。" },
      { speaker: "colleague", text: "我有件事想跟你说。关于北极星项目。" }
    ],
    choices: [
      { text: "......", nextScene: "d1_chenjing_reveal" }
    ]
  },

  d1_chenjing_reveal: {
    id: "d1_chenjing_reveal",
    type: "dialogue",
    location: "你的工位",
    content: [
      { speaker: "colleague", text: "你还记得吗？项目中期，我提过几次需求变更。" },
      { speaker: "colleague", text: "其中有一次，是关于支付模块的。" },
      { speaker: "narrator", text: "你愣了一下。" },
      { speaker: "colleague", text: "当时你说时间紧，变更要排期。" },
      { speaker: "colleague", text: "然后......就没有然后了。" },
      { speaker: "narrator", text: "陈静的意思很明显——她手里也有一块拼图。" },
      { speaker: "narrator", text: "这块拼图，可能是你的救命稻草，也可能是另一个陷阱。" }
    ],
    choices: [
      {
        text: "\"你的意思是，这个bug可能和需求变更有关？\"",
        hint: "寻找替罪羊",
        effects: { trust: 0, selfDeception: 15, realityPressure: 5 },
        nextScene: "d1_chenjing_blame"
      },
      {
        text: "\"......我不太记得这件事了。\"",
        hint: "装作不知",
        effects: { trust: -5, selfDeception: 10, realityPressure: 10 },
        nextScene: "d1_chenjing_forget"
      },
      {
        text: "\"谢谢你告诉我。这件事我会考虑的。\"",
        hint: "谨慎回应",
        effects: { trust: 5, selfDeception: 0, realityPressure: 0 },
        nextScene: "d1_chenjing_end"
      }
    ]
  },

  d1_chenjing_blame: {
    id: "d1_chenjing_blame",
    type: "dialogue",
    location: "你的工位",
    content: [
      { speaker: "player", text: "你的意思是，这个bug可能和需求变更有关？" },
      { speaker: "colleague", text: "......" },
      { speaker: "colleague", text: "我不是这个意思。" },
      { speaker: "colleague", text: "我只是觉得，如果你需要一个更完整的解释......" },
      { speaker: "colleague", text: "需求变更的记录，可能有用。" },
      { speaker: "narrator", text: "陈静看了你一眼，眼神有些复杂。" },
      { speaker: "narrator", text: "她是在帮你，还是在提醒你——她手里也有筹码？" }
    ],
    choices: [
      { text: "......", nextScene: "d1_chenjing_end" }
    ]
  },

  d1_chenjing_forget: {
    id: "d1_chenjing_forget",
    type: "dialogue",
    location: "你的工位",
    content: [
      { speaker: "player", text: "......我不太记得这件事了。" },
      { speaker: "colleague", text: "不记得？" },
      { speaker: "colleague", text: "......好吧。" },
      { speaker: "colleague", text: "反正，我有邮件记录。如果你需要的话。" },
      { speaker: "narrator", text: "陈静没有追问。但你知道，她已经把牌摊开了。" }
    ],
    choices: [
      { text: "......", nextScene: "d1_chenjing_end" }
    ]
  },

  d1_chenjing_end: {
    id: "d1_chenjing_end",
    type: "dialogue",
    location: "你的工位",
    content: [
      { speaker: "colleague", text: "总之......有什么需要帮忙的，可以找我。" },
      { speaker: "narrator", text: "陈静转身离开了。" },
      { speaker: "narrator", text: "你盯着她的背影，脑子里多了几个问题。" },
      { speaker: "narrator", text: "她为什么要告诉你这些？" },
      { speaker: "narrator", text: "她是盟友，还是另一个变量？" }
    ],
    choices: [
      { text: "......", nextScene: "d1_night_home" }
    ]
  },

  // ----------------------------------------
  // 1.5 回家
  // ----------------------------------------
  d1_night_home: {
    id: "d1_night_home",
    type: "narration",
    location: "回家的路上",
    content: [
      "下班了。",
      "",
      "你走出公司大楼，天已经黑了。",
      "街上人来人往，没有人注意到你。",
      "",
      "你脑子里不断回放着今天的对话——",
      "",
      "王总的眼神。",
      "小林的沉默。",
      "陈静的提醒。",
      "",
      "每一句话，都可能是一个陷阱。",
      "每一次沉默，都可能是一个暗示。",
      "",
      "你拿出手机，看着屏幕。",
      "",
      "要不要再看一遍那两封邮件？",
      "还是......干脆删掉？"
    ],
    choices: [
      {
        text: "再看一遍邮件",
        effects: { selfDeception: -5, realityPressure: 5 },
        nextScene: "d1_night_reread"
      },
      {
        text: "不看。明天再说。",
        effects: { selfDeception: 10, realityPressure: 0 },
        nextScene: "d1_night_avoid"
      },
      {
        text: "......删掉？",
        effects: { selfDeception: 30, realityPressure: 20 },
        nextScene: "d1_night_delete"
      }
    ]
  },

  d1_night_reread: {
    id: "d1_night_reread",
    type: "narration",
    location: "回家的路上",
    content: [
      "你打开手机，又看了一遍那两封邮件。",
      "",
      "「北极星项目-支付模块bug报告」",
      "内容很详细。小林把问题、风险、建议方案都写清楚了。",
      "",
      "「【紧急】支付模块bug仍未处理，请确认」",
      "这封邮件只有一句话：",
      "\"风险很高，请尽快确认处理方案。\"",
      "",
      "......",
      "",
      "你没有回复。",
      "不是因为没看到，而是因为——",
      "那天你太忙了。",
      "",
      "或者，你只是不想面对。"
    ],
    choices: [
      { text: "......", nextScene: "d1_night_end" }
    ]
  },

  d1_night_avoid: {
    id: "d1_night_avoid",
    type: "narration",
    location: "回家的路上",
    content: [
      "你收起手机，不再想这件事。",
      "",
      "今天太累了。",
      "明天再说吧。",
      "",
      "......",
      "",
      "但你知道，问题不会自己消失。",
      "你只是在拖延。"
    ],
    choices: [
      { text: "......", nextScene: "d1_night_end" }
    ]
  },

  d1_night_delete: {
    id: "d1_night_delete",
    type: "narration",
    location: "回家的路上",
    content: [
      "你的手指悬在删除键上。",
      "",
      "......",
      "",
      "删了会怎样？",
      "小林那边还有记录。王总那边可能也有。",
      "删了，只会显得你心虚。",
      "",
      "但如果不删......",
      "",
      "你犹豫了很久。",
      "",
      "最终，你放下了手机。",
      "没有删。",
      "",
      "不是因为你不想，而是因为你不敢。"
    ],
    choices: [
      { text: "......", nextScene: "d1_night_end" }
    ]
  },

  d1_night_end: {
    id: "d1_night_end",
    type: "narration",
    location: "家",
    content: [
      "你回到家，躺在床上。",
      "",
      "窗外是城市的灯火。",
      "你闭上眼睛，脑子里一片混乱。",
      "",
      "明天，你还要面对王总。",
      "明天，你还要给出一个解释。",
      "",
      "......",
      "",
      "你想起了一句话——",
      "",
      "\"真正高明的方式，是先说服自己。\"",
      "",
      "你，相信自己的解释吗？",
      "",
      "【第一天 结束】"
    ],
    choices: [
      { text: "进入第二天", nextScene: "d2_morning" }
    ]
  },

  // ═══════════════════════════════════════════
  // 第二天：裂痕
  // ═══════════════════════════════════════════

  d2_morning: {
    id: "d2_morning",
    type: "narration",
    location: "第二天早晨",
    content: [
      "你几乎一夜没睡。",
      "",
      "早上醒来的时候，脑子里还是那些邮件、对话、眼神。",
      "",
      "今天要交补救方案。",
      "但你知道，王总还会再问那两封邮件的事。",
      "",
      "......",
      "",
      "你走进公司大门。",
      "前台的小李看了你一眼，笑容有点僵硬。",
      "",
      "看来，事情已经传出去了。"
    ],
    choices: [
      { text: "走向工位", nextScene: "d2_desk" }
    ]
  },

  d2_desk: {
    id: "d2_desk",
    type: "narration",
    location: "你的工位",
    content: [
      "你刚坐下，电脑就弹出一条消息。",
      "",
      "【HR老张：上午有空吗？聊聊。】",
      "",
      "......",
      "",
      "HR找你，不是好事。",
      "",
      "你盯着屏幕，手指悬在键盘上。",
      "怎么回复？"
    ],
    choices: [
      {
        text: "【好的，您定时间。】",
        hint: "配合",
        effects: { trust: 5, selfDeception: 0, realityPressure: 0 },
        nextScene: "d2_hr_agree"
      },
      {
        text: "【今天有点忙，改天行吗？】",
        hint: "拖延",
        effects: { trust: -5, selfDeception: 5, realityPressure: 5 },
        nextScene: "d2_hr_delay"
      },
      {
        text: "【请问是关于什么事？】",
        hint: "试探",
        effects: { trust: 0, selfDeception: 5, realityPressure: 5 },
        nextScene: "d2_hr_probe"
      }
    ]
  },

  d2_hr_agree: {
    id: "d2_hr_agree",
    type: "narration",
    location: "你的工位",
    content: [
      "你回复：【好的，您定时间。】",
      "",
      "老张很快回复：",
      "【10点，小会议室。不见不散。】",
      "",
      "......",
      "",
      "你有两个小时准备。",
      "准备什么？你不知道。"
    ],
    choices: [
      { text: "......", nextScene: "d2_before_hr" }
    ]
  },

  d2_hr_delay: {
    id: "d2_hr_delay",
    type: "narration",
    location: "你的工位",
    content: [
      "你回复：【今天有点忙，改天行吗？】",
      "",
      "老张回复：",
      "【......】",
      "【这件事比较重要。就今天吧。】",
      "",
      "......",
      "",
      "没有回旋余地。"
    ],
    choices: [
      { text: "......", nextScene: "d2_before_hr" }
    ]
  },

  d2_hr_probe: {
    id: "d2_hr_probe",
    type: "narration",
    location: "你的工位",
    content: [
      "你回复：【请问是关于什么事？】",
      "",
      "老张回复：",
      "【就是聊聊北极星项目的事。了解一下情况。】",
      "",
      "......",
      "",
      "「了解情况」。这个词，让你背脊发凉。"
    ],
    choices: [
      { text: "......", nextScene: "d2_before_hr" }
    ]
  },

  d2_before_hr: {
    id: "d2_before_hr",
    type: "narration",
    location: "你的工位",
    content: [
      "10点前，你还有一点时间。",
      "",
      "你要不要做点什么准备？"
    ],
    choices: [
      {
        text: "再看一遍那两封邮件，确保自己的说法一致",
        effects: { selfDeception: -5, realityPressure: 5 },
        nextScene: "d2_hr_meeting"
      },
      {
        text: "找小林聊聊，看看他的态度",
        nextScene: "d2_xiaolin_d2"
      },
      {
        text: "什么都不做，直接去会议室",
        effects: { selfDeception: 5, realityPressure: 0 },
        nextScene: "d2_hr_meeting"
      }
    ]
  },

  // ----------------------------------------
  // 2.1 HR谈话
  // ----------------------------------------
  d2_hr_meeting: {
    id: "d2_hr_meeting",
    type: "dialogue",
    location: "小会议室",
    content: [
      { speaker: "narrator", text: "你走进小会议室。老张已经在那里了。" },
      { speaker: "narrator", text: "他给你倒了一杯水，笑着示意你坐下。" },
      { speaker: "hr", text: "别紧张，就是聊聊。" },
      { speaker: "hr", text: "我听说北极星项目出了点问题。" },
      { speaker: "hr", text: "想了解一下，你是怎么看的。" },
      { speaker: "narrator", text: "老张的语气很平和。但你知道，HR的「聊聊」，从来不是随便聊聊。" }
    ],
    choices: [
      {
        text: "\"这个项目确实有问题，但原因很复杂。\"",
        hint: "承认问题，模糊原因",
        effects: { trust: 5, selfDeception: 5, realityPressure: 5 },
        nextScene: "d2_hr_complex"
      },
      {
        text: "\"我正在准备补救方案，今天会交给王总。\"",
        hint: "聚焦解决方案",
        effects: { trust: 10, selfDeception: 0, realityPressure: 0 },
        nextScene: "d2_hr_solution"
      },
      {
        text: "\"我不太确定您想了解什么。\"",
        hint: "反问",
        effects: { trust: 0, selfDeception: 5, realityPressure: 5 },
        nextScene: "d2_hr_vague"
      }
    ]
  },

  d2_hr_complex: {
    id: "d2_hr_complex",
    type: "dialogue",
    location: "小会议室",
    content: [
      { speaker: "player", text: "这个项目确实有问题，但原因很复杂。" },
      { speaker: "hr", text: "复杂？" },
      { speaker: "hr", text: "能具体说说吗？" },
      { speaker: "narrator", text: "老张拿出一个本子，准备记录。" }
    ],
    choices: [
      {
        text: "\"预算、时间线、跨部门协作都有问题。\"",
        effects: { trust: 0, selfDeception: 10, realityPressure: 5 },
        nextScene: "d2_hr_systemic"
      },
      {
        text: "\"......我也有责任。我没有管理好风险。\"",
        effects: { trust: 10, selfDeception: -10, realityPressure: 0 },
        nextScene: "d2_hr_admit"
      }
    ]
  },

  d2_hr_solution: {
    id: "d2_hr_solution",
    type: "dialogue",
    location: "小会议室",
    content: [
      { speaker: "player", text: "我正在准备补救方案，今天会交给王总。" },
      { speaker: "hr", text: "补救方案是好事。" },
      { speaker: "hr", text: "但公司也需要了解，问题是怎么发生的。" },
      { speaker: "hr", text: "这样才能避免下次再出现。" },
      { speaker: "narrator", text: "老张的语气很温和，但问题很直接。" }
    ],
    choices: [
      { text: "......", nextScene: "d2_hr_question" }
    ]
  },

  d2_hr_vague: {
    id: "d2_hr_vague",
    type: "dialogue",
    location: "小会议室",
    content: [
      { speaker: "player", text: "我不太确定您想了解什么。" },
      { speaker: "hr", text: "......" },
      { speaker: "hr", text: "好吧，那我直接问。" },
      { speaker: "hr", text: "bug出现之前，你知情吗？" },
      { speaker: "narrator", text: "来了。最关键的问题。" }
    ],
    choices: [
      { text: "......", nextScene: "d2_hr_question" }
    ]
  },

  d2_hr_systemic: {
    id: "d2_hr_systemic",
    type: "dialogue",
    location: "小会议室",
    content: [
      { speaker: "player", text: "预算、时间线、跨部门协作都有问题。" },
      { speaker: "hr", text: "嗯。" },
      { speaker: "hr", text: "但你是项目经理。" },
      { speaker: "hr", text: "这些问题，你有没有提前向上反映？" },
      { speaker: "narrator", text: "你愣住了。" },
      { speaker: "narrator", text: "你反映过吗？你想不起来。" }
    ],
    choices: [
      { text: "......", nextScene: "d2_hr_question" }
    ]
  },

  d2_hr_admit: {
    id: "d2_hr_admit",
    type: "dialogue",
    location: "小会议室",
    content: [
      { speaker: "player", text: "......我也有责任。我没有管理好风险。" },
      { speaker: "hr", text: "你能这么说，很好。" },
      { speaker: "hr", text: "但我还需要了解一个细节。" },
      { speaker: "hr", text: "bug被报告过，对吗？" },
      { speaker: "narrator", text: "老张的眼神变得锐利。" }
    ],
    choices: [
      { text: "......", nextScene: "d2_hr_question" }
    ]
  },

  // HR核心问题
  d2_hr_question: {
    id: "d2_hr_question",
    type: "dialogue",
    location: "小会议室",
    content: [
      { speaker: "hr", text: "小林说，他给你发过两封邮件，报告bug的风险。" },
      { speaker: "hr", text: "你收到了吗？" },
      { speaker: "narrator", text: "这是第二次有人问你这个问题。" },
      { speaker: "narrator", text: "昨天是王总，今天是老张。" },
      { speaker: "narrator", text: "你的回答，会被记录。会被对比。" }
    ],
    choices: [
      {
        text: "\"收到了。我没有及时处理。这是我的责任。\"",
        hint: "诚实",
        effects: { trust: 15, selfDeception: -20, realityPressure: -10 },
        nextScene: "d2_hr_honest"
      },
      {
        text: "\"我不记得了。邮件太多了。\"",
        hint: "模糊",
        effects: { trust: -5, selfDeception: 15, realityPressure: 15 },
        nextScene: "d2_hr_forget"
      },
      {
        text: "\"这件事，我已经跟王总解释过了。\"",
        hint: "推给王总",
        effects: { trust: -10, selfDeception: 10, realityPressure: 10 },
        nextScene: "d2_hr_deflect"
      }
    ]
  },

  d2_hr_honest: {
    id: "d2_hr_honest",
    type: "dialogue",
    location: "小会议室",
    content: [
      { speaker: "player", text: "收到了。我没有及时处理。这是我的责任。" },
      { speaker: "hr", text: "......" },
      { speaker: "narrator", text: "老张停下了笔，看了你一眼。" },
      { speaker: "hr", text: "你能这么说，说明你还是想解决问题的。" },
      { speaker: "hr", text: "我会把你的态度记录下来的。" },
      { speaker: "hr", text: "今天就先这样。后续有需要，再找你聊。" }
    ],
    choices: [
      { text: "离开会议室", nextScene: "d2_after_hr" }
    ]
  },

  d2_hr_forget: {
    id: "d2_hr_forget",
    type: "dialogue",
    location: "小会议室",
    content: [
      { speaker: "player", text: "我不记得了。邮件太多了。" },
      { speaker: "hr", text: "......" },
      { speaker: "hr", text: "好。" },
      { speaker: "narrator", text: "老张没有追问。但他写了几行字，你不知道是什么。" },
      { speaker: "hr", text: "今天就先这样。" }
    ],
    choices: [
      { text: "离开会议室", nextScene: "d2_after_hr" }
    ]
  },

  d2_hr_deflect: {
    id: "d2_hr_deflect",
    type: "dialogue",
    location: "小会议室",
    content: [
      { speaker: "player", text: "这件事，我已经跟王总解释过了。" },
      { speaker: "hr", text: "我知道。" },
      { speaker: "hr", text: "但我现在问的是你。" },
      { speaker: "hr", text: "你自己怎么看待这件事？" },
      { speaker: "narrator", text: "老张的语气依然平和，但问题越来越尖锐。" },
      { speaker: "hr", text: "......算了，今天就先这样。" }
    ],
    choices: [
      { text: "离开会议室", nextScene: "d2_after_hr" }
    ]
  },

  d2_after_hr: {
    id: "d2_after_hr",
    type: "narration",
    location: "走廊",
    content: [
      "你走出会议室，后背全是汗。",
      "",
      "HR的谈话结束了，但你知道——",
      "这只是开始。",
      "",
      "你的说法，会被记录。",
      "你的说法，会被对比。",
      "",
      "如果王总那边、HR这边、小林的版本——",
      "有任何不一致的地方......",
      "",
      "你不敢想下去。"
    ],
    choices: [
      { text: "回到工位", nextScene: "d2_after_hr_2" }
    ]
  },

  d2_after_hr_2: {
    id: "d2_after_hr_2",
    type: "narration",
    location: "你的工位",
    content: [
      "回到工位，你看到桌上有一张便签。",
      "",
      "「陈静：有空聊聊。——C」",
      "",
      "......",
      "",
      "陈静又找你。",
      "她手里有需求变更的记录。",
      "那可能是你的救命稻草——",
      "也可能是另一个麻烦。",
      "",
      "你要找她吗？"
    ],
    choices: [
      {
        text: "去找陈静",
        nextScene: "d2_chenjing_d2"
      },
      {
        text: "先准备补救方案，其他的事以后再说",
        nextScene: "d2_solution"
      },
      {
        text: "找小林，看看他的态度",
        nextScene: "d2_xiaolin_d2"
      }
    ]
  },

  // ----------------------------------------
  // 2.2 小林（第二天）
  // ----------------------------------------
  d2_xiaolin_d2: {
    id: "d2_xiaolin_d2",
    type: "dialogue",
    location: "茶水间",
    content: [
      { speaker: "narrator", text: "你在茶水间找到了小林。" },
      { speaker: "narrator", text: "他正在泡咖啡，看到你进来，动作顿了一下。" },
      { speaker: "subordinate", text: "......" },
      { speaker: "subordinate", text: "有事？" },
      { speaker: "narrator", text: "小林的语气很平淡，但你感觉到一种距离感。" }
    ],
    choices: [
      {
        text: "\"昨天的事......我想跟你聊聊。\"",
        nextScene: "d2_xiaolin_talk"
      },
      {
        text: "\"HR今天找我了。\"",
        hint: "试探",
        nextScene: "d2_xiaolin_hr"
      },
      {
        text: "\"你......最近还好吗？\"",
        hint: "寒暄",
        nextScene: "d2_xiaolin_casual"
      }
    ]
  },

  d2_xiaolin_talk: {
    id: "d2_xiaolin_talk",
    type: "dialogue",
    location: "茶水间",
    content: [
      { speaker: "player", text: "昨天的事......我想跟你聊聊。" },
      { speaker: "subordinate", text: "聊什么？" },
      { speaker: "subordinate", text: "你跟王总怎么说，是你的事。" },
      { speaker: "subordinate", text: "我只知道——我发了邮件。我有记录。" },
      { speaker: "narrator", text: "小林的态度很冷淡。" }
    ],
    choices: [
      {
        text: "\"我不是想让你帮我隐瞒什么。我只是想解释一下。\"",
        effects: { trust: 5, selfDeception: -5, realityPressure: 0 },
        nextScene: "d2_xiaolin_explain"
      },
      {
        text: "\"你打算把邮件的事告诉HR吗？\"",
        effects: { trust: -10, selfDeception: 10, realityPressure: 10 },
        nextScene: "d2_xiaolin_confront"
      }
    ]
  },

  d2_xiaolin_hr: {
    id: "d2_xiaolin_hr",
    type: "dialogue",
    location: "茶水间",
    content: [
      { speaker: "player", text: "HR今天找我了。" },
      { speaker: "subordinate", text: "哦？" },
      { speaker: "subordinate", text: "问了什么？" },
      { speaker: "player", text: "问了我知不知道bug的事。还有你发的邮件。" },
      { speaker: "subordinate", text: "......" },
      { speaker: "subordinate", text: "你怎么说的？" },
      { speaker: "narrator", text: "小林的眼神变得警觉。" }
    ],
    choices: [
      {
        text: "\"我说我知道。是我没有处理。\"",
        effects: { trust: 10, selfDeception: -15, realityPressure: -5 },
        nextScene: "d2_xiaolin_trust"
      },
      {
        text: "\"我说我不记得了。\"",
        effects: { trust: -15, selfDeception: 15, realityPressure: 15 },
        nextScene: "d2_xiaolin_distrust"
      },
      {
        text: "\"......你觉得我应该怎么说？\"",
        effects: { trust: -5, selfDeception: 10, realityPressure: 10 },
        nextScene: "d2_xiaolin_negotiate"
      }
    ]
  },

  d2_xiaolin_casual: {
    id: "d2_xiaolin_casual",
    type: "dialogue",
    location: "茶水间",
    content: [
      { speaker: "player", text: "你......最近还好吗？" },
      { speaker: "subordinate", text: "......" },
      { speaker: "narrator", text: "小林看了你一眼，眼神难以捉摸。" },
      { speaker: "subordinate", text: "还好。" },
      { speaker: "subordinate", text: "你呢？" },
      { speaker: "narrator", text: "茶水间陷入了沉默。" }
    ],
    choices: [
      {
        text: "\"说实话，不太好。\"",
        effects: { trust: 5, selfDeception: -5, realityPressure: 5 },
        nextScene: "d2_xiaolin_open"
      },
      {
        text: "\"还行。就是有点忙。\"",
        effects: { trust: 0, selfDeception: 5, realityPressure: 0 },
        nextScene: "d2_xiaolin_distant"
      }
    ]
  },

  d2_xiaolin_explain: {
    id: "d2_xiaolin_explain",
    type: "dialogue",
    location: "茶水间",
    content: [
      { speaker: "player", text: "我不是想让你帮我隐瞒什么。我只是想解释一下。" },
      { speaker: "player", text: "那天我确实太忙了。邮件漏掉了，不是故意的。" },
      { speaker: "subordinate", text: "......" },
      { speaker: "subordinate", text: "我知道。" },
      { speaker: "subordinate", text: "但你知道现在是什么情况吗？" },
      { speaker: "subordinate", text: "客户在追责，董事会在问，王总需要一个交代。" },
      { speaker: "subordinate", text: "我发的邮件，可能会成为定责的关键证据。" },
      { speaker: "narrator", text: "小林的声音压得很低。" },
      { speaker: "subordinate", text: "我不想坑你。但我也不能装作什么都没发生。" }
    ],
    choices: [
      {
        text: "\"我理解。你只需要实话实说就行。\"",
        effects: { trust: 10, selfDeception: -10, realityPressure: 0 },
        nextScene: "d2_xiaolin_understand_d2"
      },
      {
        text: "\"......有没有办法，让这件事的影响小一点？\"",
        effects: { trust: -10, selfDeception: 15, realityPressure: 10 },
        nextScene: "d2_xiaolin_deal"
      }
    ]
  },

  d2_xiaolin_confront: {
    id: "d2_xiaolin_confront",
    type: "dialogue",
    location: "茶水间",
    content: [
      { speaker: "player", text: "你打算把邮件的事告诉HR吗？" },
      { speaker: "subordinate", text: "......" },
      { speaker: "subordinate", text: "你是在威胁我？" },
      { speaker: "player", text: "不是。我只是想知道你的打算。" },
      { speaker: "subordinate", text: "我的打算？" },
      { speaker: "subordinate", text: "我的打算是——实话实说。" },
      { speaker: "subordinate", text: "如果你担心我会「配合」你的叙事，那你多虑了。" },
      { speaker: "narrator", text: "小林转身离开了茶水间。" }
    ],
    choices: [
      { text: "......", nextScene: "d2_after_xiaolin" }
    ]
  },

  d2_xiaolin_trust: {
    id: "d2_xiaolin_trust",
    type: "dialogue",
    location: "茶水间",
    content: [
      { speaker: "player", text: "我说我知道。是我没有处理。" },
      { speaker: "subordinate", text: "......" },
      { speaker: "narrator", text: "小林愣了一下。" },
      { speaker: "subordinate", text: "你......直接承认了？" },
      { speaker: "player", text: "嗯。" },
      { speaker: "subordinate", text: "......" },
      { speaker: "subordinate", text: "说实话，我没想过你会这样。" },
      { speaker: "subordinate", text: "......谢谢。" },
      { speaker: "narrator", text: "小林的眼神变得复杂。" },
      { speaker: "subordinate", text: "这件事，我不会落井下石的。" }
    ],
    choices: [
      { text: "......", nextScene: "d2_after_xiaolin" }
    ]
  },

  d2_xiaolin_distrust: {
    id: "d2_xiaolin_distrust",
    type: "dialogue",
    location: "茶水间",
    content: [
      { speaker: "player", text: "我说我不记得了。" },
      { speaker: "subordinate", text: "......" },
      { speaker: "subordinate", text: "不记得。" },
      { speaker: "subordinate", text: "好。" },
      { speaker: "narrator", text: "小林的声音很冷。" },
      { speaker: "subordinate", text: "那我就实话实说吧。" },
      { speaker: "subordinate", text: "我发了邮件。有记录。你能「不记得」，是你的事。" },
      { speaker: "narrator", text: "小林转身离开了。" }
    ],
    choices: [
      { text: "......", nextScene: "d2_after_xiaolin" }
    ]
  },

  d2_xiaolin_negotiate: {
    id: "d2_xiaolin_negotiate",
    type: "dialogue",
    location: "茶水间",
    content: [
      { speaker: "player", text: "......你觉得我应该怎么说？" },
      { speaker: "subordinate", text: "你问我？" },
      { speaker: "subordinate", text: "......" },
      { speaker: "subordinate", text: "我不想卷进这件事。" },
      { speaker: "subordinate", text: "但如果你在想让我「配合」你的叙事......" },
      { speaker: "subordinate", text: "那你得给我一个理由。" },
      { speaker: "narrator", text: "小林的眼神变得意味深长。" }
    ],
    choices: [
      {
        text: "\"我能为你做什么？\"",
        effects: { trust: -15, selfDeception: 20, realityPressure: 15 },
        nextScene: "d2_xiaolin_deal"
      },
      {
        text: "\"......算了。当我没说。\"",
        effects: { trust: 0, selfDeception: 5, realityPressure: 5 },
        nextScene: "d2_after_xiaolin"
      }
    ]
  },

  d2_xiaolin_open: {
    id: "d2_xiaolin_open",
    type: "dialogue",
    location: "茶水间",
    content: [
      { speaker: "player", text: "说实话，不太好。" },
      { speaker: "subordinate", text: "......" },
      { speaker: "subordinate", text: "我知道。" },
      { speaker: "subordinate", text: "这件事......对谁都不好过。" },
      { speaker: "narrator", text: "小林的语气软化了一些。" },
      { speaker: "subordinate", text: "我发的邮件......你有空再看一下吧。" },
      { speaker: "subordinate", text: "里面有我当时的建议。也许对你有用。" },
      { speaker: "narrator", text: "小林转身离开了。" },
      { speaker: "narrator", text: "他是在帮你，还是在提醒你？" }
    ],
    choices: [
      { text: "......", nextScene: "d2_after_xiaolin" }
    ]
  },

  d2_xiaolin_distant: {
    id: "d2_xiaolin_distant",
    type: "dialogue",
    location: "茶水间",
    content: [
      { speaker: "player", text: "还行。就是有点忙。" },
      { speaker: "subordinate", text: "哦。" },
      { speaker: "subordinate", text: "那你忙吧。" },
      { speaker: "narrator", text: "小林端着咖啡离开了茶水间。" },
      { speaker: "narrator", text: "对话就这样结束了。" },
      { speaker: "narrator", text: "你不知道他心里在想什么。" }
    ],
    choices: [
      { text: "......", nextScene: "d2_after_xiaolin" }
    ]
  },

  d2_xiaolin_understand_d2: {
    id: "d2_xiaolin_understand_d2",
    type: "dialogue",
    location: "茶水间",
    content: [
      { speaker: "player", text: "我理解。你只需要实话实说就行。" },
      { speaker: "subordinate", text: "......" },
      { speaker: "subordinate", text: "好吧。" },
      { speaker: "subordinate", text: "我不会故意针对你的。" },
      { speaker: "subordinate", text: "但你也别指望我会帮你圆谎。" },
      { speaker: "narrator", text: "小林转身离开了。" }
    ],
    choices: [
      { text: "......", nextScene: "d2_after_xiaolin" }
    ]
  },

  d2_xiaolin_deal: {
    id: "d2_xiaolin_deal",
    type: "dialogue",
    location: "茶水间",
    content: [
      { speaker: "narrator", text: "你和小林对视了几秒。" },
      { speaker: "player", text: "我能为你做什么？" },
      { speaker: "subordinate", text: "......" },
      { speaker: "subordinate", text: "我不想做交易。" },
      { speaker: "subordinate", text: "但如果你愿意承认这件事......" },
      { speaker: "subordinate", text: "我也不会把事情说得太难听。" },
      { speaker: "narrator", text: "小林的声音很轻，但条件很明确。" }
    ],
    choices: [
      {
        text: "\"好。我会承认的。\"",
        effects: { trust: 10, selfDeception: -15, realityPressure: -5 },
        nextScene: "d2_after_xiaolin"
      },
      {
        text: "\"......我需要再想想。\"",
        effects: { trust: -5, selfDeception: 10, realityPressure: 10 },
        nextScene: "d2_after_xiaolin"
      }
    ]
  },

  d2_after_xiaolin: {
    id: "d2_after_xiaolin",
    type: "narration",
    location: "走廊",
    content: [
      "你离开茶水间，脑子里又多了几个问题。",
      "",
      "小林的态度......比昨天更复杂了。",
      "",
      "他不像是要落井下石，但也不会帮你圆谎。",
      "",
      "也许，这是你应得的。",
      "",
      "......",
      "",
      "下午了。你还有补救方案要交。"
    ],
    choices: [
      { text: "回到工位", nextScene: "d2_solution" }
    ]
  },

  // ----------------------------------------
  // 2.3 陈静（第二天）
  // ----------------------------------------
  d2_chenjing_d2: {
    id: "d2_chenjing_d2",
    type: "dialogue",
    location: "陈静工位",
    content: [
      { speaker: "narrator", text: "你走到陈静的工位旁边。" },
      { speaker: "colleague", text: "来了？" },
      { speaker: "colleague", text: "坐下聊吧。" },
      { speaker: "narrator", text: "陈静指了指旁边的椅子。" }
    ],
    choices: [
      {
        text: "\"你找我有事？\"",
        nextScene: "d2_chenjing_what"
      },
      {
        text: "\"关于昨天说的需求变更记录......\"",
        nextScene: "d2_chenjing_record"
      }
    ]
  },

  d2_chenjing_what: {
    id: "d2_chenjing_what",
    type: "dialogue",
    location: "陈静工位",
    content: [
      { speaker: "player", text: "你找我有事？" },
      { speaker: "colleague", text: "嗯。" },
      { speaker: "colleague", text: "我听说HR今天找你了。" },
      { speaker: "player", text: "......消息传得挺快。" },
      { speaker: "colleague", text: "公司就这么大。" },
      { speaker: "colleague", text: "我想问问，你现在是什么情况？" },
      { speaker: "narrator", text: "陈静的眼神带着一丝关切，但也有一丝试探。" }
    ],
    choices: [
      {
        text: "\"还行。就是问了问项目的事。\"",
        effects: { trust: 0, selfDeception: 5, realityPressure: 0 },
        nextScene: "d2_chenjing_vague"
      },
      {
        text: "\"说实话，有点麻烦。\"",
        effects: { trust: 5, selfDeception: -5, realityPressure: 5 },
        nextScene: "d2_chenjing_honest_d2"
      }
    ]
  },

  d2_chenjing_record: {
    id: "d2_chenjing_record",
    type: "dialogue",
    location: "陈静工位",
    content: [
      { speaker: "player", text: "关于昨天说的需求变更记录......" },
      { speaker: "colleague", text: "你想看？" },
      { speaker: "player", text: "......可能会对我有帮助。" },
      { speaker: "colleague", text: "嗯，我知道。" },
      { speaker: "colleague", text: "所以昨天我才主动告诉你。" },
      { speaker: "narrator", text: "陈静转过身，看着你。" },
      { speaker: "colleague", text: "但我有个问题——" },
      { speaker: "colleague", text: "你想用它来做什么？" }
    ],
    choices: [
      {
        text: "\"我想还原事情的全貌。\"",
        effects: { trust: 5, selfDeception: 0, realityPressure: 0 },
        nextScene: "d2_chenjing_truth"
      },
      {
        text: "\"......我只是想保护自己。\"",
        effects: { trust: -5, selfDeception: 10, realityPressure: 5 },
        nextScene: "d2_chenjing_self"
      }
    ]
  },

  d2_chenjing_vague: {
    id: "d2_chenjing_vague",
    type: "dialogue",
    location: "陈静工位",
    content: [
      { speaker: "player", text: "还行。就是问了问项目的事。" },
      { speaker: "colleague", text: "......" },
      { speaker: "colleague", text: "好吧。" },
      { speaker: "colleague", text: "那我直说了。" },
      { speaker: "colleague", text: "需求变更的记录，我可以给你。" },
      { speaker: "colleague", text: "但我想知道——你打算怎么用？" },
      { speaker: "narrator", text: "陈静的问题很直接。" }
    ],
    choices: [
      { text: "......", nextScene: "d2_chenjing_choice" }
    ]
  },

  d2_chenjing_honest_d2: {
    id: "d2_chenjing_honest_d2",
    type: "dialogue",
    location: "陈静工位",
    content: [
      { speaker: "player", text: "说实话，有点麻烦。" },
      { speaker: "colleague", text: "我知道。" },
      { speaker: "colleague", text: "所以昨天我才主动找你。" },
      { speaker: "colleague", text: "需求变更的记录，也许能帮你。" },
      { speaker: "colleague", text: "......" },
      { speaker: "colleague", text: "但你要想清楚，你想用它来做什么。" }
    ],
    choices: [
      { text: "......", nextScene: "d2_chenjing_choice" }
    ]
  },

  d2_chenjing_truth: {
    id: "d2_chenjing_truth",
    type: "dialogue",
    location: "陈静工位",
    content: [
      { speaker: "player", text: "我想还原事情的全貌。" },
      { speaker: "colleague", text: "全貌......" },
      { speaker: "colleague", text: "好。" },
      { speaker: "colleague", text: "我把邮件转发给你。你自己判断吧。" },
      { speaker: "narrator", text: "陈静的语气里带着一丝欣赏。" },
      { speaker: "colleague", text: "对了，还有一件事。" },
      { speaker: "colleague", text: "王总下午要开会，可能会宣布一些事。" },
      { speaker: "colleague", text: "你......做好准备。" }
    ],
    choices: [
      { text: "......", nextScene: "d2_after_chenjing" }
    ]
  },

  d2_chenjing_self: {
    id: "d2_chenjing_self",
    type: "dialogue",
    location: "陈静工位",
    content: [
      { speaker: "player", text: "......我只是想保护自己。" },
      { speaker: "colleague", text: "保护自己。" },
      { speaker: "colleague", text: "......" },
      { speaker: "colleague", text: "我理解。" },
      { speaker: "colleague", text: "但你要知道——这份记录，既能帮你，也能害你。" },
      { speaker: "colleague", text: "如果你用它来推卸责任......" },
      { speaker: "colleague", text: "别人也会看到的。" },
      { speaker: "narrator", text: "陈静的眼神变得复杂。" },
      { speaker: "colleague", text: "......我还是转发给你吧。你自己决定怎么用。" }
    ],
    choices: [
      { text: "......", nextScene: "d2_after_chenjing" }
    ]
  },

  d2_chenjing_choice: {
    id: "d2_chenjing_choice",
    type: "dialogue",
    location: "陈静工位",
    content: [
      { speaker: "narrator", text: "你沉默了几秒。" },
      { speaker: "player", text: "......我想用它来还原事情的真相。" },
      { speaker: "colleague", text: "真相？" },
      { speaker: "colleague", text: "好。" },
      { speaker: "colleague", text: "我把邮件转发给你。" },
      { speaker: "narrator", text: "陈静看了看时间。" },
      { speaker: "colleague", text: "对了，王总下午要开会。" },
      { speaker: "colleague", text: "可能会宣布一些事情。" }
    ],
    choices: [
      { text: "......", nextScene: "d2_after_chenjing" }
    ]
  },

  d2_after_chenjing: {
    id: "d2_after_chenjing",
    type: "narration",
    location: "你的工位",
    content: [
      "你回到工位，打开邮箱。",
      "",
      "陈静的邮件已经在那里了。",
      "",
      "你点开附件，开始看需求变更记录。",
      "",
      "......",
      "",
      "确实，项目中期有过几次需求变更。",
      "其中一次涉及支付模块——正是bug出现的地方。",
      "",
      "这能成为你解释的一部分吗？",
      "还是......这只是另一块拼图，不能改变什么？",
      "",
      "你盯着屏幕，陷入思考。"
    ],
    choices: [
      { text: "继续", nextScene: "d2_solution" }
    ]
  },

  // ----------------------------------------
  // 2.4 补救方案 / 王总会议
  // ----------------------------------------
  d2_solution: {
    id: "d2_solution",
    type: "narration",
    location: "你的工位",
    content: [
      "下午了。",
      "",
      "你把补救方案发给了王总。",
      "然后，你收到了一条消息：",
      "",
      "【王总：3点，大会议室。全员。】",
      "",
      "......",
      "",
      "全员会议。"
    ],
    choices: [
      { text: "去会议室", nextScene: "d2_meeting" }
    ]
  },

  d2_meeting: {
    id: "d2_meeting",
    type: "dialogue",
    location: "大会议室",
    content: [
      { speaker: "narrator", text: "你走进大会议室。所有人都到了。" },
      { speaker: "narrator", text: "王总站在前面，表情严肃。" },
      { speaker: "narrator", text: "小林坐在角落，低着头。" },
      { speaker: "narrator", text: "陈静看了你一眼，微微点头。" },
      { speaker: "narrator", text: "老张（HR）坐在最后面，拿着笔记本。" },
      { speaker: "boss", text: "今天叫大家来，是关于北极星项目的事。" },
      { speaker: "boss", text: "项目出了问题，这是事实。" },
      { speaker: "boss", text: "客户在追责，董事会在问，我们需要一个交代。" },
      { speaker: "narrator", text: "王总环顾四周。" },
      { speaker: "boss", text: "在正式的问责结果出来之前，我想听听大家的意见。" },
      { speaker: "boss", text: "这件事，到底是怎么发生的？" },
      { speaker: "narrator", text: "会议室陷入沉默。" },
      { speaker: "narrator", text: "所有人的目光，都落在了你身上。" }
    ],
    choices: [
      {
        text: "\"我先说吧。\"",
        hint: "主动发言",
        nextScene: "d2_meeting_speak"
      },
      {
        text: "（等待别人先开口）",
        hint: "保持沉默",
        nextScene: "d2_meeting_wait"
      }
    ]
  },

  d2_meeting_speak: {
    id: "d2_meeting_speak",
    type: "dialogue",
    location: "大会议室",
    content: [
      { speaker: "player", text: "我先说吧。" },
      { speaker: "narrator", text: "你站了起来。" },
      { speaker: "narrator", text: "所有人的目光都集中在你身上。" },
      { speaker: "player", text: "......" },
      { speaker: "narrator", text: "这是你的时刻。你可以选择——" },
      { speaker: "narrator", text: "如何解释这一切。" }
    ],
    choices: [
      {
        text: "\"这个项目的失败，是我没有管理好风险。\"",
        hint: "承担责任",
        effects: { trust: 20, selfDeception: -25, realityPressure: -15 },
        nextScene: "d2_meeting_responsibility"
      },
      {
        text: "\"这个项目从一开始就存在很多问题，不是一个人的责任。\"",
        hint: "分散责任",
        effects: { trust: -5, selfDeception: 15, realityPressure: 10 },
        nextScene: "d2_meeting_distributed"
      },
      {
        text: "\"这件事，我需要解释一下背景。\"",
        hint: "重构叙事",
        effects: { trust: 0, selfDeception: 20, realityPressure: 15 },
        nextScene: "d2_meeting_narrative"
      }
    ]
  },

  d2_meeting_wait: {
    id: "d2_meeting_wait",
    type: "dialogue",
    location: "大会议室",
    content: [
      { speaker: "narrator", text: "你选择了沉默。" },
      { speaker: "narrator", text: "几秒钟后，小林开口了。" },
      { speaker: "subordinate", text: "......我来说吧。" },
      { speaker: "subordinate", text: "bug是我负责的模块。" },
      { speaker: "subordinate", text: "我发过邮件报告风险。" },
      { speaker: "narrator", text: "小林看了你一眼。" },
      { speaker: "subordinate", text: "......但邮件没有被处理。" },
      { speaker: "narrator", text: "会议室里，气氛变得微妙。" },
      { speaker: "boss", text: "然后呢？" },
      { speaker: "narrator", text: "王总看着你。" },
      { speaker: "boss", text: "你有什么要说的吗？" }
    ],
    choices: [
      {
        text: "\"是我漏掉了。我承担责任。\"",
        effects: { trust: 15, selfDeception: -20, realityPressure: -10 },
        nextScene: "d2_meeting_responsibility"
      },
      {
        text: "\"这件事比较复杂，不是单点故障。\"",
        effects: { trust: -10, selfDeception: 15, realityPressure: 10 },
        nextScene: "d2_meeting_distributed"
      },
      {
        text: "\"......我需要看一下邮件记录才能确认。\"",
        effects: { trust: -15, selfDeception: 20, realityPressure: 20 },
        nextScene: "d2_meeting_stall"
      }
    ]
  },

  d2_meeting_responsibility: {
    id: "d2_meeting_responsibility",
    type: "dialogue",
    location: "大会议室",
    content: [
      { speaker: "player", text: "是我漏掉了。我承担责任。" },
      { speaker: "narrator", text: "你的声音很平静。" },
      { speaker: "player", text: "小林的邮件我收到了，但没有及时处理。" },
      { speaker: "player", text: "这是我的失误。" },
      { speaker: "narrator", text: "会议室里一片安静。" },
      { speaker: "boss", text: "......" },
      { speaker: "boss", text: "好。" },
      { speaker: "boss", text: "补救方案我看了，可以执行。" },
      { speaker: "boss", text: "问责的事，HR会继续跟进。" },
      { speaker: "boss", text: "但你的态度......我记住了。" },
      { speaker: "narrator", text: "王总看了看四周。" },
      { speaker: "boss", text: "会议到此结束。" }
    ],
    choices: [
      { text: "......", nextScene: "d2_end" }
    ]
  },

  d2_meeting_distributed: {
    id: "d2_meeting_distributed",
    type: "dialogue",
    location: "大会议室",
    content: [
      { speaker: "player", text: "这件事比较复杂，不是单点故障。" },
      { speaker: "player", text: "预算、时间线、需求变更、跨部门协作......" },
      { speaker: "player", text: "每一个环节都出了问题。" },
      { speaker: "colleague", text: "需求变更？" },
      { speaker: "narrator", text: "陈静开口了。" },
      { speaker: "colleague", text: "你是在说，我的需求变更是问题的一部分？" },
      { speaker: "narrator", text: "会议室里的气氛变得紧张。" },
      { speaker: "boss", text: "......" },
      { speaker: "boss", text: "你们两个，会后单独聊。" },
      { speaker: "boss", text: "今天先这样。问责的事，HR会继续跟进。" }
    ],
    choices: [
      { text: "......", nextScene: "d2_end" }
    ]
  },

  d2_meeting_narrative: {
    id: "d2_meeting_narrative",
    type: "dialogue",
    location: "大会议室",
    content: [
      { speaker: "player", text: "这件事，我需要解释一下背景。" },
      { speaker: "player", text: "项目中期有过多次需求变更。" },
      { speaker: "player", text: "资源、时间线都在调整。" },
      { speaker: "player", text: "在这样的环境下，风险确实存在。" },
      { speaker: "boss", text: "所以呢？" },
      { speaker: "boss", text: "你是在说，这是「环境」的问题，不是你的问题？" },
      { speaker: "narrator", text: "王总的语气带着一丝讽刺。" },
      { speaker: "narrator", text: "会议室里，同事们开始交头接耳。" },
      { speaker: "boss", text: "......算了。" },
      { speaker: "boss", text: "补救方案我看了。问责的事，HR会跟进。" },
      { speaker: "boss", text: "会议结束。" }
    ],
    choices: [
      { text: "......", nextScene: "d2_end" }
    ]
  },

  d2_meeting_stall: {
    id: "d2_meeting_stall",
    type: "dialogue",
    location: "大会议室",
    content: [
      { speaker: "player", text: "......我需要看一下邮件记录才能确认。" },
      { speaker: "boss", text: "你现在不记得了？" },
      { speaker: "player", text: "我每天收到的邮件很多......" },
      { speaker: "boss", text: "......" },
      { speaker: "narrator", text: "王总的眼神变得冰冷。" },
      { speaker: "boss", text: "好。" },
      { speaker: "boss", text: "HR会去核实的。" },
      { speaker: "boss", text: "会议结束。" },
      { speaker: "narrator", text: "你走出会议室，感觉所有人的目光都在你背后。" }
    ],
    choices: [
      { text: "......", nextScene: "d2_end" }
    ]
  },

  d2_end: {
    id: "d2_end",
    type: "narration",
    location: "走廊",
    content: [
      "会议结束了。",
      "",
      "你走出会议室，脑子里一片混乱。",
      "",
      "今天，你在所有人面前——",
      "说了什么？没说什么？",
      "",
      "同事们三三两两离开，没人跟你说话。",
      "",
      "你不知道接下来会发生什么。",
      "",
      "但你知道——",
      "这件事，还没有结束。",
      "",
      "【第二天 结束】"
    ],
    choices: [
      { text: "进入第三天", nextScene: "d3_morning" }
    ]
  },

  // ═══════════════════════════════════════════
  // 第三天：分裂
  // ═══════════════════════════════════════════

  d3_morning: {
    id: "d3_morning",
    type: "narration",
    location: "第三天早晨",
    content: [
      "今天是第三天。",
      "",
      "你醒来的时候，发现自己盯着天花板发呆。",
      "",
      "这两天，你说了很多话。",
      "有些是真的，有些......你自己也不确定了。",
      "",
      "今天，应该会有一个结果。",
      "",
      "王总会怎么做？",
      "HR会怎么写报告？",
      "同事们会怎么看你？",
      "",
      "......",
      "",
      "你起床，洗漱，出门。",
      "",
      "不管怎样，今天，你要面对最后的答案。"
    ],
    choices: [
      { text: "去公司", nextScene: "d3_arrival" }
    ]
  },

  d3_arrival: {
    id: "d3_arrival",
    type: "narration",
    location: "公司大堂",
    content: [
      "你走进公司大堂。",
      "",
      "前台的小李看到你，表情有点僵硬。",
      "",
      "「......早。」",
      "",
      "你点点头，走向电梯。",
      "",
      "电梯门打开，你看到了老张（HR）。",
      "",
      "他看了你一眼，点了点头。",
      "",
      "「王总在等你。」"
    ],
    choices: [
      { text: "......", nextScene: "d3_boss_final" }
    ]
  },

  // ----------------------------------------
  // 3.1 最终对话
  // ----------------------------------------
  d3_boss_final: {
    id: "d3_boss_final",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "narrator", text: "你走进王总办公室。" },
      { speaker: "narrator", text: "王总坐在桌后，面前放着一份文件。" },
      { speaker: "boss", text: "坐。" },
      { speaker: "narrator", text: "你坐下。" },
      { speaker: "boss", text: "这两天，我想了很多。" },
      { speaker: "boss", text: "北极星项目的事，需要有个结论。" },
      { speaker: "boss", text: "HR的报告，我也看了。" },
      { speaker: "narrator", text: "王总拿起文件，看了看。" },
      { speaker: "boss", text: "......" },
      { speaker: "boss", text: "在正式宣布结果之前，我想问你最后一个问题。" },
      { speaker: "boss", text: "这两天，你想清楚了吗？" }
    ],
    choices: [
      {
        text: "\"......我想清楚了。\"",
        nextScene: "d3_final_question"
      },
      {
        text: "\"什么意思？\"",
        nextScene: "d3_final_explain"
      }
    ]
  },

  d3_final_explain: {
    id: "d3_final_explain",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "player", text: "什么意思？" },
      { speaker: "boss", text: "我的意思是——" },
      { speaker: "boss", text: "你觉得自己在这件事里，扮演了什么角色？" },
      { speaker: "boss", text: "你有没有面对真正的自己？" },
      { speaker: "narrator", text: "王总的问题，比任何问责都更尖锐。" }
    ],
    choices: [
      { text: "......", nextScene: "d3_final_question" }
    ]
  },

  d3_final_question: {
    id: "d3_final_question",
    type: "dialogue",
    location: "王总办公室",
    content: [
      { speaker: "boss", text: "好。" },
      { speaker: "boss", text: "最后一个问题——" },
      { speaker: "boss", text: "如果再给你一次机会，你会怎么做？" },
      { speaker: "narrator", text: "这是你最后的选择。" },
      { speaker: "narrator", text: "不是对王总说的，是对你自己说的。" }
    ],
    choices: [
      {
        text: "\"我会承认错误，承担责任。\"",
        hint: "诚实面对",
        flag: "ending_honest",
        nextScene: "d3_ending_choice"
      },
      {
        text: "\"我会更小心地处理这件事，不让它变成现在这样。\"",
        hint: "技巧性回答",
        flag: "ending_deception",
        nextScene: "d3_ending_choice"
      },
      {
        text: "\"我会想办法让事情不那么糟——对所有人都是。\"",
        hint: "模糊处理",
        flag: "ending_gray",
        nextScene: "d3_ending_choice"
      },
      {
        text: "\"......我不知道。\"",
        hint: "承认困惑",
        flag: "ending_lost",
        nextScene: "d3_ending_choice"
      }
    ]
  },

  d3_ending_choice: {
    id: "d3_ending_choice",
    type: "narration",
    location: "王总办公室",
    content: [
      "你给出了答案。",
      "",
      "王总看了你一会儿，然后点了点头。",
      "",
      "\"好。\"" ,
      "",
      "他拿起那份文件，递给了你。",
      "",
      "\"这是公司的决定。\"",
      "",
      "你接过文件，看着上面的字——"
    ],
    choices: [
      { text: "打开文件", nextScene: "ending_transition" }
    ]
  },

  ending_transition: {
    id: "ending_transition",
    type: "narration",
    location: "王总办公室",
    content: [
      "......",
      "",
      "你打开文件。",
      "",
      "上面的字，你看得清清楚楚。",
      "",
      "......"
    ],
    choices: [
      { text: "继续", nextScene: "ending_tributary" }
    ]
  },

  ending_tributary: {
    id: "ending_tributary",
    type: "narration",
    location: "结局",
    content: [
      "你的选择，决定了你的结局。",
      "",
      "......",
      "",
      "让我们看看，你走到了哪里。"
    ],
    choices: [
      { text: "......", nextScene: "ending_final" }
    ]
  },

  // ----------------------------------------
  // 最终结局（根据数值和选择决定）
  // ----------------------------------------
  ending_final: {
    id: "ending_final",
    type: "ending",
    title: "结局",
    content: [
      "......",
      "",
      "这是你的结局。",
      "",
      "感谢游玩《巧言令色》。"
    ]
  }

  // 注：实际结局会根据玩家的数值和选择动态生成
  // 这里只是占位符，游戏引擎会根据条件跳转到不同结局
};

// ============================================
// 结局定义（根据数值触发）
// ============================================

const ENDINGS = {
  // 诚实路线
  honest_redemption: {
    id: "honest_redemption",
    title: "结局：裂痕",
    condition: { selfDeception: -30, trust: 20 },
    content: [
      "你被降职了。",
      "",
      "但奇怪的是，你感到一种久违的轻松。",
      "",
      "至少，你不必再记住两个版本的真相了。",
      "",
      "......",
      "",
      "三个月后，你被调到了另一个部门。",
      "王总在调令上写了一句话：",
      "",
      "「这个人犯了错，但他敢认错。」",
      "",
      "这是你能得到的最好的评价。",
      "",
      "【结局：裂痕】",
      "你失去了一些东西，但你保住了自己。"
    ]
  },

  honest_fired: {
    id: "honest_fired",
    title: "结局：代价",
    condition: { selfDeception: -20, trust: 10 },
    content: [
      "你被辞退了。",
      "",
      "公司需要一个替罪羊。",
      "你的诚实，让你成为了最容易牺牲的那一个。",
      "",
      "......",
      "",
      "收拾东西的那天，小林来帮你。",
      "",
      "「......对不起。」他说。",
      "",
      "「不是你的错。」你说。",
      "",
      "......",
      "",
      "你走出公司大门，阳光很刺眼。",
      "你失去了一份工作。",
      "但你保住了一种能力——",
      "那种坦然面对自己的能力。",
      "",
      "【结局：代价】",
      "诚实是有代价的。但你付得起。"
    ]
  },

  // 自欺路线
  deception_cocoon: {
    id: "deception_cocoon",
    title: "结局：茧",
    condition: { selfDeception: 40, trust: -10 },
    content: [
      "你保住了工作。",
      "",
      "你的叙事，说服了所有人。",
      "",
      "......",
      "",
      "但那天晚上，你躺在床上，脑子里不断回放那些对话。",
      "你开始分不清，哪些是事实，哪些是你「选择相信」的版本。",
      "",
      "......",
      "",
      "几个月后，又一个项目出了问题。",
      "你又一次站在王总办公室里。",
      "",
      "你熟练地开始构建另一个叙事。",
      "",
      "......",
      "",
      "你已经不记得，上一次诚实地面对自己，是什么时候了。",
      "",
      "【结局：茧】",
      "你成功说服了所有人。包括你自己。"
    ]
  },

  deception_exposed: {
    id: "deception_exposed",
    title: "结局：崩塌",
    condition: { selfDeception: 30, realityPressure: 50 },
    content: [
      "你的叙事，最终还是撑不住了。",
      "",
      "小林的邮件记录。HR的调查。陈静的证词。",
      "所有你试图解释过去的东西，最终都成了你的罪证。",
      "",
      "......",
      "",
      "你被辞退了。",
      "",
      "更重要的是——",
      "所有人都知道，你撒谎了。",
      "",
      "同事们看你的眼神，从回避变成了鄙视。",
      "",
      "......",
      "",
      "你走出公司，不知道该怎么面对下一份工作。",
      "不知道该怎么面对自己。",
      "",
      "【结局：崩塌】",
      "谎言的代价，是信任的彻底丧失。"
    ]
  },

  // 模糊路线
  gray_compromise: {
    id: "gray_compromise",
    title: "结局：交易",
    condition: { selfDeception: 15, trust: -15 },
    content: [
      "你和小林达成了默契。",
      "",
      "他没有把事情说得太难听。",
      "你也给了他一些......承诺。",
      "",
      "......",
      "",
      "最终，问责在一片模糊中不了了之。",
      "",
      "你保住了工作。",
      "但小林申请了调岗。",
      "其他同事看你的眼神，也变得有些奇怪。",
      "",
      "......",
      "",
      "你赢了这场博弈。",
      "但你不知道，自己输了什么。",
      "",
      "【结局：交易】",
      "所有人都假装相信。包括你。"
    ]
  },

  gray_peace: {
    id: "gray_peace",
    title: "结局：和解",
    condition: { selfDeception: 5, trust: 10 },
    content: [
      "你没有被降职，也没有被表扬。",
      "",
      "王总在会议上说：",
      "「这次事故，责任是多方面的。」",
      "「我们会吸取教训。」",
      "",
      "......",
      "",
      "事情就这样过去了。",
      "",
      "你不知道这是好是坏。",
      "但至少，你学到了一些东西。",
      "",
      "关于叙事。关于选择。关于面对。",
      "",
      "......",
      "",
      "也许，下次你会做得更好。",
      "",
      "【结局：和解】",
      "没有完美的答案。但你找到了一个可以接受的。"
    ]
  },

  // 困惑路线
  lost_drift: {
    id: "lost_drift",
    title: "结局：迷雾",
    condition: { selfDeception: 0, trust: 0 },
    content: [
      "你不知道该怎么回答。",
      "",
      "......",
      "",
      "王总叹了口气。",
      "",
      "「你还没想清楚。」",
      "",
      "你没有被辞退，但被调离了项目经理的岗位。",
      "",
      "......",
      "",
      "你不知道自己是对是错。",
      "你不知道自己有没有撒谎。",
      "你不知道，接下来该怎么办。",
      "",
      "也许，有些问题，永远没有答案。",
      "",
      "【结局：迷雾】",
      "你还在寻找答案的路上。"
    ]
  }
};

// ============================================
// 导出数据
// ============================================

const GameData = {
  config: GAME_CONFIG,
  characters: CHARACTERS,
  stats: STATS,
  scenes: SCENES,
  endings: ENDINGS
};
