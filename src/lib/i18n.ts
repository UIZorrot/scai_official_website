import { shouldKeepEnglish } from "./utils";

// 多语言资源
export const resources = {
  en: {
    home: {
      title: "SCAI - Scientific AI Collaboration Framework",
      subtitle: "Building scientific AI agent networks to accelerate research breakthroughs",
      tokenButton: "Learn about our token",
      networkStats: "Network Stats",
      stakingData: "Staking Data",
      totalStaked: "Total Staked",
      currentRewards: "Current Rewards",
      paperData: "Paper Data",
      totalPapers: "Total Papers",
      lastMonth: "Last Month",
      tokenomics: "Tokenomics",
      totalBurned: "Total Burned",
      foundationFunds: "Foundation Funds",
      roadmap: "Project Roadmap",
      joinCommunity: "Join our research community"
    },
    storage: {
      uploadPanel: "Upload Panel",
      dragDrop: "Drag & drop files here",
      orClick: "or click to browse",
      selectFiles: "Select Files",
      signUpload: "Sign & Upload",
      connectWallet: "Connect Wallet",
      uploadHistory: "Upload History",
      storageNodes: "Storage Nodes",
      nodeDetails: "Node Details",
      location: "Location",
      capacity: "Capacity",
      status: "Status",
      coordinates: "Coordinates"
    },
    common: {
      loading: "Loading...",
      error: "Error",
      retry: "Retry",
      noData: "No data available",
      success: "Success",
      warning: "Warning",
      info: "Information"
    },
    token: {
      title: "Token Allocation Model",
      allocationDetails: "Allocation Details",
      governance: "Governance",
      staking: "Staking",
      tokenomics: "Tokenomics",
      proposals: "Active Proposals",
      vote: "Vote",
      stake: "Stake",
      unstake: "Unstake",
      connectWallet: "Connect Wallet",
      stakingRewards: "Staking Rewards",
      yourStake: "Your Stake",
      totalStaked: "Total Staked",
      apy: "APY"
    },
    // 其他页面的英文翻译...
  },
  zh: {
    home: {
      title: "SCAI - 科学AI协作框架",
      subtitle: "构建科学AI代理网络，加速科研突破",
      tokenButton: "了解我们的虚拟货币",
      networkStats: "网络统计",
      stakingData: "质押数据",
      totalStaked: "总质押量",
      currentRewards: "当前奖励",
      paperData: "论文数据",
      totalPapers: "总论文数",
      lastMonth: "上月新增",
      tokenomics: "代币经济",
      totalBurned: "总燃烧量",
      foundationFunds: "基金会资金",
      roadmap: "项目路线图",
      joinCommunity: "加入我们的科研社区"
    },
    storage: {
      uploadPanel: "上传面板",
      dragDrop: "拖拽文件到此处",
      orClick: "或点击浏览",
      selectFiles: "选择文件",
      signUpload: "签名并上传",
      connectWallet: "连接钱包",
      uploadHistory: "上传历史",
      storageNodes: "存储节点",
      nodeDetails: "节点详情",
      location: "位置",
      capacity: "容量",
      status: "状态",
      coordinates: "坐标"
    },
    common: {
      loading: "加载中...",
      error: "错误",
      retry: "重试",
      noData: "暂无数据",
      success: "成功",
      warning: "警告",
      info: "信息"
    },
    token: {
      title: "代币分配模型",
      allocationDetails: "分配详情",
      governance: "治理",
      staking: "质押",
      tokenomics: "代币经济",
      proposals: "活跃提案",
      vote: "投票",
      stake: "质押",
      unstake: "解除质押",
      connectWallet: "连接钱包",
      stakingRewards: "质押奖励",
      yourStake: "您的质押",
      totalStaked: "总质押量",
      apy: "年化收益率"
    },
    // 其他页面的中文翻译...
  }
};

// 翻译缓存，提高性能
const translationCache = new Map<string, string>();

// 获取翻译文本 - 优化版本
export function t(key: string, language: 'en' | 'zh'): string {
  // 创建缓存键
  const cacheKey = `${language}:${key}`;

  // 检查缓存
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  try {
    let result: string = key;

    // 检查嵌套键 (例如 'home.title')
    const keys = key.split('.');
    let value: any = resources[language];

    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }

    // 如果找到翻译，使用翻译
    if (value && typeof value === 'string') {
      result = value;
    } else if (shouldKeepEnglish(key)) {
      // 如果没有找到翻译但是英文词汇，保持原样
      result = key;
    } else {
      // 返回原始键
      result = key;
    }

    // 缓存结果
    translationCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Translation error:', error);
    // 缓存错误结果，避免重复错误
    translationCache.set(cacheKey, key);
    return key;
  }
}

// 清除翻译缓存（在语言切换时可能需要）
export function clearTranslationCache() {
  translationCache.clear();
}

// 处理包含特定词汇的文本 - 优化版本
export function translateText(text: string, language: 'en' | 'zh'): string {
  // 使用优化的 t 函数，它已经包含了缓存和错误处理
  return t(text, language);
}

// 批量翻译函数，用于优化多个翻译的性能
export function translateBatch(keys: string[], language: 'en' | 'zh'): Record<string, string> {
  const results: Record<string, string> = {};

  for (const key of keys) {
    results[key] = t(key, language);
  }

  return results;
}

// 预加载常用翻译，提高首次渲染性能
export function preloadTranslations(keys: string[], language: 'en' | 'zh') {
  for (const key of keys) {
    t(key, language); // 这会将翻译添加到缓存中
  }
}
