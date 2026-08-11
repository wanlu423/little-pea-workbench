const tabs = document.querySelectorAll(".tab-button");
const panels = {
  calorie: document.querySelector("#caloriePanel"),
  fitness: document.querySelector("#fitnessPanel"),
  coreFitness: document.querySelector("#coreFitnessPanel"),
  rookieFitness: document.querySelector("#rookieFitnessPanel"),
};

const calorieForm = document.querySelector("#calorieForm");
const kjPer100Input = document.querySelector("#kjPer100");
const gramsInput = document.querySelector("#grams");
const energyLabel = document.querySelector("#energyLabel");
const amountLabel = document.querySelector("#amountLabel");
const amountUnit = document.querySelector("#amountUnit");
const perUnitResultLabel = document.querySelector("#perUnitResultLabel");
const kcalPer100Output = document.querySelector("#kcalPer100");
const totalKcalOutput = document.querySelector("#totalKcal");
const levelBadge = document.querySelector("#levelBadge");
const calorieLevelText = document.querySelector("#calorieLevelText");
const levelSummary = document.querySelector("#levelSummary");
const weekGrids = document.querySelectorAll("[data-plan-grid]");
const dayTemplate = document.querySelector("#dayTemplate");
const clearCompletionButtons = document.querySelectorAll(".clear-completions");
const installButton = document.querySelector("#installButton");
const installModal = document.querySelector("#installModal");
const installSteps = document.querySelector("#installSteps");
const closeInstallModal = document.querySelector("#closeInstallModal");

const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const completionStorageKey = "little-pea-fitness-completions";
let deferredInstallPrompt = null;

const weeklyPlan = {
  "周一": [
    {
      id: "monday-treadmill-walk",
      title: "跑步机快走半小时",
      detail: "有氧",
      durationMinutes: 30,
    },
    {
      id: "monday-band-back",
      title: "拉力绳练背",
      detail: "B 站",
      durationMinutes: 19,
      url: "https://www.bilibili.com/video/BV1U14y1m7yT/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "monday-calf",
      title: "根本性瘦小腿",
      detail: "B 站",
      durationMinutes: 10,
      url: "https://www.bilibili.com/video/BV1af4y1V7ZJ/?spm_id_from=333.1387.favlist.content.click",
    },
    {
      id: "monday-shoulder",
      title: "深度开肩",
      detail: "小红书",
      durationMinutes: 15,
      url: "https://www.xiaohongshu.com/discovery/item/6728bd5b000000001d03a65e?source=webshare&xhsshare=pc_web&xsec_token=ABokX3Jqp7UMSl5wwYK9iQFqZHvy3pr4jJbCzuAEyLPoc=&xsec_source=pc_share",
    },
  ],
  "周二": [
    {
      id: "tuesday-barre-upper",
      title: "芭杆上肢雕刻",
      detail: "B 站",
      durationMinutes: 35,
      url: "https://www.bilibili.com/video/BV1qQc4zxEsi/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "tuesday-calf",
      title: "根本性瘦小腿",
      detail: "B 站",
      durationMinutes: 10,
      url: "https://www.bilibili.com/video/BV1af4y1V7ZJ/?spm_id_from=333.1387.favlist.content.click",
    },
    {
      id: "tuesday-shoulder",
      title: "深度开肩",
      detail: "小红书",
      durationMinutes: 15,
      url: "https://www.xiaohongshu.com/discovery/item/6728bd5b000000001d03a65e?source=webshare&xhsshare=pc_web&xsec_token=ABokX3Jqp7UMSl5wwYK9iQFqZHvy3pr4jJbCzuAEyLPoc=&xsec_source=pc_share",
    },
  ],
  "周三": [
    {
      id: "wednesday-treadmill-walk",
      title: "跑步机快走半小时",
      detail: "有氧",
      durationMinutes: 30,
    },
    {
      id: "wednesday-calf",
      title: "根本性瘦小腿",
      detail: "B 站",
      durationMinutes: 10,
      url: "https://www.bilibili.com/video/BV1af4y1V7ZJ/?spm_id_from=333.1387.favlist.content.click",
    },
    {
      id: "wednesday-fast-calf",
      title: "快速瘦小腿",
      detail: "B 站",
      durationMinutes: 16,
      url: "https://www.bilibili.com/video/BV1gE411A7pL/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
  ],
  "周四": [
    {
      id: "thursday-band-back",
      title: "拉力绳练背",
      detail: "B 站",
      durationMinutes: 19,
      url: "https://www.bilibili.com/video/BV1U14y1m7yT/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "thursday-calf",
      title: "根本性瘦小腿",
      detail: "B 站",
      durationMinutes: 10,
      url: "https://www.bilibili.com/video/BV1af4y1V7ZJ/?spm_id_from=333.1387.favlist.content.click",
    },
    {
      id: "thursday-fast-calf",
      title: "快速瘦小腿",
      detail: "B 站",
      durationMinutes: 16,
      url: "https://www.bilibili.com/video/BV1gE411A7pL/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "thursday-shoulder",
      title: "深度开肩",
      detail: "小红书",
      durationMinutes: 15,
      url: "https://www.xiaohongshu.com/discovery/item/6728bd5b000000001d03a65e?source=webshare&xhsshare=pc_web&xsec_token=ABokX3Jqp7UMSl5wwYK9iQFqZHvy3pr4jJbCzuAEyLPoc=&xsec_source=pc_share",
    },
  ],
  "周五": [
    {
      id: "friday-treadmill-walk",
      title: "跑步机快走半小时",
      detail: "有氧",
      durationMinutes: 30,
    },
    {
      id: "friday-barre-upper",
      title: "芭杆上肢雕刻",
      detail: "B 站",
      durationMinutes: 35,
      url: "https://www.bilibili.com/video/BV1qQc4zxEsi/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "friday-fast-calf",
      title: "快速瘦小腿",
      detail: "B 站",
      durationMinutes: 16,
      url: "https://www.bilibili.com/video/BV1gE411A7pL/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
  ],
  "周六": [
    {
      id: "saturday-treadmill-walk",
      title: "跑步机快走半小时",
      detail: "有氧",
      durationMinutes: 30,
    },
    {
      id: "saturday-fast-calf",
      title: "快速瘦小腿",
      detail: "B 站",
      durationMinutes: 16,
      url: "https://www.bilibili.com/video/BV1gE411A7pL/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "saturday-shoulder",
      title: "深度开肩",
      detail: "小红书",
      durationMinutes: 15,
      url: "https://www.xiaohongshu.com/discovery/item/6728bd5b000000001d03a65e?source=webshare&xhsshare=pc_web&xsec_token=ABokX3Jqp7UMSl5wwYK9iQFqZHvy3pr4jJbCzuAEyLPoc=&xsec_source=pc_share",
    },
  ],
  "周日": [
    {
      id: "sunday-rest",
      title: "休息",
      detail: "恢复日",
      durationMinutes: 0,
    },
  ],
};

const rookiePlan = {
  "周一": [
    {
      id: "rookie-monday-treadmill-walk",
      title: "跑步机快走半小时",
      detail: "有氧",
      durationMinutes: 30,
    },
    {
      id: "rookie-monday-smooth-shoulder-back",
      title: "丝滑肩背",
      detail: "B 站",
      durationMinutes: 16,
      url: "https://www.bilibili.com/video/BV1Gz421C7G1/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
  ],
  "周二": [
    {
      id: "rookie-tuesday-treadmill-walk",
      title: "跑步机快走半小时",
      detail: "有氧",
      durationMinutes: 30,
    },
    {
      id: "rookie-tuesday-posture-master",
      title: "体态大师",
      detail: "B 站",
      durationMinutes: 8,
      url: "https://www.bilibili.com/video/BV1rS4y1b7cU/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "rookie-tuesday-full-stretch",
      title: "全身拉伸",
      detail: "B 站",
      durationMinutes: 23,
      url: "https://www.bilibili.com/video/BV1X142147nu/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
  ],
  "周三": [
    {
      id: "rookie-wednesday-9090-breath",
      title: "9090呼吸法",
      detail: "B 站",
      durationMinutes: 4,
      url: "https://www.bilibili.com/video/BV1XdrHBSEAM/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "rookie-wednesday-pelvis-correction",
      title: "骨盆矫正",
      detail: "B 站",
      durationMinutes: 20,
      url: "https://www.bilibili.com/video/BV1Qb4y1q7bU/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "rookie-wednesday-trapezius",
      title: "纠正斜方肌",
      detail: "B 站",
      durationMinutes: 9,
      url: "https://www.bilibili.com/video/BV1qQULYPENn/?spm_id_from=333.1387.search.video_card.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
  ],
  "周四": [
    {
      id: "rookie-thursday-treadmill-walk",
      title: "跑步机快走半小时",
      detail: "有氧",
      durationMinutes: 30,
    },
    {
      id: "rookie-thursday-posture-master",
      title: "体态大师",
      detail: "B 站",
      durationMinutes: 8,
      url: "https://www.bilibili.com/video/BV1rS4y1b7cU/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "rookie-thursday-full-stretch",
      title: "全身拉伸",
      detail: "B 站",
      durationMinutes: 23,
      url: "https://www.bilibili.com/video/BV1X142147nu/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
  ],
  "周五": [
    {
      id: "rookie-friday-9090-breath",
      title: "9090呼吸法",
      detail: "B 站",
      durationMinutes: 4,
      url: "https://www.bilibili.com/video/BV1XdrHBSEAM/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "rookie-friday-pelvis-correction",
      title: "骨盆矫正",
      detail: "B 站",
      durationMinutes: 20,
      url: "https://www.bilibili.com/video/BV1Qb4y1q7bU/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "rookie-friday-trapezius",
      title: "纠正斜方肌",
      detail: "B 站",
      durationMinutes: 9,
      url: "https://www.bilibili.com/video/BV1qQULYPENn/?spm_id_from=333.1387.search.video_card.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
  ],
  "周六": [
    {
      id: "rookie-saturday-treadmill-walk",
      title: "跑步机快走半小时",
      detail: "有氧",
      durationMinutes: 30,
    },
    {
      id: "rookie-saturday-smooth-shoulder-back",
      title: "丝滑肩背",
      detail: "B 站",
      durationMinutes: 16,
      url: "https://www.bilibili.com/video/BV1Gz421C7G1/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
  ],
  "周日": [
    {
      id: "rookie-sunday-rest",
      title: "休息",
      detail: "恢复日",
      durationMinutes: 0,
    },
  ],
};

const corePlan = {
  "周一": [
    {
      id: "core-monday-hourglass-waist",
      title: "沙漏腰3.0",
      detail: "B 站",
      durationMinutes: 30,
      url: "https://www.bilibili.com/video/BV13DJVzsEkK/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "core-monday-lying-glutes",
      title: "躺练虐臀",
      detail: "B 站",
      durationMinutes: 30,
      url: "https://www.bilibili.com/video/BV15r421F7wD/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
  ],
  "周二": [
    {
      id: "core-tuesday-cable-glutes-legs",
      title: "龙门架臀腿",
      detail: "B 站",
      durationMinutes: 15,
      url: "https://www.bilibili.com/video/BV1ZK411t7Xy/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "core-tuesday-lower-abs",
      title: "躺虐下腹",
      detail: "B 站",
      durationMinutes: 15,
      url: "https://www.bilibili.com/video/BV1z4NheWEaN/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "core-tuesday-split-practice",
      title: "竖叉跟练",
      detail: "B 站",
      durationMinutes: 15,
      url: "https://www.bilibili.com/video/BV1ZM4y1P7bp?spm_id_from=333.788.player.switch&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb&p=2",
    },
  ],
  "周三": [
    {
      id: "core-wednesday-barre-hourglass",
      title: "芭杆版沙漏腰",
      detail: "B 站",
      durationMinutes: 36,
      url: "https://www.bilibili.com/video/BV14rZcB4EtH/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "core-wednesday-inner-thigh",
      title: "快速瘦大腿根",
      detail: "B 站",
      durationMinutes: 10,
      url: "https://www.bilibili.com/video/BV14A411i7v2/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "core-wednesday-full-stretch",
      title: "全身拉伸",
      detail: "B 站",
      durationMinutes: 23,
      url: "https://www.bilibili.com/video/BV1X142147nu/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
  ],
  "周四": [
    {
      id: "core-thursday-hourglass-waist",
      title: "沙漏腰3.0",
      detail: "B 站",
      durationMinutes: 30,
      url: "https://www.bilibili.com/video/BV13DJVzsEkK/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "core-thursday-lying-glutes",
      title: "躺练虐臀",
      detail: "B 站",
      durationMinutes: 30,
      url: "https://www.bilibili.com/video/BV15r421F7wD/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
  ],
  "周五": [
    {
      id: "core-friday-cable-glutes-legs",
      title: "龙门架臀腿",
      detail: "B 站",
      durationMinutes: 15,
      url: "https://www.bilibili.com/video/BV1ZK411t7Xy/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "core-friday-lower-abs",
      title: "躺虐下腹",
      detail: "B 站",
      durationMinutes: 15,
      url: "https://www.bilibili.com/video/BV1z4NheWEaN/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "core-friday-middle-split",
      title: "横叉跟练",
      detail: "B 站",
      durationMinutes: 20,
      url: "https://www.bilibili.com/video/BV1gV411471Q?spm_id_from=333.788.player.switch&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb&p=2",
    },
  ],
  "周六": [
    {
      id: "core-saturday-barre-hourglass",
      title: "芭杆版沙漏腰",
      detail: "B 站",
      durationMinutes: 36,
      url: "https://www.bilibili.com/video/BV14rZcB4EtH/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "core-saturday-inner-thigh",
      title: "快速瘦大腿根",
      detail: "B 站",
      durationMinutes: 10,
      url: "https://www.bilibili.com/video/BV14A411i7v2/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
    {
      id: "core-saturday-full-stretch",
      title: "全身拉伸",
      detail: "B 站",
      durationMinutes: 23,
      url: "https://www.bilibili.com/video/BV1X142147nu/?spm_id_from=333.1387.favlist.content.click&vd_source=3ef17c36a7406ce0d3ae8a2960e185bb",
    },
  ],
  "周日": [
    {
      id: "core-sunday-rest",
      title: "休息",
      detail: "恢复日",
      durationMinutes: 0,
    },
  ],
};

const planGroups = {
  fitness: weeklyPlan,
  coreFitness: corePlan,
  rookieFitness: rookiePlan,
};

const unitConfig = {
  solid: {
    typeLabel: "固体",
    unit: "g",
    perUnit: "每 100g",
    energyLabel: "每 100g 热量",
    amountLabel: "总重量",
    placeholder: "例如 165",
    lowMax: 170 / 4.184,
    highMin: 250,
  },
  liquid: {
    typeLabel: "液体",
    unit: "ml",
    perUnit: "每 100ml",
    energyLabel: "每 100ml 热量",
    amountLabel: "总体积",
    placeholder: "例如 330",
    lowMax: 80 / 4.184,
    highMin: 45,
  },
};

function formatNumber(value) {
  if (!Number.isFinite(value)) return "0";
  return value >= 100 ? Math.round(value).toString() : value.toFixed(1).replace(/\.0$/, "");
}

function getSelectedConfig() {
  const selectedType = new FormData(calorieForm).get("foodType");
  return unitConfig[selectedType] || unitConfig.solid;
}

function classifyCalories(kcalPerUnit, config) {
  if (kcalPerUnit <= config.lowMax) {
    return { label: "低热量", className: "low" };
  }

  if (kcalPerUnit < config.highMin) {
    return { label: "中热量", className: "medium" };
  }

  return { label: "高热量", className: "high" };
}

function syncUnitLabels() {
  const config = getSelectedConfig();
  energyLabel.textContent = config.energyLabel;
  amountLabel.textContent = config.amountLabel;
  amountUnit.textContent = config.unit;
  perUnitResultLabel.textContent = config.perUnit;
  gramsInput.placeholder = config.placeholder;
}

function calculateCalories() {
  const kjPer100 = Number(kjPer100Input.value);
  const amount = Number(gramsInput.value);
  const config = getSelectedConfig();

  syncUnitLabels();

  if (!kjPer100 || !amount || kjPer100 < 0 || amount < 0) {
    kcalPer100Output.textContent = "0";
    totalKcalOutput.textContent = "0";
    levelBadge.textContent = "等待输入";
    levelBadge.className = "mini-result";
    calorieLevelText.textContent = "等待输入";
    levelSummary.textContent = `${config.typeLabel} / 输入千焦后自动判断`;
    return;
  }

  const kcalPer100 = kjPer100 / 4.184;
  const totalKcal = kcalPer100 * (amount / 100);
  const level = classifyCalories(kcalPer100, config);

  kcalPer100Output.textContent = formatNumber(kcalPer100);
  totalKcalOutput.textContent = formatNumber(totalKcal);
  levelBadge.textContent = level.label;
  levelBadge.className = `mini-result ${level.className}`;
  calorieLevelText.textContent = level.label;
  levelSummary.textContent = `按${config.typeLabel}${config.perUnit}标准判断，共 ${formatNumber(amount)}${config.unit}`;
}

function loadCompletions() {
  try {
    return JSON.parse(localStorage.getItem(completionStorageKey)) || {};
  } catch {
    return {};
  }
}

function saveCompletions(completions) {
  localStorage.setItem(completionStorageKey, JSON.stringify(completions));
}

function formatDuration(minutes) {
  if (!minutes) return "0 分钟";
  if (minutes < 60) return `${minutes} 分钟`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} 小时 ${rest} 分钟` : `${hours} 小时`;
}

function renderWeek(grid, planGroup) {
  const completions = loadCompletions();
  grid.innerHTML = "";

  days.forEach((day) => {
    const fragment = dayTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".day-card");
    const title = fragment.querySelector("h3");
    const total = fragment.querySelector(".day-total");
    const list = fragment.querySelector(".workout-list");
    const plan = planGroup[day] || [];
    const totalMinutes = plan.reduce((sum, item) => sum + (item.durationMinutes || 0), 0);

    title.textContent = day;
    total.textContent = `总时长 ${formatDuration(totalMinutes)}`;

    if (!plan.length) {
      const emptyItem = document.createElement("li");
      emptyItem.className = "workout-empty";
      emptyItem.textContent = "待添加训练内容";
      list.appendChild(emptyItem);
    } else {
      plan.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.className = "workout-item";
        const checkboxLabel = document.createElement("label");
        const checkbox = document.createElement("input");

        const textWrap = document.createElement("div");
        const itemTitle = document.createElement("strong");
        const itemDetail = document.createElement("span");
        const duration = document.createElement("span");

        checkboxLabel.className = "complete-check";
        checkbox.type = "checkbox";
        checkbox.checked = !!completions[item.id];
        checkbox.setAttribute("aria-label", `${item.title}完成`);
        checkboxLabel.appendChild(checkbox);

        itemTitle.textContent = item.title;
        itemDetail.textContent = item.detail || "训练";
        duration.className = "duration-pill";
        duration.textContent = formatDuration(item.durationMinutes || 0);
        textWrap.append(itemTitle, itemDetail);
        listItem.append(textWrap, duration);
        listItem.classList.toggle("is-complete", checkbox.checked);

        checkbox.addEventListener("change", () => {
          const currentCompletions = loadCompletions();
          if (checkbox.checked) {
            currentCompletions[item.id] = true;
          } else {
            delete currentCompletions[item.id];
          }

          saveCompletions(currentCompletions);
          listItem.classList.toggle("is-complete", checkbox.checked);
        });

        if (item.url) {
          const link = document.createElement("a");
          link.className = "open-link";
          link.href = item.url;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = "打开视频";
          listItem.appendChild(link);
        }

        listItem.appendChild(checkboxLabel);
        list.appendChild(listItem);
      });
    }

    card.dataset.day = day;
    grid.appendChild(fragment);
  });
}

function renderAllWeeks() {
  weekGrids.forEach((grid) => {
    const planName = grid.dataset.planGrid;
    renderWeek(grid, planGroups[planName] || {});
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    Object.entries(panels).forEach(([name, panel]) => {
      panel.classList.toggle("is-active", name === tab.dataset.tab);
    });
  });
});

calorieForm.addEventListener("submit", (event) => {
  event.preventDefault();
  calculateCalories();
});

[kjPer100Input, gramsInput, ...calorieForm.querySelectorAll("input[name='foodType']")].forEach((input) => {
  input.addEventListener("input", calculateCalories);
  input.addEventListener("change", calculateCalories);
});

clearCompletionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    localStorage.removeItem(completionStorageKey);
    renderAllWeeks();
  });
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
});

installButton.addEventListener("click", async () => {
  showInstallHelp();

  if (!deferredInstallPrompt) {
    return;
  }

  window.setTimeout(async () => {
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
  }, 250);
});

function showInstallHelp() {
  const ua = navigator.userAgent || "";
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;

  if (isStandalone) {
    installSteps.innerHTML = "<p>这个工作台已经像 APP 一样打开了。</p>";
  } else if (isIOS) {
    installSteps.innerHTML = `
      <p>iPhone 需要用 Safari 安装：</p>
      <ol>
        <li>用 Safari 打开当前网址。</li>
        <li>点底部分享按钮。</li>
        <li>选择“添加到主屏幕”。</li>
      </ol>
    `;
  } else if (isAndroid) {
    installSteps.innerHTML = `
      <p>安卓请优先用 Chrome 安装。当前浏览器如果点按钮没有弹窗，就走浏览器菜单：</p>
      <ol>
        <li>用 Chrome 打开当前网址。</li>
        <li>点右上角菜单。</li>
        <li>选择“安装应用”或“添加到主屏幕”。</li>
      </ol>
    `;
  } else {
    installSteps.innerHTML = `
      <p>如果没有弹出安装框，请使用浏览器菜单里的“安装应用”或“添加到主屏幕”。</p>
    `;
  }

  installModal.hidden = false;
}

function hideInstallHelp() {
  installModal.hidden = true;
}

closeInstallModal.addEventListener("click", hideInstallHelp);
installModal.addEventListener("click", (event) => {
  if (event.target === installModal) hideInstallHelp();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}

renderAllWeeks();
calculateCalories();
