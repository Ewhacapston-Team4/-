import React from "react";
import { View, StyleSheet } from "react-native";

const BoundingBox = ({ vertices }) => {
  // console.log(vertices);
  // 좌표를 기반으로 bounding box를 계산합니다.
  const minX = Math.min(...vertices.map((vertex) => vertex.x));
  const minY = Math.min(...vertices.map((vertex) => vertex.y));
  const maxX = Math.max(...vertices.map((vertex) => vertex.x));
  const maxY = Math.max(...vertices.map((vertex) => vertex.y));
  // console.log(minX, minY, maxX, maxY);

  // bounding box의 너비와 높이를 계산합니다.
  const width = maxX - minX + 3;
  const height = maxY - minY + 2;

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
    backgroundColor: "black",
    zIndex: 9999,
  },
});

export default BoundingBox;
