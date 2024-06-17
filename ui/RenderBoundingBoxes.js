import React from "react";
import { View } from "react-native";
import BoundingBox from "./BoundingBox"; // BoundingBox 컴포넌트를 import 합니다.

// 좌표 배열을 받아 bounding box를 렌더링하는 컴포넌트
const RenderBoundingBoxes = ({ verticesArray }) => {
  // console.log("RenderBoudningBoxes:", verticesArray, ratio, gap);
  return (
    <View>
      {verticesArray.map((vertices, index) => (
        <BoundingBox key={index} vertices={vertices} />
      ))}
    </View>
  );
};

export default RenderBoundingBoxes;
