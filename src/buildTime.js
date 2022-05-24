const fs = require("fs");
const path = require("path");

/**
 * 获取指定时间字符串
 * @param date Date();
 * @return
 */
const getStringDate = (date = new Date()) => {
  const YYYY = String(date.getFullYear());
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const DD = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  const timeString = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
  const monthString = `${YYYY}-${MM}`;
  const dayString = `${YYYY}-${MM}-${DD}`;

  return {
    date,
    YYYY,
    MM,
    DD,
    hh,
    mm,
    ss,
    timeString: timeString,
    monthString: monthString,
    todayString: dayString,
  };
};

/**
 * 主方法
 */
const main = () => {
  const file = path.resolve("./src/app.tsx");
  console.log("buildTime file", file);

  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file).toString();
    const { timeString } = getStringDate() || {};

    const contentTmp = content.replace(
      "componentDidMount() {}",
      ` componentDidMount() {
    console.info(\`【build】 by ${timeString}\`)
  }`
    );

    fs.writeFileSync(file, contentTmp);
  } else {
    console.error("【build】no found app.tsx");
  }
};

main();
