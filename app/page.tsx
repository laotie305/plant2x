"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Sparkles, 
  Calculator, 
  Play, 
  RotateCw, 
  Trophy, 
  Plus, 
  Minus, 
  Info, 
  Check, 
  X, 
  Scale, 
  Award, 
  Flame, 
  ChevronRight, 
  Download, 
  RefreshCw, 
  Skull, 
  Compass,
  FileText,
  UserCheck
} from "lucide-react";
import { MATH_UNITS, MathUnit } from "@/lib/mathData";

// --- SVG Icons representing PvZ classical/Journey to the West elements ---
function SvgAvatar({ type, className = "w-16 h-16" }: { type: string; className?: string }) {
  switch (type) {
    case "sunflower":
      return (
        <svg viewBox="0 0 100 100" className={className}>
          {/* Petals */}
          <circle cx="50" cy="50" r="15" fill="#e07a5f" />
          <g fill="#f4a261">
            <path d="M50 15 C55 30, 45 30, 50 15 Z" />
            <path d="M50 85 C55 70, 45 70, 50 85 Z" />
            <path d="M15 50 C30 55, 30 45, 15 50 Z" />
            <path d="M85 50 C70 55, 70 45, 85 50 Z" />
            <path d="M25 25 C38 38, 32 44, 25 25 Z" />
            <path d="M75 75 C62 62, 68 56, 75 75 Z" />
            <path d="M25 75 C38 62, 32 56, 25 75 Z" />
            <path d="M75 25 C62 38, 68 44, 75 25 Z" />
          </g>
          {/* Face */}
          <circle cx="50" cy="50" r="22" fill="#e9c46a" stroke="#8c6d1d" strokeWidth="2" />
          {/* Face details */}
          <circle cx="42" cy="46" r="3" fill="#264653" />
          <circle cx="58" cy="46" r="3" fill="#264653" />
          <path d="M44 58 Q50 64 56 58" stroke="#264653" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Classical hairbun/crown accent for Ancient theme */}
          <path d="M50 18 L50 24" stroke="#d4af37" strokeWidth="4" />
          <circle cx="50" cy="17" r="4" fill="#e76f51" />
        </svg>
      );
    case "repeater":
      return (
        <svg viewBox="0 0 100 100" className={className}>
          {/* Leaf base */}
          <path d="M20 80 Q50 70 80 80" stroke="#2a9d8f" strokeWidth="4" fill="none" />
          {/* Head */}
          <rect x="35" y="30" width="30" height="30" rx="10" fill="#2a9d8f" stroke="#1c665e" strokeWidth="3" />
          {/* Twin Barrels */}
          <rect x="65" y="35" width="20" height="8" rx="2" fill="#264653" />
          <rect x="65" y="47" width="20" height="8" rx="2" fill="#264653" />
          {/* Ancient Soldier Helmet */}
          <path d="M30 32 Q50 15 70 32 L70 25 Q50 5 30 25 Z" fill="#e76f51" stroke="#a24832" strokeWidth="2" />
          <circle cx="50" cy="10" r="3" fill="#d4af37" />
          {/* Eyes */}
          <circle cx="45" cy="42" r="4" fill="#fff" />
          <circle cx="45" cy="42" r="2" fill="#000" />
          <circle cx="58" cy="42" r="4" fill="#fff" />
          <circle cx="58" cy="42" r="2" fill="#000" />
        </svg>
      );
    case "movement":
      return (
        <svg viewBox="0 0 100 100" className={className}>
          {/* Symmetrical Chomper jaws */}
          <path d="M25 45 C25 20, 75 20, 75 45 Z" fill="#9b5de5" stroke="#5f27cd" strokeWidth="2" />
          <path d="M25 45 C25 70, 75 70, 75 45 Z" fill="#9b5de5" stroke="#5f27cd" strokeWidth="2" />
          {/* Teeth */}
          <polygon points="35,35 40,43 45,35" fill="#fff" />
          <polygon points="55,35 60,43 65,35" fill="#fff" />
          <polygon points="35,55 40,47 45,55" fill="#fff" />
          <polygon points="55,55 60,47 65,55" fill="#fff" />
          {/* Spinning leaf back */}
          <circle cx="50" cy="50" r="8" fill="#e29578" />
          <path d="M50 50 C70 30, 80 50, 50 50 Z" fill="#00bbf9" opacity="0.8" />
          <path d="M50 50 C30 70, 20 50, 50 50 Z" fill="#00bbf9" opacity="0.8" />
        </svg>
      );
    case "icepea":
      return (
        <svg viewBox="0 0 100 100" className={className}>
          {/* Ice head */}
          <circle cx="50" cy="50" r="22" fill="#a8dadc" stroke="#457b9d" strokeWidth="3" />
          {/* Ice Spikes */}
          <polygon points="28,35 15,25 35,28" fill="#457b9d" />
          <polygon points="50,28 50,8 55,28" fill="#457b9d" />
          {/* Martial Arts Headband */}
          <rect x="26" y="36" width="48" height="6" fill="#1d3557" />
          {/* Barrel */}
          <rect x="68" y="44" width="18" height="12" rx="3" fill="#457b9d" />
          {/* Eyes */}
          <circle cx="45" cy="46" r="4" fill="#1d3557" />
          <circle cx="58" cy="46" r="4" fill="#1d3557" />
        </svg>
      );
    case "cornpult":
      return (
        <svg viewBox="0 0 100 100" className={className}>
          {/* Base */}
          <ellipse cx="50" cy="80" rx="30" ry="10" fill="#f4a261" />
          {/* Wooden Catapult Arm */}
          <rect x="46" y="35" width="8" height="40" fill="#e76f51" />
          {/* Golden Corn Head */}
          <rect x="36" y="15" width="28" height="20" rx="10" fill="#e9c46a" stroke="#d4af37" strokeWidth="2" />
          <circle cx="44" cy="22" r="2" fill="#264653" />
          <circle cx="56" cy="22" r="2" fill="#264653" />
          {/* Yellow Butter slice */}
          <rect x="38" y="8" width="24" height="8" rx="2" fill="#ffd166" />
        </svg>
      );
    case "potatomine":
      return (
        <svg viewBox="0 0 100 100" className={className}>
          {/* Soil mounds */}
          <ellipse cx="50" cy="85" rx="35" ry="10" fill="#8c6d1d" />
          {/* Potato body */}
          <rect x="35" y="45" width="30" height="35" rx="12" fill="#e29578" stroke="#a24832" strokeWidth="2" />
          {/* Daoist Cap */}
          <polygon points="40,45 50,30 60,45" fill="#3d3d3d" />
          <circle cx="50" cy="25" r="4" fill="#e76f51" />
          {/* Blinking red antenna */}
          <line x1="50" y1="30" x2="50" y2="15" stroke="#e76f51" strokeWidth="3" />
          <circle cx="50" cy="12" r="5" fill="#e63946" />
          {/* Eyes */}
          <circle cx="45" cy="55" r="3" fill="#000" />
          <circle cx="55" cy="55" r="3" fill="#000" />
        </svg>
      );
    case "gargantuar":
      return (
        <svg viewBox="0 0 100 100" className={className}>
          {/* Giant horns */}
          <path d="M25 35 Q10 15 20 5 Q32 20 35 35 Z" fill="#606c38" stroke="#283618" strokeWidth="2" />
          <path d="M75 35 Q90 15 80 5 Q68 20 65 35 Z" fill="#606c38" stroke="#283618" strokeWidth="2" />
          {/* Red feather crown */}
          <path d="M50 35 Q50 5 60 10 Q50 20 50 35" stroke="#e63946" strokeWidth="4" fill="none" />
          {/* Head & shoulders */}
          <rect x="25" y="32" width="50" height="50" rx="15" fill="#606c38" stroke="#283618" strokeWidth="3" />
          {/* Glowing yellow eyes */}
          <circle cx="40" cy="48" r="7" fill="#f9bec7" />
          <circle cx="40" cy="48" r="4" fill="#ffd166" />
          <circle cx="60" cy="48" r="7" fill="#f9bec7" />
          <circle cx="60" cy="48" r="4" fill="#ffd166" />
          {/* Sharp teeth */}
          <path d="M35 68 L40 62 L45 68 L50 62 L55 68 L60 62 L65 68" stroke="#fff" strokeWidth="3" fill="none" />
          {/* White fur mantle */}
          <ellipse cx="50" cy="80" rx="32" ry="12" fill="#f1faee" stroke="#b7b7a4" strokeWidth="2" />
        </svg>
      );
    case "squash":
      return (
        <svg viewBox="0 0 100 100" className={className}>
          {/* Ancient stone tablet outline (Squash) */}
          <path d="M30 20 L70 20 L80 80 L20 80 Z" fill="#2a9d8f" stroke="#1c665e" strokeWidth="4" />
          {/* Furious forehead creases */}
          <path d="M38 35 Q50 45 62 35" stroke="#264653" strokeWidth="3" fill="none" />
          {/* Glowing angry eyes */}
          <polygon points="35,42 45,45 40,50" fill="#fff" stroke="#e63946" strokeWidth="2" />
          <polygon points="65,42 55,45 60,50" fill="#fff" stroke="#e63946" strokeWidth="2" />
          {/* Stone carvings (Taishan runes) */}
          <text x="40" y="70" fill="#d4af37" fontSize="12" fontWeight="bold" fontFamily="serif">泰山</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" className={className}>
          {/* Ancient Bagua Taoist Disk */}
          <circle cx="50" cy="50" r="40" fill="#1d3557" stroke="#e76f51" strokeWidth="3" />
          <path d="M50 10 A20 20 0 0 0 50 50 A20 20 0 0 1 50 90 A40 40 0 0 0 50 10 Z" fill="#f1faee" />
          <circle cx="50" cy="30" r="6" fill="#1d3557" />
          <circle cx="50" cy="70" r="6" fill="#f1faee" />
        </svg>
      );
  }
}

export default function Home() {
  // --- View states ---
  // Mode: 'poster' (大图鉴主海报), 'challenge' (数学御尸挑战), 'factory' (图鉴工坊)
  const [activeTab, setActiveTab] = useState<'poster' | 'challenge' | 'factory'>('poster');
  const [selectedUnitId, setSelectedUnitId] = useState<number>(1);
  const currentUnit = MATH_UNITS.find(u => u.id === selectedUnitId) || MATH_UNITS[0];

  // --- Sandbox interactive states ---
  // Unit 1: Vote State
  const [votes, setVotes] = useState({ peashooter: 10, wallnut: 6, cherry: 3 });
  const addVote = (type: 'peashooter' | 'wallnut' | 'cherry') => {
    setVotes(prev => ({ ...prev, [type]: prev[type] + 1 }));
  };
  const resetVotes = () => {
    setVotes({ peashooter: 10, wallnut: 6, cherry: 3 });
  };

  // Convert number to "正" character strokes representation
  const renderZheng = (num: number) => {
    const fullZheng = Math.floor(num / 5);
    const remainder = num % 5;
    let strokes = "";
    for (let i = 0; i < fullZheng; i++) strokes += "正 ";
    if (remainder === 1) strokes += "一";
    else if (remainder === 2) strokes += "丅";
    else if (remainder === 3) strokes += "下";
    else if (remainder === 4) strokes += "𤴓"; // approximate or simplified 
    return strokes || "暂无";
  };

  // Unit 2: Equal sharing slider
  const [sharingPeas, setSharingPeas] = useState<number>(12);
  const [zombieCount, setZombieCount] = useState<number>(3);
  const eachGet = Math.floor(sharingPeas / zombieCount);
  const isEqualShare = sharingPeas % zombieCount === 0;

  // Unit 3: Geometry movement demo
  const [movementType, setMovementType] = useState<'symmetric' | 'translate' | 'rotate'>('symmetric');
  const [translateActive, setTranslateActive] = useState<boolean>(false);

  // Unit 4: Division 2 - multiply match game
  const [div2Index, setDiv2Index] = useState<number>(0);
  const [div2Status, setDiv2Status] = useState<'idle' | 'success' | 'fail'>('idle');
  const div2Questions = [
    { div: "56 ÷ 8", ans: 7, formula: "七八五十六" },
    { div: "63 ÷ 9", ans: 7, formula: "七九六十三" },
    { div: "48 ÷ 6", ans: 8, formula: "六八四十八" },
    { div: "72 ÷ 8", ans: 9, formula: "八九七十二" }
  ];
  const checkDiv2Ans = (selectedFormula: string) => {
    if (selectedFormula === div2Questions[div2Index].formula) {
      setDiv2Status('success');
      setTimeout(() => {
        setDiv2Index(prev => (prev + 1) % div2Questions.length);
        setDiv2Status('idle');
      }, 1500);
    } else {
      setDiv2Status('fail');
      setTimeout(() => setDiv2Status('idle'), 1000);
    }
  };

  // Unit 5: Mixed Arithmetic Chain
  const [mixedAnswer, setMixedAnswer] = useState<string>("");
  const [mixedStatus, setMixedStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const checkMixed = () => {
    if (Number(mixedAnswer) === 17) {
      setMixedStatus('correct');
    } else {
      setMixedStatus('wrong');
    }
  };

  // Unit 6: Remainder Sandbox
  const [remainderMines, setRemainderMines] = useState<number>(14);
  const remainderDivisor = 4;
  const remainderQuotient = Math.floor(remainderMines / remainderDivisor);
  const remainderVal = remainderMines % remainderDivisor;

  // Unit 7: Place value abacus
  const [placeValues, setPlaceValues] = useState({ wan: 0, qian: 9, bai: 0, shi: 0, ge: 5 });
  const getAbacusNumber = () => {
    return placeValues.wan * 10000 + placeValues.qian * 1000 + placeValues.bai * 100 + placeValues.shi * 10 + placeValues.ge;
  };
  const getAbacusChinese = () => {
    const num = getAbacusNumber();
    if (num === 0) return "零";
    
    // Custom 2nd grade style chinese reading
    let s = "";
    if (placeValues.wan > 0) s += placeValues.wan + "万";
    if (placeValues.qian > 0) {
      s += placeValues.qian + "千";
    } else if (placeValues.wan > 0 && (placeValues.bai > 0 || placeValues.shi > 0 || placeValues.ge > 0)) {
      s += "零";
    }
    
    if (placeValues.bai > 0) {
      s += placeValues.bai + "百";
    } else if (placeValues.qian > 0 && (placeValues.shi > 0 || placeValues.ge > 0)) {
      if (!s.endsWith("零")) s += "零";
    }

    if (placeValues.shi > 0) {
      s += placeValues.shi + "十";
    } else if (placeValues.bai > 0 && placeValues.ge > 0) {
      if (!s.endsWith("零")) s += "零";
    }

    if (placeValues.ge > 0) {
      s += placeValues.ge;
    }
    return s.replace(/零零/g, "零");
  };
  const modifyAbacus = (place: 'wan' | 'qian' | 'bai' | 'shi' | 'ge', delta: number) => {
    setPlaceValues(prev => {
      const val = prev[place] + delta;
      if (val < 0 || val > 9) return prev;
      return { ...prev, [place]: val };
    });
  };

  // Unit 8: Grams Pan Balance
  const [scaleLeft, setScaleLeft] = useState<'cherry' | 'squash' | 'club'>('cherry');
  const [scaleWeights, setScaleWeights] = useState<number[]>([]);
  const weightMap = { cherry: 50, squash: 4000, club: 150000 };
  const leftWeight = weightMap[scaleLeft];
  const rightWeight = scaleWeights.reduce((a, b) => a + b, 0);
  const weightDelta = leftWeight - rightWeight; // positive means left heavier, negative means right heavier
  const addWeight = (w: number) => {
    setScaleWeights(prev => [...prev, w]);
  };
  const clearWeights = () => setScaleWeights([]);

  // Unit 9: Reasoning grid solver
  const [reasoningGrid, setReasoningGrid] = useState<{ [key: string]: 'yes' | 'no' | null }>({
    'niujiao-axe': null, 'niujiao-club': null, 'niujiao-silk': null,
    'hongqi-axe': null, 'hongqi-club': null, 'hongqi-silk': null,
    'tongling-axe': null, 'tongling-club': null, 'tongling-silk': null,
  });
  const toggleReasoning = (zombie: string, item: string) => {
    const key = `${zombie}-${item}`;
    setReasoningGrid(prev => {
      const current = prev[key];
      let next: 'yes' | 'no' | null = null;
      if (current === null) next = 'no';
      else if (current === 'no') next = 'yes';
      return { ...prev, [key]: next };
    });
  };
  const checkReasoningSolved = () => {
    // Correct solution:
    // 红旗 = 绸, 牛角 = 棒, 铜铃 = 斧
    const isCorrect = 
      reasoningGrid['hongqi-silk'] === 'yes' &&
      reasoningGrid['hongqi-axe'] === 'no' &&
      reasoningGrid['hongqi-club'] === 'no' &&
      reasoningGrid['niujiao-club'] === 'yes' &&
      reasoningGrid['niujiao-axe'] === 'no' &&
      reasoningGrid['niujiao-silk'] === 'no' &&
      reasoningGrid['tongling-axe'] === 'yes' &&
      reasoningGrid['tongling-club'] === 'no' &&
      reasoningGrid['tongling-silk'] === 'no';
    return isCorrect;
  };

  // --- Challenge mode (Quiz Game) states ---
  const [gameState, setGameState] = useState<'start' | 'playing' | 'ended'>('start');
  const [gameLevel, setGameLevel] = useState<number>(1);
  const [gameScore, setGameScore] = useState<number>(0);
  const [zombieDistance, setZombieDistance] = useState<number>(100); // 100% is safe, 0% is eaten
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');
  const [selectedAns, setSelectedAns] = useState<number | null>(null);

  const activeChallengeUnit = MATH_UNITS[gameLevel - 1] || MATH_UNITS[0];

  const handleStartGame = () => {
    setGameLevel(1);
    setGameScore(0);
    setZombieDistance(100);
    setFeedback('none');
    setSelectedAns(null);
    setGameState('playing');
  };

  const submitAnswer = (optionIdx: number) => {
    setSelectedAns(optionIdx);
    if (optionIdx === activeChallengeUnit.quiz.answer) {
      setFeedback('correct');
      setGameScore(prev => prev + 10);
      // Push zombie back visual effect
      setZombieDistance(prev => Math.min(100, prev + 15));
    } else {
      setFeedback('wrong');
      // Zombie advances
      setZombieDistance(prev => Math.max(0, prev - 25));
    }

    setTimeout(() => {
      setSelectedAns(null);
      setFeedback('none');
      if (gameLevel < 9) {
        setGameLevel(prev => prev + 1);
      } else {
        setGameState('ended');
      }
    }, 2500);
  };

  // --- Card Factory AI generator states ---
  const [customRoleName, setCustomRoleName] = useState<string>("");
  const [customUnitId, setCustomUnitId] = useState<number>(6);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [factoryResult, setFactoryResult] = useState<any | null>(null);
  const [factoryMessage, setFactoryMessage] = useState<string>("");

  const pregeneratedCards = [
    {
      name: "烈焰仙桃",
      title: "蟠桃会护印大仙",
      style: "西游天庭风",
      combatStat: "火法输出: 500",
      highlights: ["将战斗阳光分为有余数的分块进行配比", "余数必小于发射消耗，严谨控能", "设计极佳的递推雷击区"],
      supplementary: "由 烈焰仙桃 友情讲解。专为人教版二年级下册数学设计。",
      story: "烈焰仙桃在太上老君的炉火旁修炼，善于将火苗排成队列。当它准备发动大招攻击八戒僵尸时，他把23颗仙丹塞进法器，每个大招要吃5颗。‘23除以5等于4余3，余下的这3颗在手里流转，果然小于除数5！’",
      formula: "23 ÷ 5 = 4 …… 3",
      exampleProblem: "烈焰仙桃有 31 片仙叶，每 6 片合成一个金甲御盾。最多可以合成多少个金甲御盾？还剩几片仙叶？",
      exampleAnswer: "解答：31 ÷ 6 = 5（个）…… 1（片）。最多可以合成 5 个金甲御盾，还剩下 1 片仙叶。余数 1 比除数 6 小，完全符合规律！"
    },
    {
      name: "三太子火爆辣椒",
      title: "红孩儿座前急先锋",
      style: "唐风火焰神将",
      combatStat: "瞬间爆轰力: 10000",
      highlights: ["在十字型格子中完美演绎垂直与水平平移", "用乘除混算瞬间提升战场引爆速率", "算无余漏，克尽全功"],
      supplementary: "由 三太子火爆辣椒 倾情推算。典藏数学画报系列。",
      story: "火爆辣椒穿着红孩儿赐予的莲花兜，脾气极为暴躁。它在火焰山前一字排开阻击牛角僵尸，他算计着：‘我带了4组灵火符，每组8张，又借来5张，一共 4×8+5=37 张。’ 先乘后加，一瞬间把对面僵尸烧成黑炭！",
      formula: "4 × 8 + 5 = 32 + 5 = 37",
      exampleProblem: "火爆辣椒有 3 盒火爆符，每盒 9 张。送给寒冰射手 12 张防身，它还剩多少张？写出综合算式计算。",
      exampleAnswer: "解答：综合算式为 3 × 9 - 12 = 27 - 12 = 15（张）。还剩下 15 张火爆符。"
    }
  ];

  const handleGenerateCustomCard = async () => {
    if (!customRoleName.trim()) return;
    setIsGenerating(true);
    setFactoryResult(null);
    setFactoryMessage("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plantName: customRoleName, unitId: customUnitId })
      });
      const resData = await response.json();
      if (resData.success) {
        setFactoryResult(resData.data);
        if (resData.isDemo) {
          setFactoryMessage(resData.message);
        }
      } else {
        setFactoryMessage(resData.error || "生成失败，已转为演示示例");
        setFactoryResult(pregeneratedCards[0]);
      }
    } catch (err) {
      console.error(err);
      setFactoryMessage("请求异常，展示预载卡片。");
      setFactoryResult(pregeneratedCards[0]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#2D5A27] text-white text-sm pb-12 relative font-sans">
      
      {/* Sunflower Gold Top Border */}
      <div id="bronze-header-border" className="h-4 bg-gradient-to-r from-[#FFEB3B] via-[#4CAF50] to-[#FFEB3B] border-b-4 border-[#3D7A36] sticky top-0 z-50 shadow-md"></div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 pt-6">

        {/* Bento Grid Header Section */}
        <header id="main-header" className="flex flex-col md:flex-row items-center justify-between bg-[#1E3F1B] border-4 border-[#3D7A36] rounded-3xl p-6 shadow-2xl relative overflow-hidden mb-8 gap-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFEB3B] opacity-10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-[#FFEB3B] rounded-full border-4 border-[#FBC02D] flex items-center justify-center text-3xl shadow-inner animate-pulse shrink-0">🌻</div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-[#FFEB3B] drop-shadow-md">
                植物大战僵尸 · 数学大图鉴
              </h1>
              <p className="text-[#A5D6A7] font-bold text-base md:text-lg mt-1">
                人教版小学二年级下册 · 知识科普与防线演练全攻略
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <div className="px-5 py-1.5 bg-[#795548] border-b-4 border-[#5D4037] rounded-xl font-bold text-white text-xs md:text-sm">难度等级：⭐⭐</div>
            <div className="px-5 py-1.5 bg-[#4CAF50] border-b-4 border-[#388E3C] rounded-xl font-bold text-white text-xs md:text-sm">版本：人教2024</div>
            <div className="px-5 py-1.5 bg-[#FF9800] border-b-4 border-[#F57C00] rounded-xl font-bold text-white text-xs md:text-sm">模式：Bento 智能图鉴</div>
          </div>
        </header>

        {/* Navigation Tab Bar */}
        <div id="nav-tabs" className="flex flex-wrap justify-center gap-3 mb-8 max-w-full">
          <button
            id="tab-poster"
            onClick={() => setActiveTab('poster')}
            className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center space-x-2 border-b-4 cursor-pointer text-sm ${
              activeTab === 'poster'
                ? 'bg-[#FFEB3B] text-[#795548] border-[#FBC02D] shadow-lg translate-y-[-2px]'
                : 'bg-[#1E3F1B] text-[#A5D6A7] border-[#3D7A36] hover:bg-[#22471f] hover:text-white font-bold'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>📚 传世大图鉴海报</span>
          </button>
          <button
            id="tab-challenge"
            onClick={() => setActiveTab('challenge')}
            className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center space-x-2 border-b-4 cursor-pointer text-sm ${
              activeTab === 'challenge'
                ? 'bg-[#FFEB3B] text-[#795548] border-[#FBC02D] shadow-lg translate-y-[-2px]'
                : 'bg-[#1E3F1B] text-[#A5D6A7] border-[#3D7A36] hover:bg-[#22471f] hover:text-white font-bold'
            }`}
          >
            <Skull className="w-4 h-4" />
            <span>⚡ 数学御尸大挑战</span>
          </button>
          <button
            id="tab-factory"
            onClick={() => setActiveTab('factory')}
            className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center space-x-2 border-b-4 cursor-pointer text-sm ${
              activeTab === 'factory'
                ? 'bg-[#FFEB3B] text-[#795548] border-[#FBC02D] shadow-lg translate-y-[-2px]'
                : 'bg-[#1E3F1B] text-[#A5D6A7] border-[#3D7A36] hover:bg-[#22471f] hover:text-white font-bold'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>🎨 图鉴工坊 (AI 扩充)</span>
          </button>
        </div>

        {/* --- VIEW 1: THE MASTER SCROLL POSTER --- */}
        {activeTab === 'poster' && (
          <div id="view-poster-container" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Sidebar Column: Scroll of Chapters */}
            <div id="chapter-list-sidebar" className="lg:col-span-4 bg-[#1a1e16] border-2 border-[#453412]/50 p-4 rounded-lg shadow-xl">
              <h2 className="text-lg font-bold font-serif text-[#d4af37] mb-4 border-b border-[#453412] pb-2 flex items-center space-x-2">
                <span>🏮</span>
                <span>九大数学秘卷</span>
              </h2>
              
              <div className="flex flex-col gap-2 max-h-[550px] overflow-y-auto pr-1">
                {MATH_UNITS.map((unit) => (
                  <button
                    id={`btn-unit-${unit.id}`}
                    key={unit.id}
                    onClick={() => setSelectedUnitId(unit.id)}
                    className={`text-left p-3.5 rounded-2xl transition-all duration-200 border-b-4 cursor-pointer flex items-center justify-between ${
                      selectedUnitId === unit.id
                        ? 'bg-[#FFEB3B] text-[#795548] border-[#FBC02D] shadow-md'
                        : 'bg-[#2D5A27] text-white border-[#3D7A36] hover:bg-[#34672d]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                        selectedUnitId === unit.id ? 'bg-[#795548] text-[#FFEB3B]' : 'bg-[#1E3F1B] text-[#A5D6A7]'
                      }`}>
                        {unit.id}
                      </div>
                      <div>
                        <div className={`text-[10px] font-bold ${selectedUnitId === unit.id ? 'text-[#795548]/80' : 'text-[#A5D6A7]'}`}>{unit.unitNum}</div>
                        <div className="font-bold">{unit.title}</div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                      selectedUnitId === unit.id ? 'translate-x-1 text-[#795548]' : 'text-[#A5D6A7]/50'
                    }`} />
                  </button>
                ))}
              </div>

              {/* Quick Field Guide Mnemonic Callout */}
              <div id="sidebar-mnemonic-box" className="mt-6 bg-[#FF9800] border-4 border-[#F57C00] rounded-2xl p-4 text-white shadow-md font-bold">
                <div className="font-black text-[#FFEB3B] flex items-center space-x-1.5 mb-1 text-sm">
                  <span>✨</span>
                  <span>古法御数总纲</span>
                </div>
                <p className="text-xs leading-relaxed">
                  二下数学重基础，除法平分先记牢。
                  <br />
                  万数认读看零位，余数必比除数小！
                </p>
              </div>
            </div>

            {/* Main Interactive Poster Column */}
            <div id="poster-main-scroll" className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedUnitId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#FFFFFF] text-[#2E7D32] rounded-3xl border-4 border-[#8BC34A] shadow-2xl overflow-hidden"
                >
                  {/* Bento Header */}
                  <div className="bg-[#F1F8E9] border-b-4 border-[#8BC34A] px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-[#4CAF50] text-white px-3 py-1 font-bold text-xs rounded-xl shadow">
                        【{currentUnit.unitNum}】
                      </div>
                      <h2 className="text-2xl font-black text-[#1B5E20] tracking-wide">
                        {currentUnit.title}
                      </h2>
                    </div>
                    <div className="text-xs font-bold text-[#FF9800] border-2 border-[#FF9800]/40 px-3 py-1 rounded-xl bg-[#FFF3E0]">
                      守护神仙：{currentUnit.character.name}（{currentUnit.character.style}）
                    </div>
                  </div>

                  {/* Poster Content Area */}
                  <div className="p-6 space-y-6">
                    
                    {/* Block 1: Overview & Concept Mnemonic */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      {/* Left: The Illustrated Portrait of the Character */}
                      <div className="bg-[#8BC34A] border-4 border-[#689F38] rounded-3xl p-5 flex flex-col items-center justify-center relative group shadow-lg">
                        <div className="absolute top-3 left-3 text-[10px] bg-[#1B5E20] text-white px-2 py-0.5 rounded-full font-bold">
                          {currentUnit.character.role === 'plant' ? '守护植物' : '入侵僵尸'}
                        </div>
                        <div className="w-24 h-24 bg-white rounded-full border-4 border-[#FFEB3B] p-1 flex items-center justify-center mb-3 shadow-inner group-hover:scale-105 transition-transform duration-300">
                          <SvgAvatar type={currentUnit.character.avatarSvg} className="w-20 h-20" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-black text-xl text-[#1B5E20]">{currentUnit.character.name}</h3>
                          <p className="text-xs text-[#1B5E20]/80 font-bold mt-0.5">{currentUnit.character.title}</p>
                          <div className="mt-2 bg-[#FFEB3B] text-[#795548] px-3 py-1 rounded-xl text-xs font-bold border-2 border-[#FBC02D] inline-block shadow-sm">
                            {currentUnit.character.combatStat}
                          </div>
                        </div>
                      </div>

                      {/* Right 2/3: Mnemonic & Academic Concept */}
                      <div className="md:col-span-2 space-y-4 flex flex-col justify-between">
                        <div className="bg-[#795548] border-4 border-[#5D4037] p-5 rounded-3xl text-white shadow-lg flex flex-col justify-center">
                          <div className="font-bold text-[#FFEB3B] text-sm flex items-center space-x-2 mb-1.5">
                            <span>📜</span>
                            <span>御数天罡口诀</span>
                          </div>
                          <p className="font-serif italic font-bold text-lg text-white tracking-wider leading-relaxed">
                            “ {currentUnit.mnemonic} ”
                          </p>
                        </div>

                        <div className="bg-[#FFFFFF] border-4 border-[#8BC34A] p-5 rounded-3xl text-[#2E7D32] shadow-md flex-1 flex flex-col justify-center">
                          <h4 className="font-black text-xs text-[#4CAF50] uppercase tracking-wide mb-1 flex items-center space-x-1">
                            <Info className="w-3.5 h-3.5 text-[#4CAF50]" />
                            <span>核心知识点解析</span>
                          </h4>
                          <p className="text-xs text-[#2E7D32]/90 leading-relaxed font-bold">
                            {currentUnit.concept}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Block 2: Field Highlights & Supplementary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Highlights */}
                      <div className="bg-[#F1F8E9] border-4 border-[#C5E1A5] p-5 rounded-3xl shadow-sm text-[#2E7D32]">
                        <h4 className="font-black text-sm text-[#2E7D32] mb-3 flex items-center space-x-1.5 border-b-2 border-[#C5E1A5] pb-2">
                          <span>🎯</span>
                          <span>图鉴亮点信息 (Highlights)</span>
                        </h4>
                        <ul className="space-y-2 text-xs">
                          {currentUnit.highlights.map((hl, i) => (
                            <li key={i} className="flex items-start space-x-1.5">
                              <span className="text-[#4CAF50] font-bold mt-0.5">✦</span>
                              <span className="font-bold">{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Supplementary Info */}
                      <div className="bg-[#DCEDC8] border-4 border-[#A5D6A7] p-5 rounded-3xl shadow-sm text-[#1B5E20] flex flex-col justify-between">
                        <div>
                          <h4 className="font-black text-sm text-[#1B5E20] mb-2 flex items-center space-x-1.5">
                            <span>🏮</span>
                            <span>探考辅助说明 (Guides)</span>
                          </h4>
                          <p className="text-xs leading-relaxed font-bold">
                            {currentUnit.supplementary}
                          </p>
                        </div>
                        <div className="mt-3 text-[10px] text-[#795548] text-right font-bold italic">
                          —— 《戴夫战术算筹真经》 卷二
                        </div>
                      </div>
                    </div>

                    {/* Block 3: Interactive Sandbox component of each Unit */}
                    <div className="bg-[#FFFFFF] border-4 border-[#4CAF50] p-6 rounded-3xl shadow-xl text-[#2E7D32]">
                      <div className="flex justify-between items-center mb-4 border-b-2 border-[#C5E1A5] pb-2">
                        <h4 className="font-black text-base text-[#1B5E20] flex items-center space-x-2">
                          <Calculator className="w-5 h-5 text-[#4CAF50]" />
                          <span>法阵沙盘实时演练 (Interactive Sandbox)</span>
                        </h4>
                        <span className="text-[10px] text-white bg-[#4CAF50] px-3 py-1 rounded-full font-bold">
                          二年级数学交互模块
                        </span>
                      </div>

                      {/* Render sandbox dynamically based on unit type */}
                      <div className="min-h-[160px] flex items-center justify-center">
                        
                        {/* Unit 1: Vote Sandbox */}
                        {currentUnit.sandboxType === 'vote' && (
                          <div className="w-full text-center space-y-4">
                            <p className="text-xs text-[#2E7D32]/80 font-bold">请在下方为备战植物投票。我们将实时绘制“正”字图鉴和柱状图表数据：</p>
                            
                            <div className="grid grid-cols-3 gap-4">
                              <button
                                onClick={() => addVote('peashooter')}
                                className="bg-[#DCEDC8] hover:bg-[#C5E1A5] p-4 rounded-2xl border-2 border-[#8BC34A] transition text-center cursor-pointer font-bold text-[#1B5E20] shadow-sm"
                              >
                                <div className="text-xs font-bold">豌豆射手</div>
                                <div className="text-xl font-black text-[#E64A19] mt-1">{votes.peashooter} 票</div>
                                <div className="text-xs font-mono text-white bg-[#795548] px-2 py-1 rounded-xl mt-2 min-h-[1.75rem] flex items-center justify-center border border-[#5D4037] shadow-inner">
                                  {renderZheng(votes.peashooter)}
                                </div>
                              </button>
                              <button
                                onClick={() => addVote('wallnut')}
                                className="bg-[#DCEDC8] hover:bg-[#C5E1A5] p-4 rounded-2xl border-2 border-[#8BC34A] transition text-center cursor-pointer font-bold text-[#1B5E20] shadow-sm"
                              >
                                <div className="text-xs font-bold">坚果墙</div>
                                <div className="text-xl font-black text-[#E64A19] mt-1">{votes.wallnut} 票</div>
                                <div className="text-xs font-mono text-white bg-[#795548] px-2 py-1 rounded-xl mt-2 min-h-[1.75rem] flex items-center justify-center border border-[#5D4037] shadow-inner">
                                  {renderZheng(votes.wallnut)}
                                </div>
                              </button>
                              <button
                                onClick={() => addVote('cherry')}
                                className="bg-[#DCEDC8] hover:bg-[#C5E1A5] p-4 rounded-2xl border-2 border-[#8BC34A] transition text-center cursor-pointer font-bold text-[#1B5E20] shadow-sm"
                              >
                                <div className="text-xs font-bold">樱桃炸弹</div>
                                <div className="text-xl font-black text-[#E64A19] mt-1">{votes.cherry} 票</div>
                                <div className="text-xs font-mono text-white bg-[#795548] px-2 py-1 rounded-xl mt-2 min-h-[1.75rem] flex items-center justify-center border border-[#5D4037] shadow-inner">
                                  {renderZheng(votes.cherry)}
                                </div>
                              </button>
                            </div>

                            {/* Simulated chart */}
                            <div className="bg-[#F1F8E9] p-4 rounded-2xl border-2 border-[#C5E1A5] shadow-sm">
                              <div className="flex items-end justify-around h-28 pt-4 border-b-2 border-[#C5E1A5]">
                                <div className="flex flex-col items-center w-12">
                                  <div className="text-xs font-black text-[#2E7D32] mb-1">{votes.peashooter}</div>
                                  <div className="bg-[#4CAF50] border-2 border-[#388E3C] w-6 rounded-t-lg transition-all duration-300" style={{ height: `${Math.min(75, votes.peashooter * 3.5)}px` }}></div>
                                  <div className="text-[10px] text-[#2E7D32]/80 mt-1 font-bold">豌豆</div>
                                </div>
                                <div className="flex flex-col items-center w-12">
                                  <div className="text-xs font-black text-[#2E7D32] mb-1">{votes.wallnut}</div>
                                  <div className="bg-[#FF9800] border-2 border-[#F57C00] w-6 rounded-t-lg transition-all duration-300" style={{ height: `${Math.min(75, votes.wallnut * 3.5)}px` }}></div>
                                  <div className="text-[10px] text-[#2E7D32]/80 mt-1 font-bold">坚果</div>
                                </div>
                                <div className="flex flex-col items-center w-12">
                                  <div className="text-xs font-black text-[#2E7D32] mb-1">{votes.cherry}</div>
                                  <div className="bg-[#E64A19] border-2 border-[#BF360C] w-6 rounded-t-lg transition-all duration-300" style={{ height: `${Math.min(75, votes.cherry * 3.5)}px` }}></div>
                                  <div className="text-[10px] text-[#2E7D32]/80 mt-1 font-bold">樱桃</div>
                                </div>
                              </div>
                              <div className="flex justify-between items-center mt-3 px-2">
                                <span className="text-[10px] text-[#2E7D32] font-bold">统计分析：坚果墙最硬，当前最充足。</span>
                                <button onClick={resetVotes} className="text-[11px] text-red-600 font-bold cursor-pointer hover:underline flex items-center space-x-1">
                                  <RotateCw className="w-3 h-3" /> <span>重置统计</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Unit 2: Equal sharing sandbox */}
                        {currentUnit.sandboxType === 'divide-1' && (
                          <div className="w-full space-y-4">
                            <div className="bg-[#F1F8E9] p-3 rounded-2xl border-2 border-[#C5E1A5] text-center">
                              <span className="font-bold text-sm text-[#2E7D32]">
                                战况：12 颗双发豌豆，分给 3 只持鱼/红旗/铜铃僵尸
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-4 p-2">
                              <div className="flex-1">
                                <label className="text-xs font-bold text-[#2E7D32] block mb-1">
                                  豌豆总量：{sharingPeas} 颗
                                </label>
                                <input 
                                  type="range" 
                                  min="3" 
                                  max="24" 
                                  step="3"
                                  value={sharingPeas} 
                                  onChange={(e) => setSharingPeas(Number(e.target.value))}
                                  className="w-full accent-[#4CAF50]"
                                />
                              </div>
                              <div className="flex-1">
                                <label className="text-xs font-bold text-[#2E7D32] block mb-1">
                                  僵尸个数：{zombieCount} 只
                                </label>
                                <input 
                                  type="range" 
                                  min="2" 
                                  max="6" 
                                  value={zombieCount} 
                                  onChange={(e) => setZombieCount(Number(e.target.value))}
                                  className="w-full accent-[#4CAF50]"
                                />
                              </div>
                            </div>

                            <div className="bg-white p-4 rounded-2xl border-4 border-[#8BC34A] flex flex-col items-center justify-center shadow-md">
                              <div className="text-lg font-black text-center text-[#1B5E20]">
                                {sharingPeas} ÷ {zombieCount} = {eachGet} {sharingPeas % zombieCount !== 0 && `余 ${sharingPeas % zombieCount}`}
                              </div>
                              <div className="text-xs text-gray-500 mt-2 flex items-center space-x-2">
                                {isEqualShare ? (
                                  <span className="text-emerald-700 font-bold flex items-center">
                                    <Check className="w-3.5 h-3.5 mr-1" />
                                    正好平均分！每只僵尸分到 {eachGet} 颗豌豆。
                                  </span>
                                ) : (
                                  <span className="text-red-700 font-bold flex items-center">
                                    <X className="w-3.5 h-3.5 mr-1" />
                                    不能平均分！还剩 {sharingPeas % zombieCount} 颗没分完。
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Unit 3: Geometry movement sandbox */}
                        {currentUnit.sandboxType === 'geometry' && (
                          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                            <div className="flex flex-col gap-2">
                              <button
                                onClick={() => setMovementType('symmetric')}
                                className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer border-b-4 ${
                                  movementType === 'symmetric'
                                    ? 'bg-[#4CAF50] text-white border-[#388E3C] shadow-md'
                                    : 'bg-[#F1F8E9] text-[#2E7D32] border-[#C5E1A5] hover:bg-[#DCEDC8]'
                                }`}
                              >
                                🦋 轴对称 (折叠完全重合)
                              </button>
                              <button
                                onClick={() => {
                                  setMovementType('translate');
                                  setTranslateActive(true);
                                  setTimeout(() => setTranslateActive(false), 2000);
                                }}
                                className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer border-b-4 ${
                                  movementType === 'translate'
                                    ? 'bg-[#4CAF50] text-white border-[#388E3C] shadow-md'
                                    : 'bg-[#F1F8E9] text-[#2E7D32] border-[#C5E1A5] hover:bg-[#DCEDC8]'
                                }`}
                              >
                                🚠 平移 (沿直线移动方向不变)
                              </button>
                              <button
                                onClick={() => setMovementType('rotate')}
                                className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer border-b-4 ${
                                  movementType === 'rotate'
                                    ? 'bg-[#4CAF50] text-white border-[#388E3C] shadow-md'
                                    : 'bg-[#F1F8E9] text-[#2E7D32] border-[#C5E1A5] hover:bg-[#DCEDC8]'
                                }`}
                              >
                                🎡 旋转 (绕着一个点转圈)
                              </button>
                            </div>

                            <div className="md:col-span-2 bg-[#1E3F1B] h-40 rounded-3xl border-4 border-[#3D7A36] flex items-center justify-center relative overflow-hidden shadow-inner">
                              
                              {/* Axis line for symmetry */}
                              {movementType === 'symmetric' && (
                                <>
                                  <div className="absolute left-1/2 top-0 bottom-0 border-r-2 border-dashed border-red-500 z-10"></div>
                                  <div className="absolute left-1/2 -translate-x-1/2 top-1.5 text-[8px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold uppercase">
                                    对称轴
                                  </div>
                                  <div className="flex gap-12">
                                    <div className="transform scale-x-100 transition-all duration-300">
                                      <SvgAvatar type="movement" className="w-16 h-16" />
                                    </div>
                                    <div className="transform -scale-x-100 transition-all duration-300">
                                      <SvgAvatar type="movement" className="w-16 h-16" />
                                    </div>
                                  </div>
                                </>
                              )}

                              {/* Translation box */}
                              {movementType === 'translate' && (
                                <motion.div 
                                  animate={translateActive ? { x: [ -120, 120 ] } : { x: 0 }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                  className="flex flex-col items-center justify-center"
                                >
                                  <SvgAvatar type="gargantuar" className="w-16 h-16" />
                                  <span className="text-[10px] text-[#A5D6A7] font-bold">直线滑动中...</span>
                                </motion.div>
                              )}

                              {/* Rotation box */}
                              {movementType === 'rotate' && (
                                <div className="flex flex-col items-center justify-center">
                                  <div className="animate-spin" style={{ animationDuration: '3s' }}>
                                    <SvgAvatar type="movement" className="w-16 h-16" />
                                  </div>
                                  <span className="text-[10px] text-[#A5D6A7] mt-2 font-bold">叶片高速旋转</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Unit 4: Division II */}
                        {currentUnit.sandboxType === 'divide-2' && (
                          <div className="w-full text-center space-y-4">
                            <p className="text-xs text-[#2E7D32]/80 font-bold">
                              战况：僵尸首领正提着铜铃叫嚣。请选出对应的口诀，计算算式来冰冻他！
                            </p>
                            
                            <div className="bg-[#E0F2F1] py-4 rounded-2xl border-2 border-[#4DB6AC] flex items-center justify-center gap-4 shadow-sm">
                              <SvgAvatar type="gargantuar" className="w-10 h-10 animate-bounce" />
                              <div className="text-xl font-black text-[#00695C]">
                                战鼓命令：{div2Questions[div2Index].div} = ?
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {["七八五十六", "七九六十三", "六八四十八", "八九七十二"].map((f) => (
                                <button
                                  key={f}
                                  onClick={() => checkDiv2Ans(f)}
                                  className="bg-[#DCEDC8] hover:bg-[#C5E1A5] p-3 rounded-2xl text-xs font-bold text-[#1B5E20] border-2 border-[#8BC34A] transition cursor-pointer shadow-sm"
                                >
                                  {f}
                                </button>
                              ))}
                            </div>

                            <div className="h-6 text-xs font-bold">
                              {div2Status === 'success' && <span className="text-emerald-600">★ 回答正确！僵尸首领已被寒冰冻结！即将换下一题...</span>}
                              {div2Status === 'fail' && <span className="text-red-600">⚠ 口诀配对错误！再想一想！</span>}
                              {div2Status === 'idle' && <span className="text-gray-400">选择正确口诀以发动攻击</span>}
                            </div>
                          </div>
                        )}

                        {/* Unit 5: Mixed calculations */}
                        {currentUnit.sandboxType === 'mixed' && (
                          <div className="w-full space-y-4">
                            <div className="bg-[#F1F8E9] border-2 border-[#C5E1A5] p-3 rounded-2xl text-center text-xs text-[#2E7D32] font-bold">
                              玉米投手发射了 3 排玉米粒，每排有 4 个，另外还加上一个 5 攻击力的黄油。
                            </div>

                            <div className="flex items-center justify-center gap-3">
                              <div className="bg-[#DCEDC8] px-4 py-2 rounded-2xl font-bold text-sm text-[#1B5E20] border-2 border-[#8BC34A]">3 × 4 + 5</div>
                              <div className="text-[#2E7D32] font-black">=</div>
                              <input 
                                type="number" 
                                placeholder="输入答案" 
                                value={mixedAnswer}
                                onChange={(e) => setMixedAnswer(e.target.value)}
                                className="w-28 px-3 py-2 bg-white border-2 border-[#8BC34A] text-[#2E7D32] rounded-xl text-center text-sm font-bold focus:outline-none focus:border-[#4CAF50]"
                              />
                              <button 
                                onClick={checkMixed}
                                className="bg-[#FF9800] hover:bg-[#F57C00] text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer border-b-4 border-[#E65100] transition active:translate-y-0.5 shadow-md"
                              >
                                发射黄油
                              </button>
                            </div>

                            <div className="text-center text-xs font-bold h-4">
                              {mixedStatus === 'correct' && <span className="text-emerald-700">✓ 正确！计算顺序先乘法后加减，先算 12 + 5 = 17！</span>}
                              {mixedStatus === 'wrong' && <span className="text-red-600">❌ 算式攻击打偏！先算乘法 3 × 4，再加 5 哦！</span>}
                            </div>
                          </div>
                        )}

                        {/* Unit 6: Remainder sandbox */}
                        {currentUnit.sandboxType === 'remainder' && (
                          <div className="w-full space-y-4">
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex-1">
                                <label className="text-xs font-bold text-[#2E7D32] block mb-1">
                                  土豆地雷库存数量：{remainderMines} 个
                                </label>
                                <input 
                                  type="range" 
                                  min="4" 
                                  max="20" 
                                  value={remainderMines} 
                                  onChange={(e) => setRemainderMines(Number(e.target.value))}
                                  className="w-full accent-[#4CAF50]"
                                />
                              </div>
                              <div className="bg-white p-3 rounded-2xl border-2 border-[#8BC34A] text-center min-w-[120px]">
                                <div className="text-[10px] text-gray-500 font-bold">每排固定种植 4 个</div>
                                <div className="text-base font-black text-[#E64A19]">
                                  余数 = {remainderVal}
                                </div>
                              </div>
                            </div>

                            <div className="bg-[#F1F8E9] border-2 border-[#C5E1A5] p-3 rounded-2xl text-center text-xs text-[#2E7D32] font-bold">
                              <strong>算式：</strong> {remainderMines} ÷ {remainderDivisor} = {remainderQuotient}（排） …… <span className="text-red-600 font-black">{remainderVal}（个）</span>
                            </div>

                            {/* visual represent of mines layout */}
                            <div className="grid grid-cols-4 gap-2 max-w-[240px] mx-auto bg-[#FFF3E0] p-3 rounded-2xl border-2 border-[#FFB74D]">
                              {Array.from({ length: remainderMines }).map((_, i) => {
                                const isLeftover = i >= remainderQuotient * remainderDivisor;
                                return (
                                  <div 
                                    key={i} 
                                    className={`h-8 w-8 rounded-full flex items-center justify-center text-base font-bold border-2 transition ${
                                      isLeftover 
                                        ? 'bg-[#FFEB3B] border-[#FFC107] text-[#FF5722] shadow animate-pulse' 
                                        : 'bg-[#A5D6A7] border-[#4CAF50] text-[#1B5E20]'
                                    }`}
                                  >
                                    💣
                                  </div>
                                );
                              })}
                            </div>

                            <div className="text-[10px] text-gray-500 text-center font-bold">
                              闪烁圈代表不够再种一排而剩下来的余数（{remainderVal}）。余数（{remainderVal}）永远小于除数（{remainderDivisor}）！
                            </div>
                          </div>
                        )}

                        {/* Unit 7: Numbers sandbox */}
                        {currentUnit.sandboxType === 'numbers' && (
                          <div className="w-full space-y-4">
                            <p className="text-xs text-[#2E7D32]/80 text-center font-bold">
                              点击增减珠算盘，读出对应的万以内僵尸血量，体验大数字的大小组成：
                            </p>

                            <div className="bg-[#1E3F1B] p-4 rounded-3xl border-4 border-[#3D7A36] grid grid-cols-5 gap-2 text-center shadow-lg">
                              {(['wan', 'qian', 'bai', 'shi', 'ge'] as const).map((place) => {
                                const labels = { wan: '万位', qian: '千位', bai: '百位', shi: '十位', ge: '个位' };
                                return (
                                  <div key={place} className="flex flex-col items-center">
                                    <span className="text-[10px] text-[#A5D6A7] font-bold mb-1.5">{labels[place]}</span>
                                    <button 
                                      onClick={() => modifyAbacus(place, 1)}
                                      className="bg-[#4CAF50] hover:bg-[#388E3C] border-b-2 border-[#1B5E20] text-white w-7 h-7 rounded-xl flex items-center justify-center font-black cursor-pointer shadow-sm text-sm active:translate-y-0.5"
                                    >
                                      +
                                    </button>
                                    <div className="my-2 text-lg font-black text-[#FFEB3B] font-mono">
                                      {placeValues[place]}
                                    </div>
                                    <button 
                                      onClick={() => modifyAbacus(place, -1)}
                                      className="bg-[#FF9800] hover:bg-[#F57C00] border-b-2 border-[#B33F00] text-white w-7 h-7 rounded-xl flex items-center justify-center font-black cursor-pointer shadow-sm text-sm active:translate-y-0.5"
                                    >
                                      -
                                    </button>
                                  </div>
                                );
                              })}
                            </div>

                            <div className="bg-white p-4 rounded-2xl border-4 border-[#8BC34A] text-center shadow-md">
                              <div className="text-xs text-gray-500 font-bold">阿拉伯数字：<span className="font-mono font-black text-base text-[#E64A19]">{getAbacusNumber()}</span></div>
                              <div className="text-sm font-black text-[#1B5E20] mt-1.5">国语读数：{getAbacusChinese()}</div>
                            </div>
                          </div>
                        )}

                        {/* Unit 8: Grams sandbox */}
                        {currentUnit.sandboxType === 'grams' && (
                          <div className="w-full space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F1F8E9] p-4 rounded-3xl border-2 border-[#C5E1A5] items-end">
                              
                              {/* Selection of left weight */}
                              <div className="space-y-1">
                                <span className="text-[11px] font-bold text-[#2E7D32] block">1. 选择天平左侧植物：</span>
                                <select 
                                  value={scaleLeft} 
                                  onChange={(e: any) => setScaleLeft(e.target.value)}
                                  className="w-full bg-white border-2 border-[#8BC34A] text-xs p-2 rounded-xl text-[#2E7D32] font-bold outline-none focus:border-[#4CAF50]"
                                >
                                  <option value="cherry">🍒 樱桃炸弹 (50 克)</option>
                                  <option value="squash">🍈 倭瓜大仙 (4 千克 = 4000 克)</option>
                                  <option value="club">🔨 僵尸玄铁大槌 (150 千克)</option>
                                </select>
                              </div>

                              {/* Weights options */}
                              <div className="space-y-1">
                                <span className="text-[11px] font-bold text-[#2E7D32] block">2. 投放右侧金砝码：</span>
                                <div className="grid grid-cols-3 gap-1.5">
                                  {[50, 1000, 4000].map((w) => (
                                    <button
                                      key={w}
                                      onClick={() => addWeight(w)}
                                      className="bg-[#DCEDC8] hover:bg-[#C5E1A5] border-b-2 border-[#8BC34A] p-2 rounded-xl text-[10px] font-bold text-[#1B5E20] text-center cursor-pointer shadow-sm"
                                    >
                                      +{w >= 1000 ? `${w/1000}kg` : `${w}g`}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Scale Status */}
                              <div className="flex flex-col justify-end">
                                <button
                                  onClick={clearWeights}
                                  className="w-full bg-[#E64A19] hover:bg-[#D84315] border-b-2 border-[#BF360C] text-white p-2 rounded-xl text-xs font-bold cursor-pointer transition text-center shadow-md"
                                >
                                  🧹 清除砝码
                                </button>
                              </div>
                            </div>

                            {/* Visual balance diagram */}
                            <div className="bg-[#1E3F1B] h-28 rounded-3xl border-4 border-[#3D7A36] relative overflow-hidden flex flex-col justify-end p-2.5 text-center shadow-inner">
                              <div className="text-white text-xs font-bold mb-1">
                                天平秤重：左侧 <span className="text-[#FFEB3B] font-black">{leftWeight >= 1000 ? `${leftWeight/1000}kg` : `${leftWeight}g`}</span> vs 
                                右侧 <span className="text-[#FFEB3B] font-black">{rightWeight >= 1000 ? `${rightWeight/1000}kg` : `${rightWeight}g`}</span>
                              </div>

                              <div className="flex justify-around items-end h-16 relative">
                                {/* Pan Balance Beam pivot */}
                                <div className="absolute left-1/2 bottom-0 w-1 h-12 bg-[#8BC34A] origin-bottom"></div>
                                
                                {/* Left Pan */}
                                <motion.div 
                                  animate={{ y: weightDelta > 0 ? 10 : weightDelta < 0 ? -10 : 0 }}
                                  className="bg-[#2D5A27] w-16 p-1 rounded-t-xl border-t-4 border-[#FFEB3B] shadow-inner"
                                >
                                  <span className="text-[10px] text-[#A5D6A7] font-bold">Left</span>
                                </motion.div>

                                {/* Right Pan */}
                                <motion.div 
                                  animate={{ y: weightDelta < 0 ? 10 : weightDelta > 0 ? -10 : 0 }}
                                  className="bg-[#2D5A27] w-16 p-1 rounded-t-xl border-t-4 border-[#FFEB3B] shadow-inner"
                                >
                                  <span className="text-[10px] text-[#A5D6A7] font-bold">Right</span>
                                </motion.div>
                              </div>

                              <div className="text-[10px] text-[#A5D6A7] mt-2 font-bold">
                                {weightDelta === 0 ? "⚖ 完美天平平衡！1千克等于1000克！" : weightDelta > 0 ? "◀ 左侧太重啦，继续增加右侧砝码！" : "▶ 右侧砝码超重啦！"}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Unit 9: Reasoning logic grid */}
                        {currentUnit.sandboxType === 'reasoning' && (
                          <div className="w-full space-y-3">
                            <div className="bg-[#FFF3E0] p-3 rounded-2xl border-2 border-[#FFB74D] text-[11px] text-[#E65100] leading-normal font-bold">
                              <strong>线索列表：</strong>
                              <br />1. 牛角说：我没拿宣花大斧。
                              <br />2. 红旗说：我拿的既不是宣花大斧，也不是混元铁棒。
                              <br />（提示：点击空格打 ❌ 排除可能性，点击打 ✔ 锁定正确组合）
                            </div>

                            <div className="grid grid-cols-4 gap-1.5 text-center text-[11px] font-bold">
                              {/* Header row */}
                              <div className="font-bold text-gray-500 flex items-center justify-center">角色 \ 至宝</div>
                              <div className="font-bold text-[#E65100] bg-[#FFF3E0] p-1 rounded-lg">🪓 宣花大斧</div>
                              <div className="font-bold text-[#E65100] bg-[#FFF3E0] p-1 rounded-lg">🏏 混元铁棒</div>
                              <div className="font-bold text-[#E65100] bg-[#FFF3E0] p-1 rounded-lg">🎗 赤羽红绸</div>

                              {/* Row 1: 牛角 */}
                              <div className="font-bold flex items-center justify-center bg-gray-100 p-2 rounded-lg text-gray-700">牛角僵尸</div>
                              {['axe', 'club', 'silk'].map((item) => {
                                const key = `niujiao-${item}`;
                                const state = reasoningGrid[key];
                                return (
                                  <button
                                    key={item}
                                    onClick={() => toggleReasoning('niujiao', item)}
                                    className="bg-white hover:bg-gray-50 h-10 border-2 border-gray-200 rounded-xl flex items-center justify-center font-black text-sm cursor-pointer shadow-sm"
                                  >
                                    {state === 'yes' ? '✔' : state === 'no' ? '❌' : ''}
                                  </button>
                                );
                              })}

                              {/* Row 2: 红旗 */}
                              <div className="font-bold flex items-center justify-center bg-gray-100 p-2 rounded-lg text-gray-700">红旗僵尸</div>
                              {['axe', 'club', 'silk'].map((item) => {
                                const key = `hongqi-${item}`;
                                const state = reasoningGrid[key];
                                return (
                                  <button
                                    key={item}
                                    onClick={() => toggleReasoning('hongqi', item)}
                                    className="bg-white hover:bg-gray-50 h-10 border-2 border-gray-200 rounded-xl flex items-center justify-center font-black text-sm cursor-pointer shadow-sm"
                                  >
                                    {state === 'yes' ? '✔' : state === 'no' ? '❌' : ''}
                                  </button>
                                );
                              })}

                              {/* Row 3: 铜铃 */}
                              <div className="font-bold flex items-center justify-center bg-gray-100 p-2 rounded-lg text-gray-700">铜铃僵尸</div>
                              {['axe', 'club', 'silk'].map((item) => {
                                const key = `tongling-${item}`;
                                const state = reasoningGrid[key];
                                return (
                                  <button
                                    key={item}
                                    onClick={() => toggleReasoning('tongling', item)}
                                    className="bg-white hover:bg-gray-50 h-10 border-2 border-gray-200 rounded-xl flex items-center justify-center font-black text-sm cursor-pointer shadow-sm"
                                  >
                                    {state === 'yes' ? '✔' : state === 'no' ? '❌' : ''}
                                  </button>
                                );
                              })}
                            </div>

                            <div className="text-center">
                              {checkReasoningSolved() ? (
                                <div className="text-xs text-emerald-700 font-bold bg-[#E8F5E9] p-2 rounded-xl inline-block border border-emerald-300">
                                  🎉 破案！推理大师！红旗拿赤羽红绸，牛角拿混元铁棒，铜铃拿宣花大斧！
                                </div>
                              ) : (
                                <div className="text-xs text-gray-500 font-bold">
                                  加油！推导完全部真理时会触发高光显示。
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                      </div>
                    </div>

                    {/* Block 4: Detailed Example Math Question */}
                    <div className="bg-[#FFF3E0] border-4 border-[#FFB74D] p-5 rounded-3xl shadow-md">
                      <h4 className="font-black text-base text-[#E65100] mb-3 flex items-center space-x-1.5 border-b-2 border-[#FFE0B2] pb-2">
                        <span>📝</span>
                        <span>图鉴题海演练 (Exemplar Question)</span>
                      </h4>
                      <div className="space-y-3 text-xs">
                        <div className="bg-white p-4 rounded-2xl border-2 border-[#FFE0B2] shadow-sm">
                          <strong className="text-red-600">【应用题例】</strong>
                          <span className="text-gray-700 font-bold ml-1 leading-relaxed">
                            {currentUnit.exampleProblem}
                          </span>
                        </div>
                        <div className="bg-[#FFF8E1] p-4 rounded-2xl border-2 border-[#FFE082] shadow-sm">
                          <strong className="text-emerald-700">【详尽解答】</strong>
                          <p className="text-[#1B5E20] font-bold whitespace-pre-line mt-1">
                            {currentUnit.exampleAnswer}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* --- VIEW 2: INTERACTIVE BATTLE ARENA (QUIZ) --- */}
        {activeTab === 'challenge' && (
          <div id="view-challenge-container" className="max-w-3xl mx-auto bg-[#FFFFFF] border-4 border-[#8BC34A] p-6 rounded-3xl shadow-2xl relative overflow-hidden text-[#2E7D32]">
            
            <div className="absolute top-3 right-3 bg-[#E64A19] text-white font-bold px-3 py-1 rounded-full text-xs">
              数学防线战
            </div>

            <h2 className="text-2xl font-black text-[#1B5E20] text-center mb-6 pb-1">
              🦁 数学御尸大挑战 (PEP人教版通关)
            </h2>

            {gameState === 'start' && (
              <div className="text-center py-12 space-y-6">
                <p className="text-sm text-[#2E7D32]/80 max-w-md mx-auto leading-relaxed font-bold">
                  这是一场脑力与战术的终极拼杀！共 9 大关卡，分别对应二年级下册的九大数学单元。每答对一题，防御植物发射子弹，击退进攻的僵尸！如果僵尸近身，防御失败。
                </p>
                <button
                  id="btn-start-challenge"
                  onClick={handleStartGame}
                  className="bg-[#FFEB3B] hover:bg-[#FBC02D] text-[#795548] font-bold px-8 py-4 rounded-2xl text-lg border-b-4 border-[#FBC02D] cursor-pointer transition shadow-xl"
                >
                  ⚔ 开启御数防线 ⚔
                </button>
              </div>
            )}

            {gameState === 'playing' && (
              <div className="space-y-6">
                
                {/* Visual Lane & Zombie distance bar */}
                <div className="bg-[#F1F8E9] p-4 rounded-3xl border-2 border-[#C5E1A5] relative shadow-inner">
                  <div className="flex justify-between text-[11px] text-[#2E7D32]/80 mb-2 font-bold">
                    <span>🏠 戴夫的南瓜屋</span>
                    <span>僵尸进攻路线</span>
                    <span>🧟 铜铃牛角僵尸群</span>
                  </div>

                  <div className="h-12 bg-gradient-to-r from-[#C8E6C9] via-[#FFF9C4] to-[#FFCDD2] rounded-2xl border-2 border-[#81C784] relative overflow-hidden flex items-center">
                    
                    {/* Pea shooter layout */}
                    <div className="absolute left-4">
                      <SvgAvatar type="repeater" className="w-8 h-8 animate-pulse" />
                    </div>

                    {/* Approaching Zombie based on distance state */}
                    <motion.div 
                      animate={{ left: `${zombieDistance}%` }}
                      transition={{ type: "spring", stiffness: 60 }}
                      className="absolute -translate-x-1/2 flex flex-col items-center"
                      style={{ left: `${zombieDistance}%` }}
                    >
                      <SvgAvatar type="gargantuar" className="w-10 h-10" />
                      <div className="h-2 w-8 bg-red-600 rounded-full overflow-hidden mt-0.5 border border-white">
                        <div className="h-full bg-[#4CAF50]" style={{ width: `${zombieDistance}%` }}></div>
                      </div>
                    </motion.div>

                    {/* Trigger animation overlay on feedback */}
                    {feedback === 'correct' && (
                      <div className="absolute inset-0 bg-emerald-500/30 flex items-center justify-center font-black text-emerald-800 text-xs tracking-widest uppercase">
                        💥 完美打击！豌豆齐射！
                      </div>
                    )}
                    {feedback === 'wrong' && (
                      <div className="absolute inset-0 bg-red-600/30 flex items-center justify-center font-black text-red-800 text-xs tracking-widest uppercase">
                        ⚠️ 攻击落空！僵尸向前跃进！
                      </div>
                    )}

                  </div>
                </div>

                {/* Score and level details */}
                <div className="flex justify-between items-center bg-[#DCEDC8] px-4 py-3 rounded-2xl border-2 border-[#A5D6A7] text-xs font-bold text-[#1B5E20]">
                  <div>
                    <span>当前波次：</span>
                    <strong className="text-[#FF9800] font-black">{activeChallengeUnit.unitNum} - {activeChallengeUnit.title}</strong>
                  </div>
                  <div>
                    <span>防线得分：</span>
                    <strong className="text-[#FF5722] font-black text-sm">{gameScore} pts</strong>
                  </div>
                </div>

                {/* Question scroll box */}
                <div className="bg-[#FFFFFF] text-[#2E7D32] p-5 rounded-3xl border-4 border-[#4CAF50] shadow-lg">
                  <div className="text-[11px] text-[#4CAF50] font-bold uppercase tracking-wider mb-1">
                    关卡挑战题：
                  </div>
                  <h3 className="text-base font-black text-[#1B5E20] leading-relaxed mb-4">
                    {activeChallengeUnit.quiz.question}
                  </h3>

                  {/* Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeChallengeUnit.quiz.options.map((opt, idx) => {
                      const isSelected = selectedAns === idx;
                      const isCorrect = idx === activeChallengeUnit.quiz.answer;
                      
                      let btnStyle = "bg-[#F1F8E9] text-[#2E7D32] border-[#C5E1A5] hover:bg-[#DCEDC8] border-b-4";
                      if (selectedAns !== null) {
                        if (isCorrect) {
                          btnStyle = "bg-[#C8E6C9] border-[#4CAF50] text-[#1B5E20] border-b-4";
                        } else if (isSelected) {
                          btnStyle = "bg-[#FFCDD2] border-[#E57373] text-[#B71C1C] border-b-4";
                        } else {
                          btnStyle = "bg-white opacity-40 border-gray-200 text-gray-400 border-b-4";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={selectedAns !== null}
                          onClick={() => submitAnswer(idx)}
                          className={`p-3.5 rounded-2xl border-2 text-left text-xs font-bold transition-all duration-200 cursor-pointer ${btnStyle}`}
                        >
                          {String.fromCharCode(65 + idx)}. {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Answer Feedback Description */}
                {selectedAns !== null && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-2xl border-2 text-xs leading-normal font-bold ${
                      selectedAns === activeChallengeUnit.quiz.answer 
                        ? 'bg-[#E8F5E9] border-[#A5D6A7] text-[#2E7D32]' 
                        : 'bg-[#FFEBEE] border-[#FFCDD2] text-[#C62828]'
                    }`}
                  >
                    <strong>天罡算理：</strong> {activeChallengeUnit.quiz.explanation}
                  </motion.div>
                )}

              </div>
            )}

            {gameState === 'ended' && (
              <div className="text-center py-10 space-y-6">
                <div className="w-20 h-20 bg-[#FFF9C4] rounded-full flex items-center justify-center mx-auto border-4 border-[#FFEB3B] text-[#FF9800] shadow-md animate-bounce">
                  <Trophy className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-black text-[#1B5E20]">
                  🏆 守城大捷！荣获【数学大宗师】勋章
                </h3>
                <p className="text-sm text-[#2E7D32]/80 max-w-md mx-auto leading-relaxed font-bold">
                  你完美破解了九大数学战阵，击退了全部入侵僵尸！你的算理精巧，防御森严。
                </p>

                <div className="bg-[#F1F8E9] py-4 rounded-2xl max-w-sm mx-auto border-2 border-[#C5E1A5] shadow-sm">
                  <span className="text-xs text-[#2E7D32] font-bold block">防线总战绩</span>
                  <strong className="text-3xl text-[#FF9800] font-black">{gameScore} / 90 分</strong>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={handleStartGame}
                    className="bg-[#FFEB3B] hover:bg-[#FBC02D] text-[#795548] font-bold px-5 py-3 rounded-xl border-b-4 border-[#FBC02D] cursor-pointer transition text-xs shadow-md"
                  >
                    🔄 重新推演大阵
                  </button>
                  <button
                    onClick={() => setActiveTab('poster')}
                    className="bg-[#F1F8E9] hover:bg-[#DCEDC8] text-[#2E7D32] border-2 border-[#C5E1A5] font-bold px-5 py-3 rounded-xl cursor-pointer transition text-xs shadow-sm"
                  >
                    📖 返回图鉴研究
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* --- VIEW 3: AI CUSTOM CARD CREATOR --- */}
        {activeTab === 'factory' && (
          <div id="view-factory-container" className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Form Column */}
            <div className="md:col-span-5 bg-white border-4 border-[#8BC34A] p-5 rounded-3xl shadow-xl space-y-5">
              <h3 className="text-lg font-black text-[#1B5E20] border-b-2 border-[#DCEDC8] pb-2 flex items-center space-x-2">
                <span>🎨</span>
                <span>绘卡工坊 (Card Workshop)</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-[#2E7D32] font-bold block mb-1">
                    1. 自定义神仙角色名称
                  </label>
                  <input
                    type="text"
                    placeholder="例如：仙桃投手、竹笋大仙、猫尾草..."
                    value={customRoleName}
                    onChange={(e) => setCustomRoleName(e.target.value)}
                    className="w-full bg-[#F1F8E9] border-2 border-[#C5E1A5] px-3 py-2.5 rounded-xl text-xs text-[#2E7D32] placeholder-[#81C784] font-bold focus:outline-none focus:border-[#4CAF50] shadow-inner"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#2E7D32] font-bold block mb-1">
                    2. 绑定数学教科书单元
                  </label>
                  <select
                    value={customUnitId}
                    onChange={(e) => setCustomUnitId(Number(e.target.value))}
                    className="w-full bg-[#F1F8E9] border-2 border-[#C5E1A5] px-3 py-2.5 rounded-xl text-xs text-[#2E7D32] font-bold focus:outline-none focus:border-[#4CAF50] cursor-pointer"
                  >
                    {MATH_UNITS.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.unitNum} - {u.title}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleGenerateCustomCard}
                  disabled={isGenerating || !customRoleName.trim()}
                  className={`w-full py-3 rounded-2xl font-bold text-xs border-b-4 cursor-pointer transition-all duration-200 ${
                    isGenerating || !customRoleName.trim()
                      ? 'bg-gray-100 text-gray-400 border-gray-200 border-b-2 cursor-not-allowed'
                      : 'bg-[#FFEB3B] hover:bg-[#FBC02D] text-[#795548] border-[#FBC02D] shadow-lg active:translate-y-0.5'
                  }`}
                >
                  {isGenerating ? '🔮 算筹飞舞，绘卡中...' : '✨ 绘制全新古典图鉴卡'}
                </button>
              </div>

              {/* Developer Configuration Note */}
              <div className="bg-[#FFF3E0] border-2 border-[#FFB74D] p-3 rounded-2xl text-[11px] text-[#E65100] leading-normal font-bold">
                <div className="font-black text-[#E65100] mb-1">ℹ️ 国风 AI 扩容机制说明</div>
                本模块已接入您指定的 <strong className="text-[#FF9800]">agnes-2.0-flash</strong> 模型，接口是标准且安全的服务器代理。您可随时在项目根目录的 <code className="text-[#E65100]">.env</code> 中配置 <code className="text-[#E65100]">AGNES_API_KEY</code> 激活实时 AI 绘卡。无 Key 时，系统采用本地智能算法，提供 100% 完整体验。
              </div>
            </div>

            {/* Rendered Custom Card Column */}
            <div className="md:col-span-7">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="generating-loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white border-4 border-dashed border-[#8BC34A] rounded-3xl p-16 text-center text-sm"
                  >
                    <div className="animate-spin w-10 h-10 border-4 border-[#4CAF50] border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="font-bold text-[#1B5E20]">正在调兵遣将，构建数学典籍卡片...</p>
                    <p className="text-xs text-[#2E7D32]/70 mt-2">模型：agnes-2.0-flash @ apihub</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="card-result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white text-[#2E7D32] rounded-3xl border-4 border-[#8BC34A] shadow-2xl overflow-hidden relative"
                  >
                    
                    {/* Stamp ornament water mark */}
                    <div className="absolute top-24 right-8 text-[#C8E6C9]/20 font-black text-6xl tracking-widest pointer-events-none select-none uppercase">
                      御数 <br /> 神将
                    </div>

                    {/* Pre-generated demo toggle helpful warning */}
                    {factoryMessage && (
                      <div className="bg-[#FFF9C4] border-b border-[#FFEB3B] px-4 py-2 text-[10px] text-[#795548] font-bold text-center leading-relaxed">
                        {factoryMessage}
                      </div>
                    )}

                    {/* Card Head */}
                    <div className="bg-[#DCEDC8] px-6 py-3 border-b-2 border-[#A5D6A7] flex justify-between items-center text-[#1B5E20] font-bold">
                      <div>
                        <span className="text-[10px] bg-[#E64A19] text-white px-2 py-0.5 rounded-full mr-1.5 font-black">AI 扩充卡</span>
                        <span className="text-base text-[#1B5E20] font-black">
                          {factoryResult ? factoryResult.name : pregeneratedCards[0].name}
                        </span>
                      </div>
                      <span className="text-xs text-[#2E7D32]">
                        风格: {factoryResult ? factoryResult.style : pregeneratedCards[0].style}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 space-y-4">
                      
                      {/* Sub-head section */}
                      <div className="flex items-center space-x-3 bg-[#F1F8E9] p-3 rounded-2xl border-2 border-[#C5E1A5]">
                        <SvgAvatar type="default" className="w-12 h-12" />
                        <div>
                          <h4 className="font-bold text-sm text-[#1B5E20]">
                            {factoryResult ? factoryResult.title : pregeneratedCards[0].title}
                          </h4>
                          <span className="text-[10px] text-[#2E7D32] font-bold">
                            属性：{factoryResult ? factoryResult.combatStat : pregeneratedCards[0].combatStat}
                          </span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="bg-white p-4 rounded-2xl border-2 border-[#C5E1A5]">
                        <h5 className="font-bold text-xs text-[#1B5E20] mb-1.5 flex items-center space-x-1">
                          <span>📌</span>
                          <span>图鉴亮点</span>
                        </h5>
                        <ul className="space-y-1.5 text-xs text-[#2E7D32]/90">
                          {(factoryResult ? factoryResult.highlights : pregeneratedCards[0].highlights).map((h: string, i: number) => (
                            <li key={i} className="flex items-start space-x-1">
                              <span className="text-[#8BC34A] font-bold mt-0.5">•</span>
                              <span className="font-bold">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Story */}
                      <div className="bg-white p-4 rounded-2xl border-2 border-[#C5E1A5]">
                        <h5 className="font-bold text-xs text-[#1B5E20] mb-1">📖 战场算理演义</h5>
                        <p className="text-xs text-[#2E7D32]/80 leading-relaxed font-bold indent-6">
                          {factoryResult ? factoryResult.story : pregeneratedCards[0].story}
                        </p>
                      </div>

                      {/* Mnemonic / Formula */}
                      <div className="bg-[#FFF9C4] border-l-4 border-[#FFEB3B] p-3 rounded-r-xl">
                        <span className="text-[10px] text-[#795548] font-bold block">本卡核心算式</span>
                        <strong className="text-base font-black text-[#795548] block mt-0.5">
                          {factoryResult ? factoryResult.formula : pregeneratedCards[0].formula}
                        </strong>
                      </div>

                      {/* Example Math Problem */}
                      <div className="bg-[#FFF3E0] p-4 rounded-2xl border-2 border-[#FFB74D] text-xs space-y-2 text-[#E65100]">
                        <div>
                          <strong className="text-[#E65100] block">试题演练：</strong>
                          <p className="text-[#E65100] mt-0.5 leading-relaxed font-bold italic">
                            {factoryResult ? factoryResult.exampleProblem : pregeneratedCards[0].exampleProblem}
                          </p>
                        </div>
                        <div className="border-t border-[#FFE0B2] pt-2">
                          <strong className="text-emerald-700 block">解法步骤：</strong>
                          <p className="text-[#1B5E20] font-bold mt-0.5 leading-relaxed">
                            {factoryResult ? factoryResult.exampleAnswer : pregeneratedCards[0].exampleAnswer}
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* Card Footer */}
                    <div className="bg-[#DCEDC8] px-6 py-2.5 text-center text-[10px] text-[#1B5E20] font-bold border-t border-[#A5D6A7]">
                      {factoryResult ? factoryResult.supplementary : pregeneratedCards[0].supplementary}
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Quickly showcase presets for prompt speed */}
              <div className="mt-4 flex flex-wrap gap-2 justify-end">
                <span className="text-xs text-[#2E7D32] font-bold self-center mr-1">📚 经典预载示例卡片：</span>
                <button
                  onClick={() => {
                    setFactoryResult(pregeneratedCards[0]);
                    setFactoryMessage("经典示例卡：烈焰仙桃，精讲第六单元有余数除法。");
                  }}
                  className="bg-[#F1F8E9] hover:bg-[#DCEDC8] text-[#2E7D32] px-3 py-1.5 rounded-xl text-xs border-2 border-[#C5E1A5] cursor-pointer font-bold shadow-sm"
                >
                  🍑 烈焰仙桃 (余数)
                </button>
                <button
                  onClick={() => {
                    setFactoryResult(pregeneratedCards[1]);
                    setFactoryMessage("经典示例卡：火爆辣椒，精讲第五单元混合运算。");
                  }}
                  className="bg-[#F1F8E9] hover:bg-[#DCEDC8] text-[#2E7D32] px-3 py-1.5 rounded-xl text-xs border-2 border-[#C5E1A5] cursor-pointer font-bold shadow-sm"
                >
                  🌶️ 火爆辣椒 (混合)
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Decorative footer stamp */}
      <footer id="app-footer" className="mt-16 text-center border-t-2 border-[#A5D6A7] pt-6 max-w-xl mx-auto text-xs text-[#2E7D32] leading-relaxed px-4 font-bold">
        <p>© 戴夫大唐书院数学绘本编委会 · 特别珍藏版</p>
        <p className="text-[10px] mt-1 text-[#2E7D32]/70">
          全链路自适应排版 · 完美适配移动端、平板与台式电脑。
        </p>
      </footer>
    </div>
  );
}
