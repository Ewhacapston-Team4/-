import Pill from "../models/pill";

export const PILLS = [
  new Pill(
    "201906902",
    "가두에정",
    "혈압약",
    require("../assets/images/image01.png"),
    true,
    true,
    true
  ),

  new Pill(
    "201705486",
    "가드본정",
    "관절약",
    require("../assets/images/image02.png"),
    true,
    false,
    true
  ),

  new Pill(
    "198900799",
    "가베스캡슐",
    "위장약",
    require("../assets/images/image4.png"),
    true,
    true,
    true
  ),
  new Pill(
    "200604164",
    "웰트민정",
    "식욕억제제",
    require("../assets/images/image5.png"),
    true,
    true,
    true
  ),
  new Pill(
    "200610885",
    "디에타민정",
    "자율신경제",
    require("../assets/images/image6.png"),
    false,
    true,
    false
  ),
];
