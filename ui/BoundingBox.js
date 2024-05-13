import React from "react";
import { View, StyleSheet } from "react-native";

const BoundingBox = ({ vertices, ratio, gap }) => {
  // console.log(vertices);
  // 좌표를 기반으로 bounding box를 계산합니다.
  const minX = Math.min(...vertices.map((vertex) => vertex.x)) * ratio + gap;
  const minY = Math.min(...vertices.map((vertex) => vertex.y)) * ratio - 8;
  const maxX = Math.max(...vertices.map((vertex) => vertex.x)) * ratio + gap;
  const maxY = Math.max(...vertices.map((vertex) => vertex.y)) * ratio - 8;
  // console.log(minX, minY, maxX, maxY);

  // bounding box의 너비와 높이를 계산합니다.
  const width = maxX - minX;
  const height = maxY - minY;

  return (
    <View
      style={[
        styles.boundingBox,
        { left: minX, top: minY, width: width, height: height },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  boundingBox: {
    position: "absolute",
    borderColor: "red",
    borderWidth: 1,
    zIndex: 9999,
  },
});

export default BoundingBox;
