import { c as create_ssr_component, v as validate_component, e as each, g as add_attribute, d as escape } from './index2-af991d7a.js';
import { faNewspaper, faUsers } from '@fortawesome/free-solid-svg-icons';
import { F as Fa$1 } from './fa-d4dd1dea.js';
import 'random-seed';

const css$2 = {
  code: "a.svelte-u9ujrc:not(:hover)>.infoOverlay .authorName.svelte-u9ujrc{color:transparent}a.svelte-u9ujrc:not(:hover)>.infoOverlay .authorDesc.svelte-u9ujrc{color:transparent}a.svelte-u9ujrc:not(:hover)>.infoOverlay .authorPb.svelte-u9ujrc{filter:opacity(0)}.authorInfo.svelte-u9ujrc.svelte-u9ujrc{margin-bottom:auto;display:flex;align-items:center}.authorPb.svelte-u9ujrc.svelte-u9ujrc{width:2.5rem;height:2.5rem;border-radius:50%;transition-duration:0.3s;margin-right:12px}.authorName.svelte-u9ujrc.svelte-u9ujrc{display:inline-flex;transition-duration:0.3s;color:white}.authorDesc.svelte-u9ujrc.svelte-u9ujrc{display:inline-flex;transition-duration:0.3s;color:#ddd}.svelte-u9ujrc.svelte-u9ujrc{box-sizing:border-box}a.svelte-u9ujrc.svelte-u9ujrc{position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;height:14rem}.articleImg.svelte-u9ujrc.svelte-u9ujrc{object-fit:cover;transition-duration:0.3s;width:100%;height:100%}a.svelte-u9ujrc:hover .articleImg.svelte-u9ujrc{filter:brightness(0.5)}a.svelte-u9ujrc:hover .articleImg.svelte-u9ujrc{transform:scale(1.1)}.contentTags.svelte-u9ujrc.svelte-u9ujrc{margin-bottom:-5px;color:white;font-size:14px;text-decoration:none}h2.svelte-u9ujrc.svelte-u9ujrc{margin:0;color:white;font-size:22px;font-weight:bold;text-decoration:none}.infoOverlay.svelte-u9ujrc.svelte-u9ujrc{position:absolute;display:flex;flex-direction:column;justify-content:flex-end;width:100%;height:100%;padding:1rem}.description.svelte-u9ujrc.svelte-u9ujrc{overflow:hidden;transition-duration:0.3s;max-height:7rem;color:#ddd}a.svelte-u9ujrc:not(:hover) .description.svelte-u9ujrc{max-height:0}a.svelte-u9ujrc:hover .codeBlock.svelte-u9ujrc{background:none !important}@media(max-width: 800px){a.svelte-u9ujrc.svelte-u9ujrc{width:100% !important}}",
  map: null
};
const ArticleCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { article } = $$props;
  let { color } = $$props;
  let { width } = $$props;
  const widthMap = {
    FULL: "100%",
    TWO_THIRDS: "calc(66% - 0.5rem)",
    HALF: "calc(50% - 0.5rem)",
    ONE_THIRD: "calc(34% - 0.5rem)"
  };
  if ($$props.article === void 0 && $$bindings.article && article !== void 0)
    $$bindings.article(article);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.widthMap === void 0 && $$bindings.widthMap && widthMap !== void 0)
    $$bindings.widthMap(widthMap);
  $$result.css.add(css$2);
  return `<a${add_attribute("href", article.url, 0)}${add_attribute("style", `width: ${widthMap[width]}`, 0)} class="${"svelte-u9ujrc"}"><img${add_attribute("src", article.coverImgSrc, 0)} alt="${"Article thumbnail"}" class="${"articleImg svelte-u9ujrc"}">

	<div class="${"articleImg codeBlock infoOverlay svelte-u9ujrc"}"${add_attribute("style", `background: ${color}`, 0)}></div>

	<div class="${"infoOverlay svelte-u9ujrc"}"><div class="${"authorInfo svelte-u9ujrc"}"><div class="${"authorPb svelte-u9ujrc"}" style="${"background-image: url('https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'); background-size: cover"}"><img${add_attribute("src", article.author.image, 0)} class="${"authorPb svelte-u9ujrc"}"></div>
			<div style="${"display:flex; flex-direction: column; height: 100%"}" class="${"svelte-u9ujrc"}"><span class="${"authorName svelte-u9ujrc"}">${escape(article.author.name)}</span>
				<span class="${"authorDesc svelte-u9ujrc"}">#highfive SE student</span></div></div>
		<span class="${"contentTags svelte-u9ujrc"}">${escape(article.contentTags[0])}</span>
		<h2 class="${"svelte-u9ujrc"}">${escape(article.title)}</h2>
		<span class="${"description svelte-u9ujrc"}">${escape(article.description)}</span></div>
</a>`;
});
const css$1 = {
  code: ".svelte-1s16d0j.svelte-1s16d0j{box-sizing:border-box}.currentEventCard.svelte-1s16d0j.svelte-1s16d0j{--padding:2rem;display:flex;align-items:center;width:100%;min-height:3rem;padding:var(--padding);gap:var(--padding);background:var(--vscode-card-bg);color:white;border-radius:6px;transition:filter 0.2s;cursor:pointer}.currentEventCard.svelte-1s16d0j.svelte-1s16d0j:hover{filter:brightness(1.1);text-decoration:none}.currentEventCard.svelte-1s16d0j:hover h2.svelte-1s16d0j{text-decoration:underline;text-decoration-color:white}.textContainer.svelte-1s16d0j.svelte-1s16d0j{display:flex;flex-direction:column;justify-content:space-between;min-height:3rem}.tags.svelte-1s16d0j.svelte-1s16d0j{margin-bottom:-3px;color:var(--primary);font-size:14px}h2.svelte-1s16d0j.svelte-1s16d0j{margin:0;color:white;font-size:22px;font-weight:bold}",
  map: null
};
const CurrentEventCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { url } = $$props;
  let { title } = $$props;
  let { category } = $$props;
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.category === void 0 && $$bindings.category && category !== void 0)
    $$bindings.category(category);
  $$result.css.add(css$1);
  return `<a class="${"currentEventCard svelte-1s16d0j"}"${add_attribute("href", url, 0)}>${slots.head ? slots.head({}) : ``}
	<div class="${"textContainer svelte-1s16d0j"}"><span class="${"tags svelte-1s16d0j"}">${escape(category)}</span>
		<h2 class="${"svelte-1s16d0j"}">${escape(title)}</h2></div>
</a>`;
});
const css = {
  code: ".adminFeatureContainer.svelte-wlis1t{display:flex;gap:1rem;margin-bottom:8rem}.adminFeatureContainer.svelte-wlis1t>.currentEventCard{--padding:1rem}.svgButton.svelte-wlis1t{display:flex;align-items:center;justify-content:center;min-width:3rem;min-height:3rem;border-radius:6px;background:var(--vscode-layer2);color:white}.codeBlock.svelte-wlis1t{display:flex;flex-wrap:wrap;width:100%;gap:1rem;border-radius:6px;overflow:hidden}@media(max-width: 42rem){.adminFeatureContainer.svelte-wlis1t{flex-direction:column}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const vscodeColors = {
    constDarkBlue: "#569cd6",
    propertyLightBlue: "#9adafb",
    stringOrange: "#ce9178",
    importPurple: "#c586c0",
    classGreen: "#4dc9b0",
    numberGreen: "#b4cda7",
    commentGreen: "#699855"
  };
  const articles = data.articles;
  const pattern = [
    {
      color: vscodeColors.constDarkBlue,
      width: "TWO_THIRDS"
    },
    {
      color: vscodeColors.classGreen,
      width: "ONE_THIRD"
    },
    {
      color: vscodeColors.propertyLightBlue,
      width: "ONE_THIRD"
    },
    {
      color: vscodeColors.stringOrange,
      width: "TWO_THIRDS"
    },
    {
      color: vscodeColors.propertyLightBlue,
      width: "HALF"
    },
    {
      color: vscodeColors.stringOrange,
      width: "HALF"
    },
    {
      color: vscodeColors.commentGreen,
      width: "FULL"
    },
    {
      color: vscodeColors.propertyLightBlue,
      width: "TWO_THIRDS"
    },
    {
      color: vscodeColors.numberGreen,
      width: "ONE_THIRD"
    },
    {
      color: vscodeColors.propertyLightBlue,
      width: "TWO_THIRDS"
    },
    {
      color: vscodeColors.stringOrange,
      width: "ONE_THIRD"
    },
    {
      color: vscodeColors.propertyLightBlue,
      width: "ONE_THIRD"
    },
    {
      color: vscodeColors.stringOrange,
      width: "TWO_THIRDS"
    },
    {
      color: vscodeColors.propertyLightBlue,
      width: "TWO_THIRDS"
    },
    {
      color: vscodeColors.constDarkBlue,
      width: "ONE_THIRD"
    }
  ];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `


<section><div class="${"adminFeatureContainer svelte-wlis1t"}">${validate_component(CurrentEventCard, "CurrentEventCard").$$render(
    $$result,
    {
      url: "/articles",
      title: "Manage content",
      category: "Admin feature"
    },
    {},
    {
      head: () => {
        return `<div slot="${"head"}" class="${"svgButton svelte-wlis1t"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faNewspaper }, {}, {})}</div>`;
      }
    }
  )}
		${validate_component(CurrentEventCard, "CurrentEventCard").$$render(
    $$result,
    {
      url: "/users",
      title: "Manage users",
      category: "Admin feature"
    },
    {},
    {
      head: () => {
        return `<div slot="${"head"}" class="${"svgButton svelte-wlis1t"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faUsers }, {}, {})}</div>`;
      }
    }
  )}</div>

	<div style="${"margin-bottom: 8rem"}">${validate_component(CurrentEventCard, "CurrentEventCard").$$render(
    $$result,
    {
      url: "#",
      title: "CODE Community Hackathon",
      category: "Upcoming event"
    },
    {},
    {
      head: () => {
        return `<svg slot="${"head"}" viewBox="${"0 0 2397 598"}" xmlns="${"http://www.w3.org/2000/svg"}" style="${"width: 5rem; height: 5rem"}"><path d="${"M1041.08 333.71C1046.18 319.96 1050.67 305.94 1056.51 292.51C1074.51 251.1 1102.8 218.63 1142.45 196.51C1174.45 178.63 1209.07 171.38 1245.45 174.22C1282.28 177.1 1315.51 189.42 1342.38 215.95C1343.38 216.95 1344.65 217.76 1347.53 220.02C1347.53 212.65 1347.53 206.89 1347.53 201.13C1347.53 185.56 1347.53 185.54 1362.92 185.53C1395.39 185.53 1427.87 185.61 1460.35 185.4C1466.15 185.4 1468.35 186.95 1468.28 193.13C1467.95 214.9 1468.15 236.68 1468.15 260.53C1470.06 258.15 1471 257.37 1471.45 256.36C1479.53 238.52 1490.23 222.56 1505.74 210.36C1523.17 196.61 1542.84 187.42 1564.27 181.36C1594.24 172.909 1625.74 171.451 1656.36 177.1C1696.58 184.32 1731.42 202.64 1758.3 234.38C1760.63 237.13 1764.66 240.29 1767.36 242.73C1767.97 238.759 1768.25 234.747 1768.22 230.73C1768.36 165.143 1768.36 99.5535 1768.22 33.9601C1768.22 27.0601 1770.22 25.0801 1777.16 25.1501C1810.65 25.5168 1844.14 25.5168 1877.63 25.1501C1885.06 25.0701 1887.55 27.0401 1887.52 34.7601C1887.31 93.7601 1887.52 152.76 1887.63 211.76C1887.63 214.18 1887.97 216.6 1888.33 221.33C1893.33 216.58 1896.89 213.28 1900.33 209.9C1917.68 193.04 1938.99 183.9 1962.14 178.61C1985.22 173.308 2009.14 172.696 2032.46 176.81C2052.72 180.274 2071.93 188.251 2088.69 200.15C2114.63 218.52 2132.19 243.15 2142.02 272.97C2146.44 286.39 2150.22 300.66 2150.67 314.66C2152.32 366.43 2152.67 418.26 2153.12 470.07C2153.44 505.9 2153.12 541.74 2153.24 577.58C2153.24 583.22 2151.07 585.36 2145.45 585.33C2110.61 585.203 2075.77 585.203 2040.92 585.33C2035.15 585.33 2033.27 583.33 2033.28 577.62C2033.4 503.75 2033.6 429.87 2033.18 356C2033.07 335.21 2027.69 315.7 2011.48 300.94C1997.48 288.2 1980.48 284.44 1962.07 284.45C1938.81 284.45 1918.63 290.9 1903.94 309.96C1893.35 323.7 1888.5 339.88 1888.34 356.72C1887.65 429.72 1887.64 502.72 1887.72 575.72C1887.72 583.46 1885.31 585.47 1877.82 585.39C1843.82 585.02 1809.82 585.13 1775.82 585.3C1770.01 585.3 1768.02 583.08 1768.1 577.5C1768.29 562.84 1768.16 548.17 1768.16 531.62C1765.52 533.42 1763.93 534.01 1763.09 535.16C1751.82 550.812 1737.15 563.711 1720.18 572.89C1702.05 582.62 1682.91 589.89 1662.4 592.31C1643.53 594.51 1624.4 597.39 1605.56 596.54C1560.56 594.54 1518 583.83 1483 552.92C1478.49 548.92 1474.19 544.72 1468.78 539.66C1468.45 542.49 1468.1 544.15 1468.1 545.81C1468.05 556.63 1467.96 567.45 1468.1 578.27C1468.17 583.13 1466.31 585.27 1461.29 585.27C1425.77 585.17 1390.25 585.17 1354.73 585.27C1349.73 585.27 1347.73 583.27 1347.73 578.35C1347.84 569.49 1347.73 560.62 1347.73 549.92C1343.89 552.8 1341.35 554.26 1339.35 556.27C1321.08 574.67 1298.64 585.97 1273.9 591.77C1238.12 600.16 1202.4 598.77 1167.65 585.68C1135.52 573.53 1108.75 554.19 1086.75 527.55C1068.75 505.72 1056.75 481.04 1047.16 454.83C1044.89 448.58 1043.16 442.15 1040.16 435.75C1039.76 440.28 1039.03 444.8 1039.02 449.33C1038.93 491.92 1038.87 534.51 1039.02 577.11C1039.02 583.26 1037.09 585.38 1030.83 585.34C996.33 585.1 961.823 585.1 927.31 585.34C921.57 585.34 919.51 583.28 919.54 577.62C919.65 554.47 919.54 531.31 919.33 508.15C919.33 506.54 918.25 504.95 917.68 503.35C916.39 504.35 914.68 505.16 913.89 506.49C889.89 547.89 852.89 571.88 808.08 585.29C776.413 594.875 743.294 598.748 710.27 596.73C663.69 593.82 619.04 583.46 579.4 556.97C544.54 533.67 519.88 502.27 503.95 463.74C502.33 459.8 503.44 457.31 507.22 455.13C540.12 436.21 572.96 417.183 605.74 398.05C609.82 395.67 612.28 396.11 614.49 400.58C623.03 417.87 633.76 433.69 648.67 446.11C662.39 457.56 678.48 464.6 695.88 468.55C717.862 473.517 740.648 473.759 762.73 469.26C781.73 465.44 799.45 457.47 805.14 435.62C809.14 420.09 802.14 401.91 789.33 392.87C768.33 378.01 744.22 371.12 720.16 363.81C704.16 358.95 688.03 354.44 672.29 348.81C652.46 341.75 632.29 335.18 613.51 325.81C577.35 307.75 548.58 281.59 534.37 242.45C525.37 217.53 523.13 191.62 525.88 165.3C530.2 123.9 548.16 89.3801 579.08 61.6601C597.68 44.9801 619.37 33.5801 642.9 25.3201C667.58 16.6601 693 13.6101 718.96 14.0301C769.08 14.8301 814.79 28.8501 854.57 60.0301C878.38 78.6801 896.96 101.82 911.5 128.25C911.891 129.172 912.421 130.028 913.07 130.79C914.54 132.16 916.19 133.34 917.76 134.6C918.35 132.67 919.44 130.75 919.45 128.82C919.6 88.7601 919.72 48.6901 919.56 8.63012C919.56 2.32012 921.48 -0.0598782 928.01 0.0401218C962.81 0.570122 997.6 0.820122 1032.4 0.970122C1038.4 0.970122 1039.26 4.17012 1039.26 9.06012C1039.26 112.853 1039.28 216.647 1039.33 320.44V333.52L1041.08 333.71ZM1347.59 384.84C1348.87 368.141 1345.59 351.407 1338.09 336.43C1331.35 322.282 1320.75 310.324 1307.51 301.93C1293.72 293.15 1279.01 287.71 1262.85 287.2C1251.85 286.85 1240.54 287.01 1229.91 289.38C1218.6 291.893 1207.72 296.072 1197.64 301.78C1189.92 306.2 1183.87 313.78 1177.53 320.34C1165.59 332.78 1160.08 348.5 1157.81 365.02C1156.32 375.89 1157.43 387.12 1157.48 398.18C1157.57 418.58 1165.48 436.12 1178 451.65C1189.05 465.279 1204.18 475.005 1221.16 479.4C1241.07 484.827 1262.08 484.772 1281.97 479.24C1309.83 471.63 1328.75 454.13 1339.79 428.8C1347.86 413.58 1347.86 400.67 1347.59 384.84ZM919.72 244.94H919.64C919.64 212.83 919.64 180.71 919.55 148.6C919.531 146.332 918.733 144.14 917.29 142.39C916.67 141.71 913.51 142.78 911.88 143.72C897.44 152.11 883.08 160.63 868.7 169.13C851.45 179.33 834.15 189.45 817 199.81C812.38 202.61 809.35 202.2 806.87 197.26C804.77 193.09 802.45 189.02 799.99 185.05C789.51 168.17 776.16 154.19 757.37 146.86C729.52 135.99 701.37 133.31 673.76 147.74C663.84 152.91 656.21 161.16 654.34 172.04C650.54 194.17 656.19 206.28 676.1 219.17C700.5 234.96 728.57 242.17 755.68 251.62C783.74 261.37 812.24 270.11 839.55 281.62C869.83 294.42 895.68 313.85 913.48 342.45C914.48 344.06 916.29 345.17 917.73 346.52C918.39 344.42 919.63 342.33 919.64 340.23C919.76 308.49 919.72 276.72 919.72 244.94ZM1468.91 486.86C1470.11 486.646 1471.28 486.294 1472.4 485.81C1496.15 472.21 1519.89 458.59 1543.62 444.95C1546.84 443.1 1548.91 443.75 1550.62 447.63C1552.96 453.208 1555.92 458.502 1559.46 463.41C1579.35 490 1607.46 491.59 1636.4 487.74C1640.3 487.22 1644.2 485.47 1647.75 483.61C1661.84 476.21 1665.41 458.94 1650.59 450.93C1641.29 445.976 1631.59 441.818 1621.59 438.5C1593.85 429.14 1565.59 421.34 1538.16 411.04C1516.16 402.75 1496.75 389.54 1482.7 369.96C1478.09 363.54 1474.25 356.57 1468.97 348.11L1468.91 486.86ZM1768.24 332.69C1768.24 327.45 1768.24 322.21 1768.24 316.97C1768.2 302.437 1768.15 287.907 1768.08 273.38C1768.08 264.95 1767.29 264.49 1759.76 268.38C1756.94 269.84 1754.15 271.38 1751.35 272.88C1727.77 285.62 1704.14 298.28 1680.65 311.2C1675.65 313.93 1672.65 313.5 1669.54 308.52C1662.65 297.4 1654.06 287.91 1641.21 283.52C1625.21 278.08 1609.15 276.64 1594.21 286.52C1583.72 293.42 1583.29 308.11 1593.62 314.93C1600.28 319.376 1607.54 322.864 1615.17 325.29C1640.53 333.18 1666.33 339.7 1691.57 347.96C1719.1 356.96 1743.67 371.06 1761.89 394.49C1763.03 395.95 1764.99 396.79 1766.57 397.91C1767.13 395.91 1768.15 393.96 1768.16 391.97C1768.29 372.22 1768.24 352.46 1768.24 332.69V332.69Z"}" fill="${"white"}"></path><path d="${"M2392.97 553.67H2219.04C2216.89 553.67 2215.15 555.412 2215.15 557.56V581.62C2215.15 583.768 2216.89 585.51 2219.04 585.51H2392.97C2395.12 585.51 2396.86 583.768 2396.86 581.62V557.56C2396.86 555.412 2395.12 553.67 2392.97 553.67Z"}" fill="${"white"}"></path><path d="${"M304.54 18.7002H191.88C190.338 18.7002 188.834 19.1821 187.579 20.0786C186.324 20.975 185.38 22.2412 184.88 23.7002L0.399947 569.3C0.0222465 570.414 -0.0849886 571.601 0.087105 572.765C0.259198 573.928 0.705679 575.034 1.38964 575.99C2.0736 576.947 2.97541 577.727 4.02051 578.266C5.06562 578.805 6.22401 579.087 7.39995 579.09H120.08C121.622 579.089 123.125 578.606 124.38 577.71C125.635 576.814 126.578 575.548 127.08 574.09L311.56 28.4802C311.936 27.3655 312.042 26.1773 311.868 25.0138C311.694 23.8503 311.245 22.745 310.559 21.7893C309.873 20.8335 308.969 20.0549 307.923 19.5177C306.876 18.9806 305.716 18.7003 304.54 18.7002Z"}" fill="${"white"}"></path><path d="${"M480.87 18.7002H368.21C366.668 18.7002 365.164 19.1821 363.909 20.0786C362.654 20.975 361.71 22.2412 361.21 23.7002L176.73 569.3C176.352 570.414 176.245 571.601 176.417 572.765C176.589 573.928 177.036 575.034 177.72 575.99C178.404 576.947 179.305 577.727 180.351 578.266C181.396 578.805 182.554 579.087 183.73 579.09H296.41C297.952 579.089 299.455 578.606 300.71 577.71C301.965 576.814 302.909 575.548 303.41 574.09L487.89 28.4802C488.266 27.3655 488.372 26.1773 488.198 25.0138C488.024 23.8503 487.575 22.745 486.889 21.7893C486.203 20.8335 485.299 20.0549 484.253 19.5177C483.206 18.9806 482.046 18.7003 480.87 18.7002V18.7002Z"}" fill="${"white"}"></path><div id="${"divScriptsUsed"}" style="${"display: none"}"></div></svg>`;
      }
    }
  )}</div>

	<div class="${"codeBlock svelte-wlis1t"}">${each(articles, (article, idx) => {
    return `${validate_component(ArticleCard, "ArticleCard").$$render(
      $$result,
      {
        article,
        color: pattern[idx].color,
        width: pattern[idx].width
      },
      {},
      {}
    )}`;
  })}</div>
</section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-8ce97c4d.js.map