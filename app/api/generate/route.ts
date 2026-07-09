import { NextRequest, NextResponse } from "next/server";
import { MATH_UNITS } from "@/lib/mathData";

export async function POST(req: NextRequest) {
  try {
    const { plantName, unitId } = await req.json();

    if (!plantName) {
      return NextResponse.json({ error: "请输入植物或僵尸的名字" }, { status: 400 });
    }

    const selectedUnit = MATH_UNITS.find(u => u.id === Number(unitId)) || MATH_UNITS[0];
    const apiKey = process.env.AGNES_API_KEY || "";

    // If the API key is missing or blank, we will generate a wonderful dynamic mock card 
    // to give a perfect offline-first / sandbox experience, while indicating how to activate.
    if (!apiKey || apiKey.trim() === "") {
      // Create a high-quality personalized mock response based on the input
      const mockCard = generateFallbackCard(plantName, selectedUnit);
      return NextResponse.json({
        success: true,
        isDemo: true,
        data: mockCard,
        message: "当前处于演示模式（本地离线算法生成）。若要激活实时 AI 绘卡，请在项目的 .env 文件中配置 AGNES_API_KEY。"
      });
    }

    // Call the custom OpenAI-compatible endpoint specified by the user
    const response = await fetch("https://apihub.agnes-ai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "agnes-2.0-flash",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `你是一位精通人教版小学二年级下册数学教学的专家，同时也是《植物大战僵尸》游戏的资深玩家。
你的任务是：根据用户提供的【植物或僵尸名字】以及指定的【数学单元主题】，生成一个精美的“现代图鉴风”数学科普卡片数据。
必须返回一个合法的 JSON 对象，不要包含任何 markdown 标记。

JSON 格式要求：
{
  "name": "植物或僵尸名称",
  "title": "符合角色的拉风军事或数学头衔",
  "style": "根据图片中西游、古代中式盔甲、中国神话等古典国风主题给出的风格标签（如：西游妖仙风、古风铜甲哨兵、唐风修行者）",
  "combatStat": "一句话战力或属性描述（如：阳光产生: +75/次，或：铁勺盾甲值: 2000）",
  "highlights": [
    "第一条本单元数学核心要点（与该角色动作结合，简短有力）",
    "第二条本单元数学核心要点（结合点）",
    "第三条本单元数学核心要点（结合点）"
  ],
  "supplementary": "一小段专业的图鉴辅助说明（国风古籍或军事图鉴口吻）",
  "story": "一段结合该植物/僵尸技能、外形，以及此数学单元知识点的生动古风战场小故事（100-150字）",
  "formula": "核心数学公式或口诀算式",
  "exampleProblem": "一道结合该植物/僵尸的二年级下册数学应用题",
  "exampleAnswer": "该题的详细解答过程（中文，清晰易懂，包括算式和单位）"
}`
          },
          {
            role: "user",
            content: `用户输入的角色名称：${plantName}
指定的数学单元：${selectedUnit.unitNum} - ${selectedUnit.title}
该单元的核心概念：${selectedUnit.concept}
请以此生成该角色的古风数学图鉴卡。`
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Agnes API returned error status:", response.status, errorText);
      // Fallback in case of API errors so the frontend never crashes
      const mockCard = generateFallbackCard(plantName, selectedUnit);
      return NextResponse.json({
        success: true,
        isDemo: true,
        data: mockCard,
        message: `API 接口请求失败 (${response.status})，已自动切换到本地算法生成，确保您的体验。`
      });
    }

    const jsonRes = await response.json();
    let resultData;
    
    try {
      const contentText = jsonRes.choices[0].message.content;
      // Parse JSON (strip markdown if model accidentally returned it)
      const cleanJson = contentText.replace(/```json/g, "").replace(/```/g, "").trim();
      resultData = JSON.parse(cleanJson);
    } catch (parseError) {
      console.error("Failed to parse AI JSON response:", parseError);
      resultData = generateFallbackCard(plantName, selectedUnit);
    }

    return NextResponse.json({
      success: true,
      isDemo: false,
      data: resultData
    });

  } catch (error: any) {
    console.error("Error in generate API route:", error);
    return NextResponse.json({ error: error.message || "服务器内部错误" }, { status: 500 });
  }
}

// Generates an incredibly high-quality localized math card based on user input
function generateFallbackCard(name: string, unit: any) {
  // We can write a smart custom generator that crafts custom content based on the unit!
  let title = "神武守护者";
  let style = "古风西游志";
  let combatStat = "战斗力: 888";
  let highlights = [...unit.highlights];
  let story = "";
  let formula = unit.formula;
  let exampleProblem = "";
  let exampleAnswer = "";

  switch (unit.id) {
    case 1: // Data collection
      title = "天机阁布阵官";
      style = "西游仙踪版";
      combatStat = "法力值: +120/回合";
      highlights = [
        "利用“正”字进行分类动态清点",
        "将杂乱的战况转换成直观的统计表格",
        "根据数据分布对比快速锁定僵尸弱点"
      ];
      story = `在西游大战中，戴夫派遣了【${name}】前往天机阁驻守。为了配合守城军，【${name}】连夜清点了仓库里的葫芦和乾坤袋。他一边大喊着口诀，一边在羊皮卷上画“正”字记录，终于在僵尸破门前算清了所有的战备数据，指挥神将布下惊天大阵。`;
      exampleProblem = `【${name}】统计缴获的僵尸头盔，其中红色头盔有“正正”，金色头盔有“正一”，银色头盔有“丅”。请问哪种头盔最少？它们一共有多少个？`;
      exampleAnswer = `解答：红色头盔 = 10 个，金色头盔 = 6 个，银色头盔 = 3 个。因为 3 < 6 < 10，所以银色头盔最少。一共有 10 + 6 + 3 = 19 个头盔。`;
      break;
    case 2: // Division I
      title = "蟠桃均分大圣";
      style = "天宫蟠桃园风";
      combatStat = "仙桃暴击率: 35%";
      highlights = [
        "掌握“平均分配”的数学公平性",
        "除号“÷”象征着将总量平摊的过程",
        "理解商是平均分完后的最终份量"
      ];
      story = `【${name}】在蟠桃园摘了数颗仙丹，准备用来强化植物防线。此时有几只贪吃的小鬼僵尸想要投降。为了做到“公平受击”，【${name}】把这些仙丹平摊分给这几只僵尸，让他们一粒一粒吃下，不仅算得精细，还让战斗变得极具秩序。`;
      exampleProblem = `【${name}】拿出了 20 枚高能豌豆，要平均分给 5 只持鱼僵尸。每只僵尸能分到几枚？写出除法算式并指出商是多少。`;
      exampleAnswer = `解答：20 ÷ 5 = 4（枚）。其中，被除数是 20，除数是 5，商是 4。每只僵尸分得 4 枚。`;
      break;
    case 3: // Geometry
      title = "五行遁甲真人";
      style = "大唐神武御甲风";
      combatStat = "阵法移速: 恒定 1.2";
      highlights = [
        "识别物体的左右折叠完全对称线",
        "分清平移（沿直线运动，不改朝向）",
        "分清旋转（围绕圆点，自转不息）"
      ];
      story = `【${name}】修炼了五行遁甲之术，在战场上负责布置几何防御壁垒。他发现有些树叶是轴对称的，而僵尸向前走是在“平移”，风扇叶片转动是在“旋转”。利用这三种神奇的运动，【${name}】能够轻松闪避僵尸的攻势，并引导雷击。`;
      exampleProblem = `判断：① 【${name}】发射的旋转飞刀飞在空中；② 【${name}】坐着竹筏顺着山溪直线下滑；这两者各属于什么运动？`;
      exampleAnswer = `解答：① 旋转飞刀绕中心转动，属于“旋转”现象；② 竹筏沿直线直线下滑，属于“平移”现象。`;
      break;
    case 4: // Division II
      title = "九宫算法天师";
      style = "太极八卦玄风";
      combatStat = "攻防转换: 七八五十六";
      highlights = [
        "用 7、8、9 的乘法口诀解决求商难题",
        "乘除互逆，口诀在心，破敌无形",
        "在分秒必争的激战中实现神速心算"
      ];
      story = `【${name}】手持九宫算筹，是战场上的计算天才。面对密密麻麻、提着铜铃和红旗的僵尸群，他毫不慌张，口中念念有词。他把战场分割成大小相等的八卦方位，利用口诀快速进行乘除求商，瞬间就把敌军的后勤线分配砸得稀烂！`;
      exampleProblem = `【${name}】准备了 63 个火焰南瓜，每 9 个排成一个战术小队。一共有多少个战术小队？你应该想哪一句乘法口诀求商？`;
      exampleAnswer = `解答：63 ÷ 9 = 7（个）。求商时想乘法口诀：“七九六十三”，所以商是 7。一共有 7 个战术小队。`;
      break;
    case 5: // Mixed operations
      title = "天罡火器大都督";
      style = "古代火药重甲风";
      combatStat = "爆轰总伤害: 3 × 4 + 5";
      highlights = [
        "先乘除、后加减的战术优先级规则",
        "小括号拥有‘皇权’般的优先计算权",
        "理清综合算式的逻辑递进关系"
      ];
      story = `【${name}】是火药营的掌舵人。他在发射神火飞鸦时，必须精算火药和引线的比值。‘火药先乘以排数，再加上追加的分量！’ 每一个混合算式他都先算乘除，最后加减，确保弹无虚发。若有小括号，更是必须立刻算出，犹如军令如山。`;
      exampleProblem = `【${name}】制作了 4 箱霹雳弹，每箱装 8 颗。今天战斗中用掉了 15 颗，还剩多少颗？请列出综合算式解答。`;
      exampleAnswer = `解答：综合算式为 4 × 8 - 15 = 32 - 15 = 17（颗）。先算乘法再算减法。还剩 17 颗霹雳弹。`;
      break;
    case 6: // Remainders
      title = "雷泽遁甲行者";
      style = "遁地飞沙风";
      combatStat = "最大安全边界: 余数比除数小";
      highlights = [
        "理解“余数”是均分未完的数学自然留白",
        "铁律坚守：余数必须小于除数",
        "掌握如何用余数处理生活和战斗中的边界分配"
      ];
      story = `在雷泽沼泽里，【${name}】在泥土下布置雷区。他手里有 19 颗雷，每 4 颗可以阻断一条小路。‘能铺满 4 条路，还剩 3 颗留作防身。’ 【${name}】擦了擦汗，‘3 确实小于 4，如果剩下 4 个我就能多封一条路了！’ 完美的余数逻辑！`;
      exampleProblem = `【${name}】有 23 份备用肥料，如果每株大嘴花一次消耗 5 份。请问可以供应几株大嘴花吃饱？还剩几份？余数比除数小吗？`;
      exampleAnswer = `解答：23 ÷ 5 = 4（株）…… 3（份）。最大可以供应 4 株大嘴花，还剩下 3 份肥料。因为余数 3 比除数 5 小（3 < 5），符合余数定理。`;
      break;
    case 7: // Numbers within 10000
      title = "太虚九算大帝";
      style = "五彩天华神仙风";
      combatStat = "血量上限: 9999";
      highlights = [
        "掌握万以内数位的递进（个十百千万）",
        "学会读出零在数中间与末尾的奥妙",
        "用最高位的大小快速比较两个超级首领的实力"
      ];
      story = `【${name}】站在云霄殿上，手握太虚罗盘。眼前的僵尸首领血量高达 8006，而他的护盾血量是 9050。‘九千零五十五大于八千零六！’ 【${name}】一眼识破。他通过读写这些宏伟的万级数字，调动天宫灵气，把狂妄的僵尸震得连退数里。`;
      exampleProblem = `读出下列【${name}】法力值并写出组成：① 4060 读作什么？ ② 一个数由 7 个千、2 个百和 9 个一组成，写作什么？`;
      exampleAnswer = `解答：\n1) 4060 读作：四千零六十（中间一个0读零，末尾的0不读）。\n2) 7个千、2个百和9个一组成的数写作：7209。`;
      break;
    case 8: // Weight
      title = "镇山万斤大仙";
      style = "玄重黑铁仙人风";
      combatStat = "自身重量: 6千克";
      highlights = [
        "建立克（轻物）与千克（重物）的心智模型",
        "牢记 1 千克与 1000 克的千进制换算",
        "会根据物品轻重合理选择称重单位"
      ];
      story = `【${name}】擅长玄铁重力术。他自己重达 6 千克，而他的一片叶子仅仅重 3 克。‘克是毛毛雨，千克才是真功夫！’ 面对上千斤重的铁勺、铁锁僵尸，【${name}】从空中砸下，将重力算得清清楚楚，让任何僵尸都无法逾越分毫。`;
      exampleProblem = `填上合适的质量单位（克或千克）：【${name}】的盔甲重 8 (   )；【${name}】发射的能量粉末重 2 (   )。`;
      exampleAnswer = `解答：盔甲属于较重物品，单位填“千克”；能量粉末属于极轻物品，单位填“克”。`;
      break;
    case 9: // Reasoning
      title = "天机推演上仙";
      style = "河图洛书道骨风";
      combatStat = "逻辑智商: 200";
      highlights = [
        "学会从已知‘确定条件’作为核心突破口",
        "排除法排除多余干扰，让真相水落石出",
        "用逻辑链连线或表格来锁定真相"
      ];
      story = `【${name}】坐在河图洛书盘前，面对三大神将僵尸设下的罗网。僵尸们把三颗夜明珠藏在铁桶、木箱和红旗里，并留下真真假假的谜题。【${name}】不慌不忙，抽出拂尘一扫，使用完美的逻辑排除法，连线画表，一秒揪出宝物的藏身之所！`;
      exampleProblem = `【${name}】、豌豆射手、大嘴花各守一个位置，分别在前线、中坚、后方。已知大嘴花说：“我不守在前线”，【${name}】说：“我和大嘴花都不守在后方”。请问【${name}】守在哪个位置？`;
      exampleAnswer = `解答：根据【${name}】说“我和大嘴花都不守在后方”，可以确定豌豆射手在“后方”。那么还剩下前线和中坚。大嘴花又说“我不守在前线”，说明大嘴花在中坚。最后只剩下前线给【${name}】。因此【${name}】守在“前线”。`;
      break;
  }

  return {
    name,
    title,
    style,
    combatStat,
    highlights,
    supplementary: `本卡片由 ${name} 倾情讲解。植物大战僵尸数学大图鉴典藏秘卷，专为二年级下册人教版数学概念设计。`,
    story,
    formula,
    exampleProblem,
    exampleAnswer
  };
}
